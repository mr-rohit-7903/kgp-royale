// src/pages/user/Profile.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { FaArrowUp, FaBolt, FaBullseye, FaCrown, FaEnvelope, FaHashtag, FaHeart, FaMedal, FaShieldAlt, FaSpinner, FaStar, FaSync, FaUsers } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";



const PlayerProfile = () => {
  const { user, profile, loading, profileLoading, signOut, syncProfile, canSync, nextSyncAt, syncing } = useAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState("");
  const [syncMessage, setSyncMessage] = useState<{ text: string; success: boolean } | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  // Live countdown timer for sync cooldown
  useEffect(() => {
    if (!nextSyncAt) {
      setCountdown("");
      return;
    }
    const tick = () => {
      const diff = nextSyncAt.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown("");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [nextSyncAt]);

  if (loading || (!profile && profileLoading)) {
    return (
      <section className="py-12 mt-20 min-h-screen">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="inline-flex items-center justify-center text-inherit">⏳</span>
            <p className="text-muted-foreground font-title text-lg">
              Loading your profile…
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!user) return null;

  // Compute derived stats
  const winRate =
    profile && profile.wins + profile.losses > 0
      ? ((profile.wins / (profile.wins + profile.losses)) * 100).toFixed(1)
      : "0.0";

  const kd =
    profile && profile.losses > 0
      ? (profile.wins / profile.losses).toFixed(2)
      : profile?.wins?.toString() || "0";

  return (
    <main className="min-h-screen py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--tertiary))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(var(--secondary))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse [animation-delay:1s]" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="font-outfit font-extrabold text-5xl md:text-7xl text-foreground mb-4 drop-shadow-[4px_4px_0px_white]">
            Warrior <span className="text-primary">Profile</span>
          </h1>
          <div className="w-32 h-4 bg-primary mx-auto rounded-full border-2 border-foreground shadow-hard animate-pulse" />
        </div>

        {/* Main Identity Card */}
        <div className="bg-card border-4 border-foreground rounded-[3rem] shadow-soft-hard p-8 md:p-12 mb-12 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-75">
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--foreground)_1px,_transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-white border-4 border-foreground shadow-hard overflow-hidden flex items-center justify-center bg-gradient-to-br from-white to-slate-100 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                {profile?.favouriteCardIcon ? (
                  <img src={profile.favouriteCardIcon} alt={profile.favouriteCardName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl">🛡️</span>
                )}
              </div>
              {profile && profile.expLevel > 0 && (
                <div className="absolute -bottom-2 right-4 bg-primary text-primary-foreground font-outfit font-black text-xl px-4 py-1 rounded-full border-4 border-foreground shadow-hard transform rotate-3 animate-bounce-subtle">
                  Lv.{profile.expLevel}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h2 className="font-outfit font-black text-4xl md:text-6xl text-foreground tracking-tight">
                  {profile?.playerName || "Clasher"}
                </h2>
                <div className="inline-flex items-center self-center md:self-auto bg-foreground text-background px-4 py-1 rounded-full font-mono text-sm font-bold shadow-hard transform hover:scale-105 transition-transform duration-300">
                  #{profile?.playerTag?.replace("#", "") || "000000"}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-foreground rounded-2xl p-4 shadow-hard flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--tertiary))] border-2 border-foreground flex items-center justify-center text-2xl">🏛️</div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Hall of Residence</p>
                    <p className="font-outfit font-bold text-lg leading-tight">{profile?.hall || "General Arena"}</p>
                  </div>
                </div>

                <div className="bg-white border-2 border-foreground rounded-2xl p-4 shadow-hard flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--secondary))] border-2 border-foreground flex items-center justify-center text-2xl text-white">⚔️</div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Current Clan</p>
                    <p className="font-outfit font-bold text-lg leading-tight">{profile?.clanName || "No Clan"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trophy Display */}
            <div className="flex flex-col items-center gap-4 bg-white border-4 border-foreground rounded-[2rem] p-8 shadow-hard transform md:rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
              <img src="/assets/Trophy.png" alt="Trophy" className="w-20 h-20 drop-shadow-hard animate-float" />
              <div className="text-center">
                <p className="font-outfit font-black text-5xl text-foreground">
                  {profile?.trophies?.toLocaleString() || "0"}
                </p>
                <p className="text-sm font-bold text-primary uppercase tracking-widest">Trophies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon="🏆"
            value={profile?.bestTrophies?.toLocaleString() || "0"}
            label="Best Trophies"
            color="bg-[hsl(var(--tertiary))]"
            className="animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100"
          />
          <StatCard
            icon="⚔️"
            value={profile?.wins?.toLocaleString() || "0"}
            label="Total Wins"
            color="bg-[hsl(var(--primary))]"
            className="animate-in fade-in slide-in-from-bottom-8 duration-500 delay-150"
          />
          <StatCard
            icon="👑"
            value={profile?.threeCrownWins?.toLocaleString() || "0"}
            label="3-Crown Wins"
            color="bg-[hsl(var(--quaternary))]"
            className="animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200"
          />
          <StatCard
            icon="🎯"
            value={`${winRate}%`}
            label="Win Rate"
            color="bg-[hsl(var(--secondary))]"
            className="animate-in fade-in slide-in-from-bottom-8 duration-500 delay-250"
          />
        </div>

        {/* Extended Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border-4 border-foreground rounded-[2rem] p-8 shadow-soft-hard animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <h3 className="font-outfit font-bold text-2xl mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-slate-100 border-2 border-foreground flex items-center justify-center">📊</span>
              Battle Statistics
            </h3>
            <div className="space-y-4">
              <StatRow label="Total Battles" value={profile?.battleCount?.toLocaleString() || "0"} />
              <StatRow label="W/L Ratio" value={kd} />
              <StatRow label="Total Donations" value={profile?.totalDonations?.toLocaleString() || "0"} />
              <StatRow label="War Day Wins" value={profile?.warDayWins?.toLocaleString() || "0"} />
            </div>
          </div>

          <div className="bg-white border-4 border-foreground rounded-[2rem] p-8 shadow-soft-hard animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[350ms]">
            <h3 className="font-outfit font-bold text-2xl mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-slate-100 border-2 border-foreground flex items-center justify-center">🌟</span>
              Achievements
            </h3>
            <div className="space-y-4">
              <StatRow label="Tournament Battles" value={profile?.tournamentBattleCount?.toLocaleString() || "0"} />
              <StatRow label="Challenge Max Wins" value={profile?.challengeMaxWins?.toLocaleString() || "0"} />
              <StatRow label="Arena" value={profile?.arenaName || "Arena 1"} />
              <StatRow label="Sync Status" value={canSync ? "Ready" : `Cooldown (${countdown || "…"})`} />
            </div>
          </div>
        </div>

        {/* Sync & Logout Section */}
        <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          {/* Sync Button */}
          <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
            <Button
              variant="royal"
              size="lg"
              disabled={!canSync || syncing}
              className={`w-full sm:w-auto px-12 py-6 font-outfit font-black text-xl border-4 border-foreground shadow-hard hover:shadow-hard-hover active:shadow-hard-active transition-all rounded-full transform hover:-rotate-1 ${
                !canSync ? "opacity-60 cursor-not-allowed" : "animate-pulse-glow"
              }`}
              onClick={async () => {
                setSyncMessage(null);
                const result = await syncProfile();
                setSyncMessage({ text: result.message, success: result.success });
                // Auto-dismiss success message
                if (result.success) {
                  setTimeout(() => setSyncMessage(null), 4000);
                }
              }}
            >
              {syncing ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Syncing…
                </>
              ) : (
                <>
                  <FaSync className={`mr-2 ${canSync ? "animate-spin-slow" : "opacity-50"}`} />
                  {canSync ? "Sync Stats" : `Sync in ${countdown || "…"}`}
                </>
              )}
            </Button>
            {syncMessage && (
              <p className={`font-jakarta font-bold text-sm animate-bounce ${
                syncMessage.success ? "text-green-600" : "text-red-500"
              }`}>
                {syncMessage.text}
              </p>
            )}
          </div>

          {/* Logout */}
          <Button
            variant="destructive"
            size="lg"
            className="w-full sm:w-auto px-16 py-8 font-outfit font-black text-2xl border-4 border-foreground shadow-hard hover:shadow-hard-hover active:shadow-hard-active transition-all rounded-full transform hover:-rotate-1"
            onClick={async () => {
              await signOut();
              navigate("/login");
            }}
          >
            ABANDON ARENA
          </Button>
          {profile?.lastSyncedAt && (
            <p className="mt-2 font-jakarta font-bold text-muted-foreground opacity-50 text-sm">
              STATS LAST SYNCED: {profile.lastSyncedAt?.toDate ? profile.lastSyncedAt.toDate().toLocaleString().toUpperCase() : "—"}
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

/** Reusable stat card component */
function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="bg-white border-4 border-foreground rounded-[2rem] p-6 shadow-hard transition-all hover:-translate-y-1 hover:shadow-hard-hover">
      <div className={`w-14 h-14 rounded-2xl ${color} border-2 border-foreground shadow-hard flex items-center justify-center text-3xl mb-4`}>
        {icon}
      </div>
      <p className="font-outfit font-black text-3xl text-foreground mb-1">{value}</p>
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
    </div>
  );
}

/** Reusable row component for stats */
function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b-2 border-slate-100 last:border-0">
      <span className="font-jakarta font-bold text-muted-foreground">{label}</span>
      <span className="font-outfit font-black text-xl text-foreground">{value}</span>
    </div>
  );
}

export default PlayerProfile;
