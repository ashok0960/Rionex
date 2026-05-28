import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiClipboard,
  FiFileText,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPlay,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiCompass,
  FiTarget,
  FiBriefcase,
  FiSearch,
  FiX,
  FiChevronRight,
  FiCoffee,
  FiAward as FiAwardIcon,
} from 'react-icons/fi';
import { FaWhatsapp, FaGraduationCap, FaChalkboardTeacher, FaPlaneDeparture } from 'react-icons/fa';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { countriesData } from '../../data/countriesData';
import { useCounter } from '../../hooks/useScrollAnimation';
import { contactConfig, telHref, whatsappUrl } from '../../config/contact';
import { scrollToSection } from '../../utils/scrollToSection';

const logoPath = (fileName) => new URL(`../../assets/university/${fileName}`, import.meta.url).href;

// Enhanced university data with better logos
const universitiesData = [
  { id: 1, name: 'GISMA University for Applied Sciences', logo: logoPath('gisma.png'), country: 'Germany', intake: 'Jan / Sep', courses: ['Business', 'Management', 'IT'], ranking: 'Top 100', scholarship: 'Up to 30%' },
  { id: 2, name: 'SRH Berlin University of Applied Sciences', logo: logoPath('2.png'), country: 'Germany', intake: 'Mar / Oct', courses: ['Engineering', 'Business', 'Design'], ranking: 'Top 150', scholarship: 'Up to 25%' },
  { id: 3, name: 'Swiss School of Management', logo: logoPath('3.png'), country: 'Switzerland', intake: 'Feb / Sep', courses: ['MBA', 'Finance', 'Marketing'], ranking: 'Top 50', scholarship: 'Up to 40%' },
  { id: 4, name: 'EIE European Business School', logo: logoPath('4.png'), country: 'Cyprus', intake: 'Jan / Aug', courses: ['Business', 'Accounting', 'Tourism'], ranking: 'Award Winner', scholarship: 'Up to 35%' },
  { id: 5, name: 'George Brown College', logo: logoPath('5.png'), country: 'Canada', intake: 'Jan / Sep', courses: ['Hospitality', 'Design', 'Computer Science'], ranking: 'Top 50 Canada', scholarship: 'Up to 20%' },
  { id: 6, name: 'University of East London', logo: logoPath('6.png'), country: 'United Kingdom', intake: 'Sep / Jan', courses: ['Business', 'Law', 'Computing'], ranking: 'Modern University of the Year', scholarship: 'Up to 50%' },
  { id: 7, name: 'Ulster University', logo: logoPath('7.png'), country: 'United Kingdom', intake: 'Sep / Jan', courses: ['Engineering', 'Health', 'Business'], ranking: 'Top 50 UK', scholarship: 'Up to 30%' },
  { id: 8, name: 'Cardiff Metropolitan University', logo: logoPath('8.png'), country: 'United Kingdom', intake: 'Sep / Jan', courses: ['Sports Science', 'Business', 'Finance'], ranking: 'Teaching Excellence', scholarship: 'Up to 25%' },
  { id: 9, name: 'Queen Margaret University', logo: logoPath('9.png'), country: 'United Kingdom', intake: 'Sep / Jan', courses: ['Film', 'Journalism', 'Business'], ranking: 'Top Modern Uni', scholarship: 'Up to 20%' },
  { id: 10, name: 'Aura International School and Management', logo: logoPath('10.png'), country: 'France', intake: 'Rolling', courses: ['Management', 'Hospitality', 'English'], ranking: 'Specialized', scholarship: 'Up to 15%' },
  { id: 11, name: 'University of Salamanca', logo: logoPath('11.png'), country: 'Spain', intake: 'Sep / Feb', courses: ['Law', 'Humanities', 'Business'], ranking: 'Top 10 Spain', scholarship: 'Up to 30%' },
];

