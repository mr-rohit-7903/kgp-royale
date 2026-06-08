/**
 * Firestore User Profile Service
 *
 * Manages the `users/{uid}` documents that store player profiles,
 * Clash Royale stats, and trophy history.
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { fetchPlayerData, ClashPlayerData, normalizeTag } from "@/lib/clashApi";

export interface UserProfile {
  // Firebase Auth fields
  uid: string;
  email: string;

  // Clash Royale identity
  playerTag: string;
  playerName: string;

  // Stats (from CR API)
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  wins: number;
  losses: number;
  battleCount: number;
  threeCrownWins: number;
  challengeMaxWins: number;
  tournamentBattleCount: number;
  warDayWins: number;
  donations: number;
  totalDonations: number;

  // Clan
  clanName: string;
  clanTag: string;
  role: string;

  // Hall of Residence
  hall: string;

  // Arena
  arenaName: string;

  // Favourite card
  favouriteCardName: string;
  favouriteCardIcon: string;

  // Meta
  createdAt: Timestamp | null;
  lastUpdated: Timestamp | null;
  lastLoginAt: Timestamp | null;
  lastSyncedAt: Timestamp | null;
}

/** Default empty profile */
function emptyProfile(uid: string, email: string, playerTag: string): UserProfile {
  return {
    uid,
    email,
    playerTag,
    playerName: "",
    expLevel: 0,
    trophies: 0,
    bestTrophies: 0,
    wins: 0,
    losses: 0,
    battleCount: 0,
    threeCrownWins: 0,
    challengeMaxWins: 0,
    tournamentBattleCount: 0,
    warDayWins: 0,
    donations: 0,
    totalDonations: 0,
    clanName: "",
    clanTag: "",
    role: "",
    hall: "",
    arenaName: "",
    favouriteCardName: "",
    favouriteCardIcon: "",
    createdAt: null,
    lastUpdated: null,
    lastLoginAt: null,
    lastSyncedAt: null,
  };
}

/** Map Clash API response to the fields we store */
function mapClashData(clash: ClashPlayerData): Partial<UserProfile> {
  return {
    playerName: clash.name,
    expLevel: clash.expLevel,
    trophies: clash.trophies,
    bestTrophies: clash.bestTrophies,
    wins: clash.wins,
    losses: clash.losses,
    battleCount: clash.battleCount,
    threeCrownWins: clash.threeCrownWins,
    challengeMaxWins: clash.challengeMaxWins,
    tournamentBattleCount: clash.tournamentBattleCount,
    warDayWins: clash.warDayWins,
    donations: clash.donations,
    totalDonations: clash.totalDonations,
    clanName: clash.clan?.name || "",
    clanTag: clash.clan?.tag || "",
    role: clash.role || "",
    arenaName: clash.arena?.name || "",
    favouriteCardName: clash.currentFavouriteCard?.name || "",
    favouriteCardIcon: clash.currentFavouriteCard?.iconUrls?.medium || "",
  };
}

/**
 * Create user profile in Firestore on registration.
 * Accepts optional pre-fetched Clash data to avoid redundant API calls
 * (the Register page validates the tag first).
 */
export async function createUserProfile(
  uid: string,
  email: string,
  playerTag: string,
  hall: string,
  prefetchedClashData?: ClashPlayerData
): Promise<UserProfile> {
  const normalized = `#${normalizeTag(playerTag)}`;
  const profile = { ...emptyProfile(uid, email, normalized), hall };

  // Use pre-fetched data if provided, otherwise fetch from API
  const clash = prefetchedClashData ?? await fetchPlayerData(normalized);
  const clashFields = clash ? mapClashData(clash) : {};

  const docData = {
    ...profile,
    ...clashFields,
    playerTag: normalized,
    hall,
    createdAt: serverTimestamp(),
    lastUpdated: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
    lastSyncedAt: serverTimestamp(),
  };

  await setDoc(doc(db, "users", uid), docData);

  return { ...profile, ...clashFields };
}

/**
 * Fetch user profile from Firestore.
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

/**
 * Fetch user profile from Firestore by playerTag.
 */
