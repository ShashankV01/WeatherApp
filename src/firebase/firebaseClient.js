import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import store from "../store/store";
import { setUser, clearUser } from "../features/uiSlice";

let auth = null;

export function initFirebase() {
  try {
    const config = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    };
    const app = initializeApp(config);
    auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch(setUser({ uid: user.uid, name: user.displayName, email: user.email }));
      } else {
        store.dispatch(clearUser());
      }
    });
  } catch (e) {
    console.warn("Firebase init failed", e);
  }
}

export async function signInWithGoogle() {
  if (!auth) throw new Error("Firebase not initialized");
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function signOutUser() {
  if (!auth) throw new Error("Firebase not initialized");
  return signOut(auth);
}
