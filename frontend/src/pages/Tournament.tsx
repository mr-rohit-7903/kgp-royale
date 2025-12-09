import { Trophy, Crown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MatchCard from "@/components/MatchCard";

const Tournament = () => {
  const quarterFinals = [
    { player1: "DragonSlayer", player2: "KingCrusher", winner: 1 as const },
    { player1: "RoyalKnight", player2: "ElixirMaster", winner: 2 as const },
    { player1: "TowerBreaker", player2: "GoblinKing", winner: 1 as const },
    { player1: "SpellCaster", player2: "WarMachine", winner: 2 as const },
  ];

  const semiFinals = [
    { player1: "DragonSlayer", player2: "ElixirMaster", winner: 1 as const },
    { player1: "TowerBreaker", player2: "WarMachine", isLive: true },
  ];

  const finals = [
    { player1: "DragonSlayer", player2: "TBD", time: "8:00 PM" },
  ];

  return (
    <div className="min-h-screen arena-bg pt-24 md:pt-28 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-accent animate-float" />
            <h1 className="font-title text-4xl md:text-5xl lg:text-6xl cr-title text-foreground">
              KGP Royale <span className="text-accent">Championship</span>
            </h1>
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-accent animate-float" />
          </div>
          <p className="text-lg md:text-xl text-muted-foreground">
            Live Tournament Bracket
          </p>
        </div>

        {/* Bracket */}
        <div className="overflow-x-auto pb-4">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 min-w-[300px] lg:min-w-[900px]">
            {/* Quarter Finals */}
            <div className="flex-1">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-xl border-2 border-border">
                  <Crown className="w-4 h-4 text-accent" />
                  <h2 className="font-title text-lg text-foreground">Quarter Finals</h2>
                </div>
              </div>
              <div className="space-y-4">
                {quarterFinals.map((match, i) => (
                  <MatchCard key={i} {...match} />
                ))}
              </div>
            </div>

            {/* Connector */}
            <div className="hidden lg:flex items-center justify-center">
              <ChevronRight className="w-8 h-8 text-accent animate-pulse" />
            </div>

            {/* Semi Finals */}
            <div className="flex-1">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-xl border-2 border-border">
                  <Crown className="w-4 h-4 text-accent" />
                  <h2 className="font-title text-lg text-foreground">Semi Finals</h2>
                </div>
              </div>
              <div className="space-y-4 lg:mt-[72px]">
                {semiFinals.map((match, i) => (
                  <div key={i} className="lg:mb-[88px]">
                    <MatchCard {...match} />
                  </div>
                ))}
              </div>
            </div>

            {/* Connector */}
            <div className="hidden lg:flex items-center justify-center">
              <ChevronRight className="w-8 h-8 text-accent animate-pulse" />
            </div>

            {/* Finals */}
            <div className="flex-1">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-gold-dark/20 px-4 py-2 rounded-xl border-2 border-accent">
                  <Trophy className="w-4 h-4 text-accent" />
                  <h2 className="font-title text-lg text-accent">Finals</h2>
                </div>
              </div>
              <div className="lg:mt-[140px]">
                {finals.map((match, i) => (
                  <div key={i} className="relative">
                    <div className="absolute inset-0 bg-accent/5 rounded-2xl blur-xl" />
                    <MatchCard {...match} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/upcoming">
            <Button variant="gold" size="lg" className="gap-3">
              <Trophy className="w-5 h-5" />
              View Upcoming Tournaments
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
