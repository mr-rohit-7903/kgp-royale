
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GiCrossedSwords } from "react-icons/gi";
import { FaCalendar, FaChevronRight, FaCrown, FaHome, FaStar } from "react-icons/fa";


const Upcoming = () => {
  const features = [
    { icon: ({className}: {className?: string}) => <span className={className + " text-xl flex items-center justify-center"}>🏆</span>, text: "Weekly tournaments with exclusive rewards" },
    { icon: ({className}: {className?: string}) => <GiCrossedSwords className={(className || "") + " "} />, text: "1v1 and 2v2 battle formats" },
    { icon: ({className}: {className?: string}) => <FaCrown className={(className || "") + " "} />, text: "Leaderboard rankings and trophies" },
    { icon: ({className}: {className?: string}) => <FaStar className={(className || "") + " "} />, text: "Special seasonal events and challenges" },
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-16 overflow-hidden relative">
      {/* Decorative Geometric Background Shapes */}
      <div className="absolute top-20 left-[-10%] w-96 h-96 bg-[hsl(var(--secondary))] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-10 right-[-5%] w-80 h-80 bg-[hsl(var(--tertiary))] rounded-full mix-blend-multiply filter blur-3xl opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-20 bg-primary rounded-full border-4 border-foreground shadow-hard flex items-center justify-center animate-bounce-subtle">
              <span className="inline-flex items-center justify-center text-inherit">📅</span>
            </div>
          </div>
          <h1 className="font-outfit font-extrabold text-5xl md:text-6xl text-foreground mb-4 drop-shadow-[2px_2px_0px_white]">
            Stay <span className="text-secondary">Tuned!</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-jakarta font-medium max-w-2xl mx-auto bg-white p-4 rounded-xl border-2 border-slate-200 shadow-sm">
            Exciting tournaments are coming your way. Get ready to clash with the best players from IIT Kharagpur!
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border-4 border-foreground rounded-[2rem] shadow-soft-hard p-8 md:p-12 relative overflow-hidden transform hover:-translate-y-1 transition-transform">
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="w-12 h-2 bg-secondary rounded-full border-2 border-foreground" />
                <span className="inline-flex items-center justify-center text-inherit">👑</span>
                <div className="w-12 h-2 bg-tertiary rounded-full border-2 border-foreground" />
              </div>

              <h2 className="font-outfit font-extrabold text-3xl md:text-4xl text-center text-foreground mb-8 uppercase tracking-wide">
                Upcoming <span className="text-primary">Features</span>
              </h2>

              {/* Features List */}
              <ul className="space-y-4 mb-10">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 p-4 bg-muted rounded-xl border-2 border-slate-200 hover:border-foreground hover:shadow-hard transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-foreground shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <feature.icon className="w-6 h-6 text-foreground group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-foreground font-jakarta font-bold text-lg">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* Announcement */}
              <div className="text-center mb-10 p-6 bg-[hsl(var(--tertiary))] rounded-2xl border-4 border-foreground shadow-hard transform rotate-1 hover:rotate-0 transition-transform">
                <p className="text-foreground font-jakarta font-bold text-lg mb-2">
                  Next Tournament:
                </p>
                <p className="text-4xl text-white font-outfit font-black drop-shadow-[2px_2px_0px_black] uppercase tracking-widest">
                  Coming Soon!
                </p>
              </div>

              {/* CTA */}
              <Link to="/" className="block">
                <Button variant="default" size="xl" className="w-full gap-3 text-xl bg-primary">
                  <span className="inline-flex items-center justify-center text-inherit">🏠</span>
                  Go to Home
                  <span className="inline-flex items-center justify-center text-inherit">▶</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom decorations */}
        <div className="mt-16 flex justify-center pb-8">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-primary border-2 border-foreground shadow-sm" />
            <div className="w-6 h-6 rounded-full bg-secondary border-2 border-foreground shadow-sm" />
            <div className="w-8 h-8 rounded-full bg-tertiary border-2 border-foreground shadow-sm animate-bounce-subtle" />
            <div className="w-6 h-6 rounded-full bg-quaternary border-2 border-foreground shadow-sm" />
            <div className="w-4 h-4 rounded-full bg-primary border-2 border-foreground shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
