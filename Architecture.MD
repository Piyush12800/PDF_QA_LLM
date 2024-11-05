Here's the architecture documentation formatted in clean markdown:

# Architecture Documentation

## Overview of Code Architecture

The PDF Q/A Web Application is structured to efficiently handle PDF uploads and provide AI-powered question-answering services. The architecture consists of two main components: the **Frontend** and the **Backend**. Each component has its own responsibilities and interacts with the other through a RESTful API.

## 1. Frontend (React.js)

### Directory Structure

```
client/
├── public/        # Static files
├── src/           # Main application code
│   ├── components/    # Reusable components
│   ├── pages/        # Application pages
│   ├── hooks/        # Custom hooks
│   ├── services/     # API service calls
│   ├── App.js        # Main application component
│   └── index.js      # Entry point
└── package.json      # Project metadata and dependencies
```

### Key Components

- **App.js**: Main application component that sets up routing and state management.
- **Header**: Displays the logo and provides the upload functionality.
- **DropzoneModal**: Handles PDF file uploads through a drag-and-drop interface.
- **Chat**: Manages the interactive chat interface for user interactions.
- **Services**: Contains API calls for uploading documents and fetching responses from the backend.

### Interactions

The frontend uses Axios to communicate with the FastAPI backend. It sends requests to upload PDFs and retrieve AI-generated answers based on user questions.

## 2. Backend (FastAPI)

### Directory Structure

```
server/
├── app/           # Application code
│   ├── api/           # API routes and endpoints
│   ├── models/        # Database models
│   ├── services/      # Business logic and AI integration
│   ├── main.py        # Entry point of the application
│   └── utils/         # Utility functions
├── requirements.txt   # Dependencies
└── .env              # Environment variables
```

### Key Components

- **main.py**: Initializes the FastAPI application and includes middleware configurations.
- **api/**: Contains the route definitions for uploading PDFs, asking questions, and retrieving documents.
- **models/**: Defines the SQLAlchemy models for database interactions.
- **services/**: Integrates Google Gemini AI for document analysis and handles the logic for processing questions and returning answers.

### Interactions

The backend listens for incoming requests from the frontend. Upon receiving a request, it processes the PDF files, interacts with the AI service, and returns the results.

## 3. Database

### PostgreSQL

The database schema is designed to store metadata about uploaded documents. The documents table includes fields for the document's URL, file name, and upload date.

```sql
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    file_name VARCHAR NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 4. Cloud Storage

### Cloudinary

Used for storing uploaded PDF files securely and retrieving them for processing. Integration with the backend allows seamless access to document data.

## Summary of Flow

1. **User Interaction**: Users upload PDF documents through the frontend interface.
2. **PDF Processing**: The frontend sends the file to the backend via an API request.
3. **AI Querying**: Users can ask questions about the uploaded document, which the backend processes using Google Gemini AI.
4. **Response Delivery**: The backend returns the AI-generated answers to the frontend, where they are displayed in the chat interface.

## Conclusion

This architecture enables a clear separation of concerns, with a responsive user interface built in React and a robust backend built with FastAPI. The integration of AI services provides a powerful solution for document Q&A, ensuring a smooth user experience.
