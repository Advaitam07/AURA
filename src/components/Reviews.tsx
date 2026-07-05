import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { REVIEWS } from "../data";

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto scroll testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const currentReview = REVIEWS[activeIndex];

  return (
    <section id="reviews" className="py-24 bg-[#000000] px-6 md:px-12 border-b border-neutral-900">
      <div className="max-w-5xl mx-auto">
        
        {/* Title Frame */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF3333] uppercase block">
            COLLECTOR_EVALUATIONS
          </span>
          <h2 className="font-ndot text-3xl md:text-4xl text-white uppercase tracking-wide leading-tight">
            Loved by Global Collectors
          </h2>
        </div>

        {/* Testimonial Active Display Window */}
        <div className="relative min-h-[380px] bg-neutral-950/20 rounded-[24px] p-5 sm:p-8 md:p-14 border border-neutral-900 flex flex-col justify-between overflow-hidden">
          
          {/* Subtle Ambient Quote Background */}
          <div className="absolute top-6 right-8 text-neutral-800/40 pointer-events-none">
            <Quote className="w-24 h-24 stroke-[1px]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-6 flex-1 text-left relative z-10"
            >
              {/* Star Rating & Verified tag */}
              <div className="flex items-center justify-between">
                <div className="flex text-white gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < currentReview.rating ? "fill-white text-white" : "text-neutral-800"
                      }`}
                    />
                  ))}
                </div>
                
                <span className="text-[9px] font-mono tracking-wider text-[#FF3333] uppercase bg-neutral-950 border border-neutral-850 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-pulse" />
                  VERIFIED_COLLECTOR_ID
                </span>
              </div>

              {/* Quote text */}
              <blockquote className="font-sans text-base sm:text-lg font-normal text-neutral-200 leading-relaxed max-w-3xl">
                “{currentReview.comment}”
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-neutral-900">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-850 bg-neutral-950">
                  <img
                    src={currentReview.avatar}
                    alt={currentReview.name}
                    className="w-full h-full object-cover grayscale opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold uppercase text-neutral-100 tracking-wide">
                    {currentReview.name}
                  </h4>
                  <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
                    Acquired <span className="text-neutral-300 font-mono">{currentReview.productName}</span> on {currentReview.date}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons & Indicator Lines */}
          <div className="flex items-center justify-between pt-8 border-t border-neutral-900 mt-8 relative z-10">
            {/* Indicators */}
            <div className="flex items-center gap-1.5">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex ? "w-8 bg-white" : "w-2 bg-neutral-800 hover:bg-neutral-750"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Previous / Next buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-black hover:bg-neutral-900 border border-neutral-850 text-neutral-300 hover:text-white transition-all cursor-pointer active:scale-95"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-black hover:bg-neutral-900 border border-neutral-850 text-neutral-300 hover:text-white transition-all cursor-pointer active:scale-95"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
