import { Crown, Trophy, Star } from "lucide-react";

const champions = [
  {
    name: "DragonSlayer",
    title: "Season 8 Champion",
    avatar: "👑",
    frame: "champion-frame-gold",
    trophies: 8234,
    wins: 156,
  },
  {
    name: "ElixirMaster",
    title: "Season 8 Runner-up",
    avatar: "⚔️",
    frame: "champion-frame-silver",
    trophies: 7823,
    wins: 142,
  },
  {
    name: "RoyalKnight",
    title: "Season 8 Third",
    avatar: "🛡️",
    frame: "champion-frame-bronze",
    trophies: 7654,
    wins: 138,
  },
];

const HallOfFameSection = () => {
  return (
    <section className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-title text-4xl md:text-6xl cr-title mb-4">
            <span className="text-foreground">Hall of</span>{" "}
            <span className="text-accent">Fame</span>
          </h2>
          <p className="text-muted-foreground font-body">Past Season Champions</p>
          <div className="section-divider w-48 mx-auto mt-4" />
        </div>

        {/* Champions Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
          {/* Second Place */}
          <div className="order-2 md:order-1 md:mt-12">
            <ChampionCard champion={champions[1]} position={2} />
          </div>

          {/* First Place */}
          <div className="order-1 md:order-2">
            <ChampionCard champion={champions[0]} position={1} />
          </div>

          {/* Third Place */}
          <div className="order-3 md:mt-12">
            <ChampionCard champion={champions[2]} position={3} />
          </div>
        </div>
      </div>
    </section>
  );
};

interface ChampionCardProps {
  champion: typeof champions[0];
  position: number;
}

const ChampionCard = ({ champion, position }: ChampionCardProps) => {
  const isFirst = position === 1;

  return (
    <div className={`relative ${isFirst ? 'scale-110' : ''}`}>
      {/* Crown for first place */}
      {isFirst && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
          <Crown className="w-12 h-12 text-accent animate-float drop-shadow-[0_0_15px_hsl(var(--gold)/0.5)]" />
        </div>
      )}

      <div className={`troop-card p-6 w-64 ${champion.frame}`}>
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-navy flex items-center justify-center text-5xl ${champion.frame}`}>
            {champion.avatar}
          </div>
        </div>

        {/* Name & Title */}
        <div className="text-center mb-4">
          <h3 className="font-title text-xl text-foreground mb-1">{champion.name}</h3>
          <p className="text-sm text-muted-foreground font-body">{champion.title}</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="text-foreground font-semibold">{champion.trophies}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-foreground font-semibold">{champion.wins} wins</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallOfFameSection;
