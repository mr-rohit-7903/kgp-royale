import TeamSection from "@/components/TeamSection";

const Team = () => {
  return (
    <div className="min-h-screen arena-bg pt-24 md:pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="font-title text-4xl md:text-5xl lg:text-6xl cr-title text-foreground mb-2">
            Meet the <span className="text-accent">Team</span>
          </h1>
          <p className="text-muted-foreground">The core members who keep KGP Royale running.</p>
        </div>
      </div>

      <TeamSection />
    </div>
  );
};

export default Team;
