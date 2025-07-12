import React, { useState } from 'react';
export default function App() {
 const [msg, setMsg] = useState('');
 const [log, setLog] = useState([]);
 const send = (e) => { e.preventDefault(); if (!msg.trim()) return; setLog([...log, { from: 'user', text: msg }, { from: 'ai', text: 'Simulated response to: ' + msg }]); setMsg(''); };
 return (<div style={{color:'#fff', background:'#111', padding:'2rem', height:'100vh'}}><h1>FreddieGPT</h1><div style={{overflowY:'auto', maxHeight:'80%'}}>{log.map((m,i)=><div key={i}><b>{m.from}:</b> {m.text}</div>)}</div><form onSubmit={send}><input value={msg} onChange={e=>setMsg(e.target.value)} style={{width:'80%'}} /><button type='submit'>Send</button></form></div>); }