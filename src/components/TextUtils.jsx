import { useState, useRef } from "react";
import axios from "axios";

export default function TextUtils() {
  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const textareaRef = useRef(null);

  // Basic text operations
  const handleUpper = () => setText(text.toUpperCase());
  const handleLower = () => setText(text.toLowerCase());
  const handleClear = () => setText("");
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("Text Copied!");
  };
  const handleReverse = () => setText(text.split("").reverse().join(""));
  const handleRemoveSpaces = () => setText(text.replace(/\s+/g, " ").trim());

  // Axios API call
  const handleApiCall = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts", // Replace with your real API
        { text }
      );
      console.log("API Response:", response.data);
      alert("API Call Successful! Check console for response.");
    } catch (error) {
      console.error("API Error:", error);
      alert("API Call Failed!");
    }
  };

  // Summary helpers
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`max-w-3xl w-full p-6 rounded-2xl shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Text Utils</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          className={`w-full h-40 p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-gray-50 border-gray-300 text-black"
          }`}
          placeholder="Type or paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={handleUpper}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            UPPERCASE
          </button>
          <button
            onClick={handleLower}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            lowercase
          </button>
          <button
            onClick={handleReverse}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Reverse
          </button>
          <button
            onClick={handleRemoveSpaces}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Remove Spaces
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Copy
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Clear
          </button>
          <button
            onClick={handleApiCall}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Send to API
          </button>
        </div>

        {/* Summary */}
        <div className="mt-6">
          <p>
            <b>Word Count:</b> {wordCount}
          </p>
          <p>
            <b>Character Count:</b> {charCount}
          </p>
        </div>
      </div>
    </div>
  );
}
