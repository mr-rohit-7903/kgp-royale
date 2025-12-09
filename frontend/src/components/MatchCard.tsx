import { Crown, Shield } from "lucide-react";

interface MatchCardProps {
  player1: string;
  player2: string;
  time?: string;
  winner?: 1 | 2;
  isLive?: boolean;
}

const MatchCard = ({ player1, player2, time, winner, isLive }: MatchCardProps) => {
  return (
    <div className="cr-card p-4 relative overflow-hidden">
      {/* Live indicator */}
      {isLive && (
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-title text-red-400">LIVE</span>
        </div>
      )}

      {/* Players */}
      <div className="flex items-center justify-between gap-4">
        {/* Player 1 */}
        <div className={`flex-1 text-center p-3 rounded-xl ${winner === 1 ? "bg-accent/20 border-2 border-accent" : "bg-secondary/30"}`}>
          <Shield className={`w-6 h-6 mx-auto mb-2 ${winner === 1 ? "text-accent" : "text-primary"}`} />
          <p className={`font-title text-sm truncate ${winner === 1 ? "text-accent" : "text-foreground"}`}>
            {player1}
          </p>
          {winner === 1 && <Crown className="w-4 h-4 mx-auto mt-1 text-accent animate-float" />}
        </div>

        {/* VS */}
        <div className="flex flex-col items-center">
          <span className="font-title text-xl neon-vs">VS</span>
          {time && (
            <span className="text-xs text-muted-foreground mt-1">{time}</span>
          )}
        </div>

        {/* Player 2 */}
        <div className={`flex-1 text-center p-3 rounded-xl ${winner === 2 ? "bg-accent/20 border-2 border-accent" : "bg-secondary/30"}`}>
          <Shield className={`w-6 h-6 mx-auto mb-2 ${winner === 2 ? "text-accent" : "text-primary"}`} />
          <p className={`font-title text-sm truncate ${winner === 2 ? "text-accent" : "text-foreground"}`}>
            {player2}
          </p>
          {winner === 2 && <Crown className="w-4 h-4 mx-auto mt-1 text-accent animate-float" />}
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </div>
  );
};

export default MatchCard;
