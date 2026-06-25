"use client";

import { create } from "zustand";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { ensureUserDocument } from "@/services/userService";

let unsubscribeAuth = null;

function serializeUser(user) {
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    displayName: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
  };
}

function authFields(user) {
  const currentUser = serializeUser(user);

  return {
    currentUser,
    displayName: currentUser?.displayName || "",
    email: currentUser?.email || "",
    photoURL: currentUser?.photoURL || "",
  };
}

export const useAuthStore = create((set, get) => ({
  currentUser: null,
  displayName: "",
  email: "",
  photoURL: "",
  loading: true,
  error: "",

  initAuthListener: () => {
    if (unsubscribeAuth) {
      return unsubscribeAuth;
    }

    unsubscribeAuth = onAuthStateChanged(
      auth,
      async (user) => {
        try {
          if (user) {
            await ensureUserDocument(user);
          }

          set({
            ...authFields(user),
            loading: false,
            error: "",
          });
        } catch (error) {
          set({
            ...authFields(user),
            loading: false,
            error: error.message || "Unable to restore your session.",
          });
        }
      },
      (error) => {
        set({
          currentUser: null,
          displayName: "",
          email: "",
          photoURL: "",
          loading: false,
          error: error.message || "Unable to restore your session.",
        });
      },
    );

    return unsubscribeAuth;
  },

  login: async () => {
    set({ loading: true, error: "" });

    try {
      const result = await signInWithPopup(auth, googleProvider);
      await ensureUserDocument(result.user);

      set({
        ...authFields(result.user),
        loading: false,
        error: "",
      });

      return serializeUser(result.user);
    } catch (error) {
      set({
        loading: false,
        error: error.message || "Google sign-in failed.",
      });

      throw error;
    }
  },

  logout: async () => {
    set({ loading: true, error: "" });

    try {
      await signOut(auth);

      set({
        currentUser: null,
        displayName: "",
        email: "",
        photoURL: "",
        loading: false,
        error: "",
      });
    } catch (error) {
      set({
        loading: false,
        error: error.message || "Sign out failed.",
      });

      throw error;
    }
  },

  clearError: () => {
    if (get().error) {
      set({ error: "" });
    }
  },
}));
