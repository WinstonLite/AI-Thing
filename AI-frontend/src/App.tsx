import { useState } from 'react'; // Import the useState hook
import './App.css';

// Define a type for our message objects for better code quality
interface Message {
  sender: 'user' | 'ai';
  text: string;
}

function App() {
  // STATE 1: To store the message the user is currently typing
  const [prompt, setPrompt] = useState<string>('');

  // STATE 2: To store the list of all messages in the chat
  const [messages, setMessages] = useState<Message[]>([]);

  // This function will be called when the user submits the form
  const handleSubmit = async (event: React.FormEvent) => {
    // Prevent the browser from reloading the page, which is the default form behavior
    event.preventDefault();

    // Don't do anything if the input is empty
    if (!prompt.trim()) return;

    // 1. Add the user's message to the chat list
    const userMessage: Message = { sender: 'user', text: prompt };
    setMessages(currentMessages => [...currentMessages, userMessage]);

    // 2. Clear the input box
    const currentPrompt = prompt;
    setPrompt('');

    // 3. Send the prompt to the backend API
    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: currentPrompt }), // Send the prompt in the request body
      });

      // We expect the raw text response from the backend
      const aiResponseText = await response.text();

      // 4. Add the AI's response to the chat list
      const aiMessage: Message = { sender: 'ai', text: aiResponseText };
      setMessages(currentMessages => [...currentMessages, aiMessage]);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      // Optional: Add an error message to the chat
      const errorMessage: Message = { sender: 'ai', text: "Sorry, I couldn't connect to the server." };
      setMessages(currentMessages => [...currentMessages, errorMessage]);
    }
  };

  return (
    <div className="app-container">
      {/* Add a wrapper to control the width of the chat interface */}
      <div className="chat-wrapper">
        <header>
          <h1>My AI Chat</h1>
        </header>

        {/* We now map over the messages array to display them */}
        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* The form now calls our handleSubmit function */}
        <form className="message-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your message here..."
            className="message-input"
            value={prompt} // The input's value is now controlled by our state
            onChange={(e) => setPrompt(e.target.value)} // Update the state on every keystroke
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;

