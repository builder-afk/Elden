import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { collections } from '@/data/catalogue';

export default function CollectionsPage() {
  return (
    <div className="section-padding bg-[#FFFEF7]">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <p className="text-subtitle text-[#8B7D6B] mb-3">Explore Our Showcase</p>
          <h1 className="heading-hero text-4xl md:text-5xl lg:text-6xl text-[#3C2415]">
            Our Collections
          </h1>
          <p className="mt-4 text-[#8B7D6B] max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Discover our carefully curated collections, from timeless 22K traditional pieces
            to contemporary diamond and gold designs.
          </p>
          <div className="line-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group relative overflow-hidden aspect-[3/4] bg-[#2D1810] rounded-sm shadow-md border border-[#EDE5DC]/60"
            >
              <Image
                src={collection.image}
                alt={`Lata Jewellers ${collection.name} Collection`}
                fill
                priority={index < 3}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E08]/90 via-[#1A0E08]/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

              <div className="absolute top-5 right-5 z-10 w-9 h-9 border border-[#FFFEF7]/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#FFFEF7] transition-all">
                <ArrowUpRight className="w-4 h-4 text-[#FFFEF7] group-hover:text-[#3C2415] transition-colors" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#C9A94E] font-medium mb-1.5">
                  {collection.productCount} Handcrafted Designs
                </span>
                <h2 className="font-serif-display text-2xl md:text-3xl text-[#FFFEF7] tracking-[0.02em] mb-2 drop-shadow-sm">
                  {collection.name}
                </h2>
                <p className="text-[#FFFEF7]/75 text-xs sm:text-sm line-clamp-2 leading-relaxed font-light">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
