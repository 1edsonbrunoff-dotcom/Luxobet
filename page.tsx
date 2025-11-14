'use client';
import React, { useState } from 'react';

export default function RegisterPage(){ 
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [msg,setMsg]=useState('');
  async function handle(e){ e.preventDefault(); const res = await fetch((process.env.NEXT_PUBLIC_API_URL||'http://localhost:4000')+'/api/auth/register',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password}) }); const j=await res.json(); if(j.ok){ localStorage.setItem('token', j.token); setMsg('Registro bem-sucedido'); } else setMsg('Erro: '+(j.error||'register_failed')); }
  return (<main style={{padding:24}}><h1>Registrar</h1><form onSubmit={handle}><input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} /><br/><input placeholder='senha' type='password' value={password} onChange={e=>setPassword(e.target.value)} /><br/><button type='submit'>Registrar</button></form><p>{msg}</p></main>);
}
