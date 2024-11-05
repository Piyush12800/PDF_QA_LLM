

# FastAPI PDF Question-Answering API

This project is a FastAPI-based API that allows users to upload PDF documents and ask questions about their content. The API utilizes Google's AI model for natural language processing and employs Cloudinary for file storage. The documents' metadata is stored in a PostgreSQL database.

## Features

- **Upload PDF Files**: Users can upload PDF documents, which are then stored in Cloudinary.
- **Ask Questions**: Users can ask questions related to the uploaded PDF documents, and the API responds with answers based on the document content.
- **Document Metadata Management**: The API stores metadata about the uploaded documents in a PostgreSQL database.

## Technology Stack

- **Backend**: FastAPI
- **Database**: PostgreSQL
- **File Storage**: Cloudinary
- **AI Model**: Google Generative AI (Gemini)
- **ORM**: SQLAlchemy
- **Document Loading**: LangChain

## Requirements

Before running the application, ensure you have the following environment variables set up:

- `DATABASE_URL`: The connection string for your PostgreSQL database.
- `GOOGLE_API_KEY`: Your API key for Google AI services.
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
- `CLOUDINARY_API_KEY`: Your Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pdf-qa-api.git
cd pdf-qa-api
```

2. Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install the required packages:

```bash
pip install -r requirements.txt
```

## Usage

1. Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The API will be accessible at `http://127.0.0.1:8000`.

2. **Upload a PDF Document**

Use the `/upload/` endpoint to upload a PDF file:

```bash
curl -X POST "http://127.0.0.1:8000/upload/" -F "file=@/path/to/your/document.pdf"
```

3. **Ask a Question**

Use the `/ask/` endpoint to ask a question about the uploaded document:

```bash
curl -X POST "http://127.0.0.1:8000/ask/" \
  -H "Content-Type: application/json" \
  -d '{"document_id": 1, "question": "What is the main topic of the document?"}'
```

4. **Get Uploaded Documents**

Retrieve a list of all uploaded documents:

```bash
curl -X GET "http://127.0.0.1:8000/documents/"
```

## API Endpoints

| Method | Endpoint        | Description                               |
| ------ | --------------- | ----------------------------------------- |
| POST   | `/upload/`    | Upload a PDF document                     |
| POST   | `/ask/`       | Ask a question about an uploaded document |
| GET    | `/documents/` | Retrieve a list of all uploaded documents |
| GET    | `/`           | Verify that the API is running            |

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Acknowledgements

* FastAPI for building the API
* Cloudinary for file storage
* SQLAlchemy for database interactions
* LangChain for document loading and AI model integration

---

### Notes for Deployment:

- Make sure to replace `https://github.com/yourusername/pdf-qa-api.git` with your actual repository URL
- Update the requirements.txt with all necessary dependencies
- Ensure all environment variables are properly set in your deployment environment
