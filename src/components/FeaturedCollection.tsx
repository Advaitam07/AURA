import { motion } from "motion/react";
import { Eye } from "lucide-react";
import { Product, CartItem } from "../types";
import { PRODUCTS } from "../data";

interface FeaturedCollectionProps {
  wishlist: string[];
  cart: CartItem[];
  onAddToCart: (product: Product, color?: any) => void;
  onAddToWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onUpdateCartQuantity?: (product: Product, delta: number, color?: any) => void;
}

export default function FeaturedCollection({
  wishlist,
  cart,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  onUpdateCartQuantity
}: FeaturedCollectionProps) {
  // Let's pull featured products
  const chair = PRODUCTS.find((p) => p.id === "furniture-1")!;
  const perfume = PRODUCTS.find((p) => p.id === "perfume-1")!;
  const watch = PRODUCTS.find((p) => p.id === "watch-1")!;

  const getProductQty = (p: Product) => {
    return cart
      .filter((item) => item.product.id === p.id)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <section id="featured-collection" className="py-24 bg-[#000000] px-6 md:px-12 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title with Subtitle and Design Detail */}
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-16">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF3333] uppercase block">
              CURATED_BLUEPRINTS_V01
            </span>
            <h2 className="font-ndot text-3xl md:text-4xl text-white uppercase tracking-wide">
              Selected Works
            </h2>
          </div>
          <p className="text-neutral-400 font-mono text-xs md:text-sm max-w-md leading-relaxed">
            Stripped back aesthetic paired with high fidelity internals. Explore our limited-run collaborative hardware releases.
          </p>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Large Billboard Grid Card (Left: 7-columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 group relative flex flex-col md:flex-row bg-[#0D0D11] rounded-[24px] overflow-hidden border border-neutral-800 hover:shadow-[0_30px_60px_rgba(0,0,0,0.85)] hover:border-neutral-750 transition-all duration-500 min-h-[480px]"
          >
            {/* Image Box */}
            <div className="relative w-full md:w-1/2 h-80 md:h-full bg-black overflow-hidden border-r border-neutral-900">
              <img
                src={chair.images[0]}
                alt={chair.name}
                className="w-full h-full object-cover grayscale opacity-90 contrast-[1.03] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[9px] font-mono tracking-[0.1em] uppercase bg-black text-[#FF3333] border border-neutral-800">
                {chair.badge || "LIMITED"}
              </span>
            </div>

            {/* Information Side */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between text-left">
              <div>
                <span className="text-[9px] font-mono tracking-[0.2em] text-neutral-550 uppercase block mb-2">
                  {chair.brand}
                </span>
                <h3 className="font-sans text-xl md:text-2xl font-semibold tracking-wide text-neutral-200 uppercase leading-tight mb-4 group-hover:text-white transition-colors">
                  {chair.name}
                </h3>
                <p className="text-neutral-450 text-xs font-mono leading-relaxed mb-6">
                  {chair.description}
                </p>

                <div className="space-y-3 mb-8">
                  {chair.features.slice(0, 2).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] mt-1.5" />
                      <span className="text-[11px] text-neutral-400 font-mono">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-1 mb-6">
                  <span className="text-2xl font-mono font-bold text-white">
                    ${chair.price.toLocaleString()}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-550 uppercase tracking-wider">
                    Complimentary White Glove Delivery
                  </span>
                </div>

                <div className="flex gap-3">
                  {getProductQty(chair) > 0 ? (
                    <div className="flex-1 flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden p-1.5 h-[38px]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateCartQuantity?.(chair, -1, chair.colors[0]);
                        }}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-400 hover:text-[#FF3333] hover:bg-neutral-800 transition-colors cursor-pointer text-sm font-bold"
                      >
                        -
                      </button>
                      <span className="text-[10px] font-mono text-white select-none">
                        {getProductQty(chair)} IN BAG
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateCartQuantity?.(chair, 1, chair.colors[0]);
                        }}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddToCart(chair)}
                      className="flex-1 py-3 px-5 rounded-full bg-white hover:bg-neutral-100 text-black text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer"
                    >
                      [ RESERVE ]
                    </button>
                  )}
                  <button
                    onClick={() => onQuickView(chair)}
                    className="p-3.5 rounded-full bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 transition-all cursor-pointer"
                    aria-label="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Double Stack Column (Right: 5-columns) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 text-left">
            
            {/* Perfume Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative bg-[#0D0D11] rounded-[24px] p-6 border border-neutral-800 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-neutral-700 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="flex gap-5 items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-black border border-neutral-850 flex-shrink-0 relative">
                  <img
                    src={perfume.images[0]}
                    alt={perfume.name}
                    className="w-full h-full object-cover grayscale opacity-90 contrast-[1.03] group-hover:grayscale-0 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
                    {perfume.brand}
                  </span>
                  <h3 className="font-sans text-sm font-semibold text-neutral-200 uppercase tracking-wide group-hover:text-white transition-colors line-clamp-1">
                    {perfume.name}
                  </h3>
                  <p className="text-[11px] text-neutral-450 font-mono line-clamp-2">
                    {perfume.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 mt-5 border-t border-neutral-900">
                <div>
                  <span className="text-base font-mono font-bold text-white block">
                    ${perfume.price}
                  </span>
                  <span className="text-[9px] font-mono text-[#FF3333] uppercase">
                    ONLY_QTY_({perfume.stock})_LEFT
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => onQuickView(perfume)}
                    className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 transition-colors cursor-pointer"
                    aria-label="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {getProductQty(perfume) > 0 ? (
                    <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden p-1 w-28 h-[38px]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateCartQuantity?.(perfume, -1, perfume.colors[0]);
                        }}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-neutral-400 hover:text-[#FF3333] hover:bg-neutral-800 transition-colors cursor-pointer text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="text-[10px] font-mono text-white select-none">
                        {getProductQty(perfume)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateCartQuantity?.(perfume, 1, perfume.colors[0]);
                        }}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddToCart(perfume)}
                      className="px-4 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-black text-[10px] font-mono uppercase tracking-widest cursor-pointer"
                    >
                      [ ADD ]
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Watch Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group relative bg-[#0D0D11] rounded-[24px] p-6 border border-neutral-800 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-neutral-700 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="flex gap-5 items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-black border border-neutral-850 flex-shrink-0 relative">
                  <img
                    src={watch.images[0]}
                    alt={watch.name}
                    className="w-full h-full object-cover grayscale opacity-90 contrast-[1.03] group-hover:grayscale-0 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="text-[9px] font-mono tracking-widest text-neutral-550 uppercase">
                    {watch.brand}
                  </span>
                  <h3 className="font-sans text-sm font-semibold text-neutral-200 uppercase tracking-wide group-hover:text-white transition-colors line-clamp-1">
                    {watch.name}
                  </h3>
                  <p className="text-[11px] text-neutral-450 font-mono line-clamp-2">
                    {watch.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 mt-5 border-t border-neutral-900">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-mono font-bold text-white">
                      ${watch.price}
                    </span>
                    {watch.originalPrice && (
                      <span className="text-xs font-mono text-neutral-650 line-through">
                        ${watch.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-[#FF3333] uppercase">
                    [-{watch.discount}%] SEASON_PROMO
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => onQuickView(watch)}
                    className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 transition-colors cursor-pointer"
                    aria-label="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {getProductQty(watch) > 0 ? (
                    <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden p-1 w-28 h-[38px]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateCartQuantity?.(watch, -1, watch.colors[0]);
                        }}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-neutral-400 hover:text-[#FF3333] hover:bg-neutral-800 transition-colors cursor-pointer text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="text-[10px] font-mono text-white select-none">
                        {getProductQty(watch)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateCartQuantity?.(watch, 1, watch.colors[0]);
                        }}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddToCart(watch)}
                      className="px-4 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-black text-[10px] font-mono uppercase tracking-widest cursor-pointer"
                    >
                      [ ADD ]
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
