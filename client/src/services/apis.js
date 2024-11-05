import { apiConnector } from "./apiConnector";

// Base URL for API requests, taken from environment variables
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Define API endpoints
const UPLOAD_FILE = BASE_URL + 'upload/';
const GET_FILES = BASE_URL + 'documents/';
const ASK_QUESTION = BASE_URL + 'ask/';

// Function to upload a file to the server
export const uploadFile = async (formData) => {
    try {
        console.log("Uploading file...");
        // Make a POST request to upload the file
        const response = await apiConnector("POST", UPLOAD_FILE, formData, {
            "Content-Type": "multipart/form-data", // Required for file uploads
        });
        console.log("File uploaded successfully", response.data);
        return response.data; // Return response data after successful upload
    } catch (error) {
        console.error("File upload failed", error);
        throw error; // Re-throw error for handling in the calling component
    }
};

// Function to retrieve files from the server
export const getFiles = async () => {
    try {
        // Make a GET request to retrieve files
        const response = await apiConnector("GET", GET_FILES);
        return response.data; // Return the list of files
    } catch (error) {
        console.error("Failed to get files", error);
        throw error; // Re-throw error for handling in the calling component
    }
};

// Function to ask a question related to a document
export const askQuestion = async (question) => {
    console.log("Asking question...");
    console.log("Question:", question);
    try {
        // Make a POST request to ask a question about the document
        const response = await apiConnector("POST", ASK_QUESTION, {
            document_id: question.document_id, // ID of the document
            question: question.question, // The question being asked
        });
        console.log("Question asked successfully", response.data);
        return response.data; // Return response data after successful request
    } catch (error) {
        console.error("Failed to ask question", error);
        throw error; // Re-throw error for handling in the calling component
    }
};
