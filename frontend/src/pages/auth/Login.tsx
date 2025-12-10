// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GolemCanvas from "@/components/models/Golem";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // TODO: replace with real API call
    console.log("LOGIN", { email, password });
    // fake success -> navigate to dashboard or profile
    navigate("/"); // change as needed
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
          {/* LEFT: Branding + 3D Golem */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="mb-6">
              <h1 className="font-title text-5xl md:text-6xl cr-title">
                <span className="text-foreground">KGP</span>{" "}
                <span className="text-accent">ROYALE</span>
              </h1>
              <p className="mt-2 text-muted-foreground max-w-lg">
                Welcome back — sign in to your clan, manage decks, and join tournaments.
              </p>
            </div>

            {/* <div className="w-full max-w-md mx-auto lg:mx-0">
              <GolemCanvas />
            </div> */}

          </div>

          {/* RIGHT: Login Form */}
          <div className="mx-auto w-full max-w-md mt-14">
            <div className="cr-card champion-frame-gold p-8">
              <h2 className="font-title text-2xl mb-4">Sign in</h2>

              {error && <div className="text-sm text-red-400 mb-3">{error}</div>}

              <form onSubmit={handleLogin} className="space-y-4">
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

                <label className="block relative">
                  <span className="text-sm text-muted-foreground">Password</span>
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-md bg-secondary border border-border focus:border-primary"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-3 top-9 text-sm text-muted-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </label>

                <button
                  type="submit"
                  className="w-full bg-accent text-navy-dark font-title py-3 rounded-xl text-lg hover:scale-[1.02] transition"
                >
                  Sign in
                </button>

                <div className="text-center mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      // demo quick-login (remove in production)
                      setEmail("demo@kgproyale.test");
                      setPassword("password123");
                    }}
                    className="text-sm text-muted-foreground underline"
                  >
                    Quick demo login
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center text-sm text-muted-foreground">
                <Link to="/forgot" className="underline">
                  Forgot password?
                </Link>
              </div>
              <div className="mt-6 text-sm text-muted-foreground">
                New here?{" "}
                <Link to="/register" className="text-accent underline">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
