import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBookOpen, FiBriefcase, FiCalendar, FiCheckCircle, FiDollarSign, FiHome, FiTrendingUp } from 'react-icons/fi';
import { countriesData } from '../data/countriesData';
import { scrollToSection } from '../utils/scrollToSection';

const WA_NUMBER = '9779768908937';

const getWALink = (countryName) => {
  const msg = encodeURIComponent(
    `Hello Rionex Education! I am interested in studying in ${countryName}. Could you please guide me on the admission process, visa requirements, and available universities? Thank you.`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
};

const CountryFlag = ({ country, className = 'h-20 w-28', imageClassName = 'object-cover' }) => (
  <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/40 bg-white shadow-xl shadow-slate-900/10 ${className}`}>
    <img
      src={`https://flagcdn.com/w160/${country.flagCode}.png`}
      srcSet={`https://flagcdn.com/w160/${country.flagCode}.png 1x, https://flagcdn.com/w320/${country.flagCode}.png 2x`}
      alt={`${country.name} flag`}
      className={`h-full w-full ${imageClassName}`}
      loading="lazy"
    />
  </span>
);

const CountryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const country = countriesData.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!country) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-ink">Country not found</p>
          <button type="button" onClick={() => navigate('/')} className="mt-4 text-primary-600 underline">Go home</button>
        </div>
      </div>
    );
  }

  const infoGrid = [
    { icon: FiDollarSign, label: 'Tuition / Year',   value: country.tuition,    color: 'bg-blue-100 text-[#203568]' },
    { icon: FiHome,       label: 'Living / Month',   value: country.living,     color: 'bg-green-50 text-green-700' },
    { icon: FiBriefcase,  label: 'Work Rights',      value: country.workRights, color: 'bg-red-100 text-[#D32028]' },
    { icon: FiTrendingUp, label: 'PR Pathway',       value: country.prPathway,  color: 'bg-blue-100 text-[#203568]' },
    { icon: FiBookOpen,   label: 'Universities',     value: `${country.universities}+`, color: 'bg-red-100 text-[#D32028]' },
    { icon: FiCalendar,   label: 'Intake',           value: country.intake,     color: 'bg-blue-100 text-[#203568]' },
    { icon: FiCheckCircle,label: 'Min. IELTS',       value: country.ielts,      color: 'bg-blue-100 text-[#203568]' },
    { icon: FiCheckCircle,label: 'Visa Success Rate',value: `${country.visaRate}%`, color: 'bg-green-50 text-green-700' },
  ];

  return (
    <>
      <Helmet><title>Study in {country.name} — Rionex Education</title></Helmet>

      {/* Hero */}
      <div className={`bg-gradient-to-br ${country.color} py-20`}>
        <div className="page-shell">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <button type="button" onClick={() => navigate('/')} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25">
              ← Back to Home
            </button>
            <div className="flex items-center gap-5">
              <CountryFlag country={country} />
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-white/60">Study Destination</p>
                <h1 className="text-4xl font-extrabold text-white md:text-5xl">Study in {country.name}</h1>
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-lg text-white/85">{country.highlight}</p>

            {/* Visa rate badge + WhatsApp CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-white/15 px-5 py-3 backdrop-blur-sm">
                <div className="text-3xl font-extrabold text-white">{country.visaRate}%</div>
                <div className="text-sm font-semibold text-white/80">Visa success rate<br />at Rionex</div>
              </div>
              <a
                href={getWALink(country.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-[#25D366] px-6 py-3 font-bold text-white shadow-xl shadow-green-900/30 transition hover:bg-[#1ebe5d]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Ask on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-pad bg-white">
        <div className="page-shell grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            {/* Info grid */}
            <h2 className="text-2xl font-extrabold text-ink">Key facts</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {infoGrid.map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
                    <p className="mt-0.5 text-base font-bold text-ink">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Popular courses */}
            <h2 className="mt-12 text-2xl font-extrabold text-ink">Popular courses</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {country.popularCourses.map(c => (
                <span key={c} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                  {c}
                </span>
              ))}
            </div>

            {/* Why choose */}
            <h2 className="mt-12 text-2xl font-extrabold text-ink">Why study in {country.name}?</h2>
            <div className="mt-4 space-y-3">
              {[
                `${country.universities}+ partner universities available through Rionex`,
                `Intake in ${country.intake} — apply 3–4 months in advance`,
                `Work rights: ${country.workRights}`,
                `PR pathway: ${country.prPathway}`,
                `Minimum IELTS: ${country.ielts} overall band`,
              ].map((point, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <FiCheckCircle size={16} className="mt-0.5 shrink-0 text-secondary-600" />
                  <p className="text-sm text-slate-700">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/8">
              <div className="text-center">
                <CountryFlag country={country} className="mx-auto h-16 w-24" />
                <h3 className="mt-3 text-xl font-extrabold text-ink">Apply for {country.name}</h3>
                <p className="mt-2 text-sm text-slate-600">Get expert guidance from our {country.name} specialist counselor.</p>
              </div>
              <button type="button" onClick={() => { navigate('/'); setTimeout(() => scrollToSection('contact'), 80); }}
                className="focus-ring bg-gradient-to-r from-[#203568] to-[#D32028] mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white shadow-lg shadow-primary-600/20 transition hover:opacity-90">
                Book Free Consultation <FiArrowRight size={15} />
              </button>
              <a href="tel:+9779768908937" className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-primary-300 hover:text-primary-700">
                Call +977 9768908937
              </a>

              {/* WhatsApp */}
              <a
                href={getWALink(country.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] py-3.5 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition hover:bg-[#1ebe5d] hover:shadow-green-500/40"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us About {country.name}
              </a>

              {/* Other countries */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Other destinations</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {countriesData.filter(c => c.name !== country.name).map(c => (
                    <button key={c.name} type="button"
                      onClick={() => navigate(`/countries/${c.name.toLowerCase().replace(/\s+/g, '-')}`)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-primary-200 hover:text-primary-700">
                      <CountryFlag country={c} className="h-5 w-7 rounded-md shadow-none" /> {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryPage;
