import { motion } from 'framer-motion';
import { FiArrowRight, FiHeadphones, FiMic, FiPenTool, FiTrendingUp } from 'react-icons/fi';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { scrollToSection } from '../../utils/scrollToSection';

const tests = [
  {
    icon: FiMic,
    title: 'IELTS',
    badge: 'Most popular',
    badgeColor: 'bg-[#203568]/20 text-[#203568]',
    score: '+1.5 bands avg',
    desc: 'Speaking, writing, reading & listening with weekly mock tests and individual feedback sessions.',
    features: ['Mock tests every week', 'Speaking lab sessions', 'Writing correction', 'Score prediction'],
    color: 'from-[#203568] to-[#D32028]',
  },
  {
    icon: FiHeadphones,
    title: 'PTE Academic',
    badge: 'Fast results',
    badgeColor: 'bg-[#D32028]/20 text-[#D32028]',
    score: '79+ score avg',
    desc: 'Computer-based practice with AI scoring simulation, exam strategy, and timed mock exams.',
    features: ['AI-scored practice', 'Exam strategy sessions', 'Timed mock exams', 'Score targeting'],
    color: 'from-[#D32028] to-[#203568]',
  },
  {
    icon: FiPenTool,
    title: 'JLPT / NAT-TEST',
    badge: 'Japan pathway',
    badgeColor: 'bg-[#203568]/20 text-[#203568]',
    score: 'N5 to N2 levels',
    desc: 'Japanese language preparation for students targeting Japan universities and student visa pathways.',
    features: ['N5 to N2 levels', 'Kanji & grammar', 'MEXT prep support', 'Conversation practice'],
    color: 'from-[#203568] to-[#D32028]',
  },
];

const TestPrepSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary-600/8 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-secondary-600/8 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="page-shell relative">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -28 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-400">
              Test Preparation
            </span>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Score higher,{' '}
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                get admitted faster
              </span>
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Our test preparation classes are directly linked to your destination plan — so every hour of practice moves you closer to your admission goal.
            </p>

            {/* Score stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: FiTrendingUp, v: '+1.5', l: 'IELTS band avg improvement' },
                { icon: FiTrendingUp, v: '79+', l: 'PTE average score' },
                { icon: FiTrendingUp, v: '94%', l: 'Students hit target score' },
              ].map(({ v, l }) => (
                <div key={l} className="rounded-2xl border border-white/8 bg-white/5 p-4 text-center">
                  <div className="text-2xl font-extrabold text-white">{v}</div>
                  <div className="mt-1 text-[10px] font-semibold leading-4 text-slate-400">{l}</div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#203568] to-[#D32028] px-7 py-3.5 font-bold text-white shadow-lg shadow-primary-600/30 transition hover:brightness-110"
            >
              Enroll in a Class <FiArrowRight size={15} />
            </button>
          </motion.div>

          {/* Right — test cards */}
          <div className="grid gap-4">
            {tests.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, x: 28 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="group overflow-hidden rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:bg-white/8 hover:shadow-xl hover:shadow-primary-600/10"
                >
                  <div className="flex items-start gap-4 p-5">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${t.color} text-white shadow-lg`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-extrabold text-white">{t.title}</h3>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${t.badgeColor}`}>{t.badge}</span>
                        <span className="ml-auto text-xs font-bold text-secondary-400">{t.score}</span>
                      </div>
                      <p className="mt-1.5 text-sm leading-6 text-slate-400">{t.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {t.features.map((f) => (
                          <span key={f} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
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

export default TestPrepSection;
