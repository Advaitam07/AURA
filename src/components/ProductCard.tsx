import { useState } from "react";
import { motion } from "motion/react";
import { Star, Heart, ShoppingBag, Eye, CreditCard } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onAddToCart: (product: Product, color?: any) => void;
  onAddToWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  quantityInCart?: number;
  onUpdateCartQuantity?: (product: Product, delta: number, color?: any) => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  onBuyNow,
  quantityInCart = 0,
  onUpdateCartQuantity
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const hasHoverImage = product.images.length > 1;

  return (
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="group relative flex flex-col h-full bg-[#0D0D11] backdrop-blur-md rounded-[24px] overflow-hidden border border-neutral-800/80 hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-neutral-700 transition-all duration-500"
    >
      {/* Badge (Sale, Exclusive, New) */}
      {product.badge && (
        <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-[0.15em] uppercase bg-black text-[#FF3333] border border-neutral-800 shadow-xl">
          {product.badge}
        </span>
      )}

      {/* Wishlist Button */}
      <button
        id={`product-wishlist-btn-${product.id}`}
        onClick={() => onAddToWishlist(product.id)}
        className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/90 backdrop-blur-md border border-neutral-800 hover:bg-neutral-900 text-neutral-300 hover:text-[#FF3333] active:scale-95 transition-all shadow-md cursor-pointer"
        aria-label="Add to Wishlist"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWishlisted ? "fill-[#FF3333] text-[#FF3333]" : "text-neutral-400"
          }`}
        />
      </button>

      {/* Image Container with Hover Swap */}
      <div
        className="relative aspect-[4/5] bg-black overflow-hidden cursor-pointer group/image border-b border-neutral-900"
        onMouseEnter={() => hasHoverImage && setCurrentImageIndex(1)}
        onMouseLeave={() => setCurrentImageIndex(0)}
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover grayscale opacity-90 contrast-[1.03] group-hover/image:grayscale-0 group-hover/image:opacity-100 group-hover/image:scale-[1.03] transition-all duration-700 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Quick Actions Hover Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-center gap-2 lg:opacity-0 lg:translate-y-2 lg:group-hover/image:opacity-100 lg:group-hover/image:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2.5 px-4 rounded-full bg-black/95 hover:bg-neutral-900 text-white text-[10px] font-mono uppercase tracking-[0.15em] flex items-center justify-center gap-2 border border-neutral-800 shadow-xl transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-400" />
            [ VIEW_DETAILS ]
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1 space-y-3.5 text-left">
        {/* Brand & Stock Status */}
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono tracking-[0.15em] text-neutral-500 uppercase">
            {product.brand}
          </span>
          {product.stock <= 5 ? (
            <span className="text-[9px] font-mono font-bold text-[#FF3333] tracking-wide flex items-center gap-1 bg-[#FF3333]/5 border border-[#FF3333]/15 px-2 py-0.5 rounded">
              LOW_STOCK: {product.stock}
            </span>
          ) : (
            <span className="text-[9px] font-mono text-neutral-500 tracking-wide uppercase flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-neutral-600" />
              IN_STOCK
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="font-sans text-sm font-semibold tracking-wide text-neutral-200 hover:text-white uppercase transition-colors cursor-pointer line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex text-neutral-400 gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-white text-white"
                    : "text-neutral-800"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-neutral-300">{product.rating}</span>
          <span className="text-neutral-500 text-[10px] font-mono">({product.reviewCount})</span>
        </div>

        {/* Color Swatch Selectors */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase mr-1">
              SPEC_COLOR:
            </span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    selectedColor.name === color.name
                      ? "border-neutral-400 scale-110"
                      : "border-transparent hover:scale-105"
                  }`}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-neutral-900"
                    style={{ backgroundColor: color.value }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price Tag & Actions (Push down to fill card bottom) */}
        <div className="pt-3.5 mt-auto border-t border-neutral-900 flex flex-col gap-3">
          {/* Prices */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-mono font-bold text-white">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xs font-mono text-neutral-600 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
                <span className="text-[9px] font-mono font-bold text-[#FF3333] uppercase">
                  [-{product.discount}%]
                </span>
              </>
            )}
          </div>

          {/* Action Row: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {quantityInCart > 0 ? (
              <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden p-0.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateCartQuantity?.(product, -1, selectedColor);
                  }}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-400 hover:text-[#FF3333] hover:bg-neutral-800 transition-colors cursor-pointer text-xs font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-[10px] font-mono text-white select-none">
                  {quantityInCart} BAG
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateCartQuantity?.(product, 1, selectedColor);
                  }}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-xs font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                id={`add-to-cart-btn-${product.id}`}
                onClick={() => onAddToCart(product, selectedColor)}
                className="py-2.5 px-3 rounded-full bg-neutral-900 hover:bg-neutral-850 text-neutral-300 text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer border border-neutral-800"
              >
                [ CART ]
              </button>
            )}

            <button
              id={`buy-now-btn-${product.id}`}
              onClick={() => onBuyNow(product)}
              className="py-2.5 px-3 rounded-full bg-white hover:bg-neutral-100 text-black text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer"
            >
              [ BUY ]
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
