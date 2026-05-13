import TeamSection from "@/components/TeamSection";

const Team = () => {
  return (
    <main className="min-h-screen py-20 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--tertiary))] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(var(--primary))] rounded-full mix-blend-multiply filter blur-[120px] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="font-outfit font-black text-6xl md:text-8xl text-foreground mb-6 drop-shadow-[4px_4px_0px_white] tracking-tight">
            THE <span className="text-primary">LEGENDS</span>
          </h1>
          <p className="text-muted-foreground font-jakarta font-bold text-xl max-w-2xl mx-auto mb-8">
            Meet the elite warriors who lead and manage the KGP Royale community.
          </p>
          <div className="w-48 h-5 bg-primary mx-auto rounded-full border-4 border-foreground shadow-hard" />
        </div>
      </div>

      <TeamSection />
    </main>
  );
};

export default Team;