// Enhanced services data
const servicesData = [
  { id: 1, name: 'IELTS Preparation', category: 'Language Training', description: 'Comprehensive IELTS coaching with expert trainers', serviceIcon: 'ielts', icon: FiBookOpen, color: 'from-blue-500 to-cyan-500' },
  { id: 2, name: 'TOEFL Preparation', category: 'Language Training', description: 'TOEFL exam preparation and practice tests', serviceIcon: 'test', icon: FiBookOpen, color: 'from-indigo-500 to-blue-500' },
  { id: 3, name: 'PTE Coaching', category: 'Language Training', description: 'PTE Academic preparation classes with mock tests, scoring strategy, and exam readiness', serviceIcon: 'test', icon: FiClipboard, color: 'from-purple-500 to-pink-500' },
  { id: 4, name: 'German Language A1-B2', category: 'Language Training', description: 'German language training from A1 to B2 for Germany study, visa, and daily life', serviceIcon: 'german', icon: FaChalkboardTeacher, color: 'from-emerald-500 to-teal-500' },
  { id: 5, name: 'University Application', category: 'Admission', description: 'End-to-end university application assistance', serviceIcon: 'university', icon: FaGraduationCap, color: 'from-emerald-500 to-teal-500' },
  { id: 6, name: 'SOP Writing', category: 'Documentation', description: 'Statement of Purpose writing and editing', serviceIcon: 'documents', icon: FiFileText, color: 'from-orange-500 to-red-500' },
  { id: 7, name: 'LOR Preparation', category: 'Documentation', description: 'Letter of Recommendation guidance', serviceIcon: 'documents', icon: FiFileText, color: 'from-amber-500 to-orange-500' },
  { id: 8, name: 'Visa Counseling', category: 'Visa', description: 'Expert visa application and interview preparation', serviceIcon: 'visa', icon: FiShield, color: 'from-rose-500 to-pink-500' },
  { id: 9, name: 'Scholarship Guidance', category: 'Finance', description: 'Scholarship search and application support', serviceIcon: 'university', icon: FiAwardIcon, color: 'from-yellow-500 to-amber-500' },
  { id: 10, name: 'Career Counseling', category: 'Guidance', description: 'Career path and course selection guidance', serviceIcon: 'counseling', icon: FiUsers, color: 'from-cyan-500 to-blue-500' },
  { id: 11, name: 'Pre-departure Briefing', category: 'Support', description: 'Pre-departure orientation and support', serviceIcon: 'departure', icon: FaPlaneDeparture, color: 'from-violet-500 to-purple-500' },
];

const stats = [
  { value: 10, label: 'Years of Excellence', suffix: '+', icon: FiStar, color: 'from-amber-500 to-orange-500', description: 'Trusted since 2014' },
  { value: 5000, label: 'Happy Students', suffix: '+', icon: FiUsers, color: 'from-emerald-500 to-teal-500', description: 'Success stories worldwide' },
  { value: 20, label: 'University Partners', suffix: '+', icon: FiGlobe, color: 'from-blue-500 to-cyan-500', description: 'Global network' },
  { value: 98, label: 'Visa Success', suffix: '%', icon: FiTrendingUp, color: 'from-violet-500 to-purple-500', description: 'Industry leading rate' },
];

const steps = [
  { n: '01', label: 'Counseling', description: 'Personalized career roadmap', icon: FiCompass, color: 'from-blue-500 to-cyan-500' },
  { n: '02', label: 'University', description: 'Strategic admission planning', icon: FiTarget, color: 'from-emerald-500 to-teal-500' },
  { n: '03', label: 'Documents', description: 'SOP & LOR excellence', icon: FiFileText, color: 'from-orange-500 to-red-500' },
  { n: '04', label: 'Visa', description: 'End-to-end visa guidance', icon: FiShield, color: 'from-rose-500 to-pink-500' },
  { n: '05', label: 'Departure', description: 'Pre-departure support', icon: FiBriefcase, color: 'from-violet-500 to-purple-500' },
];

