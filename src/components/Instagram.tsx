import { motion } from "motion/react";
import { Heart, MessageCircle, Instagram } from "lucide-react";
import { INSTAGRAM_POSTS } from "../data";

export default function InstagramGallery() {
  return (
    <section id="instagram-gallery" className="py-24 bg-[#000000] px-6 md:px-12 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Frame */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#FF3333] uppercase block">
            DIGITAL_COMMUNITY_LOG
          </span>
          <h2 className="font-ndot text-3xl md:text-4xl text-white uppercase tracking-wide leading-tight">
            Curate Your Space
          </h2>
          <p className="text-neutral-450 font-mono text-xs max-w-md uppercase">
            Join thousands of global collectors sharing their space configurations. Mention <span className="font-bold text-white">@AURAteliers</span> to be curated.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {INSTAGRAM_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group relative aspect-square rounded-[20px] overflow-hidden bg-neutral-950 border border-neutral-900 cursor-pointer shadow-lg"
            >
              {/* Photo - grayscale by default, colored on hover */}
              <img
                src={post.url}
                alt={`AURA space post ${post.id}`}
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Hover Glass Overlays */}
              <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white" />

              {/* Absolute content */}
              <div className="absolute inset-0 flex items-center justify-center gap-5 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 translate-y-2 group-hover:translate-y-0">
                <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  {post.comments}
                </span>
              </div>

              {/* Top-Right Instagram Logo Stamp */}
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md border border-neutral-900 flex items-center justify-center text-white z-15">
                <Instagram className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
