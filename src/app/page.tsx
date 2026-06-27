import { CustomerLayout } from "@/components/layout";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedSection } from "@/components/home/featured-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { DealsSection } from "@/components/home/deals-section";
import { StatsSection } from "@/components/home/stats-section";
import { ReviewsSection } from "@/components/home/reviews-section";
import { FAQSection } from "@/components/home/faq-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <CustomerLayout>
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <StatsSection />
      <DealsSection />
      <ReviewsSection />
      <FAQSection />
      <NewsletterSection />
      <CTASection />
    </CustomerLayout>
  );
}
