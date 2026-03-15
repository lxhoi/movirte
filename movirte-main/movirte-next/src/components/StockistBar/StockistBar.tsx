import styles from "./StockistBar.module.css";

const STOCKISTS = [
  { name: "SELFRIDGES", sup: "&CO", className: "selfridges" },
  { name: "HARVEY NICHOLS", className: "harvey" },
  { name: "PRINTEMPS", className: "printemps" },
  { name: "Galeries", sub: "Lafayette", className: "galeries" },
];

export default function StockistBar() {
  return (
    <div className={styles.bar}>
      <p className={styles.title}>AVAILABLE AT</p>
      <div className={styles.logos}>
        {STOCKISTS.map((s) => (
          <span key={s.name} className={`${styles.logo} ${styles[s.className]}`}>
            {s.name}
            {s.sup && <sup>{s.sup}</sup>}
            {s.sub && (
              <>
                <br />
                <em>{s.sub}</em>
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
