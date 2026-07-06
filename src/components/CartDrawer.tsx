import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, ShieldCheck, Ticket, CheckCircle, Truck, Clipboard } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCodeApplied, setIsCodeApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  // Checkout Stages
  const [checkoutStage, setCheckoutStage] = useState<"cart" | "billing" | "success">("cart");
  const [billingForm, setBillingForm] = useState({ name: "", email: "", address: "", zip: "", card: "", expiry: "", cvv: "" });

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shippingThreshold = 150;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingCost = subtotal === 0 ? 0 : isFreeShipping ? 0 : 25;

  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = subtotal - discountAmount + shippingCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (promoCode.trim().toUpperCase() === "AURA15OFF") {
      setDiscountPercent(15);
      setIsCodeApplied(true);
      setPromoCode("");
    } else {
      setPromoError("Invalid promotional code.");
    }
  };

  const handleBillingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (billingForm.name && billingForm.email && billingForm.address && billingForm.card) {
      setCheckoutStage("success");
    }
  };

  const handleClearSuccess = () => {
    onClearCart();
    setCheckoutStage("cart");
    setDiscountPercent(0);
    setIsCodeApplied(false);
    setBillingForm({ name: "", email: "", address: "", zip: "", card: "", expiry: "", cvv: "" });
    onClose();
  };

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
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="relative w-full max-w-lg bg-[#000000] h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden border-l border-neutral-900"
          >
            {/* Header Column */}
            <div className="py-6 px-6 md:px-8 border-b border-neutral-900 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-pulse" />
                <h2 className="font-ndot text-lg text-white uppercase tracking-wide">
                  {checkoutStage === "cart" ? "Atelier Bag" : checkoutStage === "billing" ? "Concierge Billing" : "Acquisition Completed"}
                </h2>
                {checkoutStage === "cart" && cart.length > 0 && (
                  <span className="text-[9px] font-mono bg-neutral-950 px-2 py-0.5 rounded-full border border-neutral-900 text-neutral-450 uppercase">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
                  </span>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-950 border border-transparent hover:border-neutral-900 text-neutral-450 transition-colors cursor-pointer"
                aria-label="Close Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* STAGE 1: Standard Items Cart List */}
            {checkoutStage === "cart" && (
              <div className="flex-1 overflow-y-auto py-6 px-6 md:px-8 space-y-6">
                {/* Free Shipping Meter */}
                {cart.length > 0 && (
                  <div className="bg-neutral-950/40 rounded-[16px] p-[18px] border border-neutral-900 space-y-2 text-left">
                    <div className="flex justify-between items-baseline text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      <span>
                        {isFreeShipping ? "complimentary delivery unlocked" : "Complimentary Express Delivery"}
                      </span>
                      {!isFreeShipping && (
                        <span className="text-[#FF3333] font-bold">Add ${(shippingThreshold - subtotal).toLocaleString()} more</span>
                      )}
                    </div>
                    <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden relative">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#FF3333] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((subtotal / shippingThreshold) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <ShoppingBag className="w-10 h-10 text-neutral-800 mx-auto" />
                    <h3 className="font-ndot text-lg text-neutral-200 uppercase tracking-wide">Your Bag is Empty</h3>
                    <p className="text-[11px] text-neutral-500 max-w-xs mx-auto font-mono uppercase leading-relaxed">
                      Before completing checkout, browse our catalogue to secure limited-edition materials.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-black text-[10px] font-mono uppercase tracking-widest cursor-pointer"
                    >
                      Browse Curations
                    </button>
                  </div>
                ) : (
                  /* Item Cards */
                  <div className="space-y-4 text-left">
                    {cart.map((item, index) => (
                      <div
                        key={`${item.product.id}-${index}`}
                        className="flex gap-4 p-4 rounded-[16px] bg-neutral-950/20 border border-neutral-900 hover:border-neutral-800 transition-all flex-row items-center group"
                      >
                        <div className="w-16 h-16 rounded-[12px] overflow-hidden bg-[#000000] border border-neutral-900 flex-shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <span className="text-[8px] font-mono text-neutral-500 tracking-wider uppercase block">
                            {item.product.brand}
                          </span>
                          <h4 className="text-xs font-mono font-semibold text-neutral-100 uppercase tracking-wide truncate">
                            {item.product.name}
                          </h4>
                          
                          {/* Configurations displayed nicely */}
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {item.selectedColor && (
                              <span className="inline-flex items-center gap-1.5 text-[8px] bg-neutral-950 border border-neutral-900 text-neutral-400 px-2 py-0.5 rounded-full font-mono uppercase">
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.selectedColor.value }} />
                                {item.selectedColor.name}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="text-[8px] font-mono uppercase bg-neutral-950 border border-neutral-900 text-neutral-400 px-2 py-0.5 rounded-full">
                                SIZE: {item.selectedSize}
                              </span>
                            )}
                          </div>

                          {/* Controls Row */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 border border-neutral-850 rounded-full px-2 py-0.5 bg-[#000000]">
                              <button
                                onClick={() => onUpdateQuantity(index, -1)}
                                className="p-1 rounded-full text-neutral-500 hover:text-white transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-[10px] font-mono text-neutral-200 min-w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(index, 1)}
                                className="p-1 rounded-full text-neutral-500 hover:text-white transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-xs font-mono text-white">
                              ${(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Remove trash */}
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="p-2 rounded-xl hover:bg-red-500/10 text-neutral-500 hover:text-[#FF3333] transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STAGE 2: Billing & Shipping Entry Form */}
            {checkoutStage === "billing" && (
              <form onSubmit={handleBillingSubmit} className="flex-1 overflow-y-auto py-6 px-6 md:px-8 space-y-6 text-left">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">1. Client Contact Details</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="billing-name" className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Full Name</label>
                      <input
                        id="billing-name"
                        type="text"
                        required
                        value={billingForm.name}
                        onChange={(e) => setBillingForm({ ...billingForm, name: e.target.value })}
                        placeholder="Eleanor Sterling"
                        className="w-full bg-[#000000] border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-[#FF3333] transition-colors font-mono uppercase"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="billing-email" className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Email Address</label>
                      <input
                        id="billing-email"
                        type="email"
                        required
                        value={billingForm.email}
                        onChange={(e) => setBillingForm({ ...billingForm, email: e.target.value })}
                        placeholder="eleanor@sterling.com"
                        className="w-full bg-[#000000] border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-[#FF3333] transition-colors font-mono uppercase"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-900">
                  <h3 className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">2. Climate-Neutral Delivery Coordinates</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label htmlFor="billing-address" className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Street Address</label>
                      <input
                        id="billing-address"
                        type="text"
                        required
                        value={billingForm.address}
                        onChange={(e) => setBillingForm({ ...billingForm, address: e.target.value })}
                        placeholder="Rue de la Corraterie 12"
                        className="w-full bg-[#000000] border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-[#FF3333] transition-colors font-mono uppercase"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="billing-zip" className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Postal ZIP</label>
                      <input
                        id="billing-zip"
                        type="text"
                        required
                        value={billingForm.zip}
                        onChange={(e) => setBillingForm({ ...billingForm, zip: e.target.value })}
                        placeholder="1204"
                        className="w-full bg-[#000000] border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-[#FF3333] transition-colors font-mono uppercase"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-900">
                  <h3 className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">3. Secure Monetary Settlement</h3>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="billing-card" className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Credit Card Number</label>
                      <input
                        id="billing-card"
                        type="text"
                        required
                        value={billingForm.card}
                        onChange={(e) => setBillingForm({ ...billingForm, card: e.target.value })}
                        placeholder="4111 •••• •••• 9845"
                        maxLength={19}
                        className="w-full bg-[#000000] border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-[#FF3333] transition-colors font-mono uppercase"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="billing-expiry" className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Expiry (MM/YY)</label>
                        <input
                          id="billing-expiry"
                          type="text"
                          required
                          value={billingForm.expiry}
                          onChange={(e) => setBillingForm({ ...billingForm, expiry: e.target.value })}
                          placeholder="08/29"
                          maxLength={5}
                          className="w-full bg-[#000000] border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-[#FF3333] transition-colors font-mono text-center uppercase"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="billing-cvv" className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">Security CVV</label>
                        <input
                          id="billing-cvv"
                          type="password"
                          required
                          value={billingForm.cvv}
                          onChange={(e) => setBillingForm({ ...billingForm, cvv: e.target.value })}
                          placeholder="•••"
                          maxLength={3}
                          className="w-full bg-[#000000] border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-700 focus:outline-none focus:border-[#FF3333] transition-colors font-mono text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  id="checkout-submit-btn"
                  type="submit"
                  className="hidden"
                />
              </form>
            )}

            {/* STAGE 3: Successful Receipt Showcase */}
            {checkoutStage === "success" && (
              <div className="flex-1 overflow-y-auto py-10 px-6 md:px-8 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-[#FF3333]/20 flex items-center justify-center text-[#FF3333]">
                  <CheckCircle className="w-6 h-6 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-ndot text-xl text-white uppercase tracking-wide">Acquisition Confirmed</h3>
                  <p className="text-[11px] text-neutral-400 font-mono uppercase max-w-sm">
                    Thank you, <span className="font-bold text-white">{billingForm.name}</span>. Your transactional receipt and custom dispatch credentials have been forwarded to <span className="font-bold text-white">{billingForm.email}</span>.
                  </p>
                </div>

                {/* Simulated dynamic receipt */}
                <div className="w-full bg-neutral-950/40 border border-neutral-900 rounded-[16px] p-5 text-left space-y-3.5 font-mono text-[10px] uppercase">
                  <div className="flex justify-between border-b border-neutral-900 pb-2.5">
                    <span className="text-neutral-500">Order Reference</span>
                    <span className="font-mono font-bold text-[#FF3333]">#AUR-83749-19</span>
                  </div>
                  <div className="space-y-2">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-neutral-300">
                        <span>{item.product.name} (x{item.quantity})</span>
                        <span className="font-bold text-white">${(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  {isCodeApplied && (
                    <div className="flex justify-between text-[#FF3333] border-t border-neutral-900 pt-2.5">
                      <span className="font-semibold">Atelier Discount (15%)</span>
                      <span className="font-bold">-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-200 font-semibold border-t border-neutral-900 pt-2.5">
                    <span>Total Settled</span>
                    <span className="text-xs font-bold text-[#FF3333]">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tracking Frame */}
                <div className="w-full bg-[#000000] text-white rounded-[16px] p-[18px] text-left flex items-start gap-3.5 relative overflow-hidden border border-neutral-900">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF3333]/5 rounded-full filter blur-[30px]" />
                  <Truck className="w-4 h-4 text-[#FF3333] flex-shrink-0 mt-0.5 animate-pulse" />
                  <div className="space-y-1 font-mono uppercase">
                    <span className="text-[8px] text-[#FF3333] tracking-widest font-bold">Climate-Offset Cargo Tracking</span>
                    <p className="text-[10px] font-semibold tracking-wide text-neutral-200">Active Courier Dispatch</p>
                    <p className="text-[9px] text-neutral-400 leading-relaxed font-light">
                      Assigned to priority air freight. Arrival in 24-48 business hours at: {billingForm.address}, {billingForm.zip}
                    </p>
                  </div>
                </div>

                <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider">
                  AURA Ateliers guarantees secure climate-controlled mechanical transit packaging.
                </p>
              </div>
            )}

            {/* Bottom Panel: Pricing Summary & Call to Actions */}
            <div className="border-t border-neutral-900 py-6 px-6 md:px-8 bg-neutral-950/20 space-y-6">
              
              {/* Promo Code Input (Stage 1 only) */}
              {checkoutStage === "cart" && cart.length > 0 && (
                <div className="space-y-2">
                  <AnimatePresence>
                    {isCodeApplied ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-between bg-red-500/10 border border-[#FF3333]/20 text-[#FF3333] px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-wider"
                      >
                        <span className="flex items-center gap-1.5">
                          <Ticket className="w-3.5 h-3.5" />
                          Promo Code Applied (15% Off)
                        </span>
                        <span className="font-mono bg-black px-2 py-0.5 rounded border border-neutral-900 text-white">AURA15OFF</span>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                          <input
                            type="text"
                            placeholder="Atelier Journal Code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="w-full bg-[#000000] border border-neutral-850 rounded-xl py-2.5 pl-9 pr-4 text-xs focus:outline-none focus:border-[#FF3333] transition-colors uppercase font-mono text-neutral-200"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-[18px] rounded-xl bg-white hover:bg-neutral-200 text-black text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                  </AnimatePresence>
                  {promoError && (
                    <p className="text-[9px] text-[#FF3333] font-mono uppercase tracking-wider text-left pl-1">
                      {promoError}
                    </p>
                  )}
                </div>
              )}

              {/* Pricing Totals Rows (Stage 1 and 2 only) */}
              {checkoutStage !== "success" && (
                <div className="space-y-2 text-left font-mono text-[10px] uppercase tracking-wider">
                  <div className="flex justify-between text-neutral-450 font-light">
                    <span>Curation Subtotal</span>
                    <span className="font-semibold text-neutral-200">${subtotal.toLocaleString()}</span>
                  </div>
                  {isCodeApplied && (
                    <div className="flex justify-between text-[#FF3333]">
                      <span className="font-medium">15% Seasonal Gift Credit</span>
                      <span className="font-bold">-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-450 font-light">
                    <span>Climate-Offset Shipping</span>
                    <span className="font-semibold text-neutral-200">
                      {shippingCost === 0 ? "Complimentary" : `$${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs border-t border-neutral-900 pt-3 text-neutral-100 font-semibold font-mono">
                    <span>Estimated Due</span>
                    <span className="text-sm font-bold text-[#FF3333]">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Dynamic Bottom Row buttons */}
              <div className="pt-1">
                {checkoutStage === "cart" && (
                  <button
                    id="checkout-trigger-btn"
                    disabled={cart.length === 0}
                    onClick={() => setCheckoutStage("billing")}
                    className="w-full py-4 rounded-full bg-white hover:bg-neutral-200 disabled:bg-neutral-900 disabled:text-neutral-600 disabled:cursor-not-allowed text-black font-mono uppercase tracking-widest text-[11px] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-lg"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}

                {checkoutStage === "billing" && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStage("cart")}
                      className="py-3 rounded-full border border-neutral-850 hover:bg-neutral-950 text-neutral-300 font-mono text-[10px] uppercase tracking-wider cursor-pointer text-center"
                    >
                      Back to Bag
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        // Triggers form submit by simulating click on hidden input
                        const subBtn = document.getElementById("checkout-submit-btn");
                        if (subBtn) subBtn.click();
                      }}
                      className="py-3 rounded-full bg-[#FF3333] hover:bg-[#E02E2E] text-white font-mono text-[10px] uppercase tracking-widest cursor-pointer text-center transition-all shadow-md"
                    >
                      Settle & Dispatch
                    </button>
                  </div>
                )}

                {checkoutStage === "success" && (
                  <button
                    onClick={handleClearSuccess}
                    className="w-full py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-mono uppercase tracking-widest text-[11px] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-lg"
                  >
                    Return to Atelier
                  </button>
                )}
              </div>

              {/* Guarantees Row */}
              {checkoutStage !== "success" && (
                <div className="flex items-center gap-1.5 justify-center text-[8px] text-neutral-500 font-mono tracking-wider uppercase pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF3333]" />
                  <span>3-Year Luxury cover active</span>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
