import styles from "./FeaturesBar.module.css";

const FEATURES = [
  { icon: "↺", title: "FREE SHIPPING IN THE UK", sub: "On orders over $175" },
  { icon: "↩", title: "FREE EXCHANGES & RETURNS", sub: "For UK Orders" },
  {
    icon: "✦",
    title: "DUTIES & TAXES PREPAID",
    sub: "All Orders to USA, Canada & Europe shipped with taxes prepaid",
  },
  { icon: "★", title: "EXCELLENT SERVICE", sub: "Rated Excellent" },
];

export default function FeaturesBar() {
  return (
    <div className={styles.bar}>
      {FEATURES.map((f) => (
        <div key={f.title} className={styles.feature}>
          <div className={styles.icon}>{f.icon}</div>
          <p className={styles.title}>{f.title}</p>
          <p className={styles.sub}>{f.sub}</p>
        </div>
      ))}
    </div>
  );
}
