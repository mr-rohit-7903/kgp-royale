import { FaChartLine, FaCrown, FaGift } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";


const highlights = [
  { icon: ({className}: {className?: string}) => <span className={className + " text-2xl flex items-center justify-center"}>🏆</span>, text: "Weekly Tournaments", color: "bg-[hsl(var(--tertiary))]" },
  { icon: ({className}: {className?: string}) => <FaCrown className={(className || "") + " "} />, text: "Clan Wars", color: "bg-[hsl(var(--primary))]" },
  { icon: ({className}: {className?: string}) => <GiCrossedSwords className={(className || "") + " "} />, text: "Inter-Hall Tournaments", color: "bg-[hsl(var(--secondary))]" },
  { icon: ({className}: {className?: string}) => <FaChartLine className={(className || "") + " "} />, text: "Leaderboards", color: "bg-[hsl(var(--quaternary))]" },
  { icon: ({className}: {className?: string}) => <FaGift className={(className || "") + " "} />, text: "Prizes & Rewards", color: "bg-[hsl(var(--primary))]" },
];

const AboutSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-outfit font-extrabold text-5xl md:text-6xl text-foreground mb-4 drop-shadow-[2px_2px_0px_white]">
            About <span className="text-primary">KGP Royale</span>
          </h2>
          <div className="w-32 h-4 bg-tertiary mx-auto rounded-full border-2 border-foreground shadow-hard" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border-4 border-foreground rounded-2xl shadow-soft-hard p-8 mb-16 transform -rotate-1 hover:rotate-0 transition-transform">
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed text-center font-jakarta">
              <span className="text-primary font-bold">KGP Royale</span> is the official Clash Royale club of{" "}
              <span className="text-secondary font-bold">IIT Kharagpur</span>, bringing together students who love 
              strategy, esports, and competitive gaming. Our arena welcomes all.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-card border-2 border-foreground rounded-xl shadow-hard p-6 text-center group hover:-translate-y-1 hover:shadow-hard-hover transition-all flex flex-col items-center"
              >
                <div className={`w-16 h-16 rounded-full ${item.color} border-2 border-foreground shadow-hard flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform mb-4`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <p className="font-jakarta font-bold text-foreground text-sm uppercase tracking-wide">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
