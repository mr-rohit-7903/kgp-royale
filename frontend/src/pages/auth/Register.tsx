// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GolemCanvas from "@/components/models/Golem";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !playerId) {
      setError("Please fill all required fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: call registration API
    console.log("REGISTER", { email, password, playerId });
    // after success:
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background py-12">
      {/* subtle background image from public/herobg.png */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-20 pointer-events-none"
        style={{ backgroundImage: `url('/herobg.png')` }}
      />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* LEFT */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="mb-6">
              <h1 className="font-title text-5xl md:text-6xl cr-title">
                <span className="text-foreground">KGP</span>{" "}
                <span className="text-accent">ROYALE</span>
              </h1>
              <p className="mt-2 text-muted-foreground max-w-lg">
                Create an account to join clan wars, track trophies, and participate in events.
              </p>
            </div>

            {/* <div className="w-full max-w-md mx-auto lg:mx-0">
              <GolemCanvas />
            </div> */}
            
          </div>

          {/* RIGHT: Register */}
          <div className="mx-auto w-full max-w-md mt-14">
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
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-muted-foreground">Clash Royale Player ID</span>
                  <input
                    type="text"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-md bg-secondary border border-border focus:border-primary"
                    placeholder="Player tag e.g. #ABCD123"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-muted-foreground">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-md bg-secondary border border-border focus:border-primary"
                    placeholder="At least 8 characters"
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
                  className="w-full bg-accent text-navy-dark font-title py-3 rounded-xl text-lg hover:scale-[1.02] transition"
                >
                  Create account
                </button>
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
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
