import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiGlobe } from 'react-icons/fi';
import { reviewsData } from '../data/reviewsData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const platformColor = { Google: 'bg-red-50 text-red-600', Facebook: 'bg-blue-50 text-blue-600' };

const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar key={i} size={13} fill={i < rating ? '#f59e0b' : 'none'} stroke={i < rating ? '#f59e0b' : '#cbd5e1'} />
    ))}
  </div>
);

const ReviewsPage = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [active, setActive] = useState('All');
  const platforms = ['All', ...new Set(reviewsData.map(r => r.platform))];
  const visible = active === 'All' ? reviewsData : reviewsData.filter(r => r.platform === active);

  return (
    <>
      <Helmet><title>Student Reviews — Rionex Education</title></Helmet>

      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-950 py-20 text-center">
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary-600/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-secondary-600/10 blur-[100px]" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-shell relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
            Student Reviews Gallery
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
            Real students,{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              real results
            </span>
          </h1>
          <p className="mt-3 text-base text-slate-400">200+ verified reviews from students worldwide</p>

          {/* Stats strip */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            {[['4.9★', 'Average Rating'], ['200+', 'Reviews']].map(([v, l]) => (
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
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {platforms.map(p => (
              <button key={p} type="button" onClick={() => setActive(p)}
                className={`focus-ring rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${active === p ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-600/25' : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700'}`}>
                {p}
              </button>
            ))}
          </div>

          {/* Gallery Grid - Masonry with visible cards */}
          <div ref={ref} className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            <AnimatePresence>
              {visible.map((review, i) => (
                <motion.article
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="break-inside-avoid mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Header with Avatar and Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 text-xl font-extrabold text-white shadow-md">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-extrabold text-slate-900">{review.name}</h3>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                        <FiGlobe size={12} />
                        <span>{review.country}</span>
                      </div>
                      <p className="mt-0.5 text-xs font-medium text-slate-400">{review.university}</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${platformColor[review.platform] ?? 'bg-slate-100 text-slate-600'}`}>
                      {review.platform}
                    </span>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-700 uppercase tracking-wide">
                      ★ {review.rating}.0
                    </span>
                  </div>

                  {/* Star Rating */}
                  <div className="mb-4">
                    <Stars rating={review.rating} />
                  </div>

                  {/* Review Text */}
                  <p className="mb-4 text-sm leading-relaxed text-slate-700">
                    "{review.text}"
                  </p>

                  {/* Date Footer */}
                  <div className="border-t border-slate-100 pt-3 text-xs font-medium text-slate-400">
                    {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-14 text-center"
          >
            <p className="text-sm text-slate-500">
              Showing {visible.length} of {reviewsData.length} verified student reviews
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ReviewsPage;