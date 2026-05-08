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
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { fetchPlayerData, ClashPlayerData } from "@/lib/clashApi";

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

  // Arena
  arenaName: string;

  // Favourite card
  favouriteCardName: string;
  favouriteCardIcon: string;

  // Meta
  createdAt: Timestamp | null;
  lastUpdated: Timestamp | null;
  lastLoginAt: Timestamp | null;
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
    arenaName: "",
    favouriteCardName: "",
    favouriteCardIcon: "",
    createdAt: null,
    lastUpdated: null,
    lastLoginAt: null,
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
  prefetchedClashData?: ClashPlayerData
): Promise<UserProfile> {
  const profile = emptyProfile(uid, email, playerTag);

  // Use pre-fetched data if provided, otherwise fetch from API
  const clash = prefetchedClashData ?? await fetchPlayerData(playerTag);
  const clashFields = clash ? mapClashData(clash) : {};

  const docData = {
    ...profile,
    ...clashFields,
    playerTag, // always keep the raw tag
    createdAt: serverTimestamp(),
    lastUpdated: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
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
  });

  return { ...existing, ...clashFields };
}
