import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { createUser, verifyUser, signToken, verifyToken } from './auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// basic rate limiting (example)
const limiter = rateLimit({ windowMs: 15*60*1000, max: 200 });
app.use(limiter);

app.get('/health', (_, res) => res.json({ ok: true }));

// Mock events endpoint
app.get('/api/events', (_, res) => {
  res.json([
    { id: 1, league: 'UEFA Champions League', teams: 'Real Madrid vs PSG', start_at: '2025-11-20T18:45:00Z', odds: { home: 2.10, draw: 3.40, away: 3.10 } },
    { id: 2, league: 'Premier League', teams: 'Liverpool vs Arsenal', start_at: '2025-11-21T16:00:00Z', odds: { home: 1.95, draw: 3.60, away: 4.00 } }
  ]);
});

// Auth endpoints (register / login)
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'invalid_input' });
  try {
    const user = await createUser(email, password);
    const token = signToken(user);
    res.json({ ok: true, token, user: { id: user.id, email: user.email } });
  } catch (e) {
    res.status(400).json({ error: e.message || 'registration_failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'invalid_input' });
  const user = await verifyUser(email, password);
  if(!user) return res.status(401).json({ error: 'invalid_credentials' });
  const token = signToken(user);
  res.json({ ok: true, token, user: { id: user.id, email: user.email } });
});

// Protected route example
app.get('/api/me', (req, res) => {
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ error: 'no_auth' });
  const token = auth.split(' ')[1];
  const payload = verifyToken(token);
  if(!payload) return res.status(401).json({ error: 'invalid_token' });
  res.json({ ok: true, user: payload });
});

// KYC stub (simulate kick-off)
app.post('/api/kyc/start', (req, res) => {
  // In production you'd call Onfido/Sumsub here and return the applicant id / url
  res.json({ ok: true, kycUrl: 'https://sandbox-kyc.example.com/session/abc123', applicantId: 'APP_'+Date.now() });
});

// Stripe stub for creating Payment Intent (mock)
app.post('/api/payments/create-intent', (req, res) => {
  const { amount, currency='brl' } = req.body;
  if(!amount) return res.status(400).json({ error: 'invalid_amount' });
  // In production call Stripe API. Here we return a mock client_secret.
  res.json({ ok: true, clientSecret: 'pi_mock_' + Date.now() + '_secret_mock' });
});

// Webhook stub
app.post('/api/webhooks/stripe', (req, res) => {
  // Verify signature in production. Here just accept and log.
  console.log('Received webhook', req.body);
  res.json({ received: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
