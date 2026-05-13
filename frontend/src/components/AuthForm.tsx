import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { toast } from "@/hooks/use-toast";
import { GiCrossedSwords } from "react-icons/gi";
import { FaCrown, FaEnvelope, FaLock } from "react-icons/fa";


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!isLogin && !username) {
      toast({
        title: "Missing Username",
        description: "Please enter your Clash Royale username",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isLogin ? "Welcome Back!" : "Registration Successful!",
      description: isLogin 
        ? "You have successfully logged in. Let's clash!" 
        : "Your account has been created. Time to battle!",
    });
  };

  return (
    <div className="cr-card p-6 md:p-8 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="inline-flex items-center justify-center text-inherit">⚔️</span>
        <h2 className="font-title text-2xl md:text-3xl text-foreground">
          {isLogin ? "Login" : "Register"}
        </h2>
        <span className="inline-flex items-center justify-center text-inherit">⚔️</span>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mb-8 p-4 bg-secondary/50 rounded-xl">
        <span className={`font-title text-sm ${isLogin ? "text-accent" : "text-muted-foreground"}`}>
          Login
        </span>
        <Switch
          checked={!isLogin}
          onCheckedChange={(checked) => setIsLogin(!checked)}
          className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-primary"
        />
        <span className={`font-title text-sm ${!isLogin ? "text-accent" : "text-muted-foreground"}`}>
          Register
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-body flex items-center gap-2">
            <span className="inline-flex items-center justify-center text-inherit">✉️</span>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="warrior@clash.com"
            className="bg-secondary/50 border-2 border-border focus:border-accent h-12 rounded-xl text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-body flex items-center gap-2">
            <span className="inline-flex items-center justify-center text-inherit">🔒</span>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-secondary/50 border-2 border-border focus:border-accent h-12 rounded-xl text-foreground"
          />
        </div>

        {!isLogin && (
          <div className="space-y-2 animate-in slide-in-from-top duration-300">
            <Label htmlFor="username" className="text-foreground font-body flex items-center gap-2">
              <span className="inline-flex items-center justify-center text-inherit">👑</span>
              Clash Royale Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="YourClashTag"
              className="bg-secondary/50 border-2 border-border focus:border-accent h-12 rounded-xl text-foreground placeholder:text-muted-foreground"
            />
          </div>
        )}

        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full mt-6"
        >
          <span className="inline-flex items-center justify-center text-inherit">⚔️</span>
          {isLogin ? "Battle In!" : "Join the Clan!"}
        </Button>
      </form>

      {/* Decorative */}
      <div className="flex justify-center gap-2 mt-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-accent/40"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthForm;
