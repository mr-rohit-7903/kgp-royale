import { Trophy, Gift, BookOpen, Users, Gamepad2 } from "lucide-react";

const benefits = [
  {
    icon: Trophy,
    title: "Competitive Gameplay",
    description: "Weekly & monthly tournaments with intense bracket matches",
    color: "text-accent",
  },
  {
    icon: Gift,
    title: "Rewards & Recognition",
    description: "Win goodies, exclusive badges, and eternal fame",
    color: "text-primary",
  },
  {
    icon: BookOpen,
    title: "Strategy Workshops",
    description: "Master the meta with deck building sessions",
    color: "text-elixir",
  },
  {
    icon: Users,
    title: "Community",
    description: "Meet players, form 2v2 squads, make friends",
    color: "text-neon-pink",
  },
  {
    icon: Gamepad2,
    title: "Fun & Culture",
    description: "Watch parties, esports hype, and good vibes",
    color: "text-accent",
  },
];

const WhyJoinSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-title text-4xl md:text-6xl cr-title mb-4">
            <span className="text-foreground">Why</span>{" "}
            <span className="text-elixir">Join?</span>
          </h2>
          <div className="section-divider w-48 mx-auto" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="cr-card p-6 group hover:border-elixir/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
                </div>
                <div>
                  <h3 className="font-title text-xl text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
