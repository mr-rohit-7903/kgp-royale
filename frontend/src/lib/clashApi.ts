/**
 * Clash Royale API Service
 *
 * The official CR API (api.clashroyale.com) doesn't support CORS for browser requests
 * and requires an IP-whitelisted API key. We route through a configurable proxy.
 *
 * Set VITE_CLASH_PROXY_URL in .env to your proxy base URL.
 */

const PROXY_BASE = import.meta.env.VITE_CLASH_PROXY_URL?.replace(/\/$/, "");

const API_KEY = import.meta.env.VITE_CLASH_API_KEY || "";

/** Normalise a player tag: strip # and whitespace, uppercase */
export function normalizeTag(tag: string): string {
  return tag.replace(/^#/, "").replace(/\s/g, "").toUpperCase();
}

export interface ClashPlayerData {
  tag: string;
  name: string;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  wins: number;
  losses: number;
  battleCount: number;
  threeCrownWins: number;
  challengeCardsWon: number;
  challengeMaxWins: number;
  tournamentCardsWon: number;
  tournamentBattleCount: number;
  role: string;
  donations: number;
  donationsReceived: number;
  totalDonations: number;
  warDayWins: number;
  clanWarTrophies: number;
  clan?: {
    tag: string;
    name: string;
    badgeId: number;
  };
  arena?: {
    id: number;
    name: string;
  };
  currentFavouriteCard?: {
    name: string;
    id: number;
    maxLevel: number;
    iconUrls: {
      medium: string;
    };
  };
}

/**
 * Fetch a player profile from the Clash Royale API.
 * Returns null if the request fails (CORS, key issues, etc.).
 */
export async function fetchPlayerData(
  playerTag: string
): Promise<ClashPlayerData | null> {
  const tag = normalizeTag(playerTag);
  const url = `${PROXY_BASE}/players/%23${tag}`;

  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (API_KEY) {
      headers["Authorization"] = `Bearer ${API_KEY}`;
    }

    const res = await fetch(url, { headers });

    if (!res.ok) {
      console.warn(`Clash API returned ${res.status} for tag #${tag}`);
      return null;
    }

    const data = await res.json();
    return data as ClashPlayerData;
  } catch (err) {
    console.warn("Failed to fetch Clash Royale player data:", err);
    return null;
  }
}
