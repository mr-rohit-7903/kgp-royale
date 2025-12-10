import { Crown, Swords, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PekkaCanvas from "../models/Pekka"; 
import GolemCanvas from "../models/Golem"; 

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background image from public/herobg.png */}
        <div
          className="absolute inset-0 bg-center bg-cover opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('/herobg.png')` }}
        />
        {/* Elixir glow effects */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-elixir/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Split hero into text + 3D model */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT: Text content */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 pl-10">

            {/* Main Title */}
            <h1 className="font-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl cr-title mb-[-10px]">
              <span className="text-foreground">KGP</span>{" "}
              <span className="text-accent">ROYALE</span>
            </h1>
            <h2 className="text-3xl sm-4xl cr-title-bottom mb-4">Technology clash club</h2>

            {/* Elixir bar decoration */}
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="w-64 md:w-80 h-3 bg-secondary rounded-full overflow-hidden border-2 border-elixir/50">
                <div className="elixir-bar h-full w-3/4" /> 
              </div>
            </div>

            {/* Tagline */}
            <p className="font-title text-xl md:text-2xl text-accent mb-4 tracking-wide">
              The Clash Begins Here
            </p>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 font-body leading-relaxed">
              Join the warriors of{" "}
              <span className="text-primary font-semibold">IIT Kharagpur</span>{" "}
              in the ultimate strategy arena. Compete in tournaments, climb
              leaderboards, and become the next{" "}
              <span className="text-accent font-semibold">legend</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              <Link to="/upcoming">
                <Button
                  variant="gold"
                  size="lg"
                  className="font-title text-lg px-8 py-6 group"
                >
                  <Crown className="mr-2 w-5 h-5 group-hover:animate-bounce" />
                  Join The Clan
                </Button>
              </Link>
              <Link to="/tournament">
                <Button
                  variant="royal"
                  size="lg"
                  className="font-title text-lg px-8 py-6 group"
                >
                  <Swords className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  View Tournament
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="font-title text-lg px-8 py-6 border-elixir text-elixir hover:bg-elixir/10 group"
              >
                <Zap className="mr-2 w-5 h-5 group-hover:animate-pulse" />
                Leaderboard
              </Button>
            </div>
          </div>

          {/* RIGHT: 3D P.E.K.K.A */}
          <div className="relative">
            <div className="absolute -inset-8 bg-accent/10 blur-3xl rounded-full pointer-events-none" />
            <GolemCanvas />
          </div>
        </div>
      </div>

      {/* Bottom arena decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-dark to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
