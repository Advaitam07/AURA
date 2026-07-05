import { motion } from "motion/react";
import { ArrowUp, Send } from "lucide-react";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onShowToast?: (message: string, type?: "success" | "info") => void;
}

export default function Footer({ onScrollToSection, onShowToast }: FooterProps) {
  
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const handleAlert = (message: string, type: "success" | "info" = "info") => {
    if (onShowToast) {
      onShowToast(message, type);
    } else {
      console.log(message);
    }
  };

  return (
    <footer id="footer" className="bg-[#000000] text-white pt-20 pb-12 px-6 md:px-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Segment: Brand & Scroll to Top button */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-12 border-b border-neutral-900 gap-6">
          <button
            onClick={handleScrollTop}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full bg-[#FF3333] flex items-center justify-center text-white font-ndot text-sm shadow-lg group-hover:scale-105 transition-transform duration-300">
              A
            </span>
            <span className="font-ndot tracking-[0.2em] text-2xl text-white">
              AURA
            </span>
          </button>

          <p className="text-neutral-500 text-[11px] font-mono max-w-sm text-center md:text-right leading-relaxed uppercase">
            Curating everyday sensory objects through minimalist architectural principles and organic materials.
          </p>

          <button
            onClick={handleScrollTop}
            className="p-3.5 rounded-full bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-white transition-all cursor-pointer active:scale-95 group"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Middle Segment: Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 text-left">
          
          {/* Col 1: Shop */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">SHOP_CATALOG</h4>
            <ul className="space-y-2 text-[11px] text-neutral-400 font-mono uppercase">
              <li><button onClick={() => onScrollToSection("best-sellers")} className="hover:text-white transition-colors cursor-pointer">Electronics</button></li>
              <li><button onClick={() => onScrollToSection("categories")} className="hover:text-white transition-colors cursor-pointer">Atrium Furniture</button></li>
              <li><button onClick={() => onScrollToSection("best-sellers")} className="hover:text-white transition-colors cursor-pointer">Artisan Leather</button></li>
              <li><button onClick={() => onScrollToSection("new-arrivals")} className="hover:text-white transition-colors cursor-pointer">New Arrivals</button></li>
            </ul>
          </div>

          {/* Col 2: Info */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">OUR_ATELIER</h4>
            <ul className="space-y-2 text-[11px] text-neutral-400 font-mono uppercase">
              <li><button onClick={() => onScrollToSection("brand-story")} className="hover:text-white transition-colors cursor-pointer">Atelier Story</button></li>
              <li><button onClick={() => onScrollToSection("why-choose-us")} className="hover:text-white transition-colors cursor-pointer">Craftsmanship</button></li>
              <li><button onClick={() => onScrollToSection("reviews")} className="hover:text-white transition-colors cursor-pointer">Verified Reviews</button></li>
              <li><button onClick={() => handleAlert("Sustainability Report: 100% Climate Neutral. FSC Wood & Berylluim recycling certified.")} className="hover:text-white transition-colors cursor-pointer">Circularity Program</button></li>
            </ul>
          </div>

          {/* Col 3: Assistance */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">CONCIERGE_CARE</h4>
            <ul className="space-y-2 text-[11px] text-neutral-400 font-mono uppercase">
              <li><button onClick={() => onScrollToSection("faq")} className="hover:text-white transition-colors cursor-pointer">Frequently Asked Questions</button></li>
              <li><button onClick={() => onScrollToSection("contact")} className="hover:text-white transition-colors cursor-pointer">Direct Communications</button></li>
              <li><button onClick={() => handleAlert("All secure express shipments are dispatched with Bank-grade courier insurance.", "success")} className="hover:text-white transition-colors cursor-pointer">Secure Shipments</button></li>
              <li><button onClick={() => handleAlert("All purchases are backed by 5-Year active mechanical support. Registered at concierge@aurateliers.com.", "success")} className="hover:text-white transition-colors cursor-pointer">CONCIERGE WARRANTY</button></li>
            </ul>
          </div>

          {/* Col 4: Newsletter Sign-up snippet */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">JOURNAL_DISPATCH</h4>
            <p className="text-[11px] text-neutral-500 leading-relaxed font-mono uppercase">
              Receive private curations and product announcements directly.
            </p>
            <div className="flex items-center bg-[#000000] border border-neutral-900 rounded-full py-1.5 pl-4 pr-1.5">
              <input
                id="footer-email-input"
                type="email"
                placeholder="ADDRESS@DOMAIN"
                className="bg-transparent text-xs text-white placeholder-neutral-700 focus:outline-none w-full font-mono uppercase tracking-wider"
              />
              <button
                onClick={() => handleAlert("Atelier Journal Subscription Confirmed. Welcome to the circle.", "success")}
                className="p-1.5 rounded-full bg-white text-black transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Segment: Copyright & Payment indicators */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-12 border-t border-neutral-900 gap-6">
          <div className="text-[10px] text-neutral-500 font-mono flex items-center gap-1.5 uppercase">
            <span>© {currentYear} AURA Ateliers.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-pulse" />
            <span>FOR DAILY EXCELLENCE. ALL RIGHTS RESERVED.</span>
          </div>

          {/* Payment badges */}
          <div className="flex items-center gap-2.5 text-[9px] font-mono text-neutral-400 uppercase">
            <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-900 rounded-md">Visa</span>
            <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-900 rounded-md">MC</span>
            <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-900 rounded-md">Amex</span>
            <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-900 rounded-md">Apple Pay</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
