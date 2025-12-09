import { Trophy, Crown, Swords, TrendingUp, Gift } from "lucide-react";

const highlights = [
  { icon: Trophy, text: "Weekly Tournaments", color: "text-accent" },
  { icon: Crown, text: "College Clan Battles", color: "text-primary" },
  { icon: Swords, text: "Inter-college Cups", color: "text-neon-pink" },
  { icon: TrendingUp, text: "Seasonal Leaderboards", color: "text-elixir" },
  { icon: Gift, text: "Prizes, Badges & Rewards", color: "text-accent" },
];

const AboutSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-title text-4xl md:text-6xl cr-title mb-4">
            <span className="text-foreground">About</span>{" "}
            <span className="text-accent">KGP Royale</span>
          </h2>
          <div className="section-divider w-48 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Description Card */}
          <div className="cr-card p-8 mb-12">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center font-body">
              <span className="text-accent font-semibold">KGP Royale</span> is the official Clash Royale club of{" "}
              <span className="text-primary font-semibold">IIT Kharagpur</span>, bringing together students who love 
              strategy, esports, and competitive gaming. Our arena welcomes all — from{" "}
              <span className="text-foreground">beginners</span> to{" "}
              <span className="text-accent">trophy hunters</span>.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="cr-card p-6 text-center group hover:border-accent/50 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  <div className={`w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                </div>
                <p className="font-body font-semibold text-foreground text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
