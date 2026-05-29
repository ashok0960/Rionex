import { motion } from 'framer-motion';
import { FiAward, FiClock, FiFileText, FiMessageCircle, FiShield, FiUsers } from 'react-icons/fi';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const reasons = [
  { icon: FiShield,        n: '01', title: 'Visa-Aware Planning',   desc: 'Every shortlist is reviewed against academic profile, finance, destination rules, and risk factors.' },
  { icon: FiUsers,         n: '02', title: 'Human Counseling',      desc: 'Students get direct counselor support not a generic checklist or automated system.' },
  { icon: FiFileText,      n: '03', title: 'Document Excellence',   desc: 'SOP, LOR, financials, and forms reviewed with practical submission standards and checkpoints.' },
  { icon: FiClock,         n: '04', title: 'Fast Processing',       desc: 'Clear next steps, reminders, and file checks keep your application moving on schedule.' },
  { icon: FiAward,         n: '05', title: 'Decade of Experience',  desc: 'Ten years of student placement across major study destinations worldwide.' },
  { icon: FiMessageCircle, n: '06', title: 'After-Offer Support',   desc: 'Help continues through visa prep, travel planning, and pre-departure orientation.' },
];

const partners = ['British Council', 'EducationUSA', 'EduCanada', 'Australia Awards', 'DAAD Germany', 'JASSO Japan'];

const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary-100/40 blur-[120px]" />

      <div className="page-shell relative">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

          {/* Left sticky header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <span className="eyebrow">Why Rionex ?</span>
            <h2 className="section-title mt-5">
              A process built around{' '}
              <span className="gradient-text bg-gradient-to-r from-[#203568] to-[#D32028]">clarity and outcomes</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Rionex combines counseling, documentation, and visa readiness into one practical workflow so students move forward with confidence, not confusion.
            </p>


            {/* Partner logos strip */}
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Recognized by</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {partners.map((p) => (
                  <span key={p} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — reason cards */}
          <div className="grid gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.n}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.07 }}
                  className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-600/8"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary-600/30">
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold tracking-widest text-slate-300">{r.n}</span>
                      <h3 className="text-lg font-bold text-ink">{r.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{r.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
