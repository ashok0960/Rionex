import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import RevolutionaryNavbar from './components/layout/RevolutionaryNavbar';
import Footer from './components/layout/Footer';
import WhatsAppWidget from './components/layout/WhatsAppWidget';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ReviewsPage from './pages/ReviewsPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import ContactPage from './pages/ContactPage';
import ServicePage from './pages/ServicePage';
import CountryPage from './pages/CountryPage';
import NotFoundPage from './pages/NotFoundPage';

const scrollToHashSection = (hash) => {
  const id = hash.replace('#', '');
  if (!id) return false;

  let attempts = 0;
  const tryScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 112;
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'auto' });
      return;
    }

    attempts += 1;
    if (attempts < 30) requestAnimationFrame(tryScroll);
  };

  requestAnimationFrame(tryScroll);
  return true;
};

const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash && scrollToHashSection(hash)) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <ScrollManager />
          <RevolutionaryNavbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/countries/:slug" element={<CountryPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
          <WhatsAppWidget />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '12px',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
