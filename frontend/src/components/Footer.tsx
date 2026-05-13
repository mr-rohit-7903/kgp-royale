import { FaHeart, FaGithub } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t-4 border-foreground py-10 relative z-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIiBmaWxsPSIjMUUyOTNCIi8+Cjwvc3ZnPg==')] opacity-20" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[hsl(var(--tertiary))] flex items-center justify-center border-4 border-foreground shadow-hard transform -rotate-6 hover:rotate-6 transition-transform">
              <span className="font-outfit text-foreground text-lg font-black">KR</span>
            </div>
            <span className="font-outfit font-extrabold text-2xl text-foreground">
              KGP <span className="text-primary">ROYALE</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-jakarta font-bold text-muted-foreground underline decoration-2 underline-offset-4 decoration-slate-200">
            <PolicyModal type="privacy" />
            <PolicyModal type="terms" />
            <a 
              href="https://github.com/mr-rohit-7903/kgp-royale" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-2"
            >
              <FaGithub className="w-4 h-4" />
              Contribute
            </a>
          </div>

          {/* Made with love */}
          <p className="flex items-center gap-2 text-foreground font-jakarta font-bold bg-muted px-4 py-2 rounded-full border-2 border-slate-200 shadow-sm">
            Made with <span className="inline-flex items-center justify-center text-inherit">❤️</span> at IIT Kharagpur
          </p>

          {/* Copyright */}
          <p className="text-muted-foreground font-jakarta font-medium text-sm">
            © {new Date().getFullYear()} KGP Royale. All rights reserved.
          </p>

          {/* Decorative shapes */}
          <div className="flex gap-4 mt-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(var(--primary))] border-2 border-foreground" />
            <div className="w-3 h-3 rounded-full bg-[hsl(var(--secondary))] border-2 border-foreground" />
            <div className="w-3 h-3 rounded-full bg-[hsl(var(--tertiary))] border-2 border-foreground" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const PolicyModal = ({ type }: { type: "privacy" | "terms" }) => {
  const isPrivacy = type === "privacy";
  
  return (
    <Dialog>
      <DialogTrigger className="hover:text-primary transition-colors">
        {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto border-4 border-foreground shadow-hard rounded-[2rem] bg-white p-8 md:p-10">
        <DialogHeader className="mb-6">
          <DialogTitle className="font-outfit font-black text-3xl md:text-4xl text-foreground">
            {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
          </DialogTitle>
          <div className="w-20 h-2 bg-primary rounded-full mt-2" />
        </DialogHeader>
        
        <div className="space-y-6 font-jakarta text-foreground/80 leading-relaxed">
          {isPrivacy ? (
            <>
              <section>
                <h4 className="font-outfit font-bold text-xl text-foreground mb-2">1. Data Collection</h4>
                <p>We collect your IIT Kharagpur email address, Clash Royale player tag, and basic game statistics (trophies, wins, etc.) solely for the purpose of tournament management and leaderboard displays.</p>
              </section>
              <section>
                <h4 className="font-outfit font-bold text-xl text-foreground mb-2">2. How We Use Data</h4>
                <p>Your data is used to verify your status as a student, sync your in-game performance, and communicate tournament updates. We do not sell or share your data with third-party advertising services.</p>
              </section>
              <section>
                <h4 className="font-outfit font-bold text-xl text-foreground mb-2">3. Storage</h4>
                <p>Information is securely stored in our cloud database. You can request account deletion at any time by contacting the Tech Team.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h4 className="font-outfit font-bold text-xl text-foreground mb-2">1. Eligibility</h4>
                <p>KGP Royale is an exclusive platform for the students and residents of IIT Kharagpur. Access requires a valid @kgpian.iitkgp.ac.in email address.</p>
              </section>
              <section>
                <h4 className="font-outfit font-bold text-xl text-foreground mb-2">2. Fair Play</h4>
                <p>Members must adhere to the Supercell Fair Play policy. Any form of cheating, wintrading, or harassment within the club or tournaments will result in an immediate permanent ban.</p>
              </section>
              <section>
                <h4 className="font-outfit font-bold text-xl text-foreground mb-2">3. Account Sharing</h4>
                <p>Users are responsible for maintaining the security of their accounts. Sharing accounts for the purpose of tournament manipulation is strictly prohibited.</p>
              </section>
              <section>
                <h4 className="font-outfit font-bold text-xl text-foreground mb-2">4. Event Participation</h4>
                <p>Registration for tournaments implies agreement to follow specific event rules as announced by the Council members.</p>
              </section>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Footer;
