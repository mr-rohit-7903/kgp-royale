
import { useEffect, useState } from "react";
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


const LeaderboardSection = () => {
  const [players, setPlayers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getTopPlayers(8);
        setPlayers(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-outfit font-extrabold text-5xl md:text-6xl text-foreground mb-4 drop-shadow-[2px_2px_0px_white]">
            Live <span className="text-primary">Leaderboard</span>
          </h2>
          <div className="w-32 h-4 bg-primary mx-auto rounded-full border-2 border-foreground shadow-hard mt-4" />
        </div>

        <div className="max-w-3xl mx-auto">

          {/* Leaderboard */}
          <div className="bg-card border-4 border-foreground rounded-[2rem] shadow-soft-hard overflow-hidden">
            {/* Header */}
            <div className="bg-white px-4 md:px-6 py-4 border-b-4 border-foreground grid grid-cols-12 gap-2 md:gap-4 font-outfit font-bold text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              <div className="col-span-2 md:col-span-1">Rank</div>
              <div className="col-span-7 md:col-span-4">Player</div>
              <div className="hidden md:block md:col-span-2">Clan</div>
              <div className="hidden md:block md:col-span-3">Hall</div>
              <div className="col-span-3 md:col-span-2 text-right">
                <span>🏆</span>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border bg-white">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="px-6 py-6 animate-pulse flex gap-4 items-center">
                    <div className="w-8 h-8 bg-slate-100 rounded-full border-2 border-slate-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-100 rounded w-1/3" />
                      <div className="h-3 bg-slate-50 rounded w-1/4" />
                    </div>
                  </div>
                ))
              ) : players.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-muted-foreground font-jakarta font-bold text-lg mb-2">The Arena is Empty!</p>
                  <p className="text-sm text-muted-foreground opacity-70">Be the first to join the leaderboard.</p>
                </div>
              ) : (
                players.map((player, index) => (
                  <div
                    key={player.uid}
                    className={`px-4 md:px-6 py-4 grid grid-cols-12 gap-2 md:gap-4 items-center transition-colors ${getRankStyle(index + 1)}`}
                  >
                    <div className="col-span-2 md:col-span-1 flex items-center">
                      <span className="font-outfit font-black text-lg md:text-xl opacity-50">#{index + 1}</span>
                    </div>
                    <Link 
                      to={`/profile/${player.playerTag.replace("#", "")}`}
                      className="col-span-7 md:col-span-4 flex items-center gap-2 md:gap-3 group cursor-pointer hover:translate-x-1 transition-transform"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-white rounded-full border-2 border-foreground shadow-sm overflow-hidden flex items-center justify-center bg-gradient-to-br from-white to-slate-50 group-hover:scale-105 transition-transform">
                        {player.favouriteCardIcon ? (
                          <img src={player.favouriteCardIcon} alt={player.favouriteCardName} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-lg md:text-xl">🛡️</span>
                        )}
                      </div>
                      <span className="font-bold font-jakarta text-sm md:text-lg truncate group-hover:text-primary transition-colors">{player.playerName}</span>
                    </Link>
                    <div className="hidden md:block md:col-span-2">
                      <span className="font-jakarta font-medium text-sm truncate opacity-80">{player.clanName || "No Clan"}</span>
                    </div>
                    <div className="hidden md:block md:col-span-3">
                      <span className="font-jakarta font-medium text-sm truncate opacity-80" title={player.hall}>{player.hall || "General"}</span>
                    </div>
                    <div className="col-span-3 md:col-span-2 text-right">
                      <span className="font-outfit font-extrabold text-lg md:text-xl">{player.trophies.toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <Link to="/leaderboard">
              <Button
                size="lg"
                variant="default"
                className="font-outfit text-xl px-10 py-6 group bg-primary"
              >
                <span>🏆</span>
                <span className="ml-2">View Full Board</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
