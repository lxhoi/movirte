"use client";

import { useState } from "react";
import Link from "next/link";
import infoStyles from "../info.module.css";
import styles from "./sign-in.module.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={infoStyles.page}>
      <h1 className={infoStyles.heading}>Sign In</h1>
      <p className={infoStyles.lead}>
        Sign in to your MOVIRTE account to manage orders, track deliveries, and access your wishlist.
      </p>

      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className={styles.submitBtn}>SIGN IN</button>
        <p className={styles.forgotLink}>
          <a href="#">Forgot your password?</a>
        </p>

        <div className={styles.divider}>
          <hr className={styles.dividerLine} /><span>OR</span><hr className={styles.dividerLine} />
        </div>

        <Link href="/new-in" className={styles.guestBtn}>
          CONTINUE AS GUEST
        </Link>
      </div>
    </div>
  );
}
