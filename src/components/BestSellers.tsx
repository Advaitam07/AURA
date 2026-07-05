import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Filter, SlidersHorizontal, Sparkles } from "lucide-react";
import { Product, CartItem } from "../types";
import { PRODUCTS } from "../data";
import ProductCard from "./ProductCard";

interface BestSellersProps {
  wishlist: string[];
  cart: CartItem[];
  activeCategoryFilter: string;
  setActiveCategoryFilter: (category: string) => void;
  onAddToCart: (product: Product, color?: any) => void;
  onAddToWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onUpdateCartQuantity?: (product: Product, delta: number, color?: any) => void;
}

const CATEGORY_CHIPS = ["All", "Electronics", "Beauty", "Furniture", "Accessories", "Fashion", "Home Decor", "Sports"];

export default function BestSellers({
  wishlist,
  cart,
  activeCategoryFilter,
  setActiveCategoryFilter,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  onBuyNow,
  onUpdateCartQuantity
}: BestSellersProps) {
  
  const filteredProducts = useMemo(() => {
    if (activeCategoryFilter === "All") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category.toLowerCase() === activeCategoryFilter.toLowerCase());
  }, [activeCategoryFilter]);

  return (
    <section id="best-sellers" className="py-24 bg-[#000000] px-6 md:px-12 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto text-left">
        
        {/* Header Title Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF3333] uppercase block">
              CATALOG_SPECIFICATIONS
            </span>
            <h2 className="font-ndot text-3xl md:text-4xl text-white uppercase tracking-wide">
              Selected Blueprints
            </h2>
            <p className="text-neutral-400 font-mono text-xs max-w-md leading-relaxed">
              Meticulously engineered items representing the peak of high-end tactile utility, physical elegance, and organic performance.
            </p>
          </div>

          {/* Interactive Utility Controls */}
          <div className="flex items-center gap-2 bg-neutral-950 px-4 py-2 rounded-full border border-neutral-850 shadow-md font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-pulse" />
            <span className="text-neutral-400 uppercase tracking-wider">
              {filteredProducts.length} PREMIUM_OBJECTS
            </span>
          </div>
        </div>

        {/* Categories Navigation Filter Chips */}
        <div className="flex flex-row md:flex-wrap items-center gap-2 mb-12 pb-3 overflow-x-auto whitespace-nowrap scrollbar-none snap-x snap-mandatory">
          {CATEGORY_CHIPS.map((chip) => {
            const isActive = activeCategoryFilter.toLowerCase() === chip.toLowerCase();
            return (
              <button
                key={chip}
                onClick={() => setActiveCategoryFilter(chip)}
                className={`snap-start flex-shrink-0 px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? "bg-white border-white text-black shadow-md"
                    : "bg-black border-neutral-850 text-neutral-450 hover:border-neutral-700 hover:text-white"
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* Dynamic Catalog Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                  onQuickView={onQuickView}
                  onBuyNow={onBuyNow}
                  quantityInCart={cart
                    .filter((item) => item.product.id === product.id)
                    .reduce((sum, item) => sum + item.quantity, 0)}
                  onUpdateCartQuantity={onUpdateCartQuantity}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Zero Results Handle */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 space-y-3 bg-black rounded-[24px] border border-neutral-900 p-8 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
            <h3 className="font-ndot text-sm text-neutral-300 uppercase tracking-wider">
              No curations in sector
            </h3>
            <p className="text-xs font-mono text-neutral-550 max-w-md mx-auto">
              We are currently engineering new physical blueprints for this sector. Retract filters or check back shortly.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
