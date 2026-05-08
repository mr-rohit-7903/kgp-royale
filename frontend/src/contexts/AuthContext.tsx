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
} from "@/lib/userService";
import { ClashPlayerData } from "@/lib/clashApi";

const ALLOWED_DOMAIN = "@kgpian.iitkgp.ac.in";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  profileLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, playerTag: string, clashData?: ClashPlayerData) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
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

  const signIn = async (email: string, password: string) => {
    validateEmailDomain(email);
    const credential = await signInWithEmailAndPassword(auth, email, password);

    // Refresh stats from Clash API on every login
    setProfileLoading(true);
    try {
      const updated = await refreshPlayerStats(credential.user.uid);
      setProfile(updated);
    } catch (err) {
      console.warn("Failed to refresh stats on login:", err);
    } finally {
      setProfileLoading(false);
    }
  };

  const signUp = async (email: string, password: string, playerTag: string, clashData?: ClashPlayerData) => {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
