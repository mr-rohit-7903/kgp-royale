// src/pages/user/Profile.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {

  Crown,
  Swords,
  Shield,
  Users,
  Star,
  RefreshCw,
  Zap,
  Target,
  Medal,
  Heart,
  ArrowUp,
  Loader2,
  Mail,
  Hash,
} from "lucide-react";

const PlayerProfile = () => {
  const { user, profile, loading, profileLoading, refreshProfile } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading || (!profile && profileLoading)) {
    return (
      <section className="py-12 mt-20 min-h-screen">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-12 h-12 text-accent animate-spin" />
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
    <section className="py-12 mt-20 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header Card — Player Identity */}
        <div className="cr-card champion-frame-gold p-8 md:p-10 mb-8 relative overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Top row: Name + Refresh */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-5">
                {/* Avatar placeholder with level */}
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-accent/30 to-primary/30 border-2 border-accent/50 flex items-center justify-center">
                    <Crown className="w-10 h-10 md:w-12 md:h-12 text-accent" />
                  </div>
                  {profile && profile.expLevel > 0 && (
                    <div className="absolute -bottom-2 -right-2 bg-accent text-navy-dark font-title text-sm px-2 py-0.5 rounded-lg shadow-lg">
                      Lv.{profile.expLevel}
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="font-title text-3xl md:text-4xl text-foreground">
                    {profile?.playerName || "Clasher"}
                  </h1>
                  {profile?.playerTag && (
                    <p className="text-muted-foreground text-sm font-mono flex items-center gap-1 mt-1">
                      <Hash className="w-3 h-3" />
                      {profile.playerTag.replace("#", "")}
                    </p>
                  )}
                  {profile?.clanName && (
                    <p className="text-primary font-body mt-1 flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4" />
                      {profile.clanName}
                      {profile.role && (
                        <span className="text-muted-foreground text-xs bg-secondary px-2 py-0.5 rounded-full">
                          {profile.role}
                        </span>
                      )}
                    </p>
                  )}
                  <p className="text-muted-foreground text-xs flex items-center gap-1 mt-1">
                    <Mail className="w-3 h-3" />
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                onClick={refreshProfile}
                disabled={profileLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border hover:border-accent/50 transition-all text-sm text-muted-foreground hover:text-accent disabled:opacity-50"
                title="Refresh stats from Clash Royale"
              >
                <RefreshCw
                  className={`w-4 h-4 ${profileLoading ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

            {/* Trophy + Arena Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4">
              <div className="flex items-center gap-3 bg-secondary/80 px-6 py-3 rounded-xl border border-border">
                <img src="/assets/Trophy.png" alt="Trophy" className="w-7 h-7 object-contain" />
                <div>
                  <p className="font-title text-2xl md:text-3xl text-accent">
                    {profile?.trophies?.toLocaleString() || "—"}
                  </p>
                  <p className="text-xs text-muted-foreground">Current Trophies</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-secondary/80 px-6 py-3 rounded-xl border border-border">
                <Star className="w-7 h-7 text-yellow-400" />
                <div>
                  <p className="font-title text-2xl md:text-3xl text-yellow-400">
                    {profile?.bestTrophies?.toLocaleString() || "—"}
                  </p>
                  <p className="text-xs text-muted-foreground">Best Trophies</p>
                </div>
              </div>

              {profile?.arenaName && (
                <div className="flex items-center gap-3 bg-secondary/80 px-6 py-3 rounded-xl border border-border">
                  <Shield className="w-7 h-7 text-primary" />
                  <div>
                    <p className="font-title text-lg text-primary">
                      {profile.arenaName}
                    </p>
                    <p className="text-xs text-muted-foreground">Current Arena</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Swords className="w-6 h-6 text-green-400" />}
            value={profile?.wins?.toLocaleString() || "0"}
            label="Wins"
            glow="green"
          />
          <StatCard
            icon={<Shield className="w-6 h-6 text-red-400" />}
            value={profile?.losses?.toLocaleString() || "0"}
            label="Losses"
            glow="red"
          />
          <StatCard
            icon={<Crown className="w-6 h-6 text-accent" />}
            value={profile?.threeCrownWins?.toLocaleString() || "0"}
            label="3-Crown Wins"
            glow="gold"
          />
          <StatCard
            icon={<Target className="w-6 h-6 text-primary" />}
            value={profile?.battleCount?.toLocaleString() || "0"}
            label="Total Battles"
            glow="blue"
          />
          <StatCard
            icon={<ArrowUp className="w-6 h-6 text-emerald-400" />}
            value={`${winRate}%`}
            label="Win Rate"
            glow="green"
          />
          <StatCard
            icon={<Zap className="w-6 h-6 text-yellow-300" />}
            value={kd}
            label="W/L Ratio"
            glow="gold"
          />
          <StatCard
            icon={<Medal className="w-6 h-6 text-purple-400" />}
            value={profile?.tournamentBattleCount?.toLocaleString() || "0"}
            label="Tournament Battles"
            glow="purple"
          />
          <StatCard
            icon={<Star className="w-6 h-6 text-orange-400" />}
            value={profile?.challengeMaxWins?.toLocaleString() || "0"}
            label="Challenge Max Wins"
            glow="orange"
          />
        </div>

        {/* Bottom Row: Clan + Donations + Favourite Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* War Stats */}
          <div className="cr-card p-6 flex flex-col items-center text-center">
            <Swords className="w-8 h-8 text-red-400 mb-3" />
            <p className="font-title text-2xl">
              {profile?.warDayWins?.toLocaleString() || "0"}
            </p>
            <p className="text-muted-foreground text-sm">War Day Wins</p>
          </div>

          {/* Donations */}
          <div className="cr-card p-6 flex flex-col items-center text-center">
            <Heart className="w-8 h-8 text-pink-400 mb-3" />
            <p className="font-title text-2xl">
              {profile?.totalDonations?.toLocaleString() || "0"}
            </p>
            <p className="text-muted-foreground text-sm">Total Donations</p>
          </div>

          {/* Favourite Card */}
          <div className="cr-card p-6 flex flex-col items-center text-center">
            {profile?.favouriteCardIcon ? (
              <img
                src={profile.favouriteCardIcon}
                alt={profile.favouriteCardName}
                className="w-16 h-16 object-contain mb-2"
              />
            ) : (
              <Crown className="w-8 h-8 text-accent mb-3" />
            )}
            <p className="font-title text-lg">
              {profile?.favouriteCardName || "—"}
            </p>
            <p className="text-muted-foreground text-sm">Favourite Card</p>
          </div>
        </div>

        {/* Last Updated */}
        {profile?.lastUpdated && (
          <p className="text-center text-xs text-muted-foreground mb-4">
            Stats last updated:{" "}
            {profile.lastUpdated?.toDate
              ? profile.lastUpdated.toDate().toLocaleString()
              : "—"}
          </p>
        )}

        {/* No profile data message */}
        {!profile && !profileLoading && (
          <div className="cr-card p-8 text-center">
            <Crown className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="font-title text-xl mb-2">Profile Not Found</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Your Clash Royale data hasn't been synced yet. This can happen if the Clash API is unavailable.
            </p>
            <button
              onClick={refreshProfile}
              disabled={profileLoading}
              className="bg-accent text-navy-dark font-title py-2 px-6 rounded-xl hover:scale-[1.02] transition"
            >
              Try Syncing Now
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

/** Reusable stat card component */
function StatCard({
  icon,
  value,
  label,
  glow,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  glow: string;
}) {
  const glowColors: Record<string, string> = {
    gold: "hover:shadow-[0_0_20px_rgba(255,200,0,0.3)]",
    blue: "hover:shadow-[0_0_20px_rgba(0,100,255,0.3)]",
    green: "hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]",
    red: "hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    purple: "hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    orange: "hover:shadow-[0_0_20px_rgba(251,146,60,0.3)]",
  };

  return (
    <div
      className={`cr-card p-5 flex flex-col items-center text-center transition-shadow ${
        glowColors[glow] || ""
      }`}
    >
      <div className="mb-3">{icon}</div>
      <p className="font-title text-xl md:text-2xl">{value}</p>
      <p className="text-muted-foreground text-xs mt-1">{label}</p>
    </div>
  );
}

export default PlayerProfile;
