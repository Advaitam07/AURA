import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Star, ArrowRight } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickView: (product: Product) => void;
}

export default function SearchModal({ isOpen, onClose, onQuickView }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const popularSearches = ["Headphones", "Perfume", "Watch", "Lounge Chair", "Knit", "Travertine"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-24 px-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
          />

          {/* Floating Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-[#0D0D11] rounded-[24px] overflow-hidden shadow-2xl border border-neutral-800 p-6 space-y-6 z-10 text-left"
          >
            {/* Input Line */}
            <div className="relative flex items-center border-b border-neutral-900 pb-4">
              <Search className="w-5 h-5 text-neutral-500 absolute left-2" />
              <input
                ref={inputRef}
                type="text"
                placeholder="SEARCH CATALOG_..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent pl-10 pr-10 text-neutral-100 text-sm placeholder-neutral-600 focus:outline-none font-mono uppercase tracking-wider"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors absolute right-2 cursor-pointer border border-neutral-800"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Popular and Results Panels */}
            <div className="space-y-6">
              {!query.trim() ? (
                /* Showcase popular suggestions when search is blank */
                <div className="space-y-3">
                  <h4 className="text-[9px] font-mono tracking-[0.2em] text-[#FF3333] uppercase">POPULAR_INQUIRIES</h4>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2.5 rounded-full bg-black border border-neutral-850 hover:border-neutral-700 text-neutral-300 text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Query Matches */
                <div className="space-y-4">
                  <h4 className="text-[9px] font-mono tracking-[0.2em] text-[#FF3333] uppercase">
                    CATALOG_MATCHES_({searchResults.length})
                  </h4>

                  {searchResults.length === 0 ? (
                    <div className="text-center py-10 text-neutral-500 space-y-1 bg-black rounded-2xl p-6 border border-neutral-900">
                      <p className="text-sm font-mono uppercase tracking-wider text-neutral-300">No blueprints found.</p>
                      <p className="text-[11px] font-mono">Refine your inquiry with terms like 'titanium' or 'walnut'.</p>
                    </div>
                  ) : (
                    <div className="max-h-80 overflow-y-auto space-y-3 pr-2 scrollbar-none">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            onQuickView(product);
                            onClose();
                          }}
                          className="flex gap-4 p-3 rounded-xl bg-black border border-neutral-900 hover:border-neutral-800 hover:bg-neutral-950/40 transition-all cursor-pointer items-center group"
                        >
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-black border border-neutral-850 flex-shrink-0">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-350"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="flex-1 min-w-0 text-left">
                            <span className="text-[9px] font-mono text-neutral-500 tracking-wider uppercase block">
                              {product.brand}
                            </span>
                            <h5 className="text-xs font-semibold text-neutral-200 group-hover:text-white uppercase tracking-wide truncate">
                              {product.name}
                            </h5>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                  <Star
                                    key={idx}
                                    className={`w-2.5 h-2.5 ${
                                      idx < Math.floor(product.rating)
                                        ? "fill-white text-white"
                                        : "text-neutral-800"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-[10px] font-mono text-neutral-400">{product.rating}</span>
                              <span className="text-[10px] font-mono text-neutral-500">• ${product.price.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-neutral-900">
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Help Column */}
            <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-[9px] text-neutral-500 uppercase tracking-widest font-mono">
              <span>Press [ESC] to retract</span>
              <span>AURA SEARCH SYSTEM_V.01</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
