import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signInWithGoogle, signOutUser } from "../firebase/firebaseClient";

export default function Header() {
  const user = useSelector((s) => s.ui.user);

  async function handleSignIn() {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error(e);
      alert("Sign-in failed");
    }
  }

  async function handleSignOut() {
    try {
      await signOutUser();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <header className="header">
      <Link to="/" className="brand">Weather Analytics</Link>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {user ? (
          <>
            <div style={{ fontSize: 13, color: "#9fb" }}>{user.name || user.email}</div>
            <button onClick={handleSignOut}>Sign out</button>
          </>
        ) : (
          <button onClick={handleSignIn}>Sign in with Google</button>
        )}
      </div>
    </header>
  );
}
