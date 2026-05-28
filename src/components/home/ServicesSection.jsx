import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBookOpen, FiCheck, FiClipboard, FiCompass, FiFileText, FiMic, FiSend } from 'react-icons/fi';
import { servicesData } from '../../data/servicesData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { scrollToSection } from '../../utils/scrollToSection';

const icons = {
  counseling: FiCompass,
  university: FiBookOpen,
  documents: FiFileText,
  test: FiClipboard,
  visa: FiCheck,
  departure: FiSend,
  ielts: FiMic,
  language: FiMic,
};

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="relative overflow-hidden bg-slate-950 py-24">
      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-primary-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-secondary-600/10 blur-[100px]" />

      <div className="page-shell relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-400">
            Our Services
          </span>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Everything you need for{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              your study abroad journey
            </span>
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            From first counseling to landing abroad — every step covered by one expert team.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => {
            const Icon = icons[service.icon] || FiCheck;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.07 }}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-500/40 hover:bg-white/8 hover:shadow-2xl hover:shadow-primary-600/10"
              >
                <Link to={`/services/${service.icon}`} className="absolute inset-0 z-10" aria-label={`View ${service.title} details`} />
                <span className="absolute right-5 top-4 text-6xl font-extrabold text-white/[0.04] select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{service.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.features.map((f) => (
                    <span key={f} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 transition group-hover:border-primary-500/30 group-hover:text-primary-300">
                      {f}
                    </span>
                  ))}
                </div>

                {/* Bottom arrow */}
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-primary-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Learn more <FiArrowRight size={13} />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-14 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 p-7 backdrop-blur-sm sm:flex-row"
        >
          <div>
            <p className="text-lg font-bold text-white">Not sure which service you need?</p>
            <p className="mt-1 text-sm text-slate-400">Book a free 30-minute counseling session and we'll map out your path.</p>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="focus-ring shrink-0 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#203568] to-[#D32028] px-7 py-3.5 font-bold text-white shadow-lg shadow-primary-600/30 transition hover:brightness-110"
          >
            Get Free Guidance <FiArrowRight size={15} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
