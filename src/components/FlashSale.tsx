import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, ShoppingBag, Eye, Heart, Sparkles } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface FlashSaleProps {
  wishlist: string[];
  onAddToCart: (product: Product, color?: any) => void;
  onAddToWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export default function FlashSale({
  wishlist,
  onAddToCart,
  onAddToWishlist,
  onQuickView
}: FlashSaleProps) {
  // Let's use the headphones as the featured flash sale item
  const product = PRODUCTS.find((p) => p.id === "headphones-1") || PRODUCTS[0];
  
  // Real-time ticking countdown timer (Set to target 14 hours, 32 minutes from now)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Restart timer to stay organic
          return { hours: 14, minutes: 32, seconds: 45 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const claimedPercent = 75; // 75% claimed
  const isWishlisted = wishlist.includes(product.id);

  return (
    <section id="flash-sale" className="py-24 bg-[#000000] text-white relative overflow-hidden px-6 md:px-12 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto relative z-10 text-left">
        
        {/* Asymmetrical Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Offer details and countdown */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 bg-neutral-950 px-4 py-2 rounded-full border border-neutral-850 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-pulse" />
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#FF3333] uppercase">
                LIMITED_RELEASE_blueprints
              </span>
            </div>

            <h2 className="font-ndot text-3xl sm:text-4xl text-white uppercase tracking-wide leading-tight">
              AURA ECLIPSE EDITION.
              <br />
              <span className="text-neutral-450 font-normal">available until inventory clear.</span>
            </h2>

            <p className="text-neutral-400 font-mono text-xs leading-relaxed max-w-lg">
              Experience the absolute pinnacle of acoustic micro-engineering. Crafted with sustainable beryllium drivers and unpolished premium elements. Individually serialized.
            </p>

            {/* Countdown Box */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#FF3333] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-pulse" />
                ACQUISITION_LOCK_WINDOW
              </span>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-950 border border-neutral-850 rounded-xl flex items-center justify-center text-lg sm:text-xl font-mono tracking-tight text-white shadow-xl">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </div>
                  <span className="text-[8px] text-neutral-500 tracking-[0.15em] uppercase mt-1.5 font-mono">Hours</span>
                </div>
                <span className="text-xl text-neutral-850 font-mono">:</span>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-950 border border-neutral-850 rounded-xl flex items-center justify-center text-lg sm:text-xl font-mono tracking-tight text-white shadow-xl">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </div>
                  <span className="text-[8px] text-neutral-500 tracking-[0.15em] uppercase mt-1.5 font-mono">Minutes</span>
                </div>
                <span className="text-xl text-neutral-850 font-mono">:</span>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-950 border border-neutral-850 rounded-xl flex items-center justify-center text-lg sm:text-xl font-mono tracking-tight text-[#FF3333] shadow-xl">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </div>
                  <span className="text-[8px] text-[#FF3333] tracking-[0.15em] uppercase mt-1.5 font-mono">Seconds</span>
                </div>
              </div>
            </div>

            {/* Progress Bar (Claimed items indicator) */}
            <div className="space-y-3 max-w-md pt-2">
              <div className="flex justify-between items-baseline text-[10px] font-mono uppercase tracking-wider">
                <span className="text-neutral-500">Inventory Reserved</span>
                <span className="text-[#FF3333]">{claimedPercent}% Claimed_</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-neutral-950 overflow-hidden relative border border-neutral-900">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${claimedPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute left-0 top-0 h-full bg-white rounded-full"
                />
              </div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide block">
                ONLY {product.stock} UNITS REMAINING AT ACTIVE PROMOTIONAL TIER.
              </span>
            </div>
          </div>

          {/* Right Block: Presentation Box */}
          <div className="lg:col-span-6 relative flex justify-center items-center h-[500px]">
            {/* Backdrop Card Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[420px] rounded-[24px] bg-neutral-950/20 border border-neutral-900 p-8 flex flex-col justify-between h-full shadow-[0_30px_70px_rgba(0,0,0,0.85)] group"
            >
              {/* Product Artwork Frame */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-black border border-neutral-900 mb-6">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Sale and Wishlist buttons */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#FF3333] text-white font-mono font-bold text-[9px] rounded-full uppercase tracking-widest border border-white/5">
                  SAVE ${product.originalPrice ? product.originalPrice - product.price : 100}
                </div>
                
                <button
                  onClick={() => onAddToWishlist(product.id)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/85 border border-neutral-800 text-white hover:text-[#FF3333] hover:scale-105 transition-all cursor-pointer"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-[#FF3333] text-[#FF3333]" : ""}`} />
                </button>
              </div>

              {/* Offer Pricing & CTA Controls */}
              <div className="space-y-4 text-left">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">
                    {product.brand}
                  </span>
                  <h3 className="font-sans text-lg font-semibold tracking-wide uppercase text-neutral-200 group-hover:text-white transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-mono text-white">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs font-mono text-neutral-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-[#FF3333] uppercase tracking-wider">
                    -{product.discount}% OFF
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    ACQUIRE_NOW
                  </button>
                  <button
                    onClick={() => onQuickView(product)}
                    className="py-3.5 rounded-full bg-black hover:bg-neutral-900 border border-neutral-800 text-white text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    blueprint
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
