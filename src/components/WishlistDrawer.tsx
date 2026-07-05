import { motion, AnimatePresence } from "motion/react";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart
}: WishlistDrawerProps) {
  // Pull wishlisted products
  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex justify-end">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
          />

          {/* Sliding Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="relative w-full max-w-md bg-[#0D0D11] h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden border-l border-white/5"
          >
            {/* Header */}
            <div className="py-6 px-6 border-b border-neutral-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#FF3333] fill-[#FF3333]" />
                <h2 className="font-ndot text-lg text-white uppercase tracking-wider">Favorites</h2>
                {wishlistedProducts.length > 0 && (
                  <span className="text-[9px] bg-neutral-900 px-2.5 py-1 rounded-full font-mono text-neutral-400 border border-neutral-800 uppercase tracking-wider">
                    {wishlistedProducts.length} Locked
                  </span>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-900 border border-transparent hover:border-neutral-800 text-neutral-350 transition-colors cursor-pointer"
                aria-label="Close Wishlist"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <Heart className="w-10 h-10 text-neutral-800 mx-auto" />
                  <h3 className="font-ndot text-sm text-neutral-200 uppercase tracking-wider">No covets recorded</h3>
                  <p className="text-[11px] font-mono text-neutral-500 max-w-xs mx-auto leading-relaxed">
                    Review our blueprint catalog and click the heart indicators to lock in your desired editions.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-black font-mono text-xs uppercase tracking-widest cursor-pointer"
                  >
                    View Catalog_
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  {wishlistedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-4 rounded-xl bg-black border border-neutral-900 hover:border-neutral-800 transition-colors items-center"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-black border border-neutral-850 flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover grayscale opacity-90"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-mono text-neutral-500 tracking-wider uppercase block">
                          {product.brand}
                        </span>
                        <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wide truncate">
                          {product.name}
                        </h4>
                        <span className="text-xs font-mono font-bold text-white block mt-0.5">
                          ${product.price.toLocaleString()}
                        </span>

                        {/* Interactive Buttons */}
                        <div className="flex items-center gap-2 pt-2">
                          <button
                            onClick={() => {
                              onAddToCart(product);
                              onRemoveFromWishlist(product.id);
                            }}
                            className="py-1.5 px-3.5 rounded-full bg-white hover:bg-neutral-100 text-black text-[9px] font-mono uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
                          >
                            [ ADD_TO_BAG ]
                          </button>

                          <button
                            onClick={() => onRemoveFromWishlist(product.id)}
                            className="p-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-[#FF3333] hover:border-neutral-700 transition-colors flex items-center justify-center cursor-pointer"
                            title="Remove Favorite"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions Frame */}
            {wishlistedProducts.length > 0 && (
              <div className="border-t border-neutral-900 p-6 bg-[#09090C]">
                <button
                  onClick={() => {
                    // Transfer all to cart
                    wishlistedProducts.forEach((p) => onAddToCart(p));
                    wishlistedProducts.forEach((p) => onRemoveFromWishlist(p.id));
                    onClose();
                  }}
                  className="w-full py-3 rounded-full bg-white hover:bg-neutral-100 text-black text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                >
                  Acquire All Favorites_
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
