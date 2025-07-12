import React, { useState, useEffect } from 'react';

export default function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Simulation Activated — You are now Freddie.' }
  ]);

  useEffect(() => {
    if (apiKey) localStorage.setItem('openai_api_key', apiKey);
  }, [apiKey]);

  const sendMessage = async () => {
    if (!input.trim() || !apiKey) return;
    const userMsg = { role: 'user', content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: updatedMessages,
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "[No response]";
      setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: 'assistant', content: '[Error contacting OpenAI API]' }]);
    }
  };

  return (
    <div style={{ background: '#121212', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <h1>🧠 FreddieGPT</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>🔑 OpenAI API Key: </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          style={{ width: '300px' }}
        />
      </div>

      <div style={{ padding: '1rem', background: '#1e1e1e', borderRadius: '8px', minHeight: '200px' }}>
        {messages.map((msg, idx) => (
          <p key={idx}><strong>{msg.role}:</strong> {msg.content}</p>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} style={{ width: '80%' }} />
        <button onClick={sendMessage} style={{ marginLeft: '1rem' }}>Send</button>
      </div>
    </div>
  );
}