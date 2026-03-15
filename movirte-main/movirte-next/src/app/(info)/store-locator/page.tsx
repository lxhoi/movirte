import { Metadata } from "next";
import infoStyles from "../info.module.css";
import styles from "./store-locator.module.css";

export const metadata: Metadata = {
  title: "Store Locator — MOVIRTE",
  description: "Find MOVIRTE stockists and retailers near you.",
  openGraph: { title: "Store Locator — MOVIRTE", description: "Find MOVIRTE at select retailers and stockists." },
};

const STOCKISTS = [
  { name: "MOVIRTE Online", address: "movirte.com", type: "Online" },
  { name: "Selfridges", address: "400 Oxford St, London W1A 1AB", type: "Department Store" },
  { name: "Harvey Nichols", address: "109-125 Knightsbridge, London SW1X 7RJ", type: "Department Store" },
  { name: "Flannels", address: "Multiple UK Locations", type: "Multi-brand" },
  { name: "END.", address: "Newcastle upon Tyne & Online", type: "Multi-brand" },
];

export default function StoreLocatorPage() {
  return (
    <div className={infoStyles.page}>
      <h1 className={infoStyles.heading}>Store Locator</h1>
      <p className={infoStyles.lead}>Find MOVIRTE at these select retailers and stockists.</p>
      <div>
        {STOCKISTS.map((s) => (
          <div key={s.name} className={styles.card}>
            <p className={styles.cardName}>{s.name}</p>
            <p className={styles.cardAddress}>{s.address}</p>
            <p className={styles.cardType}>{s.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
