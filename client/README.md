# PDF Q/A Client Application

## Overview
Planet is a web-based client application that allows users to upload PDF documents and interact with an AI-powered question-answering system. Users can ask questions related to the content of the uploaded documents and receive answers in real-time.

## Features
* **PDF Upload**: Users can upload a single PDF document.
* **Chat Interface**: Users can interact with an AI assistant to ask questions about the uploaded document.
* **Markdown Support**: AI responses are rendered with Markdown formatting for better readability.

## Tech Stack
* **Frontend**: React.js
* **State Management**: React Hooks
* **API Integration**: Axios
* **File Upload**: React Dropzone
* **Markdown Rendering**: React Markdown
* **Icons**: React Icons

## Getting Started

### Prerequisites
* Node.js (v14 or later)
* npm (v6 or later) or Yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-directory>
```

2. Install dependencies:
```bash
npm install
```
or
```bash
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your base API URL:
```bash
REACT_APP_BASE_URL=<your-api-url>
```

### Running the Application
To start the development server, run:
```bash
npm start
```
or
```bash
yarn start
```

Open your browser and navigate to `http://localhost:3000` to view the application.

## Components

### Header
* Displays the logo and upload button.
* Allows users to upload a PDF document.

### DropzoneModal
* Provides a modal interface for dragging and dropping PDF files or clicking to select files.
* Validates the file type and ensures only a single PDF file is uploaded.

### Chat
* Displays the chat interface where users can send messages to the AI assistant.
* Handles the question submission and response display.

### Message
* Renders individual messages in the chat, differentiating between user and AI messages.
* Supports Markdown formatting for AI responses.

## API Integration
The application communicates with the backend API for the following functionalities:
* **Upload File**: `POST /upload` - Uploads the selected PDF file.
* **Get Files**: `GET /documents` - Retrieves a list of uploaded documents.
* **Ask Question**: `POST /ask` - Sends a question related to a specific document and receives an answer.

## Contributing
Contributions are welcome! If you'd like to contribute to the project, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.