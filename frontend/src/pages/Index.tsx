import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import EventsSection from "@/components/landing/EventsSection";
import LeaderboardSection from "@/components/landing/LeaderboardSection";
import HallOfFameSection from "@/components/landing/HallOfFameSection";
import WhyJoinSection from "@/components/landing/WhyJoinSection";
import GallerySection from "@/components/landing/GallerySection";
import JoinCTASection from "@/components/landing/JoinCTASection";

const Index = () => {
  return (
    <div className="min-h-screen arena-bg">
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <LeaderboardSection />
      <HallOfFameSection />
      <WhyJoinSection />
      <GallerySection />
      <JoinCTASection />
    </div>
  );
};

export default Index;
