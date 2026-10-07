import Link from 'next/link';
import Image from 'next/image';
import { occasions } from '@/data/catalogue';

export default function OccasionsPage() {
  return (
    <div className="section-padding bg-[#FFFEF7]">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <p className="text-subtitle text-[#8B7D6B] mb-3">Milestones & Moments</p>
          <h1 className="heading-hero text-4xl md:text-5xl text-[#3C2415]">
            Shop by Occasion
          </h1>
          <p className="mt-4 text-[#8B7D6B] max-w-lg mx-auto text-sm leading-relaxed">
            Every celebration has its own signature sparkle. Find pieces curated specifically
            for weddings, anniversaries, festivals, and gifts.
          </p>
          <div className="line-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {occasions.map((occasion) => (
            <Link
              key={occasion.id}
              href={`/collections?occasion=${occasion.slug}`}
              className="group relative flex flex-col justify-end aspect-[4/3] sm:aspect-[3/4] p-6 bg-[#2D1810] overflow-hidden rounded-sm shadow-md border border-[#EDE5DC] hover:border-[#C9A94E] transition-all"
            >
              <Image
                src={occasion.image}
                alt={`Lata Jewellers ${occasion.name} Collection`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E08]/90 via-[#1A0E08]/40 to-transparent" />

              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A94E] font-medium block mb-1">
                  Occasion Collection
                </span>
                <h2 className="font-serif-display text-2xl text-[#FFFEF7] mb-1">
                  {occasion.name}
                </h2>
                <p className="text-xs text-[#FFFEF7]/75 font-light leading-relaxed">
                  {occasion.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
