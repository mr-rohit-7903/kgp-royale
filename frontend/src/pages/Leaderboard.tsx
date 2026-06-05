import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getTopPlayers, UserProfile } from "@/lib/userService";

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-[hsl(var(--tertiary))] text-foreground border-b-2 border-foreground";
    case 2:
      return "bg-[hsl(var(--secondary))] text-white border-b-2 border-foreground";
    case 3:
      return "bg-[hsl(var(--quaternary))] text-white border-b-2 border-foreground";
    default:
      return "border-b-2 border-slate-200 hover:bg-muted";
  }
};

const PAGE_SIZE = 15;

const LeaderboardPage: React.FC = () => {
  const [players, setPlayers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Fetch a larger set for the standalone page
        const data = await getTopPlayers(100);
        setPlayers(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const totalPages = Math.max(1, Math.ceil(players.length / PAGE_SIZE));
  const pageStartIndex = (page - 1) * PAGE_SIZE;
  const pageData = players.slice(pageStartIndex, pageStartIndex + PAGE_SIZE);

  const goTo = (p: number) => {
    const next = Math.max(1, Math.min(totalPages, p));
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--tertiary))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(var(--secondary))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse [animation-delay:1s]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="font-outfit font-extrabold text-6xl md:text-8xl text-foreground mb-4 drop-shadow-[4px_4px_0px_white]">
            Hall of <span className="text-primary">Legends</span>
          </h1>
          <p className="text-muted-foreground font-jakarta font-medium text-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
            The elite warriors of IIT Kharagpur. Every trophy earned is a step towards immortality.
          </p>
          <div className="w-40 h-4 bg-primary mx-auto rounded-full border-2 border-foreground shadow-hard mt-8 animate-pulse" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Leaderboard Table */}
          <div className="bg-card border-4 border-foreground rounded-[2rem] shadow-soft-hard overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            {/* Table Header */}
            <div className="bg-white px-8 py-6 border-b-4 border-foreground grid grid-cols-12 gap-4 font-outfit font-bold text-sm text-muted-foreground uppercase tracking-wider">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Player</div>
              <div className="col-span-2">Clan</div>
              <div className="col-span-3">Hall</div>
              <div className="col-span-2 text-right">
                <span className="inline-flex items-center gap-1">
                  <span>🏆</span> Trophies
                </span>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border bg-white">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="px-8 py-8 animate-pulse flex gap-6 items-center">
                    <div className="w-10 h-10 bg-slate-100 rounded-full border-2 border-slate-200" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-slate-100 rounded w-1/4" />
                      <div className="h-4 bg-slate-50 rounded w-1/6" />
                    </div>
                  </div>
                ))
              ) : pageData.length === 0 ? (
                <div className="px-8 py-20 text-center animate-in fade-in">
                  <div className="text-6xl mb-6">🏜️</div>
                  <h3 className="font-outfit font-bold text-3xl mb-2">The Arena Awaits</h3>
                  <p className="text-muted-foreground font-jakarta font-medium">No warriors have registered for this season yet.</p>
                  <Link to="/register" className="mt-6 inline-block">
                    <Button variant="gold" size="lg">Be the First</Button>
                  </Link>
                </div>
              ) : (
                pageData.map((player, index) => {
                  const actualRank = pageStartIndex + index + 1;
                  return (
                    <div
                      key={player.uid}
                      style={{ animationDelay: `${index * 40}ms` }}
                      className={`px-8 py-6 grid grid-cols-12 gap-4 items-center transition-all duration-300 ${getRankStyle(actualRank)} animate-in fade-in slide-in-from-left-4`}
                    >
                      <div className="col-span-1 flex items-center">
                        <span className="font-outfit font-black text-2xl opacity-50">#{actualRank}</span>
                      </div>
                      <Link 
                        to={`/profile/${player.playerTag.replace("#", "")}`}
                        className="col-span-4 flex items-center gap-4 group cursor-pointer hover:translate-x-2 transition-transform"
                      >
                        <div className="w-14 h-14 flex-shrink-0 bg-white rounded-full border-2 border-foreground shadow-hard overflow-hidden flex items-center justify-center bg-gradient-to-br from-white to-slate-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          {player.favouriteCardIcon ? (
                            <img src={player.favouriteCardIcon} alt={player.favouriteCardName} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl">🛡️</span>
                          )}
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="font-bold font-jakarta text-xl truncate group-hover:text-primary transition-colors">{player.playerName}</span>
                          <span className="text-xs font-bold text-primary uppercase tracking-tighter">{player.playerTag}</span>
                        </div>
                      </Link>
                      <div className="col-span-2">
                        <span className="font-jakarta font-bold text-sm truncate opacity-80">{player.clanName || "No Clan"}</span>
                      </div>
                      <div className="col-span-3">
                        <span className="font-jakarta font-medium text-sm truncate opacity-80" title={player.hall}>
                          {player.hall || "General"}
                        </span>
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="font-outfit font-black text-2xl text-foreground">
                          {player.trophies.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <Button
                variant="outline"
                className="w-14 h-14 rounded-full border-4 border-foreground shadow-hard bg-white hover:bg-tertiary hover:scale-105 hover:shadow-hard-hover active:translate-y-0.5 active:shadow-hard transition-all duration-300"
                onClick={() => goTo(page - 1)}
                disabled={page === 1}
              >
                ◀
              </Button>
              
              <div className="flex items-center gap-2 bg-white border-4 border-foreground rounded-full px-6 py-2 shadow-hard font-outfit font-bold text-xl">
                <span className="text-primary">{page}</span>
                <span className="opacity-30">/</span>
                <span>{totalPages}</span>
              </div>

              <Button
                variant="outline"
                className="w-14 h-14 rounded-full border-4 border-foreground shadow-hard bg-white hover:bg-tertiary hover:scale-105 hover:shadow-hard-hover active:translate-y-0.5 active:shadow-hard transition-all duration-300"
                onClick={() => goTo(page + 1)}
                disabled={page === totalPages}
              >
                ▶
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default LeaderboardPage;
