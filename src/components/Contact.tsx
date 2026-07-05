import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Mail, Phone, Clock4, CheckCircle, ArrowRight, Compass } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setIsSuccess(true);
      setTimeout(() => {
        setForm({ name: "", email: "", subject: "", message: "" });
      }, 1000);
    }
  };

  const businessDetails = [
    { title: "Geneva Flagship", value: "Rue de la Corraterie 12, 1204 Genève, Switzerland", icon: MapPin },
    { title: "Direct Assistance", value: "+41 (22) 548 9000", icon: Phone },
    { title: "General Inquiries", value: "concierge@aurateliers.com", icon: Mail },
    { title: "Operational Hours", value: "Monday – Friday: 09:00 – 18:00 CET", icon: Clock4 }
  ];

  return (
    <section id="contact" className="py-24 bg-[#000000] px-6 md:px-12 relative overflow-hidden border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Direct Inquiries Contact Form (7-columns) */}
          <div className="lg:col-span-7 space-y-8 text-left bg-neutral-950/20 rounded-[24px] p-5 sm:p-8 md:p-12 border border-neutral-900 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF3333] uppercase block">
                ATELIER_COMMUNICATIONS_LOG
              </span>
              <h2 className="font-ndot text-3xl md:text-4xl text-white uppercase tracking-wide leading-tight">
                Initiate a Conversation
              </h2>
              <p className="text-neutral-450 font-mono text-xs">
                Have custom furniture requests or questions? Submit details to receive dedicated concierge follow-up within 12 hours.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="E.g. Eleanor Sterling"
                        className="w-full bg-black border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-[#FF3333] transition-colors font-mono uppercase"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="E.g. eleanor@sterling.com"
                        className="w-full bg-black border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-[#FF3333] transition-colors font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                      Subject Matter
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="E.g. Custom Bouclé Chair Commission"
                      className="w-full bg-black border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-[#FF3333] transition-colors font-mono uppercase"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                      Your Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Detail your inquiry..."
                      className="w-full bg-black border border-neutral-850 rounded-xl py-3 px-4 text-xs text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-[#FF3333] transition-colors font-mono uppercase resize-none"
                    />
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-2 group cursor-pointer transition-all"
                  >
                    TRANSMIT_MESSAGE
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              ) : (
                /* Interactive Form Success Response */
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-850 flex items-center justify-center text-[#FF3333] mx-auto">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-ndot text-xl text-white uppercase tracking-wide">Inquiry Transmitted</h3>
                  <p className="text-neutral-450 text-xs max-w-sm mx-auto font-mono leading-relaxed">
                    Thank you. Your message has been logged inside our secure concierge database. An expert client officer will reply shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-5 py-2.5 rounded-full border border-neutral-850 bg-neutral-950 hover:bg-neutral-900 text-neutral-300 text-[10px] font-mono uppercase tracking-wider cursor-pointer mt-4"
                  >
                    Transmit Another Note
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Coordinates & Blueprint Map Mock (5-columns) */}
          <div className="lg:col-span-5 space-y-8 text-left h-full flex flex-col justify-between">
            {/* Business Contact Rows */}
            <div className="space-y-6">
              {businessDetails.map((det, i) => {
                const IconComp = det.icon;
                return (
                  <div key={i} className="flex gap-4 items-start border-b border-neutral-900 pb-4 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-neutral-950 border border-neutral-900 flex items-center justify-center text-white flex-shrink-0">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">{det.title}</h4>
                      <p className="text-xs text-neutral-300 mt-1 font-mono uppercase">{det.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stylized custom blueprint map */}
            <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-neutral-900 bg-neutral-950 p-6 flex flex-col justify-between shadow-lg">
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

              {/* Vector blueprint illustrations */}
              <div className="relative z-10 flex items-center justify-between text-neutral-500 text-[10px] font-mono uppercase tracking-widest">
                <span>LAT: 46.2044° N</span>
                <span>LON: 6.1432° E</span>
              </div>

              {/* Graphic Circle Coordinates (Looks like luxury map interface) */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-3">
                <Compass className="w-10 h-10 text-[#FF3333] animate-spin-slow" />
                <div className="text-center">
                  <div className="text-white font-ndot text-sm tracking-widest uppercase">AURA HEADQUARTERS</div>
                  <div className="text-[#FF3333] font-mono text-[11px] mt-0.5 uppercase">Corraterie 12, Geneva</div>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-neutral-500 text-[9px] font-mono uppercase">
                <span>SECTOR: SWISS ALPS</span>
                <span>ELEVATION: 375M</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
