import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiBookOpen, FiBriefcase, FiCalendar, FiCheckCircle, FiDollarSign, FiGlobe, FiHome, FiTrendingUp } from 'react-icons/fi';
import { countriesData } from '../../data/countriesData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { scrollToSection } from '../../utils/scrollToSection';

const countrySlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

const CountryFlag = ({ country, className = 'h-8 w-11', imageClassName = 'object-cover' }) => (
  <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/50 bg-white shadow-sm ${className}`}>
    <img
      src={`https://flagcdn.com/w160/${country.flagCode}.png`}
      srcSet={`https://flagcdn.com/w160/${country.flagCode}.png 1x, https://flagcdn.com/w320/${country.flagCode}.png 2x`}
      alt={`${country.name} flag`}
      className={`h-full w-full ${imageClassName}`}
      loading="lazy"
    />
  </span>
);

const CountriesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [active, setActive] = useState(countriesData[0].name);
  const country = countriesData.find((c) => c.name === active);

  return (
    <section id="countries" className="section-pad bg-white">
      <div className="page-shell">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">Study Destinations</span>
          <h2 className="section-title mt-5">
            Choose your country with{' '}
            <span className="gradient-text bg-gradient-to-r from-[#203568] to-[#D32028]">complete information</span>
          </h2>
          <p className="section-copy">
            Compare tuition, living costs, work rights, visa rate, and PR pathways — everything you need to decide.
          </p>
        </motion.div>

        {/* Country tab pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {countriesData.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setActive(c.name)}
              className={`focus-ring inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                active === c.name
                  ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700'
              }`}
            >
              <CountryFlag country={c} className="h-5 w-7 rounded" />
              {c.name}
            </button>
          ))}
        </motion.div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/8"
          >
            {/* Hero header */}
            <div className={`bg-gradient-to-br ${country.color} p-8 text-white md:p-10`}>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <CountryFlag country={country} className="h-16 w-24 rounded-2xl" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-white/60">{country.accent}</p>
                      <h3 className="text-4xl font-extrabold">{country.name}</h3>
                    </div>
                  </div>
                  <p className="mt-3 max-w-lg text-base font-medium text-white/85">{country.highlight}</p>
                </div>

                {/* Visa rate circle */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative flex h-28 w-28 items-center justify-center">
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="42" fill="none"
                        stroke="white" strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 42}`}
                        strokeDashoffset={`${2 * Math.PI * 42 * (1 - country.visaRate / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="text-center">
                      <div className="text-2xl font-extrabold">{country.visaRate}%</div>
                      <div className="text-[10px] font-bold uppercase tracking-wide text-white/70">Visa Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key info grid */}
            <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {[
                { icon: FiDollarSign,  label: 'Tuition / Year',    value: country.tuition,   color: 'bg-blue-100 text-[#203568]' },
                { icon: FiHome,        label: 'Living / Month',    value: country.living,    color: 'bg-green-50 text-green-700' },
                { icon: FiBriefcase,   label: 'Work Rights',       value: country.workRights, color: 'bg-red-100 text-[#D32028]' },
                { icon: FiTrendingUp,  label: 'PR Pathway',        value: country.prPathway, color: 'bg-blue-100 text-[#203568]' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-3 p-5">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
                    <p className="mt-0.5 text-sm font-bold text-ink">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid divide-y divide-slate-100 border-t border-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { icon: FiBookOpen,    label: 'Partner Universities', value: `${country.universities}+` },
                { icon: FiCalendar,    label: 'Intake Months',        value: country.intake },
                { icon: FiCheckCircle, label: 'Min. IELTS Score',     value: country.ielts },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
                    <p className="mt-0.5 text-lg font-extrabold text-ink">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Deeper country facts */}
            <div className="grid gap-4 border-t border-slate-100 p-6 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary-700 shadow-sm">
                    <FiGlobe size={17} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Best for</p>
                    <p className="text-sm font-bold text-ink">{country.highlight}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Currency</p>
                    <p className="mt-1 text-sm font-extrabold text-ink">{country.currency}</p>
                  </div>
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Visa rate</p>
                    <p className="mt-1 text-sm font-extrabold text-secondary-600">{country.visaRate}%</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Quick planning notes</p>
                <div className="mt-3 space-y-2">
                  {[
                    `Apply around 3-4 months before ${country.intake} intake.`,
                    `Prepare funds for ${country.tuition} tuition and ${country.living} living cost.`,
                    `Target IELTS score: ${country.ielts}.`,
                  ].map((note) => (
                    <div key={note} className="flex gap-2 text-sm text-slate-700">
                      <FiCheckCircle size={15} className="mt-0.5 shrink-0 text-secondary-600" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Courses + CTA */}
            <div className="flex flex-col items-start justify-between gap-5 border-t border-slate-100 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <FiTrendingUp className="mr-1 inline" size={11} />
                  Popular Courses
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {country.popularCourses.map((c) => (
                    <span key={c} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  to={`/countries/${countrySlug(country.name)}`}
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-primary-300 hover:text-primary-700"
                >
                  View full details <FiArrowRight size={14} />
                </Link>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-700"
                >
                  Apply for {country.name} <FiArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mini flag grid */}
        <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-8">
          {countriesData.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setActive(c.name)}
              className={`focus-ring flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition-all duration-200 ${
                active === c.name
                  ? 'border-primary-200 bg-primary-50 shadow-md'
                  : 'border-slate-100 bg-slate-50 hover:border-primary-100 hover:bg-white'
              }`}
            >
              <CountryFlag country={c} className="h-8 w-11 rounded-md" />
              <span className="text-[11px] font-bold text-slate-600">{c.accent}</span>
              <span className="text-[10px] font-semibold text-secondary-600">{c.visaRate}%</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;
