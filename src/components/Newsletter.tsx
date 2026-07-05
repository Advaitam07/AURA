import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Sparkles, CheckCircle, ArrowRight, Clipboard } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim().includes("@")) {
      setIsSubmitted(true);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("AURA15OFF");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="newsletter" className="py-24 bg-[#000000] px-6 md:px-12 border-b border-neutral-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Floating Capsule Canvas */}
        <div className="relative bg-[#000000] text-white rounded-[24px] p-5 sm:p-8 md:p-16 overflow-hidden shadow-2xl border border-neutral-900 text-center">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="subscription-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 relative z-10"
              >
                {/* Floating Discount Badge */}
                <div className="inline-flex items-center gap-2 bg-neutral-950 px-4 py-2 rounded-full border border-neutral-850 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-pulse" />
                  <span className="text-[9px] font-mono tracking-widest text-[#FF3333] uppercase">
                    RECEIVE_15_PERCENT_DISCOUNT
                  </span>
                </div>

                {/* Sub-Header Text */}
                <div className="space-y-3">
                  <h2 className="font-ndot text-3xl sm:text-4xl text-white uppercase tracking-wide leading-tight">
                    Subscribe to the Atelier Journal
                  </h2>
                  <p className="text-neutral-400 font-mono text-xs max-w-lg mx-auto leading-relaxed">
                    Be the first to learn about specialized private sales, limited-run material collaborations, and design-forward philosophy.
                  </p>
                </div>

                {/* Registration Input Form */}
                <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 items-stretch">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      id="newsletter-email-input"
                      type="email"
                      required
                      placeholder="ENTER YOUR EMAIL_ADDRESS"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-neutral-850 rounded-full py-3.5 pl-12 pr-6 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF3333] transition-all font-mono uppercase tracking-wider"
                    />
                  </div>
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black font-mono text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
                  >
                    SUBSCRIBE
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

                <p className="text-[9px] font-mono text-neutral-500 leading-normal uppercase">
                  By subscribing, you agree to our privacy framework. No spam. You may cancel at any moment.
                </p>
              </motion.div>
            ) : (
              /* Satisfying Success State with Promo Code Display */
              <motion.div
                key="subscription-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="space-y-6 py-4 relative z-10"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#FF3333] mx-auto">
                  <CheckCircle className="w-5 h-5 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-ndot text-2xl text-white uppercase tracking-wide">
                    Welcome to AURA
                  </h3>
                  <p className="text-neutral-450 font-mono text-xs max-w-md mx-auto">
                    Your spot in the Atelier Journal is confirmed. As promised, your exclusive seasonal gift credit code is listed below.
                  </p>
                </div>

                {/* Interactive Promo Card */}
                <div className="max-w-xs mx-auto bg-neutral-950 border border-neutral-900 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Your Promo Code</span>
                    <div className="text-sm font-mono font-bold tracking-wider text-[#FF3333]">AURA15OFF</div>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    {isCopied ? "Copied" : "Copy"}
                  </button>
                </div>

                <p className="text-[9px] font-mono text-neutral-500 uppercase">
                  Enter code at checkout drawer to claim your 15% seasonal discount.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
