import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, ShieldCheck, Heart, ShoppingBag } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function Hero({ onScrollToSection, onQuickView, onAddToCart }: HeroProps) {
  // Let's use the first featured product (AURA Eclipse Headphones) as the floating interactive product
  const featuredProduct = PRODUCTS.find((p) => p.id === "headphones-1") || PRODUCTS[0];

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#000000] flex flex-col justify-between pt-28 pb-12 overflow-hidden px-6 md:px-12"
    >
      {/* Absolute Decorative Industrial Grid Lines (Nothing Aesthetic) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16161a_1px,transparent_1px),linear-gradient(to_bottom,#16161a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-full h-[1px] bg-neutral-900 pointer-events-none" />
      <div className="absolute top-2/3 left-0 w-full h-[1px] bg-neutral-900 pointer-events-none" />
      <div className="absolute left-1/4 top-0 w-[1px] h-full bg-neutral-900 pointer-events-none" />
      <div className="absolute left-3/4 top-0 w-[1px] h-full bg-neutral-900 pointer-events-none" />

      {/* Main Hero Content Frame */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto z-10">
        
        {/* Left Column: Elite Copywriting & Staggered Typography */}
        <div className="lg:col-span-6 space-y-8 text-left">
          {/* Animated Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 bg-neutral-950/90 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800 shadow-2xl"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF3333] animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-300 uppercase">
              SPEC_V2.026 // LABS
            </span>
          </motion.div>

          {/* Majestic Hero Typography */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="font-ndot text-4xl sm:text-5xl lg:text-[68px] tracking-[0.02em] text-white leading-[1.08] uppercase"
            >
              INTUITIVE.
              <br />
              TRANSPARENT.
              <br />
              AESTHETIC_
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-450 text-sm md:text-base font-mono leading-relaxed max-w-lg"
            >
              Pure monochromatic hardware meets exceptional digital execution. Engineering stripped bare to celebrate the beauty of raw components, titanium, and FSC walnut.
            </motion.p>
          </div>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              id="hero-shop-btn"
              onClick={() => onScrollToSection("best-sellers")}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black font-mono uppercase text-xs tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
            >
              [ SHOP ALL ]
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>

            <button
              id="hero-explore-btn"
              onClick={() => onScrollToSection("categories")}
              className="px-6 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-900 text-white font-mono uppercase text-xs tracking-widest transition-all duration-300 border border-neutral-800 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              Explore Products
            </button>
          </motion.div>
        </div>

        {/* Right Column: Parallax Master Artwork with Interactive Floating Cards */}
        <div className="lg:col-span-6 relative flex justify-center items-center h-[380px] sm:h-[550px] lg:h-[650px]">
          {/* Main Cinematic Artwork Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full h-full max-w-[500px] rounded-[32px] overflow-hidden border border-neutral-800"
          >
            {/* Parallax Subtle Zooming Image */}
            <motion.img
              src="/src/assets/images/aura_luxury_hero_1783274101555.jpg"
              alt="AURA Luxury Showcase"
              className="w-full h-full object-cover grayscale opacity-90 contrast-[1.05]"
              referrerPolicy="no-referrer"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Visual Tint Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none" />

            {/* Inbuilt Floating Info Frame (Glassmorphism) */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/85 backdrop-blur-md border border-neutral-800 shadow-lg">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#FF3333] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-pulse" />
                BLUEPRINT_EDITION
              </span>
              <h3 className="font-sans text-base font-semibold text-neutral-100 mt-1 uppercase tracking-wider">
                Titanium x Transparent Amber Edition
              </h3>
              <p className="text-[11px] text-neutral-500 mt-1 font-mono leading-relaxed">
                Excellence curated for design-forward collectors. Only 250 units globally available.
              </p>
            </div>
          </motion.div>

          {/* Floating Product Card Widget 1: Live Interactive Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className="absolute top-10 right-0 sm:-right-6 w-60 p-4 rounded-2xl bg-neutral-950/95 border border-neutral-800 shadow-2xl z-20 cursor-pointer hidden sm:block"
            onClick={() => onQuickView(featuredProduct)}
          >
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-neutral-850">
                <img
                  src={featuredProduct.images[0]}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-mono text-neutral-500 tracking-wider block uppercase">
                  {featuredProduct.brand}
                </span>
                <h4 className="text-[11px] font-mono text-neutral-200 truncate mt-0.5 uppercase tracking-wide">
                  {featuredProduct.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-mono font-bold text-white">
                    ${featuredProduct.price}
                  </span>
                  {featuredProduct.originalPrice && (
                    <span className="text-[10px] font-mono text-neutral-600 line-through">
                      ${featuredProduct.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-neutral-900">
              <span className="text-[9px] font-mono text-neutral-400 flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-pulse" />
                STOCK_QTY_({featuredProduct.stock})
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(featuredProduct);
                }}
                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white transition-colors cursor-pointer border border-neutral-800"
                aria-label="Quick Add to Cart"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Floating Card 2: Interactive Realtime Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute bottom-20 -left-6 w-48 p-4 rounded-2xl bg-neutral-950/95 text-white shadow-2xl z-20 hidden sm:block border border-neutral-850"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-pulse" />
              <span className="text-[9px] font-mono tracking-widest text-neutral-450 uppercase">
                LIVE_TRAFFIC
              </span>
            </div>
            <div className="text-2xl font-ndot tracking-wide">418</div>
            <p className="text-[10px] font-mono text-neutral-500 leading-relaxed mt-1">
              Currently engineering the Travertine collection specs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges - Horizontal Row Beneath Hero */}
      <div className="max-w-7xl mx-auto w-full pt-16 z-10 border-t border-neutral-900 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-center text-neutral-300">
              <span className="font-mono text-xs text-[#FF3333] font-bold">W-3</span>
            </div>
            <div>
              <h4 className="text-[11px] font-mono text-neutral-100 uppercase tracking-widest">
                3-Year Warranty
              </h4>
              <p className="text-[10px] font-mono text-neutral-500 mt-0.5">Concierge mechanical coverage</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-center text-neutral-300">
              <span className="font-mono text-xs text-white">FSC</span>
            </div>
            <div>
              <h4 className="text-[11px] font-mono text-neutral-100 uppercase tracking-widest">
                FSC-Certified Wood
              </h4>
              <p className="text-[10px] font-mono text-neutral-500 mt-0.5">Sustainably harvested walnut</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-center text-neutral-300">
              <span className="font-mono text-xs text-white">S-P</span>
            </div>
            <div>
              <h4 className="text-[11px] font-mono text-neutral-100 uppercase tracking-widest">
                Sensory Unboxing
              </h4>
              <p className="text-[10px] font-mono text-neutral-500 mt-0.5">Custom wax sealed wrapping</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-center text-neutral-300">
              <span className="font-mono text-xs text-[#FF3333]">C-0</span>
            </div>
            <div>
              <h4 className="text-[11px] font-mono text-neutral-100 uppercase tracking-widest">
                100% CO2 Neutral
              </h4>
              <p className="text-[10px] font-mono text-neutral-500 mt-0.5">Eco-conscious delivery offset</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
