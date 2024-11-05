import React from "react";
import { useDropzone } from "react-dropzone"; // Import the useDropzone hook for drag-and-drop file uploads

const DropzoneModal = ({ onClose, onFileUpload }) => {
    // Function to handle file drops
    const onDrop = (acceptedFiles) => {
        // Filter accepted files to only include PDFs
        const pdfFiles = acceptedFiles.filter(file => file.type === "application/pdf");

        if (pdfFiles.length === 1) { // Check if exactly one PDF file is selected
            console.log("Selected PDF file:", pdfFiles[0]); // Log the selected file

            // Create a FormData object and append the selected file
            const formData = new FormData();
            formData.append("file", pdfFiles[0]);

            // Call the onFileUpload function passed from the parent component
            onFileUpload(formData);
        } else {
            alert("Please upload a single PDF file."); // Alert if more than one PDF is selected
        }
        onClose(); // Close the modal after file selection
    };

    // Set up the dropzone using useDropzone hook
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, // Function to call on file drop
        accept: "application/pdf", // Accept only PDF files
        maxFiles: 1, // Limit to one file
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative p-6 bg-white rounded-lg shadow-lg w-96">
                {/* Close button for the modal */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times; {/* Close icon */}
                </button>
                <h2 className="mb-4 text-lg font-medium text-center">Upload PDF</h2>
                {/* Dropzone area for file upload */}
                <div
                    {...getRootProps()} // Props for dropzone functionality
                    className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                        isDragActive ? "border-green-500" : "border-gray-300" // Change border color on drag
                    }`}
                >
                    <input {...getInputProps()} /> {/* Hidden input for file selection */}
                    {isDragActive ? (
                        <p className="text-green-500">Drop the PDF file here ...</p> // Message when file is dragged over
                    ) : (
                        <p className="text-gray-500">Drag & drop a PDF file here, or click to select one</p> // Instructions for user
                    )}
                </div>
            </div>
        </div>
    );
};

export default DropzoneModal; // Export the DropzoneModal component
