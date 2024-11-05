import React, { useState } from "react";
import Message from "./Message"; // Import the Message component for displaying messages
import { askQuestion } from "../services/apis"; // Import the function to ask questions from the API
import { VscSend } from "react-icons/vsc"; // Import the send icon

const Chat = ({ documentId }) => {
    // State to store chat messages and user question input
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState("");

    // Function to handle sending a message
    const handleSendMessage = async () => {
        if (question.trim() === "") return; // Prevent sending empty messages

        // Add user question to the chat messages
        const newMessage = { sender: "user", text: question };
        setMessages([...messages, newMessage]);

        // Call the API to get an answer
        try {
            const response = await askQuestion({
                document_id: documentId, // Document ID for the question
                question: question, // User's question
            });
            console.log("Answer:", response); // Log the received answer
            const answerMessage = { sender: "ai", text: response.answer }; // Create a message for the AI response
            setMessages((prevMessages) => [...prevMessages, answerMessage]); // Update messages with the AI response
        } catch (error) {
            console.error("Error fetching answer:", error); // Log any errors encountered
        }

        setQuestion(""); // Clear the input field after sending the message
    };

    return (
        <div className="flex flex-col w-full h-full p-4 bg-white rounded-lg shadow-lg">
            <div className="flex-1 overflow-y-auto space-y-2 p-2">
                {/* Map through messages to display each one */}
                {messages.map((msg, index) => (
                    <Message key={index} sender={msg.sender} text={msg.text} />
                ))}
            </div>
            <div className="flex items-center p-2 border-t">
                <div className="relative flex-1">
                {/* Input field for user message */}
                    <input
                        type="text"
                        className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        placeholder="Send a message..."
                        value={question} // Bind input value to question state
                        onChange={(e) => setQuestion(e.target.value)} // Update question state on input change
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // Send message on Enter key press
                    />
                    {/* Send icon to trigger message sending */}
                    <VscSend
                        onClick={handleSendMessage} // Send message on click
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-green-600"
                        size={24} // Size of the icon
                    />
                </div>
            </div>
        </div>
    );
};

export default Chat; // Export the Chat component
