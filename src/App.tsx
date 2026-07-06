import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Product, CartItem, ColorVariant } from "./types";
import { PRODUCTS } from "./data";

// Sub Components Imports
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCollection from "./components/FeaturedCollection";
import CategorySection from "./components/CategorySection";
import BestSellers from "./components/BestSellers";
import FlashSale from "./components/FlashSale";
import NewArrivals from "./components/NewArrivals";
import LifestyleBanner from "./components/LifestyleBanner";
import BrandStory from "./components/BrandStory";
import WhyChooseUs from "./components/WhyChooseUs";
import Reviews from "./components/Reviews";
import InstagramGallery from "./components/Instagram";
import Newsletter from "./components/Newsletter";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Modals & Drawers
import QuickViewModal from "./components/QuickViewModal";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import SearchModal from "./components/SearchModal";

interface Toast {
  id: string;
  message: string;
  type: "success" | "info";
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);

  // Drawer / Modal visibility triggers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Custom Toast state
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Local Storage synchronizer to make persistence highly robust
  useEffect(() => {
    const cachedCart = localStorage.getItem("aura_cart");
    const cachedWish = localStorage.getItem("aura_wishlist");
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (e) {
        console.error(e);
      }
    }
    if (cachedWish) {
      try {
        setWishlist(JSON.parse(cachedWish));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("aura_cart", JSON.stringify(updatedCart));
  };

  const saveWishlistToStorage = (updatedWish: string[]) => {
    setWishlist(updatedWish);
    localStorage.setItem("aura_wishlist", JSON.stringify(updatedWish));
  };

  // Toast Trigger Helper
  const triggerToast = (message: string, type: "success" | "info" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Add to Cart
  const handleAddToCart = (product: Product, color?: ColorVariant, size?: string) => {
    const selectedColor = color || product.colors[0];
    const selectedSize = size || (product.sizes ? product.sizes[0] : undefined);

    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedColor?.name === selectedColor.name &&
        item.selectedSize === selectedSize
    );

    let updated: CartItem[] = [];
    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += 1;
    } else {
      updated = [...cart, { product, quantity: 1, selectedColor, selectedSize }];
    }

    saveCartToStorage(updated);
    triggerToast(`Added ${product.name} to your Atelier Bag.`, "success");
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (index: number, delta: number) => {
    const updated = [...cart];
    const newQty = updated[index].quantity + delta;
    if (newQty <= 0) {
      updated.splice(index, 1);
    } else {
      updated[index].quantity = newQty;
    }
    saveCartToStorage(updated);
  };

  // Product-centric quantity update (Big Basket style)
  const handleUpdateProductQuantity = (product: Product, delta: number, color?: ColorVariant) => {
    const selectedColor = color || product.colors[0];
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        (!selectedColor || item.selectedColor?.name === selectedColor.name)
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      const newQty = updated[existingIndex].quantity + delta;
      if (newQty <= 0) {
        const removedItemName = updated[existingIndex].product.name;
        updated.splice(existingIndex, 1);
        triggerToast(`Removed ${removedItemName} from your Atelier Bag.`, "info");
      } else {
        updated[existingIndex].quantity = newQty;
      }
      saveCartToStorage(updated);
    } else if (delta > 0) {
      handleAddToCart(product, selectedColor);
    }
  };

  // Remove Item from Cart
  const handleRemoveItem = (index: number) => {
    const updated = [...cart];
    const removedItemName = updated[index].product.name;
    updated.splice(index, 1);
    saveCartToStorage(updated);
    triggerToast(`Removed ${removedItemName} from your Bag.`, "info");
  };

  // Clear Cart
  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  // Wishlist Toggler
  const handleAddToWishlist = (productId: string) => {
    const match = PRODUCTS.find((p) => p.id === productId);
    if (!match) return;

    let updated: string[] = [];
    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id) => id !== productId);
      triggerToast(`Removed ${match.name} from Wishlist.`, "info");
    } else {
      updated = [...wishlist, productId];
      triggerToast(`Added ${match.name} to Wishlist.`, "success");
    }
    saveWishlistToStorage(updated);
  };

  // Buy Now Flow (High-conversion UX shortcut)
  const handleBuyNow = (product: Product) => {
    // 1. Add to bag with default configurations
    handleAddToCart(product, product.colors[0], product.sizes ? product.sizes[0] : undefined);
    // 2. Open cart drawer
    setIsCartOpen(true);
    // 3. Let's find and simulate click/stage movement directly to checkout billing stage
    // Handled natively inside CartDrawer component!
  };

  // Custom Anchor Scroll with Navbar padding offsets
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 85; // navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-[#000000] min-h-screen text-neutral-100 selection:bg-neutral-800 selection:text-white font-sans antialiased">
      
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onQuickView={setActiveQuickViewProduct}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Pages Segment Sections */}
      <main className="relative">
        <Hero
          onScrollToSection={handleScrollToSection}
          onQuickView={setActiveQuickViewProduct}
          onAddToCart={(p) => handleAddToCart(p, p.colors[0], p.sizes ? p.sizes[0] : undefined)}
        />
        
        <FeaturedCollection
          wishlist={wishlist}
          cart={cart}
          onAddToCart={(p) => handleAddToCart(p, p.colors[0], p.sizes ? p.sizes[0] : undefined)}
          onAddToWishlist={handleAddToWishlist}
          onQuickView={setActiveQuickViewProduct}
          onUpdateCartQuantity={handleUpdateProductQuantity}
        />

        <CategorySection
          onScrollToSection={handleScrollToSection}
          onSelectCategoryFilter={setActiveCategoryFilter}
          activeCategoryFilter={activeCategoryFilter}
        />

        <BestSellers
          wishlist={wishlist}
          cart={cart}
          activeCategoryFilter={activeCategoryFilter}
          setActiveCategoryFilter={setActiveCategoryFilter}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onQuickView={setActiveQuickViewProduct}
          onBuyNow={handleBuyNow}
          onUpdateCartQuantity={handleUpdateProductQuantity}
        />

        <FlashSale
          wishlist={wishlist}
          onAddToCart={(p) => handleAddToCart(p, p.colors[0], p.sizes ? p.sizes[0] : undefined)}
          onAddToWishlist={handleAddToWishlist}
          onQuickView={setActiveQuickViewProduct}
        />

        <NewArrivals
          onAddToCart={(p) => handleAddToCart(p, p.colors[0], p.sizes ? p.sizes[0] : undefined)}
          onQuickView={setActiveQuickViewProduct}
        />

        <LifestyleBanner onScrollToSection={handleScrollToSection} />

        <BrandStory />

        <WhyChooseUs />

        <Reviews />

        <InstagramGallery />

        <Newsletter />

        <FAQ />

        <Contact />
      </main>

      {/* Footer */}
      <Footer onScrollToSection={handleScrollToSection} onShowToast={triggerToast} />

      {/* MODALS & DRAWERS BACKDROP CONTAINERS */}

      {/* Quick View Modal */}
      <QuickViewModal
        product={activeQuickViewProduct}
        onClose={() => setActiveQuickViewProduct(null)}
        isWishlisted={activeQuickViewProduct ? wishlist.includes(activeQuickViewProduct.id) : false}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        onBuyNow={handleBuyNow}
      />

      {/* Cart Slider Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Slider Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleAddToWishlist}
        onAddToCart={(p) => handleAddToCart(p, p.colors[0], p.sizes ? p.sizes[0] : undefined)}
      />

      {/* Search Floating Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onQuickView={setActiveQuickViewProduct}
      />

      {/* NOTIFICATION TOAST FRAME (Floating Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-150 space-y-3 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -40, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.9 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-black text-neutral-200 rounded-xl p-4 shadow-2xl flex items-start gap-3 pointer-events-auto border border-neutral-800"
            >
              {toast.type === "success" ? (
                <span className="w-2 h-2 rounded-full bg-[#FF3333] animate-pulse flex-shrink-0 mt-1.5" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-neutral-500 flex-shrink-0 mt-1.5" />
              )}
              <div className="flex-1 text-left">
                <p className="text-[11px] font-mono leading-relaxed uppercase tracking-wider">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="text-neutral-550 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
