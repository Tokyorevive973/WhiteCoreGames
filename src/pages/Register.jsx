// src/pages/Register.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./Register.module.css"; // CSS module import

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      alert("Megerősítő email elküldve! Kérlek, erősítsd meg a címedet.");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <h2>Regisztráció</h2>
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
        <button onClick={register}>Regisztráció</button>
      </div>
    </div>
  );
}
