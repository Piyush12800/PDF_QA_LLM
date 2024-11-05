from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
import cloudinary
import cloudinary.uploader
from sqlalchemy import create_engine, Column, Integer, String, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from langchain_community.document_loaders import PyPDFLoader
from langchain_google_genai import ChatGoogleGenerativeAI, HarmBlockThreshold, HarmCategory
from langchain_core.prompts import ChatPromptTemplate
from sqlalchemy.sql import func

# Initialize FastAPI application
app = FastAPI()

# CORS configuration to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Add your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration for database and cloud services
DATABASE_URL = os.getenv("DATABASE_URL")  # Database connection string from environment variable
UPLOAD_DIR = "uploaded_files"  # Directory to save uploaded files
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")  # Google API key from environment variable

# Initialize Google LLM for question answering
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",  # Specify the AI model
    temperature=0,  # Controls randomness of responses
    max_tokens=None,  # No limit on tokens for response
    timeout=None,  # No timeout
    max_retries=2,  # Maximum retries for failed requests
    api_key=GOOGLE_API_KEY,  # API key for authentication
    safety_settings={
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,  # Safety settings for content
    },
)

# Configure Cloudinary for file storage
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),  # Cloud name from environment variable
    api_key=os.getenv('CLOUDINARY_API_KEY'),  # API key from environment variable
    api_secret=os.getenv('CLOUDINARY_API_SECRET')  # API secret from environment variable
)

# Database setup using SQLAlchemy
Base = declarative_base()  # Create a base class for declarative models

class Document(Base):
    __tablename__ = 'documents'  # Define the table name

    id = Column(Integer, primary_key=True, index=True)  # Document ID
    url = Column(String, nullable=False)  # URL of the uploaded document
    file_name = Column(String, nullable=False)  # Name of the uploaded file
    upload_date = Column(TIMESTAMP, server_default=func.current_timestamp())  # Date of upload

# Create the database engine and tables
engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)  # Create a new session local class

class Question(BaseModel):
    document_id: int  # ID of the document to query
    question: str  # The question to be answered

# Endpoint to upload a PDF file
@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Upload the PDF to Cloudinary
        upload_response = cloudinary.uploader.upload(file.file, resource_type='raw')
        pdf_url = upload_response['secure_url']  # Get the secure URL of the uploaded PDF

        # Store document metadata in PostgreSQL
        db = SessionLocal()  # Create a new database session
        new_document = Document(url=pdf_url, file_name=file.filename)  # Create a new document record
        db.add(new_document)  # Add the new document to the session
        db.commit()  # Commit the transaction
        db.refresh(new_document)  # Refresh the instance to get the ID
        db.close()  # Close the database session

        return {"document_id": new_document.id, "url": pdf_url, "file_name": file.filename}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))  # Handle exceptions and return HTTP error

# Endpoint to ask a question about a specific document
@app.post("/ask/")
async def ask_question(question: Question):
    try:
        db = SessionLocal()  # Create a new database session
        document = db.query(Document).filter(Document.id == question.document_id).first()  # Retrieve the document by ID
        if not document:
            db.close()
            raise HTTPException(status_code=404, detail="Document not found")  # Raise error if document does not exist

        pdf_url = document.url  # Get the URL of the document

        # Process PDF and extract text
        loaders = PyPDFLoader(pdf_url)  # Load the PDF from the URL
        pages = loaders.load()  # Extract pages from the PDF

        # Combine extracted text into a single string
        extracted_text = " ".join([page.page_content for page in pages])

        # Setup prompt for the question-answering
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", "You are a helpful assistant that answers questions based on the following context."),
                ("human", extracted_text),  # Context extracted from the PDF
                ("human", question.question),  # The user's question
            ]
        )

        # Chain prompt with model for processing
        chain = prompt | llm
        result = chain.invoke({})  # Invoke the chain to get the result
        response = result.content if hasattr(result, 'content') else "Sorry, I couldn't retrieve a proper response."  # Get the response

        return {"answer": response}  # Return the answer
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))  # Handle exceptions and return HTTP error
    
# Endpoint to retrieve all uploaded documents
@app.get("/documents/", response_model=List[dict])
async def get_documents():
    db = SessionLocal()  # Create a new database session
    documents = db.query(Document).all()  # Query all documents
    db.close()  # Close the database session
    return [{"id": doc.id, "url": doc.url, "file_name": doc.file_name, "upload_date": doc.upload_date} for doc in documents]  # Return document details

# Root endpoint to verify that the API is running
@app.get("/")
async def root():
    return {"message": "PDF QA API is running"}  # Simple message indicating the API status
