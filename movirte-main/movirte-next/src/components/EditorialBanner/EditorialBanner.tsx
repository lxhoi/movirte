import Image from "next/image";
import Link from "next/link";
import styles from "./EditorialBanner.module.css";

interface EditorialBannerProps {
  imageSrc?: string;
  image?: string;
  imageAlt?: string;
  label?: string;
  heading?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  alt?: string;
}

export default function EditorialBanner({
  imageSrc,
  image,
  imageAlt,
  alt,
  label,
  heading,
  ctaText,
  ctaHref,
}: EditorialBannerProps) {
  const src = imageSrc || image;
  const imageAltText = imageAlt || alt || "Banner";
  const showCta = ctaText && ctaHref;

  return (
    <div className={styles.banner}>
      {src && (
        <Image src={src} alt={imageAltText} fill sizes="100vw" className={styles.img} />
      )}
      <div className={styles.overlay} />
      {heading && (
        <div className={styles.content}>
          {label && <p className={styles.label}>{label}</p>}
          <h2 className={styles.heading}>{heading}</h2>
          {showCta && (
            <Link href={ctaHref} className={styles.cta}>
              {ctaText}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
