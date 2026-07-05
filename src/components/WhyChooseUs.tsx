import { motion } from "motion/react";
import { Truck, ShieldCheck, Zap, RefreshCw, Box, Headphones } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "CLIMATE_NEUTRAL_SHIPPING",
      desc: "Enjoy complimentary secure express shipping with certified zero carbon footprint offsets on all catalog acquisitions above $150.",
      icon: Truck,
      color: "text-white bg-neutral-950 border border-neutral-900"
    },
    {
      title: "BANK_GRADE_ENCRYPTION",
      desc: "All monetary transitions are encrypted with AES-256 protocols, fully certified by international premium merchant standards.",
      icon: ShieldCheck,
      color: "text-[#FF3333] bg-neutral-950 border border-neutral-900"
    },
    {
      title: "DYNAMIC_DISPATCH_PORT",
      desc: "Orders placed before 2:00 PM are cataloged, hand-packed, and dispatched within 4 hours, fully tracked via luxury courier.",
      icon: Zap,
      color: "text-white bg-neutral-950 border border-neutral-900"
    },
    {
      title: "30_DAY_EVALUATION",
      desc: "If an item does not harmoniously blend with your surrounding space, return it within 30 days for an effortless courier pickup.",
      icon: RefreshCw,
      color: "text-white bg-neutral-950 border border-neutral-900"
    },
    {
      title: "TACTILE_PACKAGING_STEM",
      desc: "Each item is swathed in acid-free custom tissue paper, nestled inside rigid weighted boxes, and secured with raw wax seals.",
      icon: Box,
      color: "text-[#FF3333] bg-neutral-950 border border-neutral-900"
    },
    {
      title: "CONCIERGE_SUPPORT_PORTAL",
      desc: "Gain lifelong access to our elite digital specialists, providing personalized styling advice and mechanical product assistance.",
      icon: Headphones,
      color: "text-white bg-neutral-950 border border-neutral-900"
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-[#000000] relative overflow-hidden px-6 md:px-12 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Frame */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF3333] uppercase block">
            OUR_ASSURANCES_LOG
          </span>
          <h2 className="font-ndot text-3xl md:text-4xl text-white uppercase tracking-wide leading-tight">
            The Luxury Standard of Service
          </h2>
          <p className="text-neutral-400 font-mono text-xs leading-relaxed">
            Unboxing an AURA object is just the genesis. We back every transaction with an elite concierge framework designed around security, speed, and ecological responsibility.
          </p>
        </div>

        {/* Glassmorphic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const IconComp = feat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-neutral-950/20 border border-neutral-900 p-8 rounded-[20px] transition-all duration-500 flex flex-col space-y-5 text-left group"
              >
                {/* Icon Circle */}
                <div className={`w-10 h-10 rounded-full ${feat.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComp className="w-4 h-4" />
                </div>

                {/* Text Block */}
                <div className="space-y-2">
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-neutral-200 group-hover:text-white transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-neutral-500 text-[11px] leading-relaxed font-mono">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
