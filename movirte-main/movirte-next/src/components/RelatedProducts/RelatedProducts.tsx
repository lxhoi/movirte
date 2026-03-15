import Link from "next/link";
import Image from "next/image";
import styles from "./RelatedProducts.module.css";

interface RelatedProduct {
  id: string;
  handle: string;
  title: string;
  price: string;
  image: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  title?: string;
}

export default function RelatedProducts({
  products,
  title = "You May Also Like",
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.grid}>
        {products.slice(0, 4).map((p) => (
          <Link key={p.id} href={`/product/${p.handle}`} className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className={styles.img}
              />
            </div>
            <p className={styles.name}>{p.title}</p>
            <span className={styles.price}>{p.price}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
