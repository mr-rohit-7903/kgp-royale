import { Crown, Shield, Swords, Camera, Megaphone } from "lucide-react";

const teamMembers = [
  {
    name: "Arjun Sharma",
    role: "Captain",
    icon: Crown,
    avatar: "👑",
    color: "border-accent",
    bgGlow: "shadow-glow-gold",
  },
  {
    name: "Priya Patel",
    role: "Co-Captain",
    icon: Shield,
    avatar: "🛡️",
    color: "border-primary",
    bgGlow: "shadow-glow-blue",
  },
  {
    name: "Rahul Kumar",
    role: "Tournament Officer",
    icon: Swords,
    avatar: "⚔️",
    color: "border-elixir",
    bgGlow: "",
  },
  {
    name: "Sneha Reddy",
    role: "Media Head",
    icon: Camera,
    avatar: "📸",
    color: "border-neon-pink",
    bgGlow: "",
  },
  {
    name: "Vikram Singh",
    role: "PR & Outreach",
    icon: Megaphone,
    avatar: "📢",
    color: "border-accent",
    bgGlow: "",
  },
];

const TeamSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-title text-4xl md:text-6xl cr-title mb-4">
            <span className="text-foreground">Our</span>{" "}
            <span className="text-accent">Team</span>
          </h2>
          <div className="section-divider w-48 mx-auto" />
        </div>

        {/* Team Grid - styled like troop cards */}
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`troop-card w-48 p-5 text-center ${member.color} ${member.bgGlow}`}
            >
              {/* Avatar */}
              <div className="relative mb-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-secondary to-navy flex items-center justify-center text-4xl border-4 border-current">
                  {member.avatar}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-secondary px-3 py-1 rounded-full border-2 border-current">
                  <member.icon className="w-4 h-4" />
                </div>
              </div>

              {/* Info */}
              <h3 className="font-title text-lg text-foreground mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground font-body">{member.role}</p>

              {/* Elixir cost style badge */}
              <div className="mt-3 inline-flex items-center gap-1 bg-elixir/20 px-2 py-1 rounded-full">
                <div className="w-4 h-4 rounded-full bg-elixir" />
                <span className="text-xs font-bold text-elixir">{index + 3}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
