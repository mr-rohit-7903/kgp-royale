// src/pages/LeaderboardPage.tsx
import React, { useMemo, useState } from "react";
import { Trophy, Crown, Search, Medal, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

type Player = {
  id: number;
  rank: number;
  name: string;
  clan: string;
  trophies: number;
  avatar: string;
};

const initialData: Player[] = [
  { id: 1, rank: 1, name: "DragonSlayer", clan: "KGP Legends", trophies: 7823, avatar: "👑" },
  { id: 2, rank: 2, name: "ElixirMaster", clan: "Arena Kings", trophies: 7654, avatar: "⚔️" },
  { id: 3, rank: 3, name: "RoyalKnight", clan: "KGP Legends", trophies: 7521, avatar: "🛡️" },
  { id: 4, rank: 4, name: "TowerCrusher", clan: "Battle Lords", trophies: 7398, avatar: "🏰" },
  { id: 5, rank: 5, name: "SpellCaster", clan: "Arena Kings", trophies: 7245, avatar: "✨" },
  { id: 6, rank: 6, name: "GolemMaster", clan: "KGP Legends", trophies: 7112, avatar: "🗿" },
  { id: 7, rank: 7, name: "HogRider99", clan: "Battle Lords", trophies: 6987, avatar: "🐗" },
  { id: 8, rank: 8, name: "PrinceFury", clan: "KGP Legends", trophies: 6854, avatar: "👸" },
];

/**
 * Optionally generate mock players to demonstrate pagination.
 * Remove or replace with real data.
 */
function generateMockPlayers(startId: number, startRank: number, count: number): Player[] {
  const names = ["FrostLord","SpearHero","ArcMage","MinerPro","ZapMaster","InfernoBeast","GhostRider","BoltAce","PaladinX","NightWarden","SkellyKing","BombSquad","Lancer","Warden","Blitz"];
  const clans = ["KGP Legends","Arena Kings","Battle Lords","Storm Clan","Night Watch","Royal Order"];
  const avatars = ["⚡","🛡️","🔥","💎","👑","🗡️","🪄","🧱","🐲","🌪️"];

  const out: Player[] = [];
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const rank = startRank + i;
    const name = `${names[i % names.length]}${(i % 100)}`;
    const clan = clans[i % clans.length];
    const trophies = Math.max(2000, 7600 - rank * 10 - (i % 50) * 3); // some descending trophies
    const avatar = avatars[i % avatars.length];
    out.push({ id, rank, name, clan, trophies, avatar });
  }
  return out;
}

const PAGE_SIZE = 10;

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-accent/20 to-transparent border-accent";
    case 2:
      return "bg-gradient-to-r from-gray-400/20 to-transparent border-gray-400";
    case 3:
      return "bg-gradient-to-r from-orange-600/20 to-transparent border-orange-600";
    default:
      return "";
  }
};


const LeaderboardPage: React.FC = () => {
  // combine initial + mock to have many entries for pagination/demo
  const combinedData = useMemo(() => {
    const generated = generateMockPlayers(9, 9, 52); // generates 52 players (9..60)
    const full = [...initialData, ...generated];
    // sort by rank just in case
    full.sort((a, b) => a.rank - b.rank);
    return full;
  }, []);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // Filtered players according to search query (name or clan)
  const filtered = useMemo(() => {
    if (!query.trim()) return combinedData;
    const q = query.trim().toLowerCase();
    return combinedData.filter(
      (p) => p.name.toLowerCase().includes(q) || p.clan.toLowerCase().includes(q)
    );
  }, [combinedData, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // Clamp page if filtered shrinks
  if (page > totalPages) setPage(totalPages);

  const pageStartIndex = (page - 1) * PAGE_SIZE;
  const pageData = filtered.slice(pageStartIndex, pageStartIndex + PAGE_SIZE);

  const goTo = (p: number) => {
    const next = Math.max(1, Math.min(totalPages, p));
    setPage(next);
    // scroll to top of list for better UX
    const el = document.getElementById("leaderboard-top");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen py-12 bg-background mt-10 ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div id="leaderboard-top" className="text-center mb-8">
          <h1 className="font-title text-4xl md:text-6xl cr-title mb-2">
            <span className="text-foreground">Live</span>{" "}
            <span className="text-primary">Leaderboard</span>
          </h1>
          <p className="text-sm text-muted-foreground">Top players, weekly standings & tournament trophies</p>
        </div>

        {/* Search + stats row */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search player or clan..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                className="pl-12 h-12 bg-secondary border-2 border-border font-body text-base"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Trophy className="w-4 h-4" />
                <span><strong>{filtered.length}</strong> players</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard table */}
        <div className="max-w-4xl mx-auto">
          <div className="cr-card overflow-hidden">
            {/* Header */}
            <div className="bg-secondary px-6 py-3 border-b-2 border-border grid grid-cols-12 gap-4 font-title text-sm text-muted-foreground">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Player</div>
              <div className="col-span-4">Clan</div>
              <div className="col-span-2 text-right"><Trophy className="w-4 h-4 inline" /></div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border">
              {pageData.length === 0 ? (
                <div className="px-6 py-8 text-center text-muted-foreground">No players found.</div>
              ) : (
                pageData.map((player) => (
                  <div
                    key={player.id}
                    className={`px-6 py-4 grid grid-cols-12 gap-4 items-center transition-colors hover:bg-secondary/50 ${getRankStyle(player.rank)}`}
                  >
                    <div className="col-span-1 flex items-center">
                      <span className="font-title text-lg text-muted-foreground">#{player.rank}</span>
                    </div>

                    <div className="col-span-5 flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-foreground">{player.name}</div>
                      </div>
                    </div>

                    <div className="col-span-4">
                      <span className="text-muted-foreground font-body text-sm">{player.clan}</span>
                    </div>

                    <div className="col-span-2 text-right">
                      <span className="font-title text-accent">{player.trophies.toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <button
                className="cr-btn px-3 py-2 disabled:opacity-50"
                onClick={() => goTo(1)}
                disabled={page === 1}
                aria-label="First page"
              >
                «
              </button>
              <button
                className="cr-btn px-3 py-2 disabled:opacity-50"
                onClick={() => goTo(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Page numbers (show a small window around current page) */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                // show if near current page or boundaries
                if (totalPages > 9) {
                  if (p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2)) {
                    return (
                      <button
                        key={p}
                        onClick={() => goTo(p)}
                        className={`px-3 py-1 rounded ${p === page ? "bg-accent/20 border-accent text-accent" : "bg-transparent text-muted-foreground"}`}
                      >
                        {p}
                      </button>
                    );
                  }
                  // show ellipsis for skipped ranges
                  if (p === 2 && page > 4) return <span key="start-ellipsis" className="px-2 text-muted-foreground">…</span>;
                  if (p === totalPages - 1 && page < totalPages - 3) return <span key="end-ellipsis" className="px-2 text-muted-foreground">…</span>;
                  return null;
                }
                return (
                  <button
                    key={p}
                    onClick={() => goTo(p)}
                    className={`px-3 py-1 rounded ${p === page ? "bg-accent/20 border-accent text-accent" : "bg-transparent text-muted-foreground"}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                className="cr-btn px-3 py-2 disabled:opacity-50"
                onClick={() => goTo(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                className="cr-btn px-3 py-2 disabled:opacity-50"
                onClick={() => goTo(totalPages)}
                disabled={page === totalPages}
                aria-label="Last page"
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LeaderboardPage;
