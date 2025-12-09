import { Calendar, Trophy, Swords, Crown, Star, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Upcoming = () => {
  const features = [
    { icon: Trophy, text: "Weekly tournaments with exclusive rewards" },
    { icon: Swords, text: "1v1 and 2v2 battle formats" },
    { icon: Crown, text: "Leaderboard rankings and trophies" },
    { icon: Star, text: "Special seasonal events and challenges" },
  ];

  return (
    <div className="min-h-screen arena-bg pt-24 md:pt-28 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Calendar className="w-10 h-10 md:w-12 md:h-12 text-accent animate-float" />
          </div>
          <h1 className="font-title text-4xl md:text-5xl lg:text-6xl cr-title text-foreground mb-4">
            Stay <span className="text-accent">Tuned!</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Exciting tournaments are coming your way. Get ready to clash with the best players from IIT Kharagpur!
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="cr-card p-6 md:p-10 relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
            
            {/* Content */}
            <div className="relative">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-accent" />
                  <Crown className="w-8 h-8 text-accent" />
                  <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-accent" />
                </div>
              </div>

              <h2 className="font-title text-2xl md:text-3xl text-center text-foreground mb-8">
                Upcoming <span className="text-accent">Features</span>
              </h2>

              {/* Features List */}
              <ul className="space-y-4 mb-10">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl border-2 border-border hover:border-accent/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-foreground font-body">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* Announcement */}
              <div className="text-center mb-8 p-4 bg-primary/20 rounded-xl border-2 border-primary/30">
                <p className="text-muted-foreground">
                  <span className="text-accent font-semibold">Next Tournament:</span>
                  <br />
                  <span className="text-lg text-foreground font-title">Coming Soon!</span>
                </p>
              </div>

              {/* CTA */}
              <Link to="/" className="block">
                <Button variant="gold" size="lg" className="w-full gap-3">
                  <Home className="w-5 h-5" />
                  Go to Home & Register
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Bottom decorative */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          </div>
        </div>

        {/* Bottom decorations */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-3">
            <Swords className="w-6 h-6 text-accent/40 rotate-45" />
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-accent"
                  style={{ opacity: 0.2 + i * 0.15 }}
                />
              ))}
            </div>
            <Swords className="w-6 h-6 text-accent/40 -rotate-45 scale-x-[-1]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
