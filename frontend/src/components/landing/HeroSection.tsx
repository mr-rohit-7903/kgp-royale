
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaBolt, FaCrown } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";



const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden pt-10">
      {/* Playful Decorative Background Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[hsl(var(--secondary))] rounded-full border-4 border-foreground shadow-hard animate-bounce-subtle" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-[hsl(var(--tertiary))] rounded-lg rotate-12 border-4 border-foreground shadow-hard animate-float" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[hsl(var(--primary))] rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT: Text content */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 lg:pl-10">
            <h1 className="font-outfit font-extrabold text-5xl md:text-8xl text-foreground drop-shadow-[4px_4px_0px_white] mb-2 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-500">
              KGP <span className="text-primary">ROYALE</span>
            </h1>
            <h2 className="font-outfit font-bold text-3xl md:text-4xl text-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
              Technology clash club
            </h2>

            {/* Playful Divider */}
            <div className="flex justify-center lg:justify-start mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <div className="w-32 h-4 bg-tertiary rounded-full border-2 border-foreground shadow-hard animate-pulse" />
              <div className="w-8 h-4 bg-secondary rounded-full border-2 border-foreground shadow-hard ml-2 animate-pulse [animation-delay:0.3s]" />
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-foreground shadow-hard ml-2 animate-pulse [animation-delay:0.6s]" />
            </div>

            <p className="font-outfit font-bold text-xl md:text-2xl text-primary mb-4 uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
              The Clash Begins Here
            </p>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 font-jakarta font-medium leading-relaxed bg-white border-2 border-foreground rounded-xl p-4 shadow-soft-hard transform -rotate-1 hover:rotate-0 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              Join the warriors of{" "}
              <span className="text-primary font-bold">IIT Kharagpur</span>{" "}
              in the ultimate strategy arena. Compete in tournaments, climb
              leaderboards, and become the next{" "}
              <span className="text-secondary font-bold">legend</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <Button
                variant="gold"
                size="lg"
                className="font-outfit text-lg px-8 py-6 group"
                onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="inline-flex items-center justify-center text-inherit group-hover:rotate-12 transition-transform duration-300">👑</span>
                Join The Clan
              </Button>
              <Link to="/upcoming">
                <Button
                  variant="royal"
                  size="lg"
                  className="font-outfit text-lg px-8 py-6 group"
                >
                  <span className="inline-flex items-center justify-center text-inherit group-hover:rotate-12 transition-transform duration-300">⚔️</span>
                  View Tournament
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-outfit text-lg px-8 py-6 group bg-white"
                >
                  <span className="inline-flex items-center justify-center text-inherit group-hover:rotate-12 transition-transform duration-300">✨</span>
                  Leaderboard
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT: Hero Graphic */}
          <div className="relative flex justify-center mt-10 lg:mt-0 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
             <div className="w-full max-w-sm aspect-square bg-white border-4 border-foreground rounded-[3rem] shadow-soft-hard overflow-hidden relative flex items-center justify-center group hover:shadow-hard-hover transition-all duration-500">
               <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted-foreground))_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20" />
               <img src="/assets/Hero.png" alt="KGP Royale Hero" className="relative z-10 w-4/5 h-4/5 object-contain transform scale-110 -rotate-3 group-hover:scale-100 group-hover:rotate-0 transition-transform duration-500" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
