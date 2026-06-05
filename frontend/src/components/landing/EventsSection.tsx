import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaChartLine, FaCrown, FaGift, FaCalendar, FaChevronLeft, FaChevronRight, FaUsers } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";

const events = [
  {
    title: "Weekly Tournaments",
    subtitle: "Arena Battles",
    description: "Every week, battle for glory and climb the ranks in our 1v1 arena.",
    color: "bg-[hsl(var(--tertiary))]",
    icon: (props: any) => <span {...props} className={props.className + " text-6xl flex items-center justify-center"}>🏆</span>,
  },
  {
    title: "Clan Wars",
    subtitle: "Coordinate & Conquer",
    description: "Work with your clanmates to dominate the river race and earn rewards.",
    color: "bg-[hsl(var(--primary))]",
    icon: FaCrown,
  },
  {
    title: "Inter-Hall Tournaments",
    subtitle: "Represent Your Hall",
    description: "The ultimate rivalry! Fight for your hall of residence and claim bragging rights.",
    color: "bg-[hsl(var(--secondary))]",
    icon: GiCrossedSwords,
  },
  {
    title: "Leaderboards",
    subtitle: "Track Your Progress",
    description: "See where you stand among the best players in IIT Kharagpur.",
    color: "bg-[hsl(var(--quaternary))]",
    icon: FaChartLine,
  },
  {
    title: "Prizes & Rewards",
    subtitle: "Win Big",
    description: "Amazing prizes, exclusive roles, and in-game rewards for top performers.",
    color: "bg-[hsl(var(--primary))]",
    icon: FaGift,
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
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="font-outfit font-extrabold text-5xl md:text-6xl text-foreground mb-4 drop-shadow-[2px_2px_0px_white]">
            Featured <span className="text-primary">Events</span>
          </h2>
          <div className="w-32 h-4 bg-secondary mx-auto rounded-full border-2 border-foreground shadow-hard animate-pulse" />
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-14 h-14 rounded-full bg-white border-2 border-foreground shadow-hard flex items-center justify-center hover:bg-tertiary hover:shadow-hard-hover hover:scale-105 active:translate-y-[calc(-50%+2px)] active:shadow-hard-active transition-all duration-300"
          >
            <span className="inline-flex items-center justify-center text-inherit">◀</span>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-14 h-14 rounded-full bg-white border-2 border-foreground shadow-hard flex items-center justify-center hover:bg-tertiary hover:shadow-hard-hover hover:scale-105 active:translate-y-[calc(-50%+2px)] active:shadow-hard-active transition-all duration-300"
          >
            <span className="inline-flex items-center justify-center text-inherit">▶</span>
          </button>

          {/* Event Cards */}
          <div className="overflow-hidden p-4">
            <div
              className="flex items-stretch transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {events.map((event, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2 h-auto">
                  <div className={`bg-card border-4 border-foreground rounded-[2rem] shadow-soft-hard overflow-hidden h-full flex flex-col group hover:shadow-hard-hover transition-all duration-300`}>
                    <div className={`${event.color} p-8 md:p-12 text-white border-b-4 border-foreground h-full flex flex-col justify-center`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-6xl mb-6 block drop-shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                            <event.icon className="w-16 h-16 text-white" />
                          </div>
                          <h3 className="font-outfit font-bold text-4xl md:text-5xl mb-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
                            {event.title}
                          </h3>
                          <p className="text-xl font-bold uppercase tracking-wide mb-2 opacity-90 drop-shadow-[1px_1px_0px_rgba(0,0,0,0.3)]">
                            {event.subtitle}
                          </p>
                          <p className="font-jakarta text-lg font-medium opacity-95">
                            {event.description}
                          </p>
                        </div>
                        <div className="hidden md:flex flex-col gap-4 bg-white/20 p-6 rounded-2xl backdrop-blur-sm border-2 border-white/50 group-hover:bg-white/30 transition-colors duration-300">
                          <div className="flex items-center gap-3 font-jakarta font-bold text-lg">
                            <span className="inline-flex items-center justify-center text-inherit">📅</span>
                            <span>Every Week</span>
                          </div>
                          <div className="flex items-center gap-3 font-jakarta font-bold text-lg">
                            <span className="inline-flex items-center justify-center text-inherit">👥</span>
                            <span>32+ Players</span>
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
          <div className="flex justify-center gap-3 mt-6">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full border-2 border-foreground transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-10 shadow-hard"
                    : "bg-white shadow-sm hover:bg-tertiary hover:scale-110"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
