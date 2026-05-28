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
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            {[['4.9★', 'Average Rating'], ['200+', 'Reviews'], ['98%', 'Success Rate']].map(([v, l]) => (
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
            {platforms.map(p => (
              <button key={p} type="button" onClick={() => setActive(p)}
                className={`focus-ring rounded-full border px-4 py-2 text-sm font-semibold transition-all ${active === p ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-600/25' : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700'}`}>
                {p}
              </button>
            ))}
          </div>

          {/* Gallery Grid - Masonry */}
          <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
            <AnimatePresence>
              {visible.map((review, i) => (
                <motion.article
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="break-inside-avoid overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:border-white/20 hover:from-white/15 hover:to-white/10 hover:shadow-2xl mb-6"
                >
                  {/* Avatar Section */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 text-2xl font-extrabold text-white shadow-lg">
                    {review.avatar}
                  </div>

                  {/* Header Info */}
                  <div className="mb-4">
                    <p className="text-lg font-extrabold text-white">{review.name}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-300">
                      <FiGlobe size={14} />
                      <span>{review.country}</span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-slate-400">{review.university}</p>
                  </div>

                  {/* Badges */}
                  <div className="mb-4 flex gap-2">
                    <span className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide ${platformColor[review.platform] ?? 'bg-slate-100 text-slate-600'}`}>
                      {review.platform}
                    </span>
                    <span className="rounded-full bg-amber-500/20 px-3 py-1.5 text-[10px] font-bold text-amber-300 uppercase tracking-wide">
                      ★ {review.rating}.0
                    </span>
                  </div>

                  {/* Star Rating */}
                  <div className="mb-4 flex gap-1">
                    <Stars rating={review.rating} />
                  </div>

                  {/* Review Text */}
                  <p className="mb-5 text-sm leading-6 text-slate-200">
                    "{review.text}"
                  </p>

                  {/* Date Footer */}
                  <div className="border-t border-white/8 pt-4 text-xs font-semibold text-slate-400">
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
            <p className="text-sm text-slate-400">
              Showing {visible.length} of {reviewsData.length} verified student reviews
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ReviewsPage;
