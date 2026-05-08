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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatusMsg("");

    if (!email || !password || !playerId) {
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
      await signUp(email, password, playerId, clashData);
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
    <div className="relative min-h-screen flex items-center justify-center bg-background py-12">
      {/* subtle background image from public/herobg.png */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-20 pointer-events-none"
        style={{ backgroundImage: `url('/herobg.png')` }}
      />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* RIGHT: Register */}
          <div className="mx-auto w-full max-w-md order-2 lg:order-2">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="font-title text-4xl md:text-5xl cr-title">
                <span className="text-foreground">KGP</span>{" "}
                <span className="text-accent">ROYALE</span>
              </h1>
              <p className="mt-2 text-muted-foreground text-sm">
                Create an account with your IIT Kharagpur email to join clan wars, track trophies, and participate in events.
              </p>
            </div>

            <div className="cr-card p-8 champion-frame-gold">
              <h2 className="font-title text-2xl mb-4">Create account</h2>

              {error && <div className="text-sm text-red-400 mb-3">{error}</div>}

              <form onSubmit={handleRegister} className="space-y-4">
                <label className="block">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-md bg-secondary border border-border focus:border-primary"
                    placeholder="you@kgpian.iitkgp.ac.in"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-muted-foreground">Clash Royale Player Tag</span>
                  <input
                    type="text"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-md bg-secondary border border-border focus:border-primary"
                    placeholder="e.g. #ABCD123"
                    required
                  />
                  <span className="text-xs text-muted-foreground mt-1 block">
                    Find your tag in Clash Royale → Profile → Below your name
                  </span>
                </label>

                <label className="block">
                  <span className="text-sm text-muted-foreground">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-md bg-secondary border border-border focus:border-primary"
                    placeholder="At least 6 characters"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-muted-foreground">Confirm Password</span>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-md bg-secondary border border-border focus:border-primary"
                    placeholder="Repeat password"
                    required
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent text-navy-dark font-title py-3 rounded-xl text-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Please wait…" : "Create account"}
                </button>

                {/* Status message during verification */}
                {statusMsg && (
                  <p className="text-xs text-accent text-center mt-2 animate-pulse">
                    {statusMsg}
                  </p>
                )}

                <p className="text-xs text-muted-foreground text-center mt-2">
                  Only <span className="text-accent font-semibold">@kgpian.iitkgp.ac.in</span> emails are accepted.
                  Your Player ID will be verified before account creation.
                </p>
              </form>

              <div className="mt-4 text-center text-sm text-muted-foreground">
                By creating an account you agree to the club rules.
              </div>
              <div className="mt-6 text-sm text-muted-foreground">
                Already a member?{" "}
                <Link to="/login" className="text-accent underline">
                  Sign in
                </Link>
              </div>
            </div>
          </div>

          {/* LEFT: Image */}
          <div className="hidden lg:flex items-center justify-center order-1 lg:order-1 relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl" />
            <img 
              src="/assets/auth_screen.png" 
              alt="Clash Royale Characters" 
              className="relative z-10 w-full max-w-lg object-contain drop-shadow-[0_0_30px_rgba(255,200,0,0.3)] animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
