import { useState } from 'react';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Simulation Activated — You are now Freddie.' }
  ]);

  const sendMessage = async () => {
    if (!input.trim() || !apiKey.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const prompt = `You are Freddie. Respond with actionable advice for the following input: "${input}"`;

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: prompt }]
        })
      });

      const data = await res.json();
      const aiResponse = data.choices?.[0]?.message?.content || "No response.";
      setMessages(prev => [...prev, { from: 'ai', text: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'ai', text: 'Error: ' + err.message }]);
    }
  };

  return (
    <div style={{ background: '#000', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 10, borderBottom: '1px solid #333' }}>
        <input
          type="password"
          placeholder="Paste your OpenAI API Key here"
          style={{ width: '100%', padding: 8, fontSize: 14 }}
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
        />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 12, color: msg.from === 'ai' ? '#0f0' : '#0af' }}>
            <strong>{msg.from === 'ai' ? 'FreddieGPT' : 'You'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ padding: 10, borderTop: '1px solid #333' }}>
        <input
          type="text"
          placeholder="Send a message..."
          style={{ width: '100%', padding: 10, fontSize: 16 }}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
      </div>
    </div>
  );
}