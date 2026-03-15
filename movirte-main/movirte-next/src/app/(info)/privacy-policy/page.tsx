import { Metadata } from "next";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — MOVIRTE",
  description: "Read the MOVIRTE privacy policy. How we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Privacy Policy</h1>
      <div className={styles.prose}>
        <p>This Privacy Policy describes how MOVIRTE (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and shares your personal information when you visit movirte.com (the &ldquo;Site&rdquo;) or make a purchase.</p>

        <h2>Information We Collect</h2>
        <h3>Personal Information</h3>
        <p>When you make a purchase or create an account, we collect your name, email address, billing and shipping address, phone number, and payment information.</p>
        <h3>Device Information</h3>
        <p>We automatically collect information about your device, including your web browser, IP address, time zone, and cookies installed on your device.</p>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To process and fulfil your orders</li>
          <li>To communicate with you about your account or orders</li>
          <li>To personalise your shopping experience</li>
          <li>To send marketing communications (with your consent)</li>
          <li>To improve our website and services</li>
        </ul>

        <h2>Sharing Your Information</h2>
        <p>We share your information with third-party service providers who help us operate our business, such as payment processors (Shopify Payments), shipping carriers, and marketing platforms. We do not sell your personal information.</p>

        <h2>Cookies</h2>
        <p>We use cookies to remember your preferences, understand how you use our site, and personalise your experience. You can control cookies through your browser settings.</p>

        <h2>Your Rights</h2>
        <p>If you are a European resident, you have the right to access, correct, or delete your personal data. You may also object to or restrict the processing of your data. To exercise these rights, contact us at <a href="mailto:lxhoi.2k@gmail.com">lxhoi.2k@gmail.com</a>.</p>

        <h2>Data Retention</h2>
        <p>We retain your personal information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements.</p>

        <h2>Changes</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
      </div>
      <p className={styles.lastUpdated}>Last updated: March 2026</p>
    </div>
  );
}
