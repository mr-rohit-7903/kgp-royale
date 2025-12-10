import { Crown, Shield, Swords, Camera, Megaphone } from "lucide-react";

// ---------- DATA WITHOUT border/glow ----------
const founders = [
  { name: "Arjun Sharma", role: "Founder & Captain", icon: Crown, avatar: "👑" },
  { name: "Priya Patel", role: "Co-Founder", icon: Shield, avatar: "🛡️" },
  { name: "Dev Malhotra", role: "Co-Founder & Media Lead", icon: Camera, avatar: "📸" },
];

const members = [
  { name: "Rahul Kumar", role: "Tournament Officer", icon: Swords, avatar: "⚔️" },
  { name: "Sneha Reddy", role: "Media Head", icon: Camera, avatar: "📸" },
  { name: "Vikram Singh", role: "PR & Outreach", icon: Megaphone, avatar: "📢" },
  { name: "Harsh Shukla", role: "Tech & Website", icon: Shield, avatar: "💻" },
  { name: "Kritika Patil", role: "Creative Team", icon: Crown, avatar: "✨" },
];

// ---------- CARD COMPONENT ----------
const Card = ({ member, index, type }) => {
  const Icon = member.icon;

  // ⭐ FOUNDERS
  const isFounder = type === "founder";

  // Automatically assign border + glow
  const borderClass = isFounder ? "border-accent" : "border-elixir";
  const glowClass = isFounder ? "hover:shadow-glow-gold" : "hover:shadow-glow-elixir";

  return (
    <div
      className={`troop-card w-48 p-5 text-center border-2 rounded-2xl bg-secondary 
      ${borderClass} ${glowClass} transition-all`}
    >
      {/* Avatar */}
      <div className="relative mb-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-secondary to-navy
        flex items-center justify-center text-4xl border-4 border-current">
          {member.avatar}
        </div>

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-secondary 
        px-3 py-1 rounded-full border-2 border-current">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Name & Role */}
      <h3 className="font-title text-lg text-foreground">{member.name}</h3>
      <p className="text-sm text-muted-foreground font-body">{member.role}</p>

      {/* Elixir badge */}
      <div className="mt-3 inline-flex items-center gap-1 bg-elixir/20 px-2 py-1 rounded-full">
        <div className="w-4 h-4 rounded-full bg-elixir" />
        <span className="text-xs font-bold text-elixir">{index + 3}</span>
      </div>
    </div>
  );
};

// ---------- TEAM SECTION ----------
const TeamSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">

        {/* FOUNDERS */}
        <div className="text-center mb-12">
          <h2 className="font-title text-3xl md:text-5xl cr-title mb-4">
            <span className="text-accent">Founders</span>
          </h2>
          <div className="section-divider w-40 mx-auto" />
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto mb-20">
          {founders.map((f, i) => (
            <Card key={i} member={f} index={i} type="founder" />
          ))}
        </div>

        {/* MEMBERS */}
        <div className="text-center mb-12">
          <h2 className="font-title text-3xl md:text-5xl cr-title mb-4">
            Core <span className="text-primary">Members</span>
          </h2>
          <div className="section-divider w-40 mx-auto" />
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {members.map((m, i) => (
            <Card key={i} member={m} index={i} type="member" />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
