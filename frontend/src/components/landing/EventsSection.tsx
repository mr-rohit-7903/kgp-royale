import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const events = [
  {
    title: "Arena Royale",
    subtitle: "Weekly Battles",
    description: "Test your skills in weekly 1v1 combat",
    color: "from-primary to-royal-dark",
    icon: "⚔️",
  },
  {
    title: "Draft Frenzy Night",
    subtitle: "Random Deck Challenge",
    description: "Build your deck from scratch with random picks",
    color: "from-elixir to-elixir-dark",
    icon: "🎲",
  },
  {
    title: "2v2 Battle Blitz",
    subtitle: "Team Up & Dominate",
    description: "Partner with a teammate and crush opponents",
    color: "from-accent to-gold-dark",
    icon: "👥",
  },
  {
    title: "KGP Clan Wars",
    subtitle: "Inter-Hall Competition",
    description: "Represent your hall in epic clan battles",
    color: "from-neon-pink to-destructive",
    icon: "🏰",
  },
  {
    title: "Legend League",
    subtitle: "Championship Finals",
    description: "The ultimate showdown for the top players",
    color: "from-accent via-primary to-elixir",
    icon: "👑",
  },
];

const EventsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-title text-4xl md:text-6xl cr-title mb-4">
            <span className="text-foreground">Featured</span>{" "}
            <span className="text-elixir">Events</span>
          </h2>
          <div className="section-divider w-48 mx-auto" />
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 rounded-full bg-secondary border-2 border-border flex items-center justify-center hover:border-accent transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 rounded-full bg-secondary border-2 border-border flex items-center justify-center hover:border-accent transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Event Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {events.map((event, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className={`cr-card overflow-hidden`}>
                    <div className={`bg-gradient-to-r ${event.color} p-8 md:p-12`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-6xl mb-4 block">{event.icon}</span>
                          <h3 className="font-title text-3xl md:text-4xl text-foreground mb-2">
                            {event.title}
                          </h3>
                          <p className="text-lg text-foreground/80 font-semibold mb-2">
                            {event.subtitle}
                          </p>
                          <p className="text-foreground/70 font-body">
                            {event.description}
                          </p>
                        </div>
                        <div className="hidden md:flex flex-col gap-4">
                          <div className="flex items-center gap-2 text-foreground/80">
                            <Calendar className="w-5 h-5" />
                            <span className="font-body">Every Week</span>
                          </div>
                          <div className="flex items-center gap-2 text-foreground/80">
                            <Users className="w-5 h-5" />
                            <span className="font-body">32+ Players</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-accent w-8"
                    : "bg-secondary hover:bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link to="/upcoming">
            <Button variant="outline" size="lg" className="font-title border-accent text-accent hover:bg-accent/10">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
