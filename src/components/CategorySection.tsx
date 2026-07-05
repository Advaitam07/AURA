import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "../data";

interface CategorySectionProps {
  onScrollToSection: (sectionId: string) => void;
  onSelectCategoryFilter: (categoryName: string) => void;
  activeCategoryFilter?: string;
}

export default function CategorySection({
  onScrollToSection,
  onSelectCategoryFilter,
  activeCategoryFilter = "All"
}: CategorySectionProps) {
  return (
    <section id="categories" className="py-20 bg-black px-6 md:px-12 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title Frame */}
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF3333] uppercase block">
              ATELIER_DIRECTORIES_V2
            </span>
            <h2 className="font-ndot text-3xl md:text-4xl text-white uppercase tracking-wide">
              Flipkart & Big Basket Category Deck
            </h2>
            <p className="text-neutral-400 font-mono text-xs max-w-md leading-relaxed">
              Fast-track navigation via circular micro-portals or explore deeply curated material partitions.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-neutral-950 px-4 py-2 rounded-full border border-neutral-850 shadow-md font-mono text-[11px] text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-ping" />
            <span className="uppercase tracking-wider">SWIPE PORTALS FOR QUICK SELECTION</span>
          </div>
        </div>

        {/* Flipkart / Big Basket Circular Quick-Select Bar */}
        <div className="bg-neutral-950 border border-neutral-900 rounded-[32px] p-6 sm:p-8 shadow-inner overflow-hidden">
          <div className="flex flex-row items-center gap-6 sm:gap-10 overflow-x-auto whitespace-nowrap pb-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent snap-x">
            {/* "All" Portal Circle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onSelectCategoryFilter("All");
                onScrollToSection("best-sellers");
              }}
              className="flex flex-col items-center space-y-3 cursor-pointer select-none flex-shrink-0 snap-start"
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative ${
                activeCategoryFilter === "All"
                  ? "border-[#FF3333] bg-neutral-900 shadow-[0_0_15px_rgba(255,51,51,0.25)]"
                  : "border-neutral-800 bg-neutral-950 hover:border-neutral-500"
              }`}>
                <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-neutral-300" />
                </div>
                {activeCategoryFilter === "All" && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF3333] rounded-full border-2 border-black flex items-center justify-center" />
                )}
              </div>
              <div className="text-center">
                <p className={`text-[11px] font-mono uppercase tracking-widest ${
                  activeCategoryFilter === "All" ? "text-[#FF3333] font-bold" : "text-neutral-300"
                }`}>
                  All Items
                </p>
                <p className="text-[9px] font-mono text-neutral-550">SHOW_ALL</p>
              </div>
            </motion.div>

            {CATEGORIES.map((category) => {
              const isSelected = activeCategoryFilter.toLowerCase() === category.name.toLowerCase();
              return (
                <motion.div
                  key={category.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onSelectCategoryFilter(category.name);
                    onScrollToSection("best-sellers");
                  }}
                  className="flex flex-col items-center space-y-3 cursor-pointer select-none flex-shrink-0 snap-start"
                >
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 transition-all duration-300 relative ${
                    isSelected
                      ? "border-[#FF3333] shadow-[0_0_15px_rgba(255,51,51,0.25)]"
                      : "border-neutral-800 hover:border-neutral-500"
                  }`}>
                    <img
                      src={category.image}
                      alt={category.name}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isSelected ? "scale-105 grayscale-0" : "grayscale opacity-80 group-hover:grayscale-0"
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF3333] rounded-full border-2 border-black" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`text-[11px] font-mono uppercase tracking-widest ${
                      isSelected ? "text-[#FF3333] font-bold" : "text-neutral-300"
                    }`}>
                      {category.name}
                    </p>
                    <p className="text-[9px] font-mono text-neutral-550">
                      {category.count} CURATIONS
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bento Department Shelf */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => {
                onSelectCategoryFilter(category.name);
                onScrollToSection("best-sellers");
              }}
              className="group relative h-72 rounded-[24px] overflow-hidden border border-neutral-850 hover:border-neutral-700 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.85)] bg-neutral-950"
            >
              {/* Image Frame with Smooth Scale */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover grayscale opacity-90 contrast-[1.03] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent transition-opacity duration-500" />

              {/* Text Context (Pushed to bottom) */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
                <span className="text-[9px] font-mono tracking-[0.15em] text-neutral-400 uppercase block mb-1">
                  QTY_({category.count})_UNITS
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-base font-semibold tracking-wide uppercase text-neutral-200 group-hover:text-white transition-colors">
                    {category.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-md">
                    <ArrowRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>

              {/* Ambient Edge Ring */}
              <div className="absolute inset-0 border border-neutral-800 rounded-[24px] pointer-events-none group-hover:border-neutral-700 transition-colors" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
