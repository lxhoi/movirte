"use client";

import { useState, useRef } from "react";
import styles from "./ChatWidget.module.css";

interface ChatMessage {
  text: string;
  sender: "user" | "bot";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hi there 👋 Welcome to MOVIRTE. How can I help you today?", sender: "bot" },
    { text: "I can help with sizing, orders, returns, and more.", sender: "bot" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!inputRef.current) return;
    const text = inputRef.current.value.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { text, sender: "user" }]);
    inputRef.current.value = "";

    // Auto-reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Thanks for your message! A member of our team will be with you shortly.", sender: "bot" },
      ]);
    }, 800);
  };

  const togglePanel = () => {
    setOpen((o) => !o);
    if (!open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <>
      {/* Panel */}
      <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`}>
        <div className={styles.header}>
          <div className={styles.avatar}>M</div>
          <div>
            <p className={styles.name}>MOVIRTE</p>
            <p className={styles.status}>● Online — here to help</p>
          </div>
          <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close chat">
            ✕
          </button>
        </div>

        <div className={styles.body} ref={bodyRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`${styles.bubble} ${msg.sender === "user" ? styles.user : styles.bot}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className={styles.inputBar}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
          />
          <button className={styles.send} onClick={sendMessage} aria-label="Send">
            ↑
          </button>
        </div>
      </div>

      {/* FAB */}
      <button className={styles.fab} onClick={togglePanel} aria-label="Open chat">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M13 2C7.477 2 3 6.134 3 11.2c0 2.9 1.44 5.486 3.72 7.21L6 22l4.2-2.1C10.77 20.28 11.87 20.4 13 20.4c5.523 0 10-4.134 10-9.2S18.523 2 13 2Z"
            fill="white"
          />
          <circle cx="9" cy="11" r="1.5" fill="#333" />
          <circle cx="13" cy="11" r="1.5" fill="#333" />
          <circle cx="17" cy="11" r="1.5" fill="#333" />
        </svg>
      </button>
    </>
  );
}
