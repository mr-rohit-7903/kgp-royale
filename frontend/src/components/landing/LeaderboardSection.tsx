import { Trophy, Crown, Search, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const leaderboardData = [
  { rank: 1, name: "DragonSlayer", clan: "KGP Legends", trophies: 7823, avatar: "👑" },
  { rank: 2, name: "ElixirMaster", clan: "Arena Kings", trophies: 7654, avatar: "⚔️" },
  { rank: 3, name: "RoyalKnight", clan: "KGP Legends", trophies: 7521, avatar: "🛡️" },
  { rank: 4, name: "TowerCrusher", clan: "Battle Lords", trophies: 7398, avatar: "🏰" },
  { rank: 5, name: "SpellCaster", clan: "Arena Kings", trophies: 7245, avatar: "✨" },
  { rank: 6, name: "GolemMaster", clan: "KGP Legends", trophies: 7112, avatar: "🗿" },
  { rank: 7, name: "HogRider99", clan: "Battle Lords", trophies: 6987, avatar: "🐗" },
  { rank: 8, name: "PrinceFury", clan: "KGP Legends", trophies: 6854, avatar: "👸" },
];

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-accent/20 to-transparent border-accent";
    case 2:
      return "bg-gradient-to-r from-gray-400/20 to-transparent border-gray-400";
    case 3:
      return "bg-gradient-to-r from-orange-600/20 to-transparent border-orange-600";
    default:
      return "";
  }
};


const LeaderboardSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = leaderboardData.filter(
    (player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.clan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-title text-4xl md:text-6xl cr-title mb-4">
            <span className="text-foreground">Live</span>{" "}
            <span className="text-primary">Leaderboard</span>
          </h2>
          <div className="section-divider w-48 mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto">

          {/* Leaderboard */}
          <div className="cr-card overflow-hidden">
            {/* Header */}
            <div className="bg-secondary px-6 py-4 border-b-2 border-border grid grid-cols-12 gap-4 font-title text-sm text-muted-foreground">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Player</div>
              <div className="col-span-4">Clan</div>
              <div className="col-span-2 text-right">
                <Trophy className="w-4 h-4 inline" />
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border">
              {filteredData.map((player) => (
                <div
                  key={player.rank}
                  className={`px-6 py-4 grid grid-cols-12 gap-4 items-center transition-colors hover:bg-secondary/50 ${getRankStyle(player.rank)}`}
                >
                  <div className="col-span-1 flex items-center">
                    <span className="font-title text-lg text-muted-foreground">#{player.rank}</span>
                  </div>
                  <div className="col-span-5 flex items-center gap-3">
                    <span className="text-2xl">{player.avatar}</span>
                    <span className="font-semibold text-foreground font-body">{player.name}</span>
                  </div>
                  <div className="col-span-4">
                    <span className="text-muted-foreground font-body text-sm">{player.clan}</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-title text-accent">{player.trophies.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Link to="/leaderboard">
              <Button
                size="lg"
                variant="royal"
                className="font-title text-lg px-8 py-6 group"
              >
                <Trophy className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
