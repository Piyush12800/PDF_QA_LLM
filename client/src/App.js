// src/App.js
import React, { useState } from "react";
import Header from "./components/Header";
import Chat from "./components/Chat";

const App = () => {
    const [documentId, setDocumentId] = useState(null);

    return (
        <div className="flex flex-col h-screen">
            {/* Header with file upload */}
            <Header setDocumentId={setDocumentId} documentId={documentId} />

            {/* Spacer to push Chat to the bottom if documentId is not set */}
            <div className="flex-grow"></div>

            {/* Conditionally render Chat component if documentId is present */}
            
                <div className="w-full bg-gray-100 ">
                    <Chat documentId={documentId} />
                </div>
           
        </div>
    );
};

export default App;
