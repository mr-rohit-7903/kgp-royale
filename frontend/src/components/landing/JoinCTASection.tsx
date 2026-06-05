
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaCheck, FaCopy, FaCrown, FaInstagram, FaUsers } from "react-icons/fa";


const JoinCTASection = () => {
  const [copied, setCopied] = useState(false);
  const clanCode = "#G82PGL2P";
  const inviteLink = "https://link.clashroyale.com/invite/clan/en?tag=G82PGL2P&token=kp7xjnnn&platform=android";

  const handleCopy = () => {
    navigator.clipboard.writeText(clanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = () => {
    window.open(inviteLink, "_blank");
  };

  return (
    <section id="join" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[hsl(var(--tertiary))] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[hsl(var(--secondary))] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse [animation-delay:1s]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="font-outfit font-extrabold text-5xl md:text-6xl text-foreground mb-4 drop-shadow-[2px_2px_0px_white]">
            Join <span className="text-primary">Us</span>
          </h2>
          <p className="text-muted-foreground font-jakarta font-medium text-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
            Ready to enter the arena? Join our clan today!
          </p>
          <div className="w-32 h-4 bg-tertiary mx-auto rounded-full border-2 border-foreground shadow-hard mt-6 animate-pulse" />
        </div>

        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {/* Clan Code Card */}
          <div className="bg-card border-4 border-foreground rounded-[2rem] shadow-soft-hard p-10 mb-10 transform rotate-1 hover:rotate-0 transition-all duration-300 group hover:shadow-hard-hover">
            <div className="text-center relative">
              <h3 className="font-outfit font-bold text-3xl text-foreground mb-4 mt-6">Clan Code</h3>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="font-outfit font-extrabold text-5xl text-primary tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-300">{clanCode}</span>
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <Button
                  variant="gold"
                  size="lg"
                  className="font-outfit text-2xl px-12 py-8 shadow-hard hover:shadow-hard-hover active:shadow-hard-active w-full sm:w-auto mx-auto transition-all duration-300 animate-pulse-glow"
                  onClick={handleJoin}
                >
                  JOIN CLAN NOW
                </Button>
                <p className="text-muted-foreground font-jakarta font-medium text-sm">
                  Clicking "Join" will open Clash Royale on your device
                </p>
              </div>
            </div>
          </div>

          {/* Social Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              variant="default"
              size="lg"
              className="font-outfit text-xl px-10 py-6"
              onClick={() => window.open("https://wa.me/example", "_blank")}
            >
              <span className="inline-flex items-center justify-center text-inherit">👥</span>
              WhatsApp
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="font-outfit text-xl px-10 py-6 bg-white"
              onClick={() => window.open("https://instagram.com/example", "_blank")}
            >
              <span className="inline-flex items-center justify-center text-inherit">📸</span>
              Instagram
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default JoinCTASection;
