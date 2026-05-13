import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfileByTag, UserProfile } from "@/lib/userService";
import { FaArrowUp, FaBolt, FaBullseye, FaCrown, FaEnvelope, FaHashtag, FaHeart, FaMedal, FaShieldAlt, FaSpinner, FaStar, FaUsers } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";

const PublicProfile = () => {
  const { playerTag } = useParams<{ playerTag: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!playerTag) return;
      try {
        const data = await getProfileByTag(playerTag);
        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching public profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [playerTag]);

  if (loading) {
    return (
      <section className="py-12 mt-20 min-h-screen">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="inline-flex items-center justify-center text-inherit animate-spin text-4xl">⏳</span>
            <p className="text-muted-foreground font-outfit font-bold text-lg">
              Scouting the Warrior...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="py-12 mt-20 min-h-screen">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-outfit font-black text-4xl mb-4">Warrior Not Found</h2>
          <p className="text-muted-foreground mb-8 text-lg font-jakarta">This user hasn't entered the arena yet.</p>
          <button 
            onClick={() => navigate("/leaderboard")}
            className="bg-primary text-white font-outfit font-black px-8 py-4 rounded-full border-4 border-foreground shadow-hard hover:shadow-hard-hover transition-all"
          >
            Back to Leaderboard
          </button>
        </div>
      </section>
    );
  }

  // Compute derived stats
  const winRate =
    profile.wins + profile.losses > 0
      ? ((profile.wins / (profile.wins + profile.losses)) * 100).toFixed(1)
      : "0.0";

  const kd =
    profile.losses > 0
      ? (profile.wins / profile.losses).toFixed(2)
      : profile.wins.toString();

  return (
    <main className="min-h-screen py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--tertiary))] rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(var(--secondary))] rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-outfit font-extrabold text-5xl md:text-7xl text-foreground mb-4 drop-shadow-[4px_4px_0px_white]">
            Warrior <span className="text-primary">Profile</span>
          </h1>
          <div className="w-32 h-4 bg-primary mx-auto rounded-full border-2 border-foreground shadow-hard" />
        </div>

        {/* Main Identity Card */}
        <div className="bg-white border-4 border-foreground rounded-[3rem] shadow-soft-hard p-8 md:p-12 mb-12 relative overflow-hidden group">
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--foreground)_1px,_transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-white border-4 border-foreground shadow-hard overflow-hidden flex items-center justify-center bg-gradient-to-br from-white to-slate-100 transform group-hover:scale-105 transition-transform duration-500">
                {profile.favouriteCardIcon ? (
                  <img src={profile.favouriteCardIcon} alt={profile.favouriteCardName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl">🛡️</span>
                )}
              </div>
              {profile.expLevel > 0 && (
                <div className="absolute -bottom-2 right-4 bg-primary text-primary-foreground font-outfit font-black text-xl px-4 py-1 rounded-full border-4 border-foreground shadow-hard transform rotate-3">
                  Lv.{profile.expLevel}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h2 className="font-outfit font-black text-4xl md:text-6xl text-foreground tracking-tight">
                  {profile.playerName}
                </h2>
                <div className="inline-flex items-center self-center md:self-auto bg-foreground text-background px-4 py-1 rounded-full font-mono text-sm font-bold shadow-hard">
                  #{profile.playerTag.replace("#", "")}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 shadow-hard flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--tertiary))] border-2 border-foreground flex items-center justify-center text-2xl">🏛️</div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Hall of Residence</p>
                    <p className="font-outfit font-bold text-lg leading-tight">{profile.hall || "General Arena"}</p>
                  </div>
                </div>

                <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 shadow-hard flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--secondary))] border-2 border-foreground flex items-center justify-center text-2xl text-white">⚔️</div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Current Clan</p>
                    <p className="font-outfit font-bold text-lg leading-tight">{profile.clanName || "No Clan"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trophy Display */}
            <div className="flex flex-col items-center gap-4 bg-white border-4 border-foreground rounded-[2rem] p-8 shadow-hard transform md:rotate-3">
              <img src="/assets/Trophy.png" alt="Trophy" className="w-20 h-20 drop-shadow-hard" />
              <div className="text-center">
                <p className="font-outfit font-black text-5xl text-foreground">
                  {profile.trophies.toLocaleString()}
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
            value={profile.bestTrophies.toLocaleString()}
            label="Best Trophies"
            color="bg-[hsl(var(--tertiary))]"
          />
          <StatCard
            icon="⚔️"
            value={profile.wins.toLocaleString()}
            label="Total Wins"
            color="bg-[hsl(var(--primary))]"
          />
          <StatCard
            icon="👑"
            value={profile.threeCrownWins.toLocaleString()}
            label="3-Crown Wins"
            color="bg-[hsl(var(--quaternary))]"
          />
          <StatCard
            icon="🎯"
            value={`${winRate}%`}
            label="Win Rate"
            color="bg-[hsl(var(--secondary))]"
          />
        </div>

        {/* Extended Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border-4 border-foreground rounded-[2rem] p-8 shadow-soft-hard">
            <h3 className="font-outfit font-bold text-2xl mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-slate-100 border-2 border-foreground flex items-center justify-center">📊</span>
              Battle Statistics
            </h3>
            <div className="space-y-4">
              <StatRow label="Total Battles" value={profile.battleCount.toLocaleString()} />
              <StatRow label="W/L Ratio" value={kd} />
              <StatRow label="Total Donations" value={profile.totalDonations.toLocaleString()} />
              <StatRow label="War Day Wins" value={profile.warDayWins.toLocaleString()} />
            </div>
          </div>

          <div className="bg-white border-4 border-foreground rounded-[2rem] p-8 shadow-soft-hard">
            <h3 className="font-outfit font-bold text-2xl mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-slate-100 border-2 border-foreground flex items-center justify-center">🌟</span>
              Achievements
            </h3>
            <div className="space-y-4">
              <StatRow label="Tournament Battles" value={profile.tournamentBattleCount.toLocaleString()} />
              <StatRow label="Challenge Max Wins" value={profile.challengeMaxWins.toLocaleString()} />
              <StatRow label="Arena" value={profile.arenaName || "Arena 1"} />
              <StatRow label="Club Status" value="Member" />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => navigate("/leaderboard")}
            className="font-outfit font-black text-xl text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto group"
          >
            <span className="transform group-hover:-translate-x-2 transition-transform">⬅️</span>
            BACK TO LEADERBOARD
          </button>
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

export default PublicProfile;
