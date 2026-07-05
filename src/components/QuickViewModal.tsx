import React, { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, ShoppingBag, CreditCard, Heart, Check } from "lucide-react";
import { Product, ColorVariant } from "../types";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onAddToCart: (product: Product, color: ColorVariant, size?: string) => void;
  onAddToWishlist: (productId: string) => void;
  onBuyNow: (product: Product) => void;
}

export default function QuickViewModal({
  product,
  onClose,
  isWishlisted,
  onAddToCart,
  onAddToWishlist,
  onBuyNow
}: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Update selection states when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes ? product.sizes[0] : null);
    }
  }, [product]);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Panel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-[#000000] rounded-[32px] w-full max-w-5xl h-[90vh] lg:h-auto max-h-[90vh] overflow-hidden shadow-2xl border border-neutral-900 flex flex-col lg:flex-row z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-30 p-2 rounded-full bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Interactive Product Image with Dynamic Zoom (lg:w-1/2) */}
          <div className="w-full lg:w-1/2 bg-[#000000] p-8 flex items-center justify-center relative border-r border-neutral-900 overflow-hidden min-h-[350px] lg:min-h-0">
            <div
              className="relative w-full aspect-square rounded-[20px] overflow-hidden border border-neutral-900 bg-neutral-950 cursor-zoom-in group"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              {/* Product Image */}
              <img
                src={product.images[0]}
                alt={product.name}
                className={`w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ${isZoomed ? "opacity-0" : "opacity-100"}`}
                referrerPolicy="no-referrer"
              />

              {/* Zoom Lens overlay */}
              {isZoomed && (
                <div
                  className="absolute inset-0 bg-no-repeat w-full h-full object-cover transition-transform scale-150 filter grayscale group-hover:grayscale-0 duration-300"
                  style={{
                    backgroundImage: `url(${product.images[0]})`,
                    backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    backgroundSize: "200%"
                  }}
                />
              )}

              {/* Dynamic Zoom Guide badge */}
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white text-[9px] px-3 py-1.5 rounded-lg pointer-events-none tracking-widest font-mono uppercase border border-neutral-900">
                Hover to Magnify
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Purchase Settings (lg:w-1/2) */}
          <div className="w-full lg:w-1/2 p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-full">
            <div className="space-y-6 text-left">
              {/* Brand and Stock Status */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  {product.brand}
                </span>
                <span className="text-[9px] font-mono text-[#FF3333] tracking-wider flex items-center gap-1.5 bg-[#FF3333]/5 border border-[#FF3333]/15 px-3 py-1 rounded-full uppercase">
                  <span className="w-1 h-1 rounded-full bg-[#FF3333] animate-ping" />
                  Only {product.stock} left in stock
                </span>
              </div>

              {/* Title and Rating */}
              <div className="space-y-2">
                <h2 className="font-ndot text-2xl md:text-3xl text-white uppercase tracking-wide leading-tight">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex text-[#FF3333]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? "fill-[#FF3333] text-[#FF3333]"
                            : "text-neutral-800"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-200">{product.rating}</span>
                  <span className="text-neutral-500 font-mono text-[9px] uppercase">({product.reviewCount} verified ratings)</span>
                </div>
              </div>

              {/* Pricing Panel */}
              <div className="flex items-baseline gap-3 pt-3 border-t border-neutral-900">
                <span className="text-2xl font-mono font-bold text-white">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xs font-mono text-neutral-500 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-[#FF3333] bg-[#FF3333]/10 border border-[#FF3333]/15 px-2 py-0.5 rounded uppercase">
                      -{product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Long Description */}
              <p className="text-neutral-400 text-xs font-mono uppercase leading-relaxed">
                {product.description}
              </p>

              {/* Key Features Bullets */}
              <div className="space-y-2 pt-2">
                <h4 className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">Blueprints & Features</h4>
                <div className="space-y-1.5">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-[10px] text-neutral-300 font-mono uppercase">
                      <div className="w-4 h-4 rounded-full bg-red-500/10 border border-[#FF3333]/20 flex items-center justify-center text-[#FF3333] flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selector Panels: Colors & Sizes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
                {/* Colors Selectors */}
                {selectedColor && (
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">
                      Select Tone
                    </label>
                    <div className="flex items-center gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                            selectedColor.name === color.name
                              ? "border-[#FF3333] scale-110"
                              : "border-transparent hover:scale-105"
                          }`}
                          title={color.name}
                        >
                          <span
                            className="w-4.5 h-4.5 rounded-full border border-black/10"
                            style={{ backgroundColor: color.value }}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-[8px] text-neutral-500 font-mono uppercase tracking-wider block pt-1">
                      Selection: {selectedColor.name}
                    </span>
                  </div>
                )}

                {/* Sizes Selectors */}
                {product.sizes && selectedSize && (
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block">
                      Select Size
                    </label>
                    <div className="flex items-center gap-1.5">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 rounded-full border text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                            selectedSize === size
                              ? "bg-[#FF3333] border-[#FF3333] text-white"
                              : "bg-black border border-neutral-850 text-neutral-400 hover:border-neutral-700"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Interaction Actions (Cart, Wishlist, Buy Now) */}
            <div className="pt-6 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-12 gap-3 mt-8">
              <button
                id="quick-view-add-cart-btn"
                onClick={() => selectedColor && onAddToCart(product, selectedColor, selectedSize || undefined)}
                className="sm:col-span-6 py-3.5 px-6 rounded-full bg-white hover:bg-neutral-200 text-black text-[11px] font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Add to Cart
              </button>

              <button
                id="quick-view-buy-now-btn"
                onClick={() => onBuyNow(product)}
                className="sm:col-span-4 py-3.5 px-6 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-850 text-white text-[11px] font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5" />
                Buy Now
              </button>

              <button
                id="quick-view-wishlist-btn"
                onClick={() => onAddToWishlist(product.id)}
                className="sm:col-span-2 py-3.5 px-3 rounded-full border border-neutral-850 bg-black hover:border-neutral-750 text-neutral-300 flex items-center justify-center transition-all cursor-pointer"
                title="Wishlist Toggle"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-[#FF3333] text-[#FF3333] border-transparent" : "text-neutral-500"}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
