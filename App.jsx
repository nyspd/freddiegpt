import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Simulation Activated — You are now Freddie.' }
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    newMessages.push({ role: 'assistant', content: '[GPT-4o simulated response placeholder]' });
    setMessages(newMessages);
    setInput('');
  };

  return (
    <div style={{ background: '#121212', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <h1>🧠 FreddieGPT</h1>
      <div style={{ margin: '1rem 0', padding: '1rem', background: '#1e1e1e', borderRadius: '8px' }}>
        {messages.map((msg, idx) => (
          <p key={idx}><strong>{msg.role}:</strong> {msg.content}</p>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} style={{ width: '80%' }} />
      <button onClick={sendMessage} style={{ marginLeft: '1rem' }}>Send</button>
    </div>
  );
}