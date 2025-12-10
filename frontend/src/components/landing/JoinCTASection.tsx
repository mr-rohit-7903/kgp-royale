import { Crown, MessageCircle, Users, Copy, Check, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";


const JoinCTASection = () => {
  const [copied, setCopied] = useState(false);
  const clanCode = "#KGP2024R";

  const handleCopy = () => {
    navigator.clipboard.writeText(clanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-elixir/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-title text-4xl md:text-6xl cr-title mb-4">
            <span className="text-foreground">Join</span>{" "}
            <span className="text-elixir">Us</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Ready to enter the arena? Join our clan today!
          </p>
          <div className="section-divider w-48 mx-auto mt-4" />
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Clan Code Card */}
          <div className="cr-card-elixir p-8 mb-8">
            <div className="text-center">
              <Crown className="w-12 h-12 text-accent mx-auto mb-4 animate-float" />
              <h3 className="font-title text-2xl text-foreground mb-2">Clan Code</h3>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="font-title text-4xl text-elixir tracking-wider">{clanCode}</span>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-secondary hover:bg-muted transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
              <p className="text-muted-foreground font-body text-sm">
                Use this code to find us in-game!
              </p>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Button
              variant="royal"
              size="lg"
              className="font-title text-lg px-8 py-6"
              onClick={() => window.open("https://discord.gg/example", "_blank")}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Join Discord
            </Button> */}

            <Button
              variant="outline"
              size="lg"
              className="font-title text-lg px-8 py-6 border-green-500 text-green-500 hover:bg-green-500/10"
              onClick={() => window.open("https://wa.me/example", "_blank")}
            >
              <Users className="mr-2 w-5 h-5" />
              WhatsApp
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="font-title text-lg px-8 py-6 border-pink-500 text-pink-500 hover:bg-pink-500/10"
              onClick={() => window.open("https://instagram.com/example", "_blank")}
            >
              <Instagram className="mr-2 w-5 h-5" />
              Instagram
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JoinCTASection;
