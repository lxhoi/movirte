import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./brand.module.css";

export const metadata: Metadata = {
  title: "Brand — MOVIRTE",
  description: "Discover MOVIRTE. British luxury contemporary fashion — handcrafted pieces, transparency, and a new road to style.",
  openGraph: {
    title: "Brand — MOVIRTE",
    description: "British luxury contemporary fashion — handcrafted pieces, transparency, and a new road to style.",
    images: [{ url: "/products/black acorn/ACRONHOODIE.webp" }],
  },
};

export default function BrandPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <Image src="/products/black acorn/ACRONHOODIE.webp" alt="MOVIRTE Brand" fill style={{ objectFit: "cover", opacity: 0.6 }} priority />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>MOVIRTE</h1>
          <p className={styles.heroSub}>Handcrafted.</p>
        </div>
      </div>

      {/* Our Story */}
      <div className={styles.block}>
        <div className={styles.blockImage}>
          <Image src="/products/noir heritage pants/8904.webp" alt="MOVIRTE craftsmanship" fill style={{ objectFit: "cover" }} />
        </div>
        <div className={styles.textDark}>
          <h2 className={styles.blockH2}>Our story</h2>
          <p className={styles.blockP}>MOVIRTE is a British luxury contemporary fashion brand with a message in pieces that you love to wear. Fine things done their own path, on our road to style and transparency.</p>
          <p className={styles.blockP}>Heavy embroidery, tonal stitches, unique fabrics and perfected fits are consistent throughout its collections.</p>
        </div>
      </div>

      {/* Design Philosophy */}
      <div className={styles.blockReverse}>
        <div className={styles.blockImage}>
          <Image src="/products/black acorn/ACRONHOODIE.webp" alt="MOVIRTE design" fill style={{ objectFit: "cover" }} />
        </div>
        <div className={styles.textLight}>
          <h2 className={styles.blockH2}>Design philosophy</h2>
          <p className={styles.blockP}>We believe in quiet luxury — garments that speak through detail and craft rather than logos. Every piece is designed to last and to become part of your story.</p>
        </div>
      </div>

      {/* The Process & Promise */}
      <div className={styles.block}>
        <div className={styles.blockImage}>
          <Image src="/products/black acorn/acrontee.jpg" alt="MOVIRTE collection" fill style={{ objectFit: "cover" }} />
        </div>
        <div className={styles.textDark}>
          <h2 className={styles.blockH2}>The process</h2>
          <p className={styles.blockP}>From concept to finish, we work with skilled makers and trusted mills to ensure quality at every step. Our focus is on materials that age well and cuts that fit real life.</p>
          <h2 className={`${styles.blockH2} ${styles.blockH2mt}`}>Our promise</h2>
          <p className={styles.blockP}>We stand behind what we make. Free exchanges and returns for UK orders, transparent sourcing, and a commitment to improvement — season after season.</p>
        </div>
      </div>

      {/* Shop CTA */}
      <div className={styles.shopCta}>
        <p className={styles.shopLabel}>Shop the collection</p>
        <Link href="/new-in" className={styles.shopBtn}>SHOP ALL</Link>
      </div>
    </div>
  );
}
