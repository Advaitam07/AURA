import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import lifestyleImg from "../assets/images/aura_lifestyle_banner_1783274156016.jpg";

interface LifestyleBannerProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function LifestyleBanner({ onScrollToSection }: LifestyleBannerProps) {
  return (
    <section id="lifestyle-banner" className="relative h-[650px] overflow-hidden flex items-center justify-center px-6 md:px-12 border-b border-neutral-900 bg-black">
      {/* Cinematic Backdrop Image */}
      <img
        src={lifestyleImg}
        alt="AURA Atrium Architecture"
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-80"
        referrerPolicy="no-referrer"
      />

      {/* Luxury Tint Overlays */}
      <div className="absolute inset-0 bg-[#000000]/60 pointer-events-none" />

      {/* Floating Glassmorphic Editorial Panel */}
      <div className="relative z-10 max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="bg-neutral-950/20 backdrop-blur-md border border-neutral-900 p-10 md:p-14 rounded-[24px] text-white space-y-6 text-center"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#FF3333] uppercase block">
            ATRIUM_LIVING_PHILOSOPHY
          </span>

          <h2 className="font-ndot text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-wide leading-relaxed">
            “Simplicity is the ultimate key to daily sophistication.”
          </h2>

          <p className="text-neutral-400 font-mono text-xs max-w-xl mx-auto leading-relaxed">
            We believe that the objects we surround ourselves with define our rhythm. Choose fewer things, but ensure they are built to survive generations.
          </p>

          <div className="pt-4">
            <button
              onClick={() => onScrollToSection("best-sellers")}
              className="px-6 py-3.5 rounded-full bg-white text-black font-mono text-[10px] uppercase tracking-widest hover:bg-neutral-100 transition-all flex items-center gap-2 mx-auto group cursor-pointer"
            >
              EXPLORE_blueprint
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
