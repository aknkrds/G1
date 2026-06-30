import { useEffect } from 'react';
import HeroSlider from '../components/home/HeroSlider';
import AboutSection from '../components/home/AboutSection';
import IndustryCards from '../components/home/IndustryCards';
import ProductOverview from '../components/home/ProductOverview';
import NewsSection from '../components/home/NewsSection';
import CTASection from '../components/home/CTASection';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
    });
  }, []);

  return (
    <main>
      <HeroSlider />
      <AboutSection />
      <IndustryCards />
      <ProductOverview />
      <NewsSection />
      <CTASection />
    </main>
  );
}
