import MIcon from "../../imports/Layer1";
import MovirteWordmark from "../../imports/MovirteWordmark";
import { Link } from "react-router";
import { ArrowLeft, Download } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const sections = [
  { id: "overview", title: "Brand Overview" },
  { id: "logo", title: "Logo & Identity" },
  { id: "colors", title: "Color Palette" },
  { id: "typography", title: "Typography" },
  { id: "photography", title: "Photography" },
  { id: "voice", title: "Voice & Tone" },
  { id: "design", title: "Design Principles" },
];

export default function BrandGuidelines() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-neutral-600 hover:text-stone-700 transition-colors uppercase text-xs tracking-wider"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.15em' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <h1 className="text-3xl text-black tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              Brand Guidelines
            </h1>
            <button className="flex items-center gap-2 text-neutral-600 hover:text-stone-700 transition-colors uppercase text-xs tracking-wider"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.15em' }}>
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-20">
        <div className="flex gap-12">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-64 sticky top-32 self-start hidden lg:block"
          >
            <nav className="space-y-2">
              {sections.map((section, index) => (
                <motion.a
                  key={section.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`block py-3 px-4 border-l-2 transition-all ${
                    activeSection === section.id
                      ? 'border-stone-700 text-black'
                      : 'border-neutral-200 text-neutral-500 hover:text-black hover:border-stone-400'
                  }`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {section.title}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Brand Overview */}
            <Section id="overview" title="Brand Overview">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Our Story</h3>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    MOVIRTE is where art and fashion collide. We are a contemporary brand that reimagines classical masterpieces through the lens of modern streetwear, creating wearable art that celebrates both heritage and innovation.
                  </p>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    By juxtaposing Renaissance paintings with vibrant, contemporary elements—bold earth tone accents, skateboards, and shopping bags—we create a visual dialogue between past and present. Each piece tells a story of movement, artistry, and the democratization of beauty.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    MOVIRTE is for those who appreciate craftsmanship, celebrate culture, and aren't afraid to make a statement. We believe fashion should be both timeless and timely, sophisticated yet playful.
                  </p>
                </div>

                <div className="bg-stone-800 text-white p-12">
                  <h3 className="text-3xl mb-6 italic" style={{ fontFamily: 'var(--font-serif)' }}>
                    "Where art meets motion."
                  </h3>
                  <p className="text-stone-200">Brand Tagline</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border-2 border-stone-700 p-6">
                    <h4 className="text-xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Mission</h4>
                    <p className="text-neutral-600 text-sm">
                      To make art accessible and wearable, bridging classical beauty with contemporary culture.
                    </p>
                  </div>
                  <div className="border border-neutral-200 p-6">
                    <h4 className="text-xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Vision</h4>
                    <p className="text-neutral-600 text-sm">
                      A world where fashion is a canvas for artistic expression and cultural conversation.
                    </p>
                  </div>
                  <div className="border border-neutral-200 p-6">
                    <h4 className="text-xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Values</h4>
                    <p className="text-neutral-600 text-sm">
                      Artistic, Bold, Playful, Thoughtful, Culturally-Conscious
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Logo & Identity */}
            <Section id="logo" title="Logo & Identity">
              <div className="space-y-8">
                <div className="bg-white border border-neutral-200 p-16 text-center">
                  <div className="mx-auto" style={{ width: '400px', height: '61px' }}>
                    <MovirteWordmark />
                  </div>
                  <p className="text-neutral-500 mt-6 text-sm uppercase tracking-wider">Horizontal Wordmark</p>
                </div>

                {/* Icon mark */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-neutral-200 p-12 text-center">
                    <div className="mx-auto mb-4" style={{ width: '80px', height: '57px' }}>
                      <MIcon />
                    </div>
                    <p className="text-neutral-500 text-xs uppercase tracking-wider">Brand Icon / Lettermark</p>
                  </div>
                  <div className="bg-stone-900 p-12 text-center">
                    <div className="mx-auto mb-4" style={{ width: '80px', height: '57px', ['--fill-0' as string]: '#ffffff' }}>
                      <MIcon />
                    </div>
                    <p className="text-neutral-400 text-xs uppercase tracking-wider">Icon on Dark</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-neutral-900 p-12 text-center">
                    <div className="mx-auto" style={{ width: '300px', height: '46px', ['--fill-0' as string]: '#ffffff' }}>
                      <MovirteWordmark />
                    </div>
                    <p className="text-neutral-400 mt-6 text-xs uppercase tracking-wider">On Dark Background</p>
                  </div>
                  <div className="p-12 text-center" style={{ backgroundColor: '#6B3A2A' }}>
                    <div className="mx-auto" style={{ width: '300px', height: '46px', ['--fill-0' as string]: '#F5EDE0' }}>
                      <MovirteWordmark />
                    </div>
                    <p className="text-stone-200 mt-6 text-xs uppercase tracking-wider">On Brand Color</p>
                  </div>
                </div>

                <div className="border-l-4 border-stone-700 pl-6 space-y-3">
                  <h4 className="font-medium">Logo Usage Rules</h4>
                  <ul className="text-neutral-600 space-y-2 text-sm">
                    <li>• Maintain minimum clear space of 20px around the logo</li>
                    <li>• Never stretch, distort, or rotate the logo</li>
                    <li>• Use in black, white, or on brand brown when appropriate</li>
                    <li>• Minimum size: 100px width for digital, 20mm for print</li>
                    <li>• Ensure strong contrast with background</li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* Color Palette */}
            <Section id="colors" title="Color Palette">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Primary Colors</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ColorSwatch
                      name="Cream"
                      hex="#F5EDE0"
                      rgb="245, 237, 224"
                      usage="Primary accent, CTAs, highlights"
                    />
                    <ColorSwatch
                      name="Rich Brown"
                      hex="#6B3A2A"
                      rgb="107, 58, 42"
                      usage="Secondary accent, hover states"
                    />
                    <ColorSwatch
                      name="Black"
                      hex="#000000"
                      rgb="0, 0, 0"
                      usage="Primary text, borders"
                    />
                    <ColorSwatch
                      name="White"
                      hex="#FFFFFF"
                      rgb="255, 255, 255"
                      usage="Backgrounds, contrast"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Neutral & Accent Colors</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ColorSwatch
                      name="Warm Beige"
                      hex="#E8DDD2"
                      rgb="232, 221, 210"
                      usage="Backgrounds, sections"
                    />
                    <ColorSwatch
                      name="Deep Brown"
                      hex="#3B1F10"
                      rgb="59, 31, 16"
                      usage="Deep contrast accents"
                    />
                    <ColorSwatch
                      name="Neutral Gray"
                      hex="#737373"
                      rgb="115, 115, 115"
                      usage="Secondary text"
                    />
                    <ColorSwatch
                      name="Light Gray"
                      hex="#F5F5F5"
                      rgb="245, 245, 245"
                      usage="Subtle backgrounds"
                    />
                  </div>
                </div>

                <div className="bg-stone-800 text-white p-6 border-l-4 border-stone-600">
                  <h4 className="font-medium mb-2">The MOVIRTE Earth Tone</h4>
                  <p className="text-stone-200 text-sm">
                    Our signature earth tones — warm cream and rich brown — are grounded, artistic, and timeless. They represent the intersection of classical painting palettes with contemporary fashion. Use them with intention — they anchor our visual language in warmth and depth.
                  </p>
                </div>
              </div>
            </Section>

            {/* Typography */}
            <Section id="typography" title="Typography">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Primary Typeface</h3>
                  <div className="border-2 border-stone-700 p-8">
                    <p className="text-6xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Cormorant Garamond</p>
                    <p className="text-neutral-600 mb-6">Used for: Headlines, product names, artistic content, editorial pieces</p>
                    <div className="space-y-2 text-sm text-neutral-500">
                      <p>Available weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)</p>
                      <p>This classical serif connects us to art history and fine craftsmanship</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Secondary Typeface</h3>
                  <div className="border border-neutral-200 p-8">
                    <p className="text-5xl mb-4" style={{ fontFamily: 'var(--font-sans)' }}>Inter</p>
                    <p className="text-neutral-600 mb-6">Used for: Body text, navigation, UI elements, product descriptions</p>
                    <div className="space-y-2 text-sm text-neutral-500">
                      <p>Available weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold)</p>
                      <p>Clean, modern, and highly readable for digital experiences</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Type Scale</h3>
                  <TypeExample size="text-6xl" label="Heading 1 / 60px" serif>
                    Art Meets Fashion
                  </TypeExample>
                  <TypeExample size="text-5xl" label="Heading 2 / 48px" serif>
                    Where Culture Collides
                  </TypeExample>
                  <TypeExample size="text-4xl" label="Heading 3 / 36px" serif>
                    Contemporary Classics
                  </TypeExample>
                  <TypeExample size="text-2xl" label="Heading 4 / 24px" serif>
                    Wearable Art for Modern Life
                  </TypeExample>
                  <TypeExample size="text-lg" label="Body Large / 18px">
                    MOVIRTE celebrates the intersection of classical art and contemporary fashion, creating pieces that are both timeless and of-the-moment.
                  </TypeExample>
                  <TypeExample size="text-base" label="Body Regular / 16px">
                    Each collection draws inspiration from iconic artworks, reimagined with earthy, grounded accents and modern sensibilities. We believe fashion should tell stories and spark conversations.
                  </TypeExample>
                </div>
              </div>
            </Section>

            {/* Photography */}
            <Section id="photography" title="Photography Style">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Visual Language</h3>
                  <p className="text-neutral-700 leading-relaxed mb-6">
                    MOVIRTE's visual identity is a bold fusion of classical art and contemporary energy. Our photography embraces the theatrical,
                    the unexpected, and the culturally rich—creating images that feel like modern masterpieces.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 border-stone-700 p-6">
                    <h4 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>✓ Do</h4>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li>• Juxtapose classical and contemporary elements</li>
                      <li>• Use our signature earth tones as bold accents</li>
                      <li>• Create dynamic, movement-based compositions</li>
                      <li>• Reference art history in styling and staging</li>
                      <li>• Embrace theatrical lighting and drama</li>
                      <li>• Show personality and playfulness</li>
                    </ul>
                  </div>
                  <div className="border border-neutral-200 p-6">
                    <h4 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>✗ Don't</h4>
                    <ul className="space-y-2 text-sm text-neutral-600">
                      <li>• Use generic, overly commercial styling</li>
                      <li>• Avoid flat, uninspired compositions</li>
                      <li>• No dated or cliché art references</li>
                      <li>• Avoid excessive digital manipulation</li>
                      <li>• Don't lose the artistic narrative</li>
                      <li>• Never feel too serious or pretentious</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg" style={{ fontFamily: 'var(--font-serif)' }}>Photography Categories</h4>
                  <div className="grid gap-4">
                    <PhotoCategory
                      title="Artistic Campaigns"
                      description="Hero images that reimagine classical paintings with modern fashion. Think Renaissance figures on skateboards, Baroque scenes with shopping bags—playful, bold, and culturally aware."
                    />
                    <PhotoCategory
                      title="Product Photography"
                      description="Clean, gallery-style product shots on neutral backgrounds. Let the artwork on the garments shine. Include detail shots of embroidery and prints."
                    />
                    <PhotoCategory
                      title="Lifestyle & Culture"
                      description="Real people in motion—skating, dancing, creating. Show the intersection of art, fashion, and contemporary urban life. Authentic, energetic, diverse."
                    />
                    <PhotoCategory
                      title="Editorial Storytelling"
                      description="Conceptual imagery that tells the story behind each collection. Reference specific artworks, create visual essays, explore cultural themes."
                    />
                  </div>
                </div>

                <div className="bg-stone-800 text-white p-8">
                  <h4 className="text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>The Earth Tone Signature</h4>
                  <p className="text-stone-300 text-sm">
                    In every campaign and collection image, include a warm earth tone element—a cream-colored bag, a rich brown accessory,
                    a prop, or an accent. This is our visual signature, the grounded element that anchors the classical composition and
                    signals: this is MOVIRTE.
                  </p>
                </div>
              </div>
            </Section>

            {/* Voice & Tone */}
            <Section id="voice" title="Voice & Tone">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Brand Voice</h3>
                  <p className="text-neutral-700 leading-relaxed mb-6">
                    MOVIRTE speaks with confidence, creativity, and cultural awareness. We're knowledgeable about art history but never pretentious.
                    We're bold and playful, but always thoughtful. Our voice celebrates both the past and the present.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <VoiceAttribute
                    title="Artistic"
                    description="We reference art history, celebrate craftsmanship, and speak the language of visual culture."
                  />
                  <VoiceAttribute
                    title="Bold"
                    description="We're not afraid to make statements, challenge conventions, and stand out with grounded energy."
                  />
                  <VoiceAttribute
                    title="Playful"
                    description="We find joy in unexpected juxtapositions and don't take ourselves too seriously."
                  />
                </div>

                <div className="border-2 border-stone-700 divide-y divide-stone-200">
                  <ToneExample
                    context="Product Descriptions"
                    tone="Descriptive, artistic, culturally informed"
                    example="Inspired by Baroque dynamism and street culture energy, this hoodie features hand-embroidered botanical motifs on premium cotton. Classical artistry meets contemporary comfort."
                  />
                  <ToneExample
                    context="Marketing Copy"
                    tone="Bold, confident, culturally aware"
                    example="Art shouldn't live behind glass. Wear the masterpieces. Make your move. MOVIRTE."
                  />
                  <ToneExample
                    context="Customer Service"
                    tone="Helpful, warm, knowledgeable"
                    example="We're here to help you find the perfect piece for your collection. Questions about sizing, art inspiration, or shipping? Our team is ready to assist."
                  />
                  <ToneExample
                    context="Social Media"
                    tone="Engaging, visual, culturally conversational"
                    example="When Renaissance meets streetwear. 🛹✨ Tag us in your MOVIRTE moments—we love seeing art in motion."
                  />
                </div>

                <div className="bg-neutral-100 p-6">
                  <h4 className="font-medium mb-3">Language Guidelines</h4>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <p className="font-medium text-neutral-900 mb-2">Use:</p>
                      <ul className="text-neutral-600 space-y-1">
                        <li>• Artistic, creative, cultural</li>
                        <li>• Bold, earthy, grounded</li>
                        <li>• Reimagined, contemporary, modern</li>
                        <li>• Wearable art, masterpiece, collection</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 mb-2">Avoid:</p>
                      <ul className="text-neutral-600 space-y-1">
                        <li>• Overly academic or pretentious art terms</li>
                        <li>• Generic fashion clichés</li>
                        <li>• Trend-focused language</li>
                        <li>• Anything that feels stuffy or exclusive</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* Design Principles */}
            <Section id="design" title="Design Principles">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Core Principles</h3>
                  <p className="text-neutral-700 leading-relaxed mb-8">
                    MOVIRTE's design philosophy balances classical elegance with contemporary boldness.
                    We create digital experiences that feel like walking through a modern art gallery—curated, engaging, and full of delightful surprises.
                  </p>
                </div>

                <div className="space-y-6">
                  <DesignPrinciple
                    number="01"
                    title="Create Visual Drama"
                    description="Don't be subtle. Use bold imagery, strong contrasts, and our signature earth tones to create memorable moments. Every page should feel like an artistic statement."
                  />
                  <DesignPrinciple
                    number="02"
                    title="Honor the Artistry"
                    description="Present products and content with gallery-quality attention to detail. Clean layouts, generous spacing, and thoughtful composition let the artwork shine."
                  />
                  <DesignPrinciple
                    number="03"
                    title="Balance Past & Present"
                    description="Classical typography meets modern UI. Art historical references meet contemporary web design. Find the sweet spot where tradition and innovation coexist."
                  />
                  <DesignPrinciple
                    number="04"
                    title="Encourage Exploration"
                    description="Design interfaces that invite discovery. Use motion, hover states, and interactive elements to create engaging experiences. Let users explore like they're in a gallery."
                  />
                  <DesignPrinciple
                    number="05"
                    title="Stay Accessible"
                    description="Bold doesn't mean exclusive. Ensure strong color contrast, readable typography, and inclusive design so everyone can experience MOVIRTE."
                  />
                  <DesignPrinciple
                    number="06"
                    title="Surprise & Delight"
                    description="Add unexpected moments—a rich brown accent where you least expect it, a playful animation, an art reference in the UI. Keep it fresh and engaging."
                  />
                </div>

                <div className="bg-stone-800 text-white p-12">
                  <h4 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>The Earth Tone System</h4>
                  <p className="text-stone-200 mb-8">Our signature earth tones should appear throughout the experience as visual punctuation—warm, grounded, and impossible to ignore.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { use: "CTAs", example: "Shop Now buttons" },
                      { use: "Accents", example: "Icons, dividers" },
                      { use: "Hover", example: "Interactive states" },
                      { use: "Highlights", example: "Sale tags, badges" },
                    ].map((item) => (
                      <div key={item.use} className="bg-white bg-opacity-10 p-4 rounded">
                        <p className="font-medium mb-1">{item.use}</p>
                        <p className="text-xs text-stone-300">{item.example}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-l-4 border-stone-700 pl-6">
                  <h4 className="text-lg mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Grid & Layout</h4>
                  <ul className="text-neutral-600 space-y-2">
                    <li>• Use 12-column grid with generous gutters</li>
                    <li>• Create asymmetric, gallery-style layouts for editorial content</li>
                    <li>• Balance structured product grids with dynamic campaign imagery</li>
                    <li>• Max content width: 1440px, but allow hero images to go full-width</li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* Footer */}
            <div className="mt-20 pt-12 border-t border-neutral-200">
              <div className="text-center">
                <p className="text-neutral-500 text-sm mb-2">MOVIRTE Brand Guidelines</p>
                <p className="text-neutral-400 text-xs">Version 1.0 — Last Updated February 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-24 scroll-mt-32"
    >
      <h2 className="text-5xl mb-12 pb-6 border-b-2 border-stone-700" style={{ fontFamily: 'var(--font-serif)' }}>
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

function ColorSwatch({ name, hex, rgb, usage }: { name: string; hex: string; rgb: string; usage: string }) {
  return (
    <div className="border border-neutral-200">
      <div className="h-32" style={{ backgroundColor: hex }}></div>
      <div className="p-4">
        <p className="font-medium text-sm mb-1">{name}</p>
        <p className="text-xs text-neutral-500 mb-1">{hex}</p>
        <p className="text-xs text-neutral-400 mb-2">RGB: {rgb}</p>
        <p className="text-xs text-neutral-600 italic">{usage}</p>
      </div>
    </div>
  );
}

function TypeExample({ size, label, serif, children }: { size: string; label: string; serif?: boolean; children: React.ReactNode }) {
  return (
    <div className="border border-neutral-200 p-6">
      <p className={`${size} mb-2`} style={{ fontFamily: serif ? 'var(--font-serif)' : 'var(--font-sans)' }}>
        {children}
      </p>
      <p className="text-xs text-neutral-500 uppercase tracking-wider">{label}</p>
    </div>
  );
}

function PhotoCategory({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-l-2 border-stone-700 pl-6">
      <h5 className="font-medium mb-2">{title}</h5>
      <p className="text-sm text-neutral-600">{description}</p>
    </div>
  );
}

function VoiceAttribute({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-2 border-neutral-200 p-6 hover:border-stone-700 transition-colors">
      <h4 className="text-xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>{title}</h4>
      <p className="text-neutral-600 text-sm">{description}</p>
    </div>
  );
}

function ToneExample({ context, tone, example }: { context: string; tone: string; example: string }) {
  return (
    <div className="p-6">
      <div className="mb-3">
        <h5 className="font-medium mb-1">{context}</h5>
        <p className="text-xs text-neutral-500 uppercase tracking-wider">{tone}</p>
      </div>
      <p className="text-neutral-700 italic">{example}</p>
    </div>
  );
}

function DesignPrinciple({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-6">
      <div className="text-6xl text-stone-300 font-light leading-none" style={{ fontFamily: 'var(--font-serif)' }}>
        {number}
      </div>
      <div className="flex-1">
        <h4 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>{title}</h4>
        <p className="text-neutral-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}