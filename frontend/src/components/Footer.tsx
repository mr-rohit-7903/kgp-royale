import { Heart, Crown } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy-dark border-t-4 border-accent/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-gold-dark flex items-center justify-center border-3 border-accent">
              <span className="font-title text-navy-dark text-sm font-bold">KR</span>
            </div>
            <span className="font-title text-lg text-foreground">
              KGP <span className="text-accent">ROYALE</span>
            </span>
          </div>

          {/* Made with love */}
          <p className="flex items-center gap-2 text-muted-foreground text-sm">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> at IIT Kharagpur
          </p>

          {/* Copyright */}
          <p className="text-muted-foreground/60 text-xs">
            © {new Date().getFullYear()} KGP Royale. All rights reserved.
          </p>

          {/* Decorative crowns */}
          <div className="flex gap-4 mt-2">
            <Crown className="w-4 h-4 text-accent/40" />
            <Crown className="w-5 h-5 text-accent/60" />
            <Crown className="w-4 h-4 text-accent/40" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
