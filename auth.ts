import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const USERS_FILE = path.join(__dirname, 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
export function readUsers(){ return JSON.parse(fs.readFileSync(USERS_FILE,'utf-8')); }
export function writeUsers(u){ fs.writeFileSync(USERS_FILE, JSON.stringify(u, null, 2)); }
export async function createUser(email, password){ const users = readUsers(); if(users.find(x=>x.email===email)) throw new Error('exists'); const hash = await bcrypt.hash(password, 10); const id = (users.reduce((a,b)=>Math.max(a,b.id),0)||0)+1; const user = { id, email, passwordHash: hash }; users.push(user); writeUsers(users); return user; }
export async function verifyUser(email, password){ const users = readUsers(); const u = users.find(x=>x.email===email); if(!u) return null; const ok = await bcrypt.compare(password, u.passwordHash); return ok?u:null; }
export function signToken(user){ return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' }); }
export function verifyToken(token){ try{ return jwt.verify(token, JWT_SECRET); }catch(e){ return null; } }