const StatPill = ({ value, label, suffix, icon: Icon, color, description }) => {
  const { count, ref } = useCounter(value, 1800);
  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative text-center cursor-pointer"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
      <div className="relative flex flex-col items-center gap-2">
        <div className={`rounded-2xl bg-gradient-to-br ${color} p-3 text-white shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
          <Icon size={22} />
        </div>
        <div className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl md:text-5xl">
          {count}{suffix}
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">{label}</div>
        <div className="text-[8px] text-slate-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-[9px]">
          {description}
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    initial={{ opacity: 0.2, scale: 0.6 }}
    animate={{
      opacity: [0.2, 0.5, 0.2],
      scale: [0.6, 1.1, 0.6],
      x: [0, 30, -20, 0],
      y: [0, -30, 20, 0],
    }}
    transition={{
      duration: 14,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

// Enhanced Search Modal Component
const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
      setSearchTerm('');
      setSearchResults([]);
      setHasSearched(false);
      setSelectedCategory('all');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const performSearch = useCallback(() => {
    const term = searchTerm.trim();
    if (term === '') {
      setSearchResults([]);
      setHasSearched(true);
      return;
    }

    const lowerTerm = term.toLowerCase();
    
    const countryAliasMatch = (name) => {
      const country = countriesData.find((countryItem) => countryItem.name === name);
      return country?.aliases?.some((alias) => alias.toLowerCase().includes(lowerTerm));
    };

    let countryMatches = countriesData
      .filter(
        (country) =>
          country.name.toLowerCase().includes(lowerTerm) ||
          country.aliases?.some((alias) => alias.toLowerCase().includes(lowerTerm)) ||
          country.highlight.toLowerCase().includes(lowerTerm) ||
          country.popularCourses.some((course) => course.toLowerCase().includes(lowerTerm))
      )
      .map((country) => ({ ...country, type: 'country' }));

    let serviceMatches = servicesData
      .filter(
        (service) =>
          service.name.toLowerCase().includes(lowerTerm) ||
          service.category.toLowerCase().includes(lowerTerm) ||
          service.description.toLowerCase().includes(lowerTerm)
      )
      .map((service) => ({ ...service, type: 'service' }));

    if (selectedCategory === 'countries') {
      serviceMatches = [];
    } else if (selectedCategory === 'services') {
      countryMatches = [];
    }

    setSearchResults([...countryMatches, ...serviceMatches]);
    setHasSearched(true);
  }, [searchTerm, selectedCategory]);

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  };

  const renderHighlightedText = (text, query) => {
    if (!query) return text;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);
    if (index === -1) return text;
    return (
      <>
        {text.slice(0, index)}
        <span className="font-bold text-[#D32028]">{text.slice(index, index + query.length)}</span>
        {text.slice(index + query.length)}
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: -30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: -30, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="mt-10 w-[95%] max-w-3xl rounded-2xl bg-white shadow-2xl sm:mt-20 sm:w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-1 items-center gap-3 rounded-full border-2 border-slate-200 bg-white px-4 py-2 transition-all focus-within:border-[#203568]">
                <FiSearch className="text-slate-400" size={20} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search countries or services..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (hasSearched) {
                      setHasSearched(false);
                      setSearchResults([]);
                    }
                  }}
                  onKeyDown={handleEnter}
                  className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none sm:text-base"
                />
              </div>
              <button
                type="button"
                onClick={performSearch}
                className="rounded-full bg-gradient-to-r from-[#203568] to-[#D32028] px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-105"
              >
                Search
              </button>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-slate-100 transition-colors"
              >
                <FiX size={22} className="text-slate-500" />
              </button>
            </div>
            
            {/* Category filters */}
            <div className="mt-4 flex gap-2">
              {['all', 'countries', 'services'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#203568] to-[#D32028] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category === 'all'
                    ? 'All Results'
                    : category === 'countries'
                    ? 'Countries'
                    : 'Services'}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
            {!hasSearched ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#203568]/10 to-[#D32028]/10">
                  <FiSearch size={32} className="text-[#203568] opacity-50" />
                </div>
                <p className="text-sm text-slate-500 sm:text-base">
                  Search for countries or study abroad services
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Try keywords from the site: Germany, UK, USA, Canada, Australia, Japan, South Korea, Cyprus, IELTS, PTE, German A1-B2, Scholarship, Visa Counseling
                </p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <FiSearch size={32} className="text-slate-400" />
                </div>
                <p className="text-sm text-slate-500 sm:text-base">
                  No results found for "{searchTerm.trim()}"
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Try different keywords or browse our categories
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">
                  Found {searchResults.length} result(s)
                </p>
                {searchResults.map((item, idx) => (
                  <motion.div
                    key={`${item.type}-${item.id || item.name}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group flex flex-col gap-3 rounded-xl border border-slate-100 p-4 transition-all hover:border-[#203568]/20 hover:shadow-lg sm:flex-row sm:items-center sm:gap-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-sm">
                      {item.type === 'university' ? (
                        <img 
                          src={item.logo} 
                          alt={item.name} 
                          className="h-8 w-8 object-contain"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/128.png?text=Uni';
                          }}
                        />
                      ) : item.type === 'country' ? (
                        <img
                          src={`https://flagcdn.com/w80/${item.flagCode}.png`}
                          srcSet={`https://flagcdn.com/w160/${item.flagCode}.png 2x`}
                          alt={`${item.name} flag`}
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/80.png?text=Flag';
                          }}
                        />
                      ) : (
                        <div className="rounded-full bg-gradient-to-br from-[#203568]/20 to-[#D32028]/20 p-2">
                          <item.icon size={20} className="text-[#203568]" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-bold text-slate-800">
                        {renderHighlightedText(item.name, searchTerm.trim())}
                      </p>
                      {item.type === 'university' ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-[#203568]">
                            {renderHighlightedText(item.country, searchTerm.trim())}
                          </span>
                          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-[#D32028]">
                            {item.intake} intake
                          </span>
                          {item.ranking && (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                              {item.ranking}
                            </span>
                          )}
                        </div>
                      ) : item.type === 'country' ? (
                        <div className="mt-2 grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
                          <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-700">
                            IELTS {item.ielts}
                          </span>
                          <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-700">
                            Visa success {item.visaRate}%
                          </span>
                          <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-700">
                            Tuition {item.tuition}
                          </span>
                          <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-700">
                            Popular: {item.popularCourses.join(', ')}
                          </span>
                        </div>
                      ) : (
                        <>
                          <p className="mt-1 text-xs text-slate-500">
                            {renderHighlightedText(item.description, searchTerm.trim())}
                          </p>
                          <span className="mt-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                            {renderHighlightedText(item.category, searchTerm.trim())}
                          </span>
                        </>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (item.type === 'university' || item.type === 'country') {
                          const countrySlug = item.type === 'university'
                            ? item.country.toLowerCase().replace(/\s+/g, '-')
                            : item.name.toLowerCase().replace(/\s+/g, '-');
                          navigate(`/countries/${countrySlug}`);
                          onClose();
                        } else {
                          scrollToSection('contact');
                          onClose();
                        }
                      }}
                      className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                        item.type === 'university'
                          ? 'bg-gradient-to-r from-[#203568] to-[#D32028] text-white hover:shadow-lg'
                          : 'border-2 border-[#203568] text-[#203568] hover:bg-gradient-to-r hover:from-[#203568] hover:to-[#D32028] hover:text-white hover:border-0'
                      }`}
                    >
                      {item.type === 'university' ? 'View Details' : 'Enquire Now'}
                      <FiChevronRight size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Enhanced University Card Component
const UniversityCard = ({ university, index }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group min-w-[160px] flex-shrink-0 rounded-xl border border-slate-100 bg-white p-4 transition-all hover:border-[#203568]/20 hover:shadow-xl sm:min-w-[200px]"
    >
      <Link to={`/universities/${university.id}`}>
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm"
          >
            <img 
              src={university.logo} 
              alt={university.name} 
              className="h-8 w-8 object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/128.png?text=Uni';
              }}
            />
          </motion.div>
          {university.ranking && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600">
              {university.ranking}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm font-bold text-slate-900 line-clamp-2 min-h-[42px]">
          {university.name}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#203568]">{university.country}</span>
          <span className="text-[10px] text-slate-500">{university.intake}</span>
        </div>
        {university.scholarship && (
          <div className="mt-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 px-2 py-0.5 text-center">
            <span className="text-[9px] font-semibold text-amber-600">{university.scholarship} scholarship</span>
          </div>
        )}
        <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: index * 0.05 }}
            className="h-full rounded-full bg-gradient-to-r from-[#203568] to-[#D32028]"
          />
        </div>
      </Link>
    </motion.div>
  );
};

// Enhanced Service Card Component
const ServiceCard = ({ service, idx }) => {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 + idx * 0.05 }}
      whileHover={{ y: -5 }}
      onClick={() => scrollToSection('contact')}
      className="group cursor-pointer rounded-xl border border-slate-100 bg-white p-4 text-center transition-all hover:border-[#203568]/20 hover:shadow-xl"
    >
      <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${service.color} bg-opacity-10 transition-all duration-300 group-hover:scale-110`}>
        <Icon size={20} className="text-white" />
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-700">{service.name}</p>
      <p className="mt-1 text-xs text-slate-400">{service.category}</p>
      <div className="mt-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-xs font-semibold text-[#D32028]">Learn more →</span>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const containerRef = useRef(null);
  const [universityIndex, setUniversityIndex] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const visibleUniversities = useMemo(
    () => universitiesData.map((_, index) => universitiesData[(universityIndex + index) % universitiesData.length]),
    [universityIndex],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setUniversityIndex((index) => (index + 1) % universitiesData.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Animated Background Orbs */}
      <AnimatedOrb className="left-[-20%] top-[10%] h-[250px] w-[250px] bg-blue-400/20 sm:left-[5%] sm:h-[400px] sm:w-[400px]" delay={0} />
      <AnimatedOrb className="right-[-20%] top-[20%] h-[200px] w-[200px] bg-emerald-400/15 sm:right-[8%] sm:h-[350px] sm:w-[350px]" delay={1.5} />
      <AnimatedOrb className="bottom-[5%] left-[-10%] h-[180px] w-[180px] bg-purple-400/15 sm:left-[20%] sm:h-[350px] sm:w-[350px]" delay={3} />

      {/* Grid Pattern Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
        }}
      />

      <motion.div style={{ y, opacity, scale }} className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="space-y-8 sm:space-y-10">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-lg backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-sm">
                <FiCheckCircle size={12} className="text-emerald-500" />
                Trusted study abroad partner
                <span className="hidden sm:inline-block w-px h-3 bg-slate-300 mx-2" />
                <span className="hidden sm:inline-flex items-center gap-1">
                  <FiStar size={12} className="text-amber-500" />
                  4.9/5 Rating
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="space-y-4 text-center sm:space-y-6"
            >
              <h1 className="text-4xl font-black leading-[1.2] tracking-tight text-slate-800 sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem]">
                Study abroad guidance <br className="hidden sm:block" />
                that makes every{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#203568] via-[#D32028] to-[#05223F] bg-clip-text text-transparent">
                    next step clear.
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute -bottom-3 left-0 right-0 h-1 origin-left rounded-full bg-gradient-to-r from-[#203568] via-[#D32028] to-[#05223F] sm:-bottom-4 sm:h-1.5"
                  />
                </span>
              </h1>
              <p className="mx-auto max-w-3xl px-4 text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
                Rionex supports Nepali students from profile counseling and country selection to university admission, 
                document preparation, visa guidance, and pre-departure care. Your complete study abroad journey starts here.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex justify-center px-4 sm:px-0"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsSearchOpen(true)}
                className="flex w-full max-w-2xl items-center justify-between gap-2 rounded-full border-2 border-[#203568] bg-white/95 px-5 py-3 text-sm text-slate-500 shadow-lg backdrop-blur-sm transition-all hover:border-[#D32028] hover:bg-white hover:text-slate-700 hover:shadow-xl sm:px-6 sm:py-3.5"
              >
                <div className="flex items-center gap-3">
                  <FiSearch size={18} className="text-[#203568]" />
                  <span>Search universities, courses, or services...</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="hidden rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 sm:block">⌘</kbd>
                  <kbd className="hidden rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 sm:block">K</kbd>
                </div>
              </motion.button>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('contact')}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#203568] to-[#D32028] px-6 py-2.5 text-sm font-bold text-white shadow-xl transition-all hover:shadow-2xl sm:px-7 sm:py-3 sm:text-base md:px-8 md:py-3.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Free Consultation
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={14} />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1a2c55] to-[#b01820]"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('services')}
                className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white/80 px-6 py-2.5 text-sm font-bold text-slate-700 backdrop-blur-sm transition-all hover:border-blue-300 hover:bg-white hover:text-blue-600 sm:px-7 sm:py-3 sm:text-base md:px-8 md:py-3.5"
              >
                <FiPlay size={14} />
                Explore Services
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-green-200 bg-green-50/80 px-6 py-2.5 text-sm font-bold text-green-700 backdrop-blur-sm transition-all hover:border-green-300 hover:bg-green-100 sm:px-7 sm:py-3 sm:text-base md:px-8 md:py-3.5"
              >
                <FaWhatsapp size={14} />
                WhatsApp Chat
              </motion.a>
            </motion.div>

            {/* Journey Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl bg-gradient-to-r from-[#203568]/5 to-[#D32028]/5 p-5 sm:p-6 md:p-8 max-w-4xl mx-auto"
            >
              <div className="mb-4 flex items-center justify-center gap-2">
                <FiCompass className="text-[#D32028]" size={18} />
                <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-600 sm:text-sm">Your 5-Step Journey to Success</p>
              </div>
              <div className="grid grid-cols-5 gap-2 sm:gap-4">
                {steps.map((step, idx) => (
                  <motion.div
                    key={step.n}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 + idx * 0.08 }}
                    whileHover={{ y: -5 }}
                    className="relative flex flex-col items-center text-center group"
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-lg transition-all duration-300 group-hover:scale-110 sm:h-12 sm:w-12`}>
                      <step.icon size={18} className="text-white sm:size-5" />
                    </div>
                    <div className="mt-2 h-0.5 w-full bg-gradient-to-r from-[#203568] to-[#D32028] opacity-30" />
                    <p className="mt-2 text-[10px] font-bold text-slate-700 sm:text-xs">{step.label}</p>
                    <p className="hidden text-[8px] text-slate-400 sm:block">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Featured Universities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6"
            >
              <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-0">
                <div>
                  <div className="flex items-center gap-2">
                    <FaGraduationCap className="text-[#203568]" size={18} />
                    <p className="text-xs font-bold uppercase tracking-wider text-[#203568] sm:text-sm">Featured Partners</p>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-600">Top universities accepting applications now</p>
                </div>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-1 text-xs font-semibold text-[#D32028] transition-all hover:gap-2 hover:underline sm:text-sm"
                >
                  View All Universities <FiArrowRight size={12} />
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-slate-50/80 to-white/80 p-3 backdrop-blur-sm sm:p-4">
                <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-300 sm:gap-4">
                  {visibleUniversities.map((university, idx) => (
                    <UniversityCard key={university.id} university={university} index={idx} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Services Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-6"
            >
              <div className="mb-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <FiAward className="text-[#203568]" size={18} />
                  <p className="text-xs font-bold uppercase tracking-wider text-[#203568] sm:text-sm">Services We Offer</p>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-600">Comprehensive support for your study abroad journey</p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
                {servicesData.map((service, idx) => (
                  <ServiceCard key={service.id} service={service} idx={idx} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 border-t border-slate-200/50 bg-white/80 backdrop-blur-xl mt-8 sm:mt-10"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 py-6 sm:grid-cols-4 sm:gap-8 sm:py-8 md:py-10">
            {stats.map((stat) => (
              <StatPill key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;