# PDF Q/A Client Application

## Overview
A web-based client application that allows users to upload PDF documents and interact with an AI-powered question-answering system. Users can ask questions related to the content of the uploaded documents and receive answers in real-time.

## Features
* **PDF Upload**: Users can upload PDF documents
* **Chat Interface**: Interactive AI assistant for document-related questions
* **Markdown Support**: AI responses rendered with Markdown formatting
* **Document Management**: View and manage uploaded documents

## Tech Stack
* **Frontend**: React.js
* **State Management**: React Hooks
* **API Integration**: Axios
* **File Upload**: React Dropzone
* **Markdown Rendering**: React Markdown
* **Icons**: React Icons

## Prerequisites
* Node.js (v14 or later)
* npm (v6 or later) or Yarn

## Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file:
```bash
REACT_APP_API_URL=http://localhost:8000
```

## Development
Start the development server:
```bash
npm start
# or
yarn start
```

Visit `http://localhost:3000` to view the application.

## Components

### Header
* Application logo and upload button
* PDF document upload functionality

### DropzoneModal
* Drag-and-drop PDF upload interface
* File type validation and preview

### Chat
* Interactive chat interface for Q&A
* Message history display
* Question input and submission

### Message
* Individual message display
* Markdown formatting for AI responses
* User/AI message differentiation

## API Integration

The client communicates with the backend through the following endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/upload` | POST | Upload PDF documents |
| `/documents` | GET | Retrieve uploaded documents |
| `/ask` | POST | Submit questions and get AI responses |

## Scripts
* `npm start`: Run development server
* `npm build`: Build for production
* `npm test`: Run tests
* `npm eject`: Eject from Create React App

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request