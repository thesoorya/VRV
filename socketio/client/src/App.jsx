import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect('http://localhost:5000');

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  function sendMessage() {
    if (message.trim()) {
      socket.emit('send_message', { message });
      setMessage('');
    }
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data.message.message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  return (
    <div>
      <div className="form">
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="messages">
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
