# LuxoBet - Starter Repository
Protótipo completo inicial com frontend (Next.js), backend (Node.js/Express), infra (docker-compose) e instruções para deploy.

> ATENÇÃO: Este é código de exemplo. Operar um site de apostas requer licenças, compliance e auditoria. Use apenas para desenvolvimento e aprendizado.

## Estrutura
```
luxobet_starter/
├─ README.md
├─ frontend/
│  ├─ package.json
│  ├─ next.config.js
│  └─ app/
│     ├─ page.tsx
│     └─ components/
│        └─ AdminDashboard.tsx
├─ backend/
│  ├─ package.json
│  └─ src/
│     └─ index.ts
├─ infra/
│  └─ docker-compose.yml
└─ LICENSE
```

## Como rodar local (Docker)
1. Copie `.env.example` para `backend/.env` e preencha as variáveis (DATABASE_URL, JWT_SECRET, STRIPE_KEY etc.).
2. No diretório raiz, execute:
```bash
docker-compose -f infra/docker-compose.yml up --build
```
3. Frontend estará disponível em http://localhost:3000 e backend em http://localhost:4000

## Deploy rápido
- Frontend: Vercel (conectar repositório). Use `NEXT_PUBLIC_API_URL` apontando para o backend público.
- Backend: Render / Fly / DigitalOcean App Platform (container).

## Nota sobre integrações
- Odds feed: Sportradar/Betradar (contratar feed).
- Pagamentos: Stripe / Mercado Pago (usar SDKs e webhooks).
- KYC: Onfido / Sumsub (usar sandbox inicialmente).

---


## What was added
- Auth (register/login JWT) stubs
- Frontend pages: /login, /register, /event, /checkout
- KYC and payments stub endpoints
- GitHub Actions CI workflow
