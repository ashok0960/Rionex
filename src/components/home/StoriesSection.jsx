import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiGlobe } from 'react-icons/fi';
import { reviewsData } from '../../data/reviewsData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        size={12}
        fill={i < rating ? '#f59e0b' : 'none'}
        stroke={i < rating ? '#f59e0b' : '#cbd5e1'}
      />
    ))}
  </div>
);

const platformColor = { Google: 'bg-red-100 text-[#D32028]', Facebook: 'bg-blue-100 text-[#203568]' };

const StoriesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const visibleStories = reviewsData.slice(0, 4);

  return (
    <section id="stories" className="section-pad bg-gradient-to-b from-slate-50 to-white">
      <div className="page-shell">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">Success Stories</span>
          <h2 className="section-title mt-5">
            Rionex students who made it happen
          </h2>
          <p className="section-copy">
            Read verified student reviews from multiple countries and programs. These stories show how our full service support delivers results.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-4">
          {visibleStories.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 }}
              className="break-inside-avoid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Header with Avatar */}
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 pb-8">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 text-2xl font-extrabold text-white shadow-lg">
                  {review.avatar}
                </div>
              </div>

              {/* Content */}
              <div className="-mt-8 px-6 pb-6">
                {/* Name and Details */}
                <div className="mb-4">
                  <p className="text-lg font-extrabold text-slate-900">{review.name}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <FiGlobe size={14} />
                    <span>{review.country}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-600">{review.university}</p>
                </div>

                {/* Badges */}
                <div className="mb-4 flex gap-2">
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${platformColor[review.platform] ?? 'bg-slate-100 text-slate-600'}`}>
                    {review.platform}
                  </span>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-600 uppercase tracking-wide">
                    ★ {review.rating}.0
                  </span>
                </div>

                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  <Stars rating={review.rating} />
                </div>

                {/* Review Text */}
                <p className="mb-4 text-sm leading-6 text-slate-600">
                  "{review.text}"
                </p>

                {/* Date */}
                <p className="text-xs font-semibold text-slate-400">
                  {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="max-w-2xl text-sm text-slate-600">
            These are real outcomes from students who used our study abroad counseling, application support, and visa guidance.
          </p>
          <Link
            to="/success-stories"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#203568] to-[#D32028] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-600/25 transition hover:opacity-95"
          >
            View all stories <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
