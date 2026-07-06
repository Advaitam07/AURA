import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onQuickView: (product: Product) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onQuickView,
  onScrollToSection
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#000000]/95 backdrop-blur-md border-b border-neutral-900/80"
            : "bg-transparent"
        }`}
      >
        <div className={`max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "py-4" : "py-6"
        }`}>
          {/* Logo */}
          <button
            id="nav-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3333] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3333]"></span>
            </span>
            <span className="font-ndot tracking-[0.3em] text-2xl text-white group-hover:text-neutral-300 transition-colors">
              AURA
            </span>
          </button>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Standard Category Links */}
            <button
              id="nav-link-shop"
              onClick={() => onScrollToSection("best-sellers")}
              className="relative py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors cursor-pointer group"
            >
              Shop All
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF3333] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Categories Mega Menu Trigger */}
            <div
              id="nav-link-categories"
              className="relative"
              onMouseEnter={() => setActiveMegaMenu("categories")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-1.5 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors cursor-pointer group">
                Categories
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF3333] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {activeMegaMenu === "categories" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[850px] bg-neutral-950/98 backdrop-blur-xl rounded-[24px] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-neutral-800 grid grid-cols-12 gap-8"
                  >
                    {/* Left Column: Quick links */}
                    <div className="col-span-4 border-r border-neutral-800 pr-6">
                      <div className="flex items-center gap-2 mb-4 text-[#FF3333] font-mono text-[10px] tracking-[0.25em] uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333]" />
                        AURA LABS
                      </div>
                      <h4 className="font-ndot text-xl tracking-[0.1em] text-white mb-2 uppercase">
                        SPEC_SHEET_2026
                      </h4>
                      <p className="text-xs font-mono text-neutral-400 mb-6 leading-relaxed">
                        Explore our transparently engineered catalog. Monochromatic form meeting ultimate digital function.
                      </p>
                      <button
                        onClick={() => {
                          onScrollToSection("categories");
                          setActiveMegaMenu(null);
                        }}
                        className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white hover:text-neutral-300 transition-colors group cursor-pointer"
                      >
                        [ ALL_CATEGORIES ]
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Right Column: Featured Products inside Mega Menu */}
                    <div className="col-span-8 grid grid-cols-3 gap-4">
                      {featuredProducts.map((p) => (
                        <div key={p.id} className="group/item border border-neutral-850 p-3 rounded-2xl bg-neutral-900/20 hover:bg-neutral-900/40 transition-colors">
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-black mb-3 border border-neutral-800">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-neutral-950/20" />
                          </div>
                          <span className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase block mb-0.5">
                            {p.brand}
                          </span>
                          <h5 className="font-mono text-[11px] text-neutral-200 group-hover/item:text-white transition-colors line-clamp-1">
                            {p.name}
                          </h5>
                          <span className="text-[11px] font-mono text-neutral-300 mt-1 block">
                            ${p.price.toLocaleString()}
                          </span>
                          <button
                            onClick={() => {
                              onQuickView(p);
                              setActiveMegaMenu(null);
                            }}
                            className="text-[10px] font-mono text-neutral-400 hover:text-white mt-2 inline-block cursor-pointer border border-neutral-800 hover:border-neutral-700 px-2.5 py-1 rounded"
                          >
                            [ INFO ]
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              id="nav-link-story"
              onClick={() => onScrollToSection("brand-story")}
              className="relative py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors cursor-pointer group"
            >
              Story
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF3333] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              id="nav-link-why"
              onClick={() => onScrollToSection("why-choose-us")}
              className="relative py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors cursor-pointer group"
            >
              Specs
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF3333] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              id="nav-link-faq"
              onClick={() => onScrollToSection("faq")}
              className="relative py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors cursor-pointer group"
            >
              Support
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF3333] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              id="nav-link-contact"
              onClick={() => onScrollToSection("contact")}
              className="relative py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors cursor-pointer group"
            >
              Atelier
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF3333] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Icon */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900/50 rounded-full transition-all cursor-pointer"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <button
              id="nav-account-btn"
              onClick={() => alert("AURA Atelier Concierge Login: Feature coming soon to your personal dashboard.")}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900/50 rounded-full transition-all cursor-pointer"
              aria-label="Account Settings"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              id="nav-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900/50 rounded-full relative transition-all cursor-pointer"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FF3333] text-white text-[9px] font-mono font-bold flex items-center justify-center border border-black"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900/50 rounded-full relative transition-all cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white text-black text-[9px] font-mono font-bold flex items-center justify-center border border-black"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Icon */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white cursor-pointer"
              aria-label="Toggle Mobile Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-45 bg-black/80 backdrop-blur-md lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-[300px] bg-black p-8 pt-24 shadow-2xl flex flex-col gap-5 border-l border-neutral-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Internal Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onScrollToSection("best-sellers");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:text-[#FF3333] border-b border-neutral-900 pb-3"
              >
                Shop All
              </button>
              <button
                onClick={() => {
                  onScrollToSection("categories");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:text-[#FF3333] border-b border-neutral-900 pb-3"
              >
                Categories
              </button>
              <button
                onClick={() => {
                  onScrollToSection("brand-story");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:text-[#FF3333] border-b border-neutral-900 pb-3"
              >
                Our Story
              </button>
              <button
                onClick={() => {
                  onScrollToSection("why-choose-us");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:text-[#FF3333] border-b border-neutral-900 pb-3"
              >
                Why AURA
              </button>
              <button
                onClick={() => {
                  onScrollToSection("faq");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:text-[#FF3333] border-b border-neutral-900 pb-3"
              >
                FAQ
              </button>
              <button
                onClick={() => {
                  onScrollToSection("contact");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300 hover:text-[#FF3333] border-b border-neutral-900 pb-3"
              >
                Contact
              </button>

              <div className="mt-auto pt-6 border-t border-neutral-900 text-center">
                <p className="text-[10px] text-neutral-500 font-mono tracking-wider uppercase">
                  AURA Ateliers © 2026.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
