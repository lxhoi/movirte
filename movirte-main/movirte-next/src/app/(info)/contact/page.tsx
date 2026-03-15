"use client";

import { useState } from "react";
import infoStyles from "../info.module.css";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className={infoStyles.page}>
      <h1 className={infoStyles.heading}>Contact Us</h1>
      <p className={infoStyles.lead}>
        We&apos;re here to help. Reach out and our team will get back to you within 24 hours.
      </p>

      {sent ? (
        <div className={styles.success}>
          <p className={styles.successIcon}>✓ Message sent</p>
          <p className={styles.successText}>Thank you for reaching out. We&apos;ll reply within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div>
              <label className={styles.label}>Name</label>
              <input className={styles.input} required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className={styles.label}>Email</label>
              <input className={styles.input} type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className={styles.label}>Subject</label>
            <input className={styles.input} required value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} />
          </div>
          <div>
            <label className={styles.label}>Message</label>
            <textarea className={styles.textarea} required value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
          </div>
          <button type="submit" className={styles.submitBtn}>SEND MESSAGE</button>
        </form>
      )}

      <div className={styles.contactInfo}>
        <p>Email: <a href="mailto:lxhoi.2k@gmail.com">lxhoi.2k@gmail.com</a></p>
        <p>MOVIRTE — London, UK</p>
      </div>
    </div>
  );
}
