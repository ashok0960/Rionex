import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiCheckCircle } from 'react-icons/fi';
import { reviewsData } from '../data/reviewsData';
import { scrollToSection } from '../utils/scrollToSection';
import { useNavigate } from 'react-router-dom';

const extraStories = [
  { id: 7,  name: 'Anil Maharjan',   country: 'Germany',      university: 'RWTH Aachen',           rating: 5, text: 'Rionex helped me navigate the complex German university application process. Got admitted to my first choice with a strong application file!', date: '2023-11-20', platform: 'Google',   avatar: 'AM', service: 'University Selection' },
  { id: 8,  name: 'Puja Shrestha',   country: 'South Korea',  university: 'Seoul National Univ.',  rating: 5, text: 'The team guided me through TOPIK preparation and Korean university applications. Now studying in Seoul with full confidence!', date: '2023-11-10', platform: 'Facebook', avatar: 'PS', service: 'Application Guidance' },
  { id: 9,  name: 'Dipesh Karki',    country: 'Australia',    university: 'Monash University',     rating: 5, text: 'My visa was rejected once before I came to Rionex. They rebuilt my entire file and I got approved in 3 weeks. Incredible team.', date: '2023-10-25', platform: 'Google',   avatar: 'DK', service: 'Visa Guidance' },
  { id: 10, name: 'Manisha Thapa',   country: 'Canada',       university: 'UBC Vancouver',         rating: 5, text: 'From SOP writing to visa interview prep — Rionex covered everything. I am now in Vancouver living my dream!', date: '2023-10-15', platform: 'Google',   avatar: 'MT', service: 'Full Package' },
  { id: 11, name: 'Roshan Bhandari', country: 'UK',           university: 'University of Leeds',   rating: 5, text: 'Got my UK student visa in just 18 days. The document checklist from Rionex was perfect — nothing was missing.', date: '2023-09-30', platform: 'Facebook', avatar: 'RB', service: 'Visa Guidance' },
  { id: 12, name: 'Nisha Lama',      country: 'Japan',        university: 'Waseda University',     rating: 5, text: 'Rionex helped me prepare my Japan application and visa documents. I am now studying in Tokyo. Best decision of my life!', date: '2023-09-15', platform: 'Google',   avatar: 'NL', service: 'Visa Guidance' },
];

const allStories = [...reviewsData, ...extraStories];
const countries = ['All', ...new Set(allStories.map(s => s.country))];
const platformColor = { Google: 'bg-red-50 text-red-600', Facebook: 'bg-blue-50 text-blue-600' };

const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar key={i} size={12} fill={i < rating ? '#f59e0b' : 'none'} stroke={i < rating ? '#f59e0b' : '#cbd5e1'} />
    ))}
  </div>
);

const SuccessStoriesPage = () => {
  const [active, setActive] = useState('All');
  const navigate = useNavigate();
  const visible = active === 'All' ? allStories : allStories.filter(s => s.country === active);

  return (
    <>
      <Helmet><title>Success Stories — Rionex Education</title></Helmet>

      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-950 py-20 text-center">
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary-600/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-secondary-600/10 blur-[100px]" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-shell relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">Success Stories</span>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
            Real students,{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">real results</span>
          </h1>
          <p className="mt-3 text-base text-slate-400">Over 5,000 students placed worldwide. Here are some of their stories.</p>

          {/* Stats strip */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            {[['5000+', 'Students Placed'], ['98%', 'Visa Success'], ['4.9★', 'Average Rating']].map(([v, l]) => (
              <div key={l} className="py-5">
                <div className="text-2xl font-extrabold text-white">{v}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="section-pad bg-slate-50">
        <div className="page-shell">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {countries.map(c => (
              <button key={c} type="button" onClick={() => setActive(c)}
                className={`focus-ring rounded-full border px-4 py-2 text-sm font-semibold transition-all ${active === c ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-600/25' : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700'}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
            <AnimatePresence>
              {visible.map((story, i) => (
                <motion.article key={story.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}
                  className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 text-lg font-extrabold text-white">
                        {story.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-ink">{story.name}</p>
                        <p className="text-xs text-slate-500">{story.country} · {story.university}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${platformColor[story.platform] ?? 'bg-slate-100 text-slate-600'}`}>{story.platform}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <Stars rating={story.rating} />
                    {story.service && (
                      <span className="flex items-center gap-1 rounded-full bg-secondary-50 px-2.5 py-0.5 text-[10px] font-bold text-secondary-700">
                        <FiCheckCircle size={9} />{story.service}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">"{story.text}"</p>
                  <p className="mt-3 text-[10px] font-semibold text-slate-400">
                    {new Date(story.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </p>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#203568] to-[#D32028] p-10 text-center text-white">
            <h2 className="text-2xl font-extrabold">Your success story starts here</h2>
            <p className="mt-2 text-white/80">Join thousands of Nepali students who trusted Rionex to guide them abroad.</p>
            <button type="button" onClick={() => { navigate('/'); setTimeout(() => scrollToSection('contact'), 80); }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-8 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/25">
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessStoriesPage;
