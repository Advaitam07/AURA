import { motion } from "motion/react";
import { Star, Globe, Users, Headphones, Check } from "lucide-react";

export default function BrandStory() {
  const stats = [
    { label: "Satisfied Customers", value: "100K+", icon: Users, color: "text-white bg-neutral-900" },
    { label: "Average Evaluation Rating", value: "4.9 ★", icon: Star, color: "text-[#FF3333] bg-neutral-900" },
    { label: "Countries Served", value: "50+", icon: Globe, color: "text-white bg-neutral-900" },
    { label: "Luxury Support Channels", value: "24/7", icon: Headphones, color: "text-white bg-neutral-900" }
  ];

  const philosophyPoints = [
    { title: "ETHICAL_VEGETABLE_TANNING", desc: "No micro-plastics or chromium salts are used in our leather work." },
    { title: "CIRCULAR_REPAIR_PROGRAM", desc: "Send any item back after years of use for master restoration or trade-in credit." },
    { title: "CONSCIOUS_MATERIAL_SOURCING", desc: "We source our marble and FSC wood exclusively from geothermal regions." }
  ];

  return (
    <section id="brand-story" className="py-24 bg-[#000000] px-6 md:px-12 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Premium Photography Panel with Staggered Frame */}
          <div className="lg:col-span-6 relative h-[500px] sm:h-[600px]">
            {/* Background Accent Slate */}
            <div className="absolute top-8 left-8 bottom-0 right-0 rounded-[24px] bg-neutral-950 border border-neutral-900 -z-10" />

            {/* Main Picture Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 rounded-[24px] overflow-hidden shadow-2xl border border-neutral-900 group"
            >
              <img
                src="https://images.unsplash.com/photo-1541535881962-e668f2244a26?auto=format&fit=crop&q=80&w=1000"
                alt="AURA Leather Crafting Studio"
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-750 ease-out"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Float Stamp */}
              <div className="absolute bottom-8 left-8 p-5 rounded-xl bg-neutral-950 border border-neutral-900 shadow-xl max-w-xs text-left">
                <span className="text-[9px] font-mono tracking-widest text-[#FF3333] uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-pulse" />
                  VERIFIED_HERITAGE
                </span>
                <p className="text-[11px] font-mono text-neutral-400 mt-2 leading-relaxed">
                  Every product passes through thirty-two checkpoints of expert artisan evaluation before wax-sealing.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Narrative Copy & Statistics */}
          <div className="lg:col-span-6 space-y-10 text-left">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF3333] uppercase block">
                OUR_GENESIS_REPORT
              </span>
              <h2 className="font-ndot text-3xl sm:text-4xl text-white uppercase tracking-wide leading-tight">
                Ateliers Dedicated to Craft and Longevity.
              </h2>
              <p className="text-neutral-400 font-mono text-xs leading-relaxed">
                Founded in 2022, AURA emerged as a response to the era of disposable objects. We operate specialized workshops across Geneva, Kyoto, and Tuscany to construct items that accumulate story, soul, and elegant patina over time.
              </p>
            </div>

            {/* Core Philosophy Bullets */}
            <div className="space-y-4">
              {philosophyPoints.map((pt, i) => (
                <div key={i} className="flex gap-3.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF3333] flex-shrink-0 mt-1.5" />
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-neutral-200 uppercase tracking-wide">{pt.title}</h4>
                    <p className="text-[11px] font-mono text-neutral-500 mt-1 leading-relaxed">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistics Bento Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
              {stats.map((stat, i) => {
                const IconComp = stat.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3 }}
                    className="p-4 rounded-xl bg-neutral-950/20 border border-neutral-900 flex items-center gap-3.5"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.color} flex-shrink-0 border border-neutral-800`}>
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-lg font-mono text-white tracking-tight">{stat.value}</div>
                      <div className="text-[8px] text-neutral-500 font-mono tracking-wide uppercase mt-0.5">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
}
