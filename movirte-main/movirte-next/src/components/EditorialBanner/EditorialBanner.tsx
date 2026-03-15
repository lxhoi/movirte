import Image from "next/image";
import Link from "next/link";
import styles from "./EditorialBanner.module.css";

interface EditorialBannerProps {
  imageSrc: string;
  imageAlt: string;
  label: string;
  heading: React.ReactNode;
  ctaText: string;
  ctaHref: string;
}

export default function EditorialBanner({
  imageSrc,
  imageAlt,
  label,
  heading,
  ctaText,
  ctaHref,
}: EditorialBannerProps) {
  return (
    <div className={styles.banner}>
      <Image src={imageSrc} alt={imageAlt} fill sizes="100vw" className={styles.img} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <h2 className={styles.heading}>{heading}</h2>
        <Link href={ctaHref} className={styles.cta}>
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
