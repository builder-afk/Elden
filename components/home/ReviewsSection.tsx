'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviews } from '@/data/catalogue';
import { storeInfo } from '@/data/store';

export function ReviewsSection() {
  return (
    <section className="section-padding bg-[#F5F0EB]" id="reviews">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <p className="text-subtitle text-[#8B7D6B] mb-3">Authentic Client Voices</p>
          <h2 className="heading-section text-3xl md:text-4xl lg:text-5xl text-[#3C2415]">
            Trusted Across Generations
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#C9A94E] fill-[#C9A94E]" />
              ))}
            </div>
            <span className="text-sm font-medium text-[#3C2415]">
              {storeInfo.googleRating} out of 5 ({storeInfo.googleReviews} Google Reviews)
            </span>
          </div>
          <div className="line-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#FFFEF7] p-8 border border-[#EDE5DC] shadow-sm rounded-sm flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-[#C9A94E]/40 mb-4" />
                <p className="text-sm text-[#3C2415]/85 leading-relaxed font-light mb-6">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="border-t border-[#EDE5DC] pt-4 flex items-center justify-between">
                <div>
                  <p className="font-serif-display text-sm font-semibold text-[#3C2415]">
                    {rev.author}
                  </p>
                  <p className="text-[10px] text-[#8B7D6B]">Verified Google Review</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-[#C9A94E] fill-[#C9A94E]" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
