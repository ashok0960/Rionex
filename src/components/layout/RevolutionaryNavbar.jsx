import { useEffect, useRef, useState, useCallback } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  FiArrowRight, FiBookOpen, FiCheck, FiChevronDown, FiClipboard,
  FiClock, FiFacebook, FiCompass, FiFileText, FiImage,
  FiInstagram, FiLinkedin, FiMail, FiMapPin, FiMenu, FiPhone,
  FiSend, FiStar, FiX,
} from 'react-icons/fi';
import { FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { scrollToSection, scrollAfterNav } from '../../utils/scrollToSection';
import { servicesData } from '../../data/servicesData';
import { countriesData } from '../../data/countriesData';
import { contactConfig, telHref, whatsappUrl } from '../../config/contact';
import logo from '../../assets/logo.svg';

const serviceIcons = {
  counseling: FiCompass, university: FiBookOpen, documents: FiFileText,
  test: FiClipboard, visa: FiCheck, departure: FiSend,
};

const CountryFlag = ({ country, className = 'h-7 w-9' }) => (
  <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm ${className}`}>
    <img
      src={`https://flagcdn.com/w80/${country.flagCode}.png`}
      srcSet={`https://flagcdn.com/w80/${country.flagCode}.png 1x, https://flagcdn.com/w160/${country.flagCode}.png 2x`}
      alt={`${country.name} flag`}
      className="h-full w-full object-cover"
      loading="lazy"
    />
  </span>
);

const WHATSAPP_URL = whatsappUrl();
const navShell = 'w-full px-3 sm:px-4 lg:px-6 2xl:px-8';

const RevolutionaryNavbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [dropdown, setDropdown] = useState(null);
  const navRef = useRef(null);
  const timerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Close mobile menu on route change
  useEffect(() => {
    const routeCleanupTimer = window.setTimeout(() => {
      setMobileOpen(false);
      setDropdown(null);
      const hashSection = location.hash.replace('#', '');
      if (hashSection) setActiveSection(hashSection);
    }, 0);

    return () => window.clearTimeout(routeCleanupTimer);
  }, [location.pathname, location.hash]);

  // Navigate to a section — works from any page
  const goSection = useCallback((id) => {
    setMobileOpen(false);
    setDropdown(null);
    setActiveSection(id);
    if (id === 'contact') {
      if (!isHome) {
        navigate('/#contact');
        return;
      }
      window.history.pushState(null, '', '/#contact');
      window.dispatchEvent(new CustomEvent('rionex-contact-open'));
      return;
    }
    if (!isHome) {
      navigate(`/#${id}`);
      scrollAfterNav(id);
      return;
    }
    window.history.pushState(null, '', `/#${id}`);
    scrollToSection(id);
  }, [isHome, navigate]);

  useEffect(() => {
    if (!isHome) return undefined;

    const sectionIds = ['home', 'services', 'countries', 'reviews', 'stories', 'contact'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.2);
        if (visible.length === 0) return;

        const topMost = visible.reduce((best, entry) => {
          if (!best) return entry;
          return entry.boundingClientRect.top < best.boundingClientRect.top ? entry : best;
        }, visible[0]);

        setActiveSection(topMost.target.id);
      },
      { rootMargin: '-112px 0px -60% 0px', threshold: [0.2, 0.5, 0.8] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  // Dropdown hover with delay to prevent flicker
  const openDropdown = (key) => { clearTimeout(timerRef.current); setDropdown(key); };
  const closeDropdown = () => { timerRef.current = setTimeout(() => setDropdown(null), 150); };

  const isActive = (id) => activeSection === id && isHome;

  const navBtnCls = (id) =>
    `focus-ring relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${isActive(id) ? 'bg-ink text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'
    }`;

  const linkCls = (path) =>
    `focus-ring relative z-10 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${location.pathname === path ? 'bg-ink text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'
    }`;

  return (
    <div className="sticky top-0 z-50">
      {/* ── Top info bar ── */}
      <div className="border-b border-white/10 bg-ink">
        <div className={navShell}>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
            {/* Left — contacts */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <a href={telHref(contactConfig.landline)} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-300 transition hover:text-white">
                <FiPhone size={11} className="text-secondary-400" />01-5928888
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Rionex Education on WhatsApp"
                className="inline-flex h-6 w-6 items-center justify-center rounded-md text-white transition hover:bg-white/10 hover:text-white"
              >
                <FaWhatsapp size={14} />
              </a>
              <a href={telHref(contactConfig.secondaryMobile)} className="hidden items-center gap-1.5 text-[11px] font-medium text-slate-300 transition hover:text-white sm:inline-flex">
                <FiPhone size={11} className="text-secondary-400" />+977 {contactConfig.secondaryMobile}
              </a>
              <a href={`mailto:${contactConfig.email}`} className="hidden items-center gap-1.5 text-[11px] font-medium text-slate-300 transition hover:text-white md:inline-flex">
                <FiMail size={11} className="text-secondary-400" />{contactConfig.email}
              </a>
              <span className="hidden items-center gap-1.5 text-[11px] font-medium text-slate-400 xl:inline-flex">
                <FiMapPin size={11} className="text-secondary-400" />{contactConfig.address}
              </span>
            </div>
            {/* Right — hours + socials */}
            <div className="flex items-center gap-4">
              <span className="hidden items-center gap-1.5 text-[11px] font-medium text-slate-400 sm:inline-flex">
                <FiClock size={11} className="text-secondary-400" />{contactConfig.officeHours}; {contactConfig.closedDay}
              </span>
              <div className="flex items-center gap-1.5">
                {[
                  { Icon: FiFacebook, href: 'https://www.facebook.com/rionexeducation', label: 'Facebook' },
                  { Icon: FiInstagram, href: 'https://www.instagram.com/rionexedu?igsh=czlvOGlsd2g2MnZk', label: 'Instagram' },
                  { Icon: FaTiktok, href: 'https://www.tiktok.com/@rionexeducation?_r=1&_t=ZS-96k5wPIgcJo', label: 'TikTok' },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition hover:bg-white/10 hover:text-white">
                    <Icon size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav className="w-full bg-white/95 shadow-[0_2px_20px_rgba(16,42,67,0.08)] backdrop-blur-xl">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
        <div className={navShell}>
          <div className="flex h-[68px] items-center justify-between gap-4">

            {/* Logo */}
            <button type="button" onClick={() => goSection('home')}
              className="focus-ring group flex shrink-0 items-center rounded-lg" aria-label="Go home">
              <div className="flex h-12 w-36 items-center justify-start sm:w-40">
                <img src={logo} alt="Rionex Education"
                  className="h-full w-full object-contain" />
              </div>
            </button>

            {/* Desktop nav */}
            <div ref={navRef} className="relative hidden flex-1 items-center justify-end gap-0.5 xl:flex">

              <button type="button" onClick={() => goSection('home')} className={navBtnCls('home')}>Home</button>

              {/* Services mega dropdown */}
              <div className="relative" onMouseEnter={() => openDropdown('services')} onMouseLeave={closeDropdown}>
                <button type="button"
                  className={`focus-ring relative z-10 inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${isActive('services') ? 'bg-ink text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'
                    }`}>
                  Services
                  <motion.span animate={{ rotate: dropdown === 'services' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <FiChevronDown size={13} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {dropdown === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-[calc(100%+8px)] z-[999] w-[540px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15"
                      onMouseEnter={() => openDropdown('services')} onMouseLeave={closeDropdown}
                    >
                      <div className="grid grid-cols-2 gap-1 p-3">
                        {servicesData.map(s => {
                          const Icon = serviceIcons[s.icon] || FiCheck;
                          return (
                            <Link key={s.id} to={`/services/${s.icon}`} onClick={() => setDropdown(null)}
                              className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-primary-50">
                              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white shadow-sm`}>
                                <Icon size={16} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-ink group-hover:text-primary-700">{s.title}</p>
                                <p className="mt-0.5 text-[11px] leading-4 text-slate-500 line-clamp-1">{s.features.join(' · ')}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5">
                        <button type="button" onClick={() => { goSection('services'); }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700">
                          View all services <FiArrowRight size={11} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Countries mega dropdown */}
              <div className="relative" onMouseEnter={() => openDropdown('countries')} onMouseLeave={closeDropdown}>
                <button type="button"
                  className={`focus-ring relative z-10 inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${isActive('countries') ? 'bg-ink text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'
                    }`}>
                  Countries
                  <motion.span animate={{ rotate: dropdown === 'countries' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <FiChevronDown size={13} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {dropdown === 'countries' && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-[calc(100%+8px)] z-[999] w-[500px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15"
                      onMouseEnter={() => openDropdown('countries')} onMouseLeave={closeDropdown}
                    >
                      <div className="grid grid-cols-2 gap-1 p-3">
                        {countriesData.map(c => (
                          <Link key={c.name} to={`/countries/${c.name.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={() => setDropdown(null)}
                            className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-primary-50">
                            <CountryFlag country={c} />
                            <div>
                              <p className="text-sm font-bold text-ink group-hover:text-primary-700">{c.name}</p>
                              <p className="text-[11px] text-slate-500"> {c.intake}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5">
                        <button type="button" onClick={() => { goSection('countries'); }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700">
                          Compare all countries <FiArrowRight size={11} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/reviews" className={linkCls('/reviews')}>Reviews</Link>

              <Link to="/gallery" className={linkCls('/gallery')}>
                <FiImage size={13} />Gallery
              </Link>

              <Link to="/success-stories" className={linkCls('/success-stories')}>
                <FiStar size={13} />Stories
              </Link>

              <Link to="/contact" className={linkCls('/contact')}>Contact</Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden shrink-0 items-center gap-3 xl:flex">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-green-200 bg-green-50 text-green-600 shadow-sm transition hover:border-green-300 hover:bg-green-100 hover:text-green-700"
                aria-label="Message Rionex Education on WhatsApp">
                <FaWhatsapp size={20} />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#203568] via-[#203568] to-[#D32028] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#203568]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#D32028]/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#203568] focus:ring-offset-2"
              >
                Book Consultation
                <FiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button type="button" onClick={() => setMobileOpen(v => !v)}
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-ink shadow-sm xl:hidden"
              aria-label="Toggle menu" aria-expanded={mobileOpen}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={mobileOpen ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}>
                  {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-slate-200 bg-white shadow-xl xl:hidden"
          >
            <div className={`${navShell} space-y-0.5 py-3`}>

              <button type="button" onClick={() => goSection('home')}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-primary-50 hover:text-primary-700">
                Home <FiArrowRight size={14} />
              </button>

              {/* Services accordion */}
              <div>
                <button type="button" onClick={() => setMobileExpanded(mobileExpanded === 'services' ? null : 'services')}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-primary-50 hover:text-primary-700">
                  Services
                  <motion.span animate={{ rotate: mobileExpanded === 'services' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <FiChevronDown size={14} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'services' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="ml-4 space-y-0.5 border-l-2 border-primary-100 pl-3 pb-2">
                        {servicesData.map(s => {
                          const Icon = serviceIcons[s.icon] || FiCheck;
                          return (
                            <Link key={s.id} to={`/services/${s.icon}`} onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-700">
                              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white`}>
                                <Icon size={13} />
                              </div>
                              {s.title}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Countries accordion */}
              <div>
                <button type="button" onClick={() => setMobileExpanded(mobileExpanded === 'countries' ? null : 'countries')}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-primary-50 hover:text-primary-700">
                  Countries
                  <motion.span animate={{ rotate: mobileExpanded === 'countries' ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <FiChevronDown size={14} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'countries' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="ml-4 grid grid-cols-2 gap-1 border-l-2 border-primary-100 pl-3 pb-2">
                        {countriesData.map(c => (
                          <Link key={c.name} to={`/countries/${c.name.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-700">
                            <CountryFlag country={c} className="h-5 w-7" />{c.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {[
                { label: 'Reviews', action: () => navigate('/reviews') },
                { label: 'Gallery', action: () => navigate('/gallery') },
                { label: 'Stories', action: () => navigate('/success-stories') },
                { label: 'Contact', action: () => navigate('/contact') },
              ].map(({ label, action }) => (
                <button key={label} type="button" onClick={action}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-primary-50 hover:text-primary-700">
                  {label} <FiArrowRight size={14} />
                </button>
              ))}

              <div className="grid gap-2 pt-2">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 py-3 text-sm font-semibold text-green-700 hover:border-green-300 hover:bg-green-100">
                  <FaWhatsapp size={17} /> Message on WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#203568] via-[#203568] to-[#D32028] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#203568]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#D32028]/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#203568] focus:ring-offset-2"
                >
                  Book Consultation
                  <FiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RevolutionaryNavbar;
