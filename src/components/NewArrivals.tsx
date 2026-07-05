import { motion } from "motion/react";
import { ArrowUpRight, ShoppingBag, Eye, Star } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface NewArrivalsProps {
  onAddToCart: (product: Product, color?: any) => void;
  onQuickView: (product: Product) => void;
}

export default function NewArrivals({ onAddToCart, onQuickView }: NewArrivalsProps) {
  // Let's filter products with isNew = true
  const newArrivals = PRODUCTS.filter((p) => p.isNew || p.id === "accessory-1" || p.id === "sports-1");

  // Custom heights or classes to enforce Pinterest style variations
  const imageAspects = [
    "aspect-[4/5]",  // perfume
    "aspect-[1/1]",  // smartwatch
    "aspect-[3/4]",  // cardholder
    "aspect-[4/3]",  // brutalist vase
    "aspect-[4/5]"   // dumbbells
  ];

  return (
    <section id="new-arrivals" className="py-24 bg-[#000000] px-6 md:px-12 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-16 text-left">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF3333] uppercase block">
              NEW_Blueprints_dropped
            </span>
            <h2 className="font-ndot text-3xl md:text-4xl text-white uppercase tracking-wide">
              New Drops Lineup
            </h2>
          </div>
          <p className="text-neutral-400 font-mono text-xs max-w-md leading-relaxed">
            Tactile masonry layout displaying our most recent aesthetic hardware iterations and high-concept blueprints.
          </p>
        </div>

        {/* Pinterest Masonry Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 [column-fill:_balance]">
          {newArrivals.map((product, index) => {
            const aspectClass = imageAspects[index % imageAspects.length];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="break-inside-avoid bg-neutral-950/20 rounded-[24px] p-6 border border-neutral-900 hover:border-neutral-800 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between group cursor-pointer"
                onClick={() => onQuickView(product)}
              >
                {/* Photo frame with custom aspect ratios */}
                <div className={`relative ${aspectClass} rounded-xl overflow-hidden bg-black border border-neutral-900 mb-5`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale opacity-90 contrast-[1.03] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-750 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <span className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full text-[8px] font-mono font-bold tracking-widest uppercase bg-[#FF3333] text-white border border-[#FF3333]/20">
                    NEW_EDITION
                  </span>
                </div>

                {/* Info block */}
                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
                      {product.brand}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-white text-white" />
                      <span className="text-[10px] font-mono text-neutral-300">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-sans text-base font-semibold uppercase tracking-wide text-neutral-200 group-hover:text-white transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-[11px] font-mono text-neutral-500 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-900">
                    <span className="text-base font-mono text-white">
                      ${product.price.toLocaleString()}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className="p-2 rounded-full bg-black hover:bg-neutral-900 border border-neutral-850 text-neutral-350 transition-colors cursor-pointer"
                        title="Quick View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="p-2 rounded-full bg-white hover:bg-neutral-100 border border-neutral-850 text-black transition-all cursor-pointer"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
