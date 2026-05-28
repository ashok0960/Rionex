import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { scrollAfterNav } from '../utils/scrollToSection';
import HeroSection from '../components/home/HeroSection';
import QuickApplySection from '../components/home/QuickApplySection';
import ProcessSection from '../components/home/ProcessSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ServicesSection from '../components/home/ServicesSection';
import CountriesSection from '../components/home/CountriesSection';
import TestPrepSection from '../components/home/TestPrepSection';
import TeamSection from '../components/home/TeamSection';
import ReviewsSection from '../components/home/ReviewsSection';
import CounselingCTA from '../components/home/CounselingCTA';
import FAQSection from '../components/home/FAQSection';
import StoriesSection from '../components/home/StoriesSection';
import ContactSection from '../components/home/ContactSection';

const HomePage = () => {
  useEffect(() => {
    const sectionId = window.location.hash.replace('#', '');
    if (sectionId === 'contact') {
      window.dispatchEvent(new CustomEvent('rionex-contact-open'));
      return;
    }
    if (sectionId) {
      scrollAfterNav(sectionId);
      return;
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Rionex Education | Best Study Abroad Consultancy in Nepal</title>
        <meta name="description" content="Rionex Education - Trusted study abroad consultancy in Kathmandu. Expert guidance for university admissions, visa, IELTS, and pre-departure support. 98% visa success rate." />
        <meta name="keywords" content="study abroad Nepal, education consultancy Kathmandu, visa guidance, university admission, IELTS preparation, Australia, USA, UK, Canada, Japan, Germany" />
        <meta name="author" content="Rionex Education" />
        <meta property="og:title" content="Rionex Education | Study Abroad Consultancy Nepal" />
        <meta property="og:description" content="Dream Big, Achieve Bigger - 98% visa success rate, 5000+ students placed worldwide." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <HeroSection />
      <QuickApplySection />
      <ProcessSection />
      <WhyChooseUs />
      <ServicesSection />
      <CountriesSection />
      <TestPrepSection />
      <TeamSection />
      <ReviewsSection />
      <StoriesSection />
      <CounselingCTA />
      <FAQSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
