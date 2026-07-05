import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "../data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#000000] px-6 md:px-12 border-b border-neutral-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Title Frame */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF3333] uppercase block">
            ATELIER_CURATIONS_SUPPORT
          </span>
          <h2 className="font-ndot text-3xl md:text-4xl text-white uppercase tracking-wide leading-tight">
            Frequently Asked Queries
          </h2>
          <p className="text-neutral-450 font-mono text-xs max-w-md">
            Learn more about our materials, warranties, secure shipping policies, and design philosophies.
          </p>
        </div>

        {/* Accordion Frame */}
        <div className="space-y-4 text-left">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const paddedIndex = String(index + 1).padStart(2, "0");
            return (
              <div
                key={index}
                className="bg-neutral-950/20 rounded-[20px] border border-neutral-900 hover:border-neutral-800 transition-all duration-300 overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 px-8 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#FF3333]">
                      [{paddedIndex}]
                    </span>
                    <span className="font-sans font-semibold uppercase text-neutral-200 text-sm tracking-wide">
                      {faq.question}
                    </span>
                  </div>

                  {/* Icon Circle Toggle */}
                  <div className={`w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 transition-colors ${isOpen ? "bg-white text-black border-white" : "bg-neutral-950"}`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5 text-black" /> : <Plus className="w-3.5 h-3.5 text-neutral-400" />}
                  </div>
                </button>

                {/* Accordion Body Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="pb-6 px-5 sm:px-8 pl-5 sm:pl-18 border-t border-neutral-900 pt-4">
                        <p className="text-[11px] text-neutral-450 leading-relaxed font-mono">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
