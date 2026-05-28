import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { scrollToSection } from '../../utils/scrollToSection';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { contactConfig, telHref } from '../../config/contact';

const CounselingCTA = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600 py-20">
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      {/* Orbs */}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 8, repeat: Infinity }} className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="page-shell relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm">
            Free Consultation
          </span>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Your study abroad journey starts with one conversation
          </h2>
          <p className="mt-5 text-lg text-white/75">
            Share your academic background and destination goal. Our counselors will map out the clearest, fastest route to your dream university.
          </p>

          {/* Trust points */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {['No hidden fees',  'Response within 24 hrs', '10+ years experience'].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 backdrop-blur-sm">
                <FiCheckCircle size={13} className="text-secondary-300" />{t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-extrabold text-primary-700 shadow-2xl shadow-black/20 transition hover:shadow-black/30 hover:brightness-105"
            >
              Book Consultation <FiArrowRight size={16} />
            </button>
            <a
              href={telHref(contactConfig.mobile)}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-8 py-4 font-bold text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              <FiPhone size={16} /> Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CounselingCTA;
