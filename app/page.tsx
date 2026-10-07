import { HeroSection } from '@/components/home/HeroSection';
import { CollectionDiscovery } from '@/components/home/CollectionDiscovery';
import { ShopByOccasion } from '@/components/home/ShopByOccasion';
import { BridalEdit } from '@/components/home/BridalEdit';
import { SignatureDesigns } from '@/components/home/SignatureDesigns';
import { WhyLata } from '@/components/home/WhyLata';
import { HeritageSection } from '@/components/home/HeritageSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { StoreExperience } from '@/components/home/StoreExperience';
import { AppointmentCTA } from '@/components/home/AppointmentCTA';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CollectionDiscovery />
      <ShopByOccasion />
      <BridalEdit />
      <SignatureDesigns />
      <WhyLata />
      <HeritageSection />
      <ReviewsSection />
      <StoreExperience />
      <AppointmentCTA />
    </main>
  );
}
