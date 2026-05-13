import { FaCrown, FaStar } from "react-icons/fa";


const champions = [
  {
    name: "DragonSlayer",
    title: "Season 8 Champion",
    avatar: "👑",
    frame: "border-primary bg-primary text-white",
    trophies: 8234,
    wins: 156,
  },
  {
    name: "ElixirMaster",
    title: "Season 8 Runner-up",
    avatar: "⚔️",
    frame: "border-secondary bg-secondary text-white",
    trophies: 7823,
    wins: 142,
  },
  {
    name: "RoyalKnight",
    title: "Season 8 Third",
    avatar: "🛡️",
    frame: "border-quaternary bg-quaternary text-white",
    trophies: 7654,
    wins: 138,
  },
];

const HallOfFameSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tertiary rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-outfit font-extrabold text-5xl md:text-6xl text-foreground mb-4 drop-shadow-[2px_2px_0px_white]">
            Hall of <span className="text-secondary">Fame</span>
          </h2>
          <p className="text-muted-foreground font-jakarta font-medium text-xl">Past Season Champions</p>
          <div className="w-32 h-4 bg-secondary mx-auto rounded-full border-2 border-foreground shadow-hard mt-6" />
        </div>

        {/* Champions Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
          {/* Second Place */}
          <div className="order-2 md:order-1 md:mt-16 w-full max-w-xs">
            <ChampionCard champion={champions[1]} position={2} />
          </div>

          {/* First Place */}
          <div className="order-1 md:order-2 w-full max-w-xs z-10 relative md:-mt-8">
            <ChampionCard champion={champions[0]} position={1} />
          </div>

          {/* Third Place */}
          <div className="order-3 md:mt-24 w-full max-w-xs">
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
    <div className={`relative ${isFirst ? 'scale-110' : ''} group`}>
      {/* ({className}: {className?: string}) => <FaCrown className={(className || "") + " "} /> for first place */}
      {isFirst && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 animate-bounce-subtle">
          <span className="inline-flex items-center justify-center text-inherit">👑</span>
        </div>
      )}

      <div className={`bg-card p-8 rounded-2xl border-4 border-foreground shadow-hard transition-transform hover:-translate-y-2 hover:-rotate-2 hover:shadow-hard-hover text-center relative overflow-hidden`}>
        {/* Avatar */}
        <div className="flex justify-center mb-6 relative z-10">
          <div className={`w-28 h-28 rounded-full border-4 border-foreground shadow-hard flex items-center justify-center text-5xl ${champion.frame} group-hover:scale-110 transition-transform`}>
            {champion.avatar}
          </div>
        </div>

        {/* Name & Title */}
        <div className="mb-6 relative z-10">
          <h3 className="font-outfit font-extrabold text-2xl text-foreground mb-2">{champion.name}</h3>
          <p className="text-sm font-jakarta font-bold text-muted-foreground uppercase tracking-wider bg-muted py-1 px-3 rounded-full border-2 border-slate-200 inline-block">{champion.title}</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-4 text-base relative z-10 font-outfit font-bold bg-muted py-2 px-4 rounded-xl border-2 border-slate-200">
          <div className="flex items-center gap-1">
            <span>🏆</span>
            <span className="text-foreground">{champion.trophies}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center justify-center text-inherit">⭐</span>
            <span className="text-foreground">{champion.wins}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallOfFameSection;
