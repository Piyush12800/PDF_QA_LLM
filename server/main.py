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

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",
    "https://your-frontend-domain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
DATABASE_URL = os.getenv("DATABASE_URL")
UPLOAD_DIR = "uploaded_files"
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Initialize Google LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_key=GOOGLE_API_KEY,
    safety_settings={
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    },
)

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# Database setup
Base = declarative_base()

class Document(Base):
    __tablename__ = 'documents'

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, nullable=False)
    file_name = Column(String, nullable=False)  # New field for file name
    upload_date = Column(TIMESTAMP, server_default=func.current_timestamp())

engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Question(BaseModel):
    document_id: int
    question: str

@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Upload the PDF to Cloudinary
        upload_response = cloudinary.uploader.upload(file.file, resource_type='raw')
        pdf_url = upload_response['secure_url']  # Get the URL of the uploaded PDF

        # Store document metadata in PostgreSQL
        db = SessionLocal()
        new_document = Document(url=pdf_url, file_name=file.filename)  # Save the file name
        db.add(new_document)
        db.commit()
        db.refresh(new_document)
        db.close()

        return {"document_id": new_document.id, "url": pdf_url, "file_name": file.filename}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/ask/")
async def ask_question(question: Question):
    try:
        db = SessionLocal()
        document = db.query(Document).filter(Document.id == question.document_id).first()
        if not document:
            db.close()
            raise HTTPException(status_code=404, detail="Document not found")

        pdf_url = document.url

        # Process PDF and extract text
        loaders = PyPDFLoader(pdf_url)
        pages = loaders.load()

        # Extracted text as a single string
        extracted_text = " ".join([page.page_content for page in pages])

        # Setup prompt for the question-answering using ChatPromptTemplate
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", "You are a helpful assistant that answers questions based on the following context."),
                ("human", extracted_text),
                ("human", question.question),
            ]
        )

        # Chain prompt with model
        chain = prompt | llm
        result = chain.invoke({})
        response = result.content if hasattr(result, 'content') else "Sorry, I couldn't retrieve a proper response."

        return {"answer": response}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.get("/documents/", response_model=List[dict])
async def get_documents():
    db = SessionLocal()
    documents = db.query(Document).all()
    db.close()
    return [{"id": doc.id, "url": doc.url, "file_name": doc.file_name, "upload_date": doc.upload_date} for doc in documents]
@app.get("/")
async def root():
    return {"message": "PDF QA API is running"}

