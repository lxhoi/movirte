import { Metadata } from "next";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Terms of Service — MOVIRTE",
  description: "MOVIRTE terms of service. The terms and conditions governing your use of our website and purchases.",
};

export default function TermsOfServicePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Terms of Service</h1>
      <div className={styles.prose}>
        <h2>Overview</h2>
        <p>This website is operated by MOVIRTE. By visiting our site and/or purchasing from us, you agree to be bound by the following terms and conditions (&ldquo;Terms&rdquo;).</p>

        <h2>Online Store Terms</h2>
        <p>By agreeing to these Terms, you confirm that you are at least the age of majority in your jurisdiction. You may not use our products for any illegal or unauthorised purpose. You must not transmit any malicious code or attempt to compromise our services.</p>

        <h2>Products</h2>
        <p>We have made every effort to display product colours, materials, and descriptions as accurately as possible. However, we cannot guarantee that your monitor&apos;s display of any colour will be perfectly accurate. We reserve the right to limit quantities of products and to discontinue any product at any time.</p>

        <h2>Pricing</h2>
        <p>Prices are subject to change without notice. We reserve the right to modify or discontinue the service without notice. We shall not be liable if information on the site is not accurate, complete, or up to date.</p>

        <h2>Orders & Payment</h2>
        <p>We reserve the right to refuse any order placed through the site. Payment must be received before order fulfilment. We use industry-standard encryption to protect your payment information through Shopify Payments.</p>

        <h2>Shipping & Delivery</h2>
        <p>Shipping times are estimates and not guaranteed. MOVIRTE is not responsible for delays caused by customs, natural disasters, or other circumstances beyond our control. Please see our <a href="/shipping-faq">Shipping FAQ</a> for more details.</p>

        <h2>Returns & Refunds</h2>
        <p>Please refer to our <a href="/returns-faq">Returns & Exchanges</a> page for full details on our return policy.</p>

        <h2>Intellectual Property</h2>
        <p>All content on this site, including text, graphics, logos, images, and software, is the property of MOVIRTE and is protected by UK and international copyright laws. You may not reproduce, distribute, or create derivative works without our express written consent.</p>

        <h2>Limitation of Liability</h2>
        <p>In no case shall MOVIRTE, our directors, officers, employees, or affiliates be liable for any direct, indirect, incidental, or consequential damages arising from the use of the site or our products.</p>

        <h2>Governing Law</h2>
        <p>These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

        <h2>Changes to Terms</h2>
        <p>We reserve the right to update or modify these Terms at any time. It is your responsibility to check this page periodically for changes.</p>
      </div>
      <p className={styles.lastUpdated}>Last updated: March 2026</p>
    </div>
  );
}
