"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{
      maxWidth: 520,
      margin: "0 auto",
      padding: "80px 24px",
      textAlign: "center",
    }}>
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.6rem",
        fontWeight: 400,
        marginBottom: 12,
        color: "var(--movirte-ink)",
      }}>
        Something went wrong
      </h1>
      <p style={{
        fontSize: "0.78rem",
        color: "var(--movirte-muted)",
        lineHeight: 1.6,
        marginBottom: 24,
      }}>
        We&apos;re sorry — an unexpected error occurred. Please try again or return to the homepage.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            padding: "12px 28px",
            background: "var(--movirte-ink)",
            border: "none",
            color: "#fff",
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            cursor: "pointer",
          }}
        >
          TRY AGAIN
        </button>
        <Link
          href="/"
          style={{
            padding: "12px 28px",
            border: "1px solid var(--movirte-ink)",
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: "var(--movirte-ink)",
            textDecoration: "none",
          }}
        >
          GO HOME
        </Link>
      </div>
    </div>
  );
}
