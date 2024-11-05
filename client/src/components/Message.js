import React from "react";
import ReactMarkdown from "react-markdown"; // Import the ReactMarkdown component for rendering Markdown
import aiLogo from "../assets/ailogo.png"; // Import the AI logo

const Message = ({ sender, text }) => {
    const isUser = sender === "user"; // Determine if the sender is the user
    const avatarUrl = isUser
        ? `https://api.dicebear.com/5.x/initials/svg?seed=s` // Generate a default avatar for the user
        : aiLogo; // Use AI logo for AI messages

    return (
        <div className="flex items-start mb-2 w-full">
            {/* Avatar for the sender */}
            <img src={avatarUrl} alt="Sender Logo" className="h-8 w-8 mr-2 rounded-full" />

            {/* Message content */}
            <div
                className={`flex-1 px-4 py-2 rounded-lg shadow-sm text-sm ${
                    isUser ? " text-black" : " text-gray-800" // Apply different text colors based on sender
                }`}
            >
                {isUser ? (
                    text // Render user text as plain text
                ) : (
                    <ReactMarkdown>{text}</ReactMarkdown> // Render AI text with Markdown formatting
                )}
            </div>
        </div>
    );
};

export default Message; // Export the Message component
