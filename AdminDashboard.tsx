import React from 'react';

export default function AdminDashboard() {
  const upcomingMatches = [
    { id: 1, league: 'UEFA Champions League', teams: 'Real Madrid vs PSG', time: '2025-11-20 18:45', odds: { home: 2.10, draw: 3.40, away: 3.10 } },
    { id: 2, league: 'Premier League', teams: 'Liverpool vs Arsenal', time: '2025-11-21 16:00', odds: { home: 1.95, draw: 3.60, away: 4.00 } },
  ];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>LuxoBet - Painel Administrativo (Demo)</h1>
      <section>
        <h2>Próximos eventos</h2>
        {upcomingMatches.map(m => (
          <div key={m.id} style={{ border: '1px solid #eee', padding: 12, marginBottom: 8, borderRadius: 8 }}>
            <div><strong>{m.league}</strong> — {m.teams}</div>
            <div>Início: {m.time}</div>
            <div>Odds: Casa {m.odds.home} • Empate {m.odds.draw} • Visitante {m.odds.away}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
