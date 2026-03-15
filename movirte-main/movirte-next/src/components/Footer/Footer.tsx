import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* About */}
        <div className={`${styles.col} ${styles.about}`}>
          <h4>ABOUT THE BRAND</h4>
          <p>
            MOVIRTE is a British luxury contemporary fashion brand with a message in pieces that
            you love to wear. Fine things done their own path, on our road to style, transparency.
          </p>
          <p>
            Heavy embroidery, tonal stitches, unique fabrics and perfected fits are consistent
            throughout its collections.
          </p>
          <p className={styles.location}>London, United Kingdom</p>
        </div>

        {/* Discover */}
        <div className={styles.col}>
          <h4>DISCOVER</h4>
          <Link href="/brand">Brand</Link>
          <Link href="/shipping-faq">Shopping</Link>
          <Link href="/returns-faq">Returns</Link>
          <Link href="/store-locator">Stockists</Link>
          <Link href="#">Join Movirte Club</Link>
        </div>

        {/* Support */}
        <div className={styles.col}>
          <h4>SUPPORT</h4>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>

        {/* Newsletter */}
        <div className={`${styles.col} ${styles.newsletter}`}>
          <h4>NEWSLETTER</h4>
          <p>
            Subscribe for 15% off your first order and to receive exclusive deals and news. By
            subscribing, you agree to the Privacy policy.
          </p>
          <div className={styles.form}>
            <input type="email" placeholder="E-Mail" />
            <button type="button">SUBSCRIBE</button>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.social}>
          <a href="#" target="_blank" rel="noopener noreferrer">𝕏</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="#" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
        <p>© MOVIRTE {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
