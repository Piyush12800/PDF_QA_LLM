
# PDF Q/A Server Application

## Overview

A FastAPI-based backend service that processes PDF documents and provides AI-powered question-answering capabilities using Google's Gemini AI model. The service handles PDF storage using Cloudinary and maintains document metadata in PostgreSQL.

## Features

* **PDF Processing**: Upload and store PDF documents
* **AI Integration**: Google Gemini AI for document analysis
* **Database Storage**: PostgreSQL for document metadata
* **Cloud Storage**: Cloudinary for PDF file storage
* **RESTful API**: Clean API interface for client interaction

## Tech Stack

* **Backend Framework**: FastAPI
* **Database**: PostgreSQL
* **ORM**: SQLAlchemy
* **AI Model**: Google Generative AI (Gemini)
* **PDF Processing**: LangChain
* **Cloud Storage**: Cloudinary
* **CORS**: Built-in FastAPI CORS middleware

## Prerequisites

* Python 3.8+
* PostgreSQL
* Cloudinary account
* Google AI API access

## Environment Variables

Create a `.env` file with:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
GOOGLE_API_KEY=your_google_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Installation

1. Navigate to the server directory:

```bash
cd server
```

2. Create and activate virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

## Development

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

| Endpoint        | Method | Description     | Request Body                                 |
| --------------- | ------ | --------------- | -------------------------------------------- |
| `/upload/`    | POST   | Upload PDF file | PDF file (multipart/form-data)               |
| `/ask/`       | POST   | Ask question    | `{"document_id": int, "question": string}` |
| `/documents/` | GET    | List documents  | None                                         |
| `/`           | GET    | Health check    | None                                         |

## Database Schema

### Document Table

```sql
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    file_name VARCHAR NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Error Handling

* File upload validation
* Document existence checks
* AI model error handling
* Database connection error handling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Future Improvements

* Batch document upload
* Document deletion
* User authentication
* Rate limiting
* Response caching
