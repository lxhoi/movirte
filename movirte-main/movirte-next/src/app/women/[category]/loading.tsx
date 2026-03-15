import styles from "../../skeleton.module.css";

export default function CategoryLoading() {
  return (
    <div>
      <div className={styles.pageSkeleton}>
        <div className={styles.skeletonHeading} />
        <div className={styles.skeletonText} />
      </div>
      <div className={styles.gridSkeleton}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.cardSkeleton}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonTextSm} />
          </div>
        ))}
      </div>
    </div>
  );
}