export async function getProfileByTag(tag: string): Promise<UserProfile | null> {
  const cleanTag = normalizeTag(tag);
  const tagged = `#${cleanTag}`;
  
  const usersRef = collection(db, "users");
  
  // Search for the tag with the # prefix first (standard)
  const q1 = query(usersRef, where("playerTag", "==", tagged), limit(1));
  const snap1 = await getDocs(q1);
  if (!snap1.empty) return snap1.docs[0].data() as UserProfile;

  // Fallback: search for the tag without the # prefix
  const q2 = query(usersRef, where("playerTag", "==", cleanTag), limit(1));
  const snap2 = await getDocs(q2);
  if (!snap2.empty) return snap2.docs[0].data() as UserProfile;
  
  return null;
}

/**
 * Refresh player stats from the Clash API and update Firestore.
 * Called on every login so trophies are always current.
 */
export async function refreshPlayerStats(uid: string): Promise<UserProfile | null> {
  const existing = await getUserProfile(uid);
  if (!existing) return null;

  const clash = await fetchPlayerData(existing.playerTag);
  if (!clash) {
    // API call failed — just update lastLoginAt and return existing data
    await updateDoc(doc(db, "users", uid), {
      lastLoginAt: serverTimestamp(),
    });
    return existing;
  }

  const clashFields = mapClashData(clash);

  await updateDoc(doc(db, "users", uid), {
    ...clashFields,
    lastUpdated: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
    lastSyncedAt: serverTimestamp(),
  });

  return { ...existing, ...clashFields };
}

/** Sync cooldown in milliseconds (2 hours) */
const SYNC_COOLDOWN_MS = 2 * 60 * 60 * 1000;

/**
 * Check whether the user can sync again.
 * Returns { canSync, nextSyncAt } where nextSyncAt is the Date
 * when syncing will be allowed again (null if allowed now).
 */
export function canSyncProfile(profile: UserProfile | null): {
  canSync: boolean;
  nextSyncAt: Date | null;
} {
  if (!profile?.lastSyncedAt) return { canSync: true, nextSyncAt: null };

  const lastSynced =
    profile.lastSyncedAt?.toDate ? profile.lastSyncedAt.toDate() : new Date(0);
  const nextAllowed = new Date(lastSynced.getTime() + SYNC_COOLDOWN_MS);
  const now = new Date();

  if (now >= nextAllowed) return { canSync: true, nextSyncAt: null };
  return { canSync: false, nextSyncAt: nextAllowed };
}

// ─── Leaderboard Cache ────────────────────────────────────────────────────────
// Caches leaderboard data in localStorage to reduce Firestore reads.
// Default TTL: 10 minutes. All consumers (Leaderboard page, Hall of Fame,
// Landing section) share the same cache.

const LEADERBOARD_CACHE_KEY = "kgp_leaderboard_cache";
const LEADERBOARD_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

interface LeaderboardCache {
  data: UserProfile[];
  count: number;
  timestamp: number;
}

function getLeaderboardCache(count: number): UserProfile[] | null {
  try {
    const raw = localStorage.getItem(LEADERBOARD_CACHE_KEY);
    if (!raw) return null;

    const cache: LeaderboardCache = JSON.parse(raw);
    const age = Date.now() - cache.timestamp;

    // Cache is stale
    if (age > LEADERBOARD_CACHE_TTL_MS) return null;

    // If the requested count is larger than what's cached, refetch
    if (count > cache.count) return null;

    // Return the requested slice from the cached data
    return cache.data.slice(0, count);
  } catch {
    return null;
  }
}

function setLeaderboardCache(data: UserProfile[], count: number): void {
  try {
    const cache: LeaderboardCache = {
      data,
      count,
      timestamp: Date.now(),
    };
    localStorage.setItem(LEADERBOARD_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

/**
 * Invalidate the leaderboard cache.
 * Call this after a profile sync so updated trophies are reflected.
 */
export function invalidateLeaderboardCache(): void {
  try {
    localStorage.removeItem(LEADERBOARD_CACHE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Fetch top players for the leaderboard.
 * Results are cached in localStorage for 10 minutes to reduce Firestore reads.
 */
export async function getTopPlayers(count: number = 8): Promise<UserProfile[]> {
  // 1. Try serving from cache first
  const cached = getLeaderboardCache(count);
  if (cached) return cached;

  // 2. Cache miss — fetch from Firestore
  const usersRef = collection(db, "users");
  const q = query(usersRef, orderBy("trophies", "desc"), limit(count));
  const querySnapshot = await getDocs(q);
  
  const players = querySnapshot.docs.map(doc => doc.data() as UserProfile);

  // 3. Store in cache for next time
  setLeaderboardCache(players, count);

  return players;
}
