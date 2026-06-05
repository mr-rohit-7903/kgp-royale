// src/pages/auth/Register.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { fetchPlayerData, ClashPlayerData } from "@/lib/clashApi";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [hall, setHall] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatusMsg("");

    if (!email || !password || !playerId || !hall) {
      setError("Please fill all required fields.");
      return;
    }

    if (!email.toLowerCase().endsWith("@kgpian.iitkgp.ac.in")) {
      setError("Only @kgpian.iitkgp.ac.in emails are allowed.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Verify the player tag exists in Clash Royale
      setStatusMsg("Verifying Clash Royale Player ID…");
      let clashData: ClashPlayerData | null = null;
      try {
        clashData = await fetchPlayerData(playerId);
      } catch {
        // network error
      }

      if (!clashData) {
        setError(
          "Invalid Player ID — could not find this player in Clash Royale. Please check your tag and try again."
        );
        setStatusMsg("");
        setLoading(false);
        return;
      }

      // Step 2: Player verified — create the account
      setStatusMsg(`Player found: ${clashData.name} (${clashData.trophies} 🏆). Creating account…`);
      await signUp(email, password, playerId, hall, clashData);
      navigate("/user/profile");
    } catch (err: any) {
      const code = err?.code || "";
      if (code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (code === "auth/weak-password") {
        setError("Password is too weak. Use at least 6 characters.");
      } else {
        setError(err?.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
      setStatusMsg("");
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 text-foreground">
      {/* Decorative Geometric Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[hsl(var(--tertiary))] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-[hsl(var(--secondary))] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse [animation-delay:1s]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* RIGHT: Register */}
          <div className="mx-auto w-full max-w-md order-2 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="font-outfit font-extrabold text-5xl md:text-6xl tracking-tight text-foreground drop-shadow-[2px_2px_0px_white] animate-in fade-in slide-in-from-bottom-4 duration-500">
                KGP <span className="text-primary">ROYALE</span>
              </h1>
              <p className="mt-4 text-muted-foreground font-medium text-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
                Create an account with your IIT Kharagpur email to join clan wars, track trophies, and participate in events.
              </p>
            </div>

            <div className="bg-card border-2 border-foreground rounded-xl shadow-soft-hard p-8 transition-all duration-300 hover:-rotate-1 hover:scale-[1.02] hover:shadow-hard-hover">
              <h2 className="font-outfit font-bold text-3xl mb-6">Create account</h2>

              {error && <div className="text-sm font-semibold text-destructive mb-4 bg-destructive/10 p-3 rounded-lg border-2 border-destructive/20 animate-shake">{error}</div>}

              <form onSubmit={handleRegister} className="space-y-5">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-input border-2 border-slate-300 text-foreground focus:border-ring focus:shadow-hard outline-none transition-all duration-200"
                    placeholder="you@kgpian.iitkgp.ac.in"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Clash Royale Player Tag</span>
                  <input
                    type="text"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-input border-2 border-slate-300 text-foreground focus:border-ring focus:shadow-hard outline-none transition-all duration-200"
                    placeholder="e.g. #ABCD123"
                    required
                  />
                  <span className="text-xs font-semibold text-muted-foreground mt-2 block">
                    Find your tag in Clash Royale → Profile → Below your name
                  </span>
                </label>
                
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Hall of Residence</span>
                  <select
                    value={hall}
                    onChange={(e) => setHall(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-input border-2 border-slate-300 text-foreground focus:border-ring focus:shadow-hard outline-none transition-all duration-200"
                    required
                  >
                    <option value="" disabled>Select your hall</option>
                    <option value="AJB">Acharya Jagadish Chandra Bose Hall of Residence</option>
                    <option value="ABV">Atal Bihari Vajpayee Hall of Residence</option>
                    <option value="AZAD">Azad Hall of Residence</option>
                    <option value="BCR">Bidhan Chandra Roy Hall of Residence</option>
                    <option value="BRA">Bhim Rao Ambedkar Hall of Residence</option>
                    <option value="GOKHALE">Gokhale Hall of Residence</option>
                    <option value="HJB">Homi Jehangir Bhabha Hall of Residence</option>
                    <option value="LBS">Lal Bahadur Shastri Hall of Residence</option>
                    <option value="LLR">Lala Lajpat Rai Hall of Residence</option>
                    <option value="MS">Meghnad Saha Hall of Residence</option>
                    <option value="MT">Mother Teresa Hall of Residence</option>
                    <option value="NEHRU">Nehru Hall of Residence</option>
                    <option value="MMM">Pandit Madan Mohan Malaviya Hall of Residence</option>
                    <option value="PATEL">Patel Hall of Residence</option>
                    <option value="RK">Radhakrishnan Hall of Residence</option>
                    <option value="RP">Rajendra Prasad Hall of Residence</option>
                    <option value="RLB">Rani Laxmibai Hall of Residence</option>
                    <option value="SN/IG">Sarojini Naidu/ Indira Gandhi Hall of Residence</option>
                    <option value="SP">Savitribai Phule Hall of Residence</option>
                    <option value="SAM">Sir Ashutosh Mukherjee Hall of Residence</option>
                    <option value="SN">Sister Nivedita Hall of Residence</option>
                    <option value="VS">Vidyasagar Hall of Residence</option>
                    <option value="ZH">Zakhir Hussain Hall of Residence</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-input border-2 border-slate-300 text-foreground focus:border-ring focus:shadow-hard outline-none transition-all duration-200"
                    placeholder="At least 6 characters"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Confirm Password</span>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-input border-2 border-slate-300 text-foreground focus:border-ring focus:shadow-hard outline-none transition-all duration-200"
                    placeholder="Repeat password"
                    required
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground font-outfit font-bold rounded-full border-2 border-foreground shadow-hard py-4 text-xl hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard-hover active:translate-y-0.5 active:translate-x-0.5 active:shadow-hard-active transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 animate-pulse-glow"
                >
                  {loading ? "Please wait…" : "Create account"}
                </button>

                {/* Status message during verification */}
                {statusMsg && (
                  <p className="text-sm font-bold text-primary text-center mt-4 animate-bounce">
                    {statusMsg}
                  </p>
                )}

                <p className="text-xs font-medium text-muted-foreground text-center mt-4 bg-muted p-3 rounded-lg border-2 border-slate-200">
                  Only <span className="text-primary font-bold">@kgpian.iitkgp.ac.in</span> emails are accepted.
                  Your Player ID will be verified before account creation.
                </p>
              </form>

              <div className="mt-6 text-center text-sm font-medium text-muted-foreground">
                By creating an account you agree to the club rules.
              </div>
              <div className="mt-4 text-sm font-bold text-center text-muted-foreground">
                Already a member?{" "}
                <Link to="/login" className="text-primary underline decoration-2 underline-offset-4 hover:text-foreground transition-colors">
                  Sign in
                </Link>
              </div>
            </div>
          </div>

          {/* LEFT: Image & Decoration */}
          <div className="hidden lg:flex flex-col items-center justify-center order-1 lg:order-1 relative h-full min-h-[500px] animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
            {/* Massive Yellow Circle */}
            <div className="absolute w-[350px] h-[350px] bg-[hsl(var(--tertiary))] rounded-full border-4 border-foreground shadow-hard -z-10 animate-float" />
            
            <div className="relative z-10 w-full max-w-md bg-white border-4 border-foreground rounded-[2rem] p-4 shadow-soft-hard transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-[hsl(var(--quaternary))] rounded-full border-4 border-foreground shadow-hard flex items-center justify-center animate-bounce-subtle z-20">
                <span className="text-2xl">✨</span>
              </div>
              <div className="overflow-hidden rounded-xl bg-muted border-2 border-slate-200">
                <img 
                  src="/assets/auth_screen.png" 
                  alt="Clash Royale Characters" 
                  className="w-full h-auto object-cover transform scale-105"
                />
              </div>
              <div className="mt-6 border-t-4 border-dashed border-slate-200 pt-4 pb-2 px-2">
                <h3 className="font-outfit font-bold text-2xl text-foreground mb-1">Join the Arena!</h3>
                <p className="text-muted-foreground font-medium text-sm">Get ready to draft, battle, and win exclusive prizes in the official KGP Royale tournament.</p>
              </div>
            </div>
            
            {/* Small decorative shapes */}
            <div className="absolute bottom-12 left-8 w-10 h-10 bg-[hsl(var(--primary))] rounded-full border-2 border-foreground shadow-hard animate-bounce-subtle [animation-delay:0.5s]" />
            <div className="absolute top-16 right-4 w-12 h-12 bg-[hsl(var(--secondary))] transform rotate-12 border-2 border-foreground shadow-hard animate-bounce-subtle [animation-delay:1s]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
