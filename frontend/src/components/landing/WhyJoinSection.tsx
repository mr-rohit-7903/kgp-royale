import { FaBookOpen, FaGamepad, FaGift, FaUsers } from "react-icons/fa";


const benefits = [
  {
    icon: ({className}: {className?: string}) => <span className={className + " flex items-center justify-center text-2xl"}>🏆</span>,
    title: "Competitive Gameplay",
    description: "Weekly & monthly tournaments with intense bracket matches",
    color: "bg-[hsl(var(--tertiary))]",
  },
  {
    icon: ({className}: {className?: string}) => <FaGift className={(className || "") + " "} />,
    title: "Rewards & Recognition",
    description: "Win goodies, exclusive badges, and eternal fame",
    color: "bg-[hsl(var(--primary))]",
  },
  {
    icon: ({className}: {className?: string}) => <FaBookOpen className={(className || "") + " "} />,
    title: "Strategy Workshops",
    description: "Master the meta with deck building sessions",
    color: "bg-[hsl(var(--secondary))]",
  },
  {
    icon: ({className}: {className?: string}) => <FaUsers className={(className || "") + " "} />,
    title: "Community",
    description: "Meet players, form 2v2 squads, make friends",
    color: "bg-[hsl(var(--quaternary))]",
  },
  {
    icon: ({className}: {className?: string}) => <FaGamepad className={(className || "") + " "} />,
    title: "Fun & Culture",
    description: "Watch parties, esports hype, and good vibes",
    color: "bg-[hsl(var(--tertiary))]",
  },
];

const WhyJoinSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[hsl(var(--primary))] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-pulse" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[hsl(var(--secondary))] rounded-full mix-blend-multiply filter blur-[120px] opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="font-outfit font-black text-6xl md:text-8xl text-foreground mb-6 drop-shadow-[4px_4px_0px_white]">
            THE <span className="text-primary">ARENA</span> AWAITS
          </h2>
          <p className="font-jakarta font-bold text-muted-foreground text-xl max-w-2xl mx-auto mb-8">
            Join the most elite Clash Royale community at IIT Kharagpur. Level up your game, make memories, and win big.
          </p>
          <div className="w-48 h-5 bg-primary mx-auto rounded-full border-4 border-foreground shadow-hard" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group bg-card border-4 border-foreground rounded-[2.5rem] shadow-soft-hard p-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-hard-hover hover:-translate-y-2 ${
                index % 3 === 1 ? "lg:translate-y-8" : ""
              }`}
            >
              <div className={`w-24 h-24 rounded-[2rem] ${benefit.color} border-4 border-foreground shadow-hard flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <benefit.icon className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="font-outfit font-black text-3xl text-foreground mb-4 tracking-tight">
                {benefit.title}
              </h3>
              
              <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-jakarta font-bold text-muted-foreground leading-snug">
                {benefit.description}
              </div>
            </div>
          ))}

          {/* Bonus CTA card */}
          <div className="hidden lg:flex bg-primary border-4 border-foreground rounded-[2.5rem] shadow-soft-hard p-10 flex-col items-center justify-center text-center group hover:shadow-hard-hover hover:-translate-y-2 lg:translate-y-8 transition-all">
            <div className="text-6xl mb-6 transform group-hover:scale-125 transition-transform">👑</div>
            <h3 className="font-outfit font-black text-3xl text-white mb-2">ARE YOU READY?</h3>
            <p className="text-white/80 font-bold text-sm uppercase tracking-widest">Join 500+ Warriors</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
