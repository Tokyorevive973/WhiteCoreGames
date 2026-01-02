// src/pages/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        alert("Erősítsd meg az emailed, mielőtt belépsz!");
        return;
      }
      // sikeres login → dashboardra lehet redirectelni
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2>Bejelentkezés</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Belépés</button>
      </div>
    </div>
  );
}
