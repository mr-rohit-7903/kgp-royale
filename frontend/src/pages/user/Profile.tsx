// src/components/profile/PlayerProfile.tsx
import { Trophy, Crown, Swords, Shield, Users, Star } from "lucide-react";

const dummyPlayerData = {
  name: "DragonSlayer",
  tag: "#KGP123",
  expLevel: 47,
  trophies: 6420,
  bestTrophies: 6812,

  wins: 520,
  losses: 210,
  threeCrownWins: 76,

  clan: {
    name: "KGP Legends",
  },

  role: "coLeader",

  currentFavouriteCard: {
    name: "Mega Knight",
    iconUrls: {
      medium:
        "https://cdn.statsroyale.com/images/cards/webp/mega_knight.webp",
    },
  },
};

const PlayerProfile = () => {
  const data = dummyPlayerData;

  return (
    <section className="py-12 mt-20">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Card */}
        <div className="cr-card p-8 md:p-10">

          {/* Top section: Name + Tag */}
          <div className="flex items-center gap-6 mb-6">

            <div>
              <h2 className="font-title text-3xl text-foreground">{data.name}</h2>
              <p className="text-muted-foreground text-sm font-body">{data.tag}</p>

              {data.clan && (
                <p className="text-primary font-body mt-1 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {data.clan.name}
                  <span className="text-muted-foreground">({data.role})</span>
                </p>
              )}
            </div>
          </div>

          {/* Trophies */}
          <div className="flex items-center justify-center gap-6 my-6">
            <div className="bg-secondary px-5 py-3 rounded-xl border border-border flex items-center gap-3">
              <Trophy className="w-6 h-6 text-accent" />
              <span className="font-title text-2xl text-accent">
                {data.trophies}
              </span>
            </div>

            <div className="bg-secondary px-5 py-3 rounded-xl border border-border flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-400" />
              <span className="font-title text-2xl">{data.bestTrophies}</span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6 text-center">
            <div className="cr-card p-4">
              <Swords className="w-6 h-6 mx-auto text-primary mb-2" />
              <p className="font-title text-xl">{data.wins}</p>
              <p className="text-muted-foreground text-sm">Wins</p>
            </div>

            <div className="cr-card p-4">
              <Shield className="w-6 h-6 mx-auto text-red-500 mb-2" />
              <p className="font-title text-xl">{data.losses}</p>
              <p className="text-muted-foreground text-sm">Losses</p>
            </div>

            <div className="cr-card p-4">
              <Crown className="w-6 h-6 mx-auto text-accent mb-2" />
              <p className="font-title text-xl">{data.threeCrownWins}</p>
              <p className="text-muted-foreground text-sm">3-Crown Wins</p>
            </div>
          </div>

          {/* King level */}
          <div className="text-center mt-10">
            <p className="font-title text-xl text-primary">
              King Level: {data.expLevel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerProfile;
