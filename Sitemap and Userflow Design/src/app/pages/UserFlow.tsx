import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { FlowStep } from "../components/FlowStep";
import { motion } from "motion/react";

export default function UserFlow() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b border-neutral-200 pb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-neutral-600 hover:text-stone-700 transition-colors uppercase text-xs tracking-wider"
            style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.15em' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl text-black tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Purchase Journey
          </motion.h1>
          <div className="w-20" />
        </div>

        {/* Flow Diagram */}
        <div className="max-w-5xl mx-auto mt-16">
          <FlowStep
            title="Entry Points"
            description="How customers discover the brand"
            items={[
              "Direct URL / Brand Website",
              "Google Search & SEO",
              "Social Media (Instagram, TikTok, Pinterest)",
              "Email Marketing & Art Collaborations",
            ]}
            bgColor="bg-neutral-800"
            delay={0.1}
          />

          <FlowStep
            title="Homepage"
            items={[
              "Hero Banner — Artistic Campaign Imagery",
              "New Arrivals Section (Men / Women)",
              "Featured Collections & Art Capsules",
              "Promotion Bar (Free Shipping, Special Offers)",
            ]}
            bgColor="bg-neutral-900"
            delay={0.2}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 gap-6 my-12"
          >
            <div className="bg-white border-2 border-stone-700 p-8">
              <h4 className="text-xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>Navigation Menu</h4>
              <p className="text-neutral-600 tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
                Browse: Men / Women / New In / Best Sellers / Collections
              </p>
            </div>
            <div className="bg-white border border-neutral-300 p-8">
              <h4 className="text-xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>Search Bar</h4>
              <p className="text-neutral-600 tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
                Search by product, collection, or artwork inspiration
              </p>
            </div>
          </motion.div>

          <FlowStep
            title="Collection / Category Page"
            items={[
              "Filter & Sort Products (Size, Color, Price, Collection)",
              "Product Grid with Artistic Product Photography",
              "Product Badges: NEW / SALE / Limited Edition",
              "Collection Story & Inspiration",
            ]}
            bgColor="bg-neutral-900"
            delay={0.4}
          />

          <FlowStep
            title="Product Detail Page"
            items={[
              "High-Quality Product Photography (Multiple Views)",
              "Product Name, Price, and Collection Details",
              "Size Selection",
              "Add to Shopping Bag Button",
              "Detailed Description & Art Inspiration Story",
              "Shipping & Returns Information",
            ]}
            bgColor="bg-neutral-800"
            delay={0.5}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-2 gap-6 my-12"
          >
            <div className="bg-stone-800 text-white p-8">
              <h4 className="text-xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>Add to Bag</h4>
              <p className="tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
                Continue shopping or proceed to checkout
              </p>
            </div>
            <div className="bg-neutral-200 border border-neutral-400 p-8">
              <h4 className="text-xl mb-3 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>Sold Out</h4>
              <p className="text-neutral-600 tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
                Notify when restocked, view similar items
              </p>
            </div>
          </motion.div>

          <FlowStep
            title="Shopping Bag"
            items={[
              "Review Selected Products & Quantities",
              "Update Quantity or Remove Items",
              "View Subtotal and Estimated Total",
              "Free Tote Bag with Orders Over €175",
              "Proceed to Checkout",
            ]}
            bgColor="bg-neutral-900"
            delay={0.7}
          />

          <FlowStep
            title="Checkout Process"
            items={[
              "Step 1: Shipping Information (Name, Address, Email, Phone)",
              "Step 2: Shipping Method (UK: Free >€175 | International: Free >€300)",
              "Step 3: Payment (Credit Card / PayPal / Apple Pay)",
              "Step 4: Review Order & Complete Purchase",
            ]}
            bgColor="bg-neutral-800"
            delay={0.8}
          />

          <FlowStep
            title="Order Confirmation"
            items={[
              "Confirmation Email with Order Details",
              "Order Number & Tracking Information",
              "Estimated Delivery Date",
              "Customer Service Contact",
            ]}
            bgColor="bg-neutral-900"
            delay={0.9}
          />

          <FlowStep
            title="Post-Purchase Experience"
            items={[
              "Track Order via Account Dashboard",
              "Free Returns & Exchanges (UK)",
              "Newsletter Signup (Exclusive Access)",
              "Share Your Style on Social Media",
              "Product Reviews & Feedback",
            ]}
            bgColor="bg-neutral-800"
            delay={1.0}
            showArrow={false}
          />
        </div>
      </div>
    </div>
  );
}