import styles from "../../skeleton.module.css";

/** PDP skeleton — 2-column layout matching ProductDetail */
export default function ProductLoading() {
  return (
    <div className={styles.pdpSkeleton}>
      <div className={styles.skeletonImage} />
      <div className={styles.pdpInfo}>
        <div className={styles.skeletonTextSm} />
        <div className={styles.skeletonHeading} />
        <div className={styles.skeletonText} />
        <div className={styles.skeletonText} />
        <div className={styles.skeletonText} />
        <div style={{ height: 20 }} />
        <div className={styles.skeletonBtn} />
      </div>
    </div>
  );
}
