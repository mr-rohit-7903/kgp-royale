import { useEffect, useState } from "react";
import { getTopPlayers } from "@/lib/userService";
import type { UserProfile } from "@/lib/userService";

const podiumFrames = [
  "border-primary bg-primary text-white",
  "border-secondary bg-secondary text-white",
  "border-quaternary bg-quaternary text-white",
];

const positionLabels = ["Champion", "Runner-up", "Third Place"];

const HallOfFameSection = () => {
  const [top3, setTop3] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopPlayers(3)
      .then(setTop3)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tertiary rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="font-outfit font-extrabold text-5xl md:text-6xl text-foreground mb-4 drop-shadow-[2px_2px_0px_white]">
            Hall of <span className="text-secondary">Fame</span>
          </h2>
          <p className="text-muted-foreground font-jakarta font-medium text-xl">Top Leaderboard Warriors</p>
          <div className="w-32 h-4 bg-secondary mx-auto rounded-full border-2 border-foreground shadow-hard mt-6 animate-pulse" />
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-full max-w-xs">
                <div className="bg-card border-4 border-slate-200 rounded-2xl p-8 text-center animate-pulse">
                  <div className="w-28 h-28 rounded-full bg-slate-200 mx-auto mb-6" />
                  <div className="h-6 bg-slate-200 rounded-full w-3/4 mx-auto mb-3" />
                  <div className="h-4 bg-slate-100 rounded-full w-1/2 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Champions Grid */}
        {!loading && top3.length >= 1 && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
            {/* Second Place */}
            {top3[1] && (
              <div className="order-2 md:order-1 md:mt-16 w-full max-w-xs animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
                <ChampionCard player={top3[1]} position={2} frame={podiumFrames[1]} label={positionLabels[1]} />
              </div>
            )}

            {/* First Place */}
            <div className="order-1 md:order-2 w-full max-w-xs z-10 relative md:-mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <ChampionCard player={top3[0]} position={1} frame={podiumFrames[0]} label={positionLabels[0]} />
            </div>

            {/* Third Place */}
            {top3[2] && (
              <div className="order-3 md:mt-24 w-full max-w-xs animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                <ChampionCard player={top3[2]} position={3} frame={podiumFrames[2]} label={positionLabels[2]} />
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!loading && top3.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-jakarta font-bold text-xl">
              No warriors on the leaderboard yet. Be the first! ⚔️
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

interface ChampionCardProps {
  player: UserProfile;
  position: number;
  frame: string;
  label: string;
}

const ChampionCard = ({ player, position, frame, label }: ChampionCardProps) => {
  const isFirst = position === 1;

  return (
    <div className={`relative ${isFirst ? "scale-110" : ""} group`}>

      <div className="bg-card p-8 rounded-2xl border-4 border-foreground shadow-hard transition-transform hover:-translate-y-2 hover:-rotate-2 hover:shadow-hard-hover text-center relative overflow-hidden">
        {/* Avatar */}
        <div className="flex justify-center mb-6 relative z-10">
          <div className={`w-28 h-28 rounded-full border-4 border-foreground shadow-hard flex items-center justify-center overflow-hidden ${frame} group-hover:scale-110 transition-transform duration-300`}>
            {player.favouriteCardIcon ? (
              <img src={player.favouriteCardIcon} alt={player.favouriteCardName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-5xl">{position === 1 ? "👑" : position === 2 ? "⚔️" : "🛡️"}</span>
            )}
          </div>
        </div>

        {/* Name & Title */}
        <div className="mb-6 relative z-10">
          <h3 className="font-outfit font-extrabold text-2xl text-foreground mb-2 truncate">{player.playerName}</h3>
          <p className="text-sm font-jakarta font-bold text-muted-foreground uppercase tracking-wider bg-muted py-1 px-3 rounded-full border-2 border-slate-200 inline-block">
            {label}
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-4 text-base relative z-10 font-outfit font-bold bg-muted py-2 px-4 rounded-xl border-2 border-slate-200">
          <div className="flex items-center gap-1">
            <span>🏆</span>
            <span className="text-foreground">{player.trophies.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⚔️</span>
            <span className="text-foreground">{player.wins.toLocaleString()}</span>
          </div>
        </div>

        {/* Hall badge */}
        {player.hall && (
          <div className="mt-4 relative z-10">
            <span className="text-xs font-jakarta font-bold text-muted-foreground bg-slate-100 border border-slate-200 px-2 py-1 rounded-full">
              🏛️ {player.hall}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HallOfFameSection;
