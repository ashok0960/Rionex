import { motion } from 'framer-motion';
import { FiStar, FiGlobe } from 'react-icons/fi';
import { reviewsData } from '../../data/reviewsData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const platformColor = { Google: 'bg-red-100 text-[#D32028]', Facebook: 'bg-blue-100 text-[#203568]' };

const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar key={i} size={13} fill={i < rating ? '#f59e0b' : 'none'} stroke={i < rating ? '#f59e0b' : '#cbd5e1'} />
    ))}
  </div>
);

const ReviewsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="reviews" className="relative overflow-hidden bg-slate-950 py-24">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary-600/8 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-secondary-600/8 blur-[100px]" />

      <div className="page-shell relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
              Student Reviews Gallery
            </span>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Real students,{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                real results
              </span>
            </h2>
          </div>

          {/* Summary */}
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">4.9</div>
              <Stars rating={5} />
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Average</p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">200+</div>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Reviews</p>
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid - Masonry with enhanced cards */}
        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {reviewsData.map((review, i) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 28 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              className="break-inside-avoid overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:border-white/20 hover:from-white/15 hover:to-white/10 hover:shadow-2xl"
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
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-4 text-center"
        >
          <p className="text-sm text-slate-500">
            Showing {reviewsData.length} of 200+ verified student reviews
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
