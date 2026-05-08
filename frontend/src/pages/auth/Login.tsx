// src/pages/auth/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!email.toLowerCase().endsWith("@kgpian.iitkgp.ac.in")) {
      setError("Only @kgpian.iitkgp.ac.in emails are allowed.");
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      navigate("/user/profile");
    } catch (err: any) {
      // Map Firebase error codes to friendly messages
      const code = err?.code || "";
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError(err?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
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
          {/* RIGHT: Login Form */}
          <div className="mx-auto w-full max-w-md order-2 lg:order-2">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="font-title text-4xl md:text-5xl cr-title">
                <span className="text-foreground">KGP</span>{" "}
                <span className="text-accent">ROYALE</span>
              </h1>
              <p className="mt-2 text-muted-foreground text-sm">
                Welcome back — sign in to manage decks and join tournaments.
              </p>
            </div>

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
                    placeholder="you@kgpian.iitkgp.ac.in"
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
                  disabled={loading}
                  className="w-full bg-accent text-navy-dark font-title py-3 rounded-xl text-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing in…" : "Sign in"}
                </button>

                <p className="text-xs text-muted-foreground text-center mt-2">
                  Only <span className="text-accent font-semibold">@kgpian.iitkgp.ac.in</span> emails are accepted.
                </p>
              </form>

              <div className="mt-6 text-sm text-muted-foreground">
                New here?{" "}
                <Link to="/register" className="text-accent underline">
                  Create an account
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

export default LoginPage;
