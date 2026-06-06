// src/pages/auth/Login.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

const LoginPage: React.FC = () => {
  useEffect(() => {
    document.title = "Login - KGP Royale";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Welcome back. Sign in to your KGP Royale account to access your player profile and dashboard.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Welcome back. Sign in to your KGP Royale account to access your player profile and dashboard.";
      document.head.appendChild(meta);
    }
  }, []);

  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState<{ text: string; success: boolean } | null>(null);

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

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMsg(null);

    if (!resetEmail) {
      setResetMsg({ text: "Please enter your email address.", success: false });
      return;
    }
    if (!resetEmail.toLowerCase().endsWith("@kgpian.iitkgp.ac.in")) {
      setResetMsg({ text: "Only @kgpian.iitkgp.ac.in emails are accepted.", success: false });
      return;
    }

    try {
      setResetLoading(true);
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMsg({
        text: "Password reset email sent! Check your inbox. (Check spam too)",
        success: true,
      });
    } catch (err: any) {
      const code = err?.code || "";
      if (code === "auth/user-not-found") {
        setResetMsg({ text: "No account found with this email.", success: false });
      } else {
        setResetMsg({ text: "Failed to send reset email. Please try again.", success: false });
      }
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 text-foreground">
      {/* Decorative Geometric Background Shapes */}
      <div className="absolute top-10 left-[10%] w-64 h-64 bg-[hsl(var(--secondary))] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-10 right-[10%] w-80 h-80 bg-[hsl(var(--primary))] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse [animation-delay:1s]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* RIGHT: Login Form */}
          <div className="mx-auto w-full max-w-md order-2 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="font-outfit font-extrabold text-5xl md:text-6xl tracking-tight text-foreground drop-shadow-[2px_2px_0px_white] animate-in fade-in slide-in-from-bottom-4 duration-500">
                KGP <span className="text-primary">ROYALE</span>
              </h1>
              <p className="mt-4 text-muted-foreground font-medium text-lg animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
                Welcome back — sign in to manage decks and join tournaments.
              </p>
            </div>

            <div className="bg-card border-2 border-foreground rounded-xl shadow-soft-hard p-8 transition-all duration-300 hover:-rotate-1 hover:scale-[1.02] hover:shadow-hard-hover">

              {/* ── Sign In Form ── */}
              {!showForgot ? (
                <>
                  <h2 className="font-outfit font-bold text-3xl mb-6">Sign in</h2>

                  {error && (
                    <div className="text-sm font-semibold text-destructive mb-4 bg-destructive/10 p-3 rounded-lg border-2 border-destructive/20 animate-shake">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-5">
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

                    <label className="block relative">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Password</span>
                      <input
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-input border-2 border-slate-300 text-foreground focus:border-ring focus:shadow-hard outline-none transition-all duration-200"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((s) => !s)}
                        className="absolute right-3 top-9 text-xs font-bold uppercase text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Toggle password visibility"
                      >
                        {showPass ? "Hide" : "Show"}
                      </button>
                    </label>

                    {/* Forgot password link */}
                    <div className="text-right -mt-2">
                      <button
                        type="button"
                        onClick={() => { setShowForgot(true); setResetEmail(email); setResetMsg(null); }}
                        className="text-xs font-bold text-primary hover:underline hover:text-foreground transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-primary-foreground font-outfit font-bold rounded-full border-2 border-foreground shadow-hard py-4 text-xl hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard-hover active:translate-y-0.5 active:translate-x-0.5 active:shadow-hard-active transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 animate-pulse-glow"
                    >
                      {loading ? "Signing in…" : "Sign in"}
                    </button>

                    <p className="text-xs font-medium text-muted-foreground text-center mt-4 bg-muted p-3 rounded-lg border-2 border-slate-200">
                      Only <span className="text-primary font-bold">@kgpian.iitkgp.ac.in</span> emails are accepted.
                    </p>
                  </form>

                  <div className="mt-6 text-sm font-bold text-center text-muted-foreground">
                    New here?{" "}
                    <Link to="/register" className="text-primary underline decoration-2 underline-offset-4 hover:text-foreground transition-colors">
                      Create an account
                    </Link>
                  </div>
                </>
              ) : (
                /* ── Forgot Password Panel ── */
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <button
                    type="button"
                    onClick={() => { setShowForgot(false); setResetMsg(null); }}
                    className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors mb-6"
                  >
                    ← Back to sign in
                  </button>

                  <h2 className="font-outfit font-bold text-3xl mb-2">Reset password</h2>
                  <p className="text-muted-foreground font-medium text-sm mb-6">
                    Enter your IIT KGP email and we'll send you a reset link.
                  </p>

                  {resetMsg && (
                    <div className={`text-sm font-semibold mb-4 p-3 rounded-lg border-2 animate-shake ${
                      resetMsg.success
                        ? "text-green-700 bg-green-50 border-green-200"
                        : "text-destructive bg-destructive/10 border-destructive/20"
                    }`}>
                      {resetMsg.text}
                    </div>
                  )}

                  <form onSubmit={handlePasswordReset} className="space-y-5">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Email</span>
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-input border-2 border-slate-300 text-foreground focus:border-ring focus:shadow-hard outline-none transition-all duration-200"
                        placeholder="you@kgpian.iitkgp.ac.in"
                        required
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={resetLoading || resetMsg?.success === true}
                      className="w-full bg-primary text-primary-foreground font-outfit font-bold rounded-full border-2 border-foreground shadow-hard py-4 text-xl hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard-hover active:translate-y-0.5 active:translate-x-0.5 active:shadow-hard-active transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resetLoading ? "Sending…" : resetMsg?.success ? "Email Sent ✓" : "Send Reset Link"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* LEFT: Image & Decoration */}
          <div className="hidden lg:flex flex-col items-center justify-center order-1 lg:order-1 relative h-full min-h-[500px] animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
            {/* Massive Blue Circle */}
            <div className="absolute w-[350px] h-[350px] bg-[hsl(var(--quaternary))] rounded-full border-4 border-foreground shadow-hard -z-10 animate-float" />
            
            <div className="relative z-10 w-full max-w-md bg-white border-4 border-foreground rounded-[2rem] p-4 shadow-soft-hard transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-[hsl(var(--tertiary))] rounded-full border-4 border-foreground shadow-hard flex items-center justify-center animate-bounce-subtle z-20">
                <span className="text-2xl">👑</span>
              </div>
              <div className="overflow-hidden rounded-xl bg-muted border-2 border-slate-200">
                <img 
                  src="/assets/auth_screen.png" 
                  alt="Clash Royale Characters" 
                  className="w-full h-auto object-cover transform scale-105"
                />
              </div>
              <div className="mt-6 border-t-4 border-dashed border-slate-200 pt-4 pb-2 px-2">
                <h3 className="font-outfit font-bold text-2xl text-foreground mb-1">Welcome Back!</h3>
                <p className="text-muted-foreground font-medium text-sm">Sign in to check the leaderboard and join upcoming tournaments.</p>
              </div>
            </div>
            
            {/* Small decorative shapes */}
            <div className="absolute bottom-12 right-8 w-10 h-10 bg-[hsl(var(--primary))] rounded-full border-2 border-foreground shadow-hard animate-bounce-subtle [animation-delay:0.5s]" />
            <div className="absolute top-16 left-4 w-12 h-12 bg-[hsl(var(--secondary))] transform -rotate-12 border-2 border-foreground shadow-hard animate-bounce-subtle [animation-delay:1s]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
