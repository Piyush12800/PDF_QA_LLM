import React, { useState } from "react";
import { uploadFile } from "../services/apis"; // Import the uploadFile function from APIs
import { useDropzone } from "react-dropzone"; // Import the useDropzone hook for drag-and-drop file uploads
import { CgAdd } from "react-icons/cg"; // Import the add icon
import { CiFileOn } from "react-icons/ci"; // Import the file icon
import logo from '../assets/logo.png'; // Import the logo image

const Header = ({ setDocumentId, documentId }) => {
    const [isFileUploaded, setIsFileUploaded] = useState(false); // State to track if a file has been uploaded
    const [uploadResponse, setUploadResponse] = useState(null); // State to store upload response data
    const [isLoading, setIsLoading] = useState(false); // State to track loading status

    // Function to handle file drop events
    const onDrop = async (acceptedFiles) => {
        const pdfFile = acceptedFiles.find(file => file.type === "application/pdf"); // Check if the dropped file is a PDF
        if (pdfFile) {
            const formData = new FormData();
            formData.append("file", pdfFile); // Append the file to FormData

            setIsLoading(true); // Set loading state to true while uploading
            try {
                const response = await uploadFile(formData); // Call the uploadFile API
                setDocumentId(response.document_id); // Store the document_id from the response
                setIsFileUploaded(true); // Update file uploaded state
                setUploadResponse(response); // Store the upload response
                console.log("File uploaded successfully:", response);
            } catch (error) {
                console.error("File upload failed:", error); // Log any errors during upload
            } finally {
                setIsLoading(false); // Reset loading state after upload attempt
            }
        } else {
            alert("Please upload a PDF file."); // Alert if the file type is not PDF
        }
    };

    // Set up the dropzone using useDropzone hook
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, // Function to call on file drop
        accept: "application/pdf", // Accept only PDF files
        maxFiles: 1, // Limit to one file
    });

    return (
        <header className="flex flex-col items-center p-4 bg-white shadow-md">
            <div className="flex items-center justify-between w-full mb-4">
                {/* Logo Section */}
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 mr-2" />
                </div>

                {/* Upload Button with File Name Display */}
                <div className="flex items-center gap-4">
                    {isFileUploaded && uploadResponse && (
                        <span className="text-lg text-gray-700 flex items-center gap-2">
                            <CiFileOn className="text-3xl border-green-500 rounded-sm border text-green-500" />
                            {uploadResponse.file_name} {/* Display the name of the uploaded file */}
                        </span>
                    )}
                    <div 
                        {...getRootProps()} // Props for dropzone functionality
                        className={`flex items-center gap-2 cursor-pointer px-4 py-2 text-sm font-medium text-black bg-white border-2 border-black rounded hover:bg-gray-100 hover:scale-105 transition-transform duration-200 ${
                            isLoading ? "cursor-progress" : "" // Change cursor style when loading
                        }`}
                    >
                        <CgAdd className="text-lg" />
                        <input {...getInputProps()} disabled={isLoading} /> {/* Hidden input for file selection */}
                        {isLoading ? "Uploading..." : isDragActive ? "Drop the PDF here ..." : "Upload PDF"} {/* Button label based on state */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; // Export the Header component
