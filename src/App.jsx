import React, { useState } from 'react';
export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }, { role: 'ai', content: 'Simulated reply: ' + input }]);
    setInput('');
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ margin: '0.5rem 0' }}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', padding: '1rem', borderTop: '1px solid #333' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '0.5rem', fontSize: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Send</button>
      </form>
    </div>
  );
}