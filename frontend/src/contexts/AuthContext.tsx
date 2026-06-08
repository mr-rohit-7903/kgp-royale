import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  createUserProfile,
  refreshPlayerStats,
  getUserProfile,
  UserProfile,
  canSyncProfile,
  invalidateLeaderboardCache,
} from "@/lib/userService";
import { ClashPlayerData } from "@/lib/clashApi";

const ALLOWED_DOMAIN = "@kgpian.iitkgp.ac.in";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  profileLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, playerTag: string, hall: string, clashData?: ClashPlayerData) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  syncProfile: () => Promise<{ success: boolean; message: string }>;
  canSync: boolean;
  nextSyncAt: Date | null;
  syncing: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

function validateEmailDomain(email: string): void {
  if (!email.toLowerCase().endsWith(ALLOWED_DOMAIN)) {
    throw new Error(
      `Only IIT Kharagpur emails (${ALLOWED_DOMAIN}) are allowed.`
    );
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [canSync, setCanSync] = useState(true);
  const [nextSyncAt, setNextSyncAt] = useState<Date | null>(null);

  // Load profile from Firestore when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setProfileLoading(true);
        try {
          const p = await getUserProfile(firebaseUser.uid);
          setProfile(p);
        } catch (err) {
          console.warn("Failed to load profile:", err);
        } finally {
          setProfileLoading(false);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Recalculate sync eligibility whenever profile changes
  useEffect(() => {
    const { canSync: eligible, nextSyncAt: next } = canSyncProfile(profile);
    setCanSync(eligible);
    setNextSyncAt(next);

    // If on cooldown, set a timer to auto-unlock when it expires
    if (next) {
      const ms = next.getTime() - Date.now();
      if (ms > 0) {
        const timer = setTimeout(() => {
          setCanSync(true);
          setNextSyncAt(null);
        }, ms);
        return () => clearTimeout(timer);
      }
    }
  }, [profile]);

  const signIn = async (email: string, password: string) => {
    validateEmailDomain(email);
    const credential = await signInWithEmailAndPassword(auth, email, password);

    // Refresh stats from Clash API on every login
    setProfileLoading(true);
    try {
      const updated = await refreshPlayerStats(credential.user.uid);
      setProfile(updated);
      invalidateLeaderboardCache();
    } catch (err) {
      console.warn("Failed to refresh stats on login:", err);
    } finally {
      setProfileLoading(false);
    }
  };

  const signUp = async (email: string, password: string, playerTag: string, hall: string, clashData?: ClashPlayerData) => {
    validateEmailDomain(email);
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Create Firestore profile with pre-fetched CR API data
    setProfileLoading(true);
    try {
      const newProfile = await createUserProfile(
        credential.user.uid,
        email,
        playerTag,
        hall,
        clashData
      );
      setProfile(newProfile);
    } catch (err) {
      console.warn("Failed to create profile:", err);
    } finally {
      setProfileLoading(false);
    }

    // Send verification email
    await sendEmailVerification(credential.user);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (!user) return;
    setProfileLoading(true);
    try {
      const updated = await refreshPlayerStats(user.uid);
      setProfile(updated);
    } catch (err) {
      console.warn("Failed to refresh profile:", err);
    } finally {
      setProfileLoading(false);
    }
  };

  /**
   * Manual sync with 2-hour cooldown enforcement.
   * Returns a result object so the UI can display appropriate feedback.
   */
  const syncProfile = async (): Promise<{ success: boolean; message: string }> => {
    if (!user) return { success: false, message: "Not logged in." };

    const { canSync: eligible, nextSyncAt: next } = canSyncProfile(profile);
    if (!eligible && next) {
      const mins = Math.ceil((next.getTime() - Date.now()) / 60000);
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      const timeStr = h > 0 ? `${h}h ${m}m` : `${m}m`;
      return { success: false, message: `Sync available in ${timeStr}` };
    }

    setSyncing(true);
    try {
      const updated = await refreshPlayerStats(user.uid);
      setProfile(updated);
      invalidateLeaderboardCache();
      return { success: true, message: "Stats synced successfully!" };
    } catch (err) {
      console.warn("Sync failed:", err);
      return { success: false, message: "Sync failed. Try again later." };
    } finally {
      setSyncing(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        profileLoading,
        signIn,
        signUp,
        signOut,
        refreshProfile,
        syncProfile,
        canSync,
        nextSyncAt,
        syncing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
