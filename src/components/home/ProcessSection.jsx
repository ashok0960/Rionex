import { motion } from 'framer-motion';
import { FiBookOpen, FiClipboard, FiFileText, FiHome, FiSend, FiShield } from 'react-icons/fi';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const steps = [
  { icon: FiBookOpen, title: 'Profile discovery', text: 'We study your academics, budget, goals, and destination preference.' },
  { icon: FiClipboard, title: 'Course strategy', text: 'You receive a destination and university shortlist with intake planning.' },
  { icon: FiFileText, title: 'Application file', text: 'SOP, LOR, finance, and academic documents are prepared and reviewed.' },
  { icon: FiShield, title: 'Visa readiness', text: 'We prepare checklists, interview answers, and risk points before submission.' },
  { icon: FiSend, title: 'Pre-departure', text: 'Accommodation, travel, insurance, and arrival plans are handled early.' },
  { icon: FiHome, title: 'Arrival support', text: 'Students get orientation and practical guidance for their first weeks abroad.' }
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-pad bg-white">
      <div className="page-shell">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">Our assistance</span>
          <h2 className="section-title mt-5">
            Helping students in <span className="gradient-text bg-gradient-to-r from-[#203568] to-[#D32028]">every step</span>
          </h2>
          <p className="section-copy">
            A transparent process makes the whole journey easier to understand, track, and complete.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.06 }}
                className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary-700 shadow-sm">
                    <Icon size={23} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-secondary-600">Step {index + 1}</p>
                    <h3 className="mt-1 text-xl font-extrabold text-ink">{step.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
