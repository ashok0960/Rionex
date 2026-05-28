import { motion } from 'framer-motion';
import { FiAward, FiUsers } from 'react-icons/fi';
import { teamData } from '../../data/teamData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { scrollToSection } from '../../utils/scrollToSection';

const TeamSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary-600/8 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-secondary-600/8 blur-[100px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="page-shell relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-400">
            Our Team
          </span>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Counselors who{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              know your destination
            </span>
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            Every counselor is certified, destination-specialized, and has personally guided hundreds of students through the full process.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {teamData.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 32 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary-500/30 hover:shadow-2xl hover:shadow-primary-600/10"
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${member.color} p-6 text-center`}>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white/25 bg-white/15 text-2xl font-extrabold text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                  {member.avatar}
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-white">{member.name}</h3>
                <p className="mt-1 text-xs font-semibold text-white/70">{member.role}</p>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs leading-5 text-slate-400">{member.bio}</p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/8 bg-white/5 p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <FiUsers size={12} className="text-primary-400" />
                      <span className="text-base font-extrabold text-white">{member.students}+</span>
                    </div>
                    <p className="mt-0.5 text-[10px] font-semibold text-slate-500">Students</p>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-white/5 p-3 text-center">
                    <div className="text-base font-extrabold text-white">{member.experience}</div>
                    <p className="mt-0.5 text-[10px] font-semibold text-slate-500">Experience</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Specializes in</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {member.expertise.map((e) => (
                      <span key={e} className="rounded-full border border-primary-500/30 bg-primary-500/10 px-2.5 py-1 text-[10px] font-bold text-primary-400">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  {member.certifications.map((c) => (
                    <div key={c} className="flex items-center gap-1.5 text-[10px] font-semibold text-secondary-400">
                      <FiAward size={10} />{c}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="focus-ring mt-5 w-full rounded-xl border border-white/15 py-2.5 text-xs font-bold text-slate-300 transition hover:border-primary-500/50 hover:bg-primary-500/10 hover:text-primary-300"
                >
                  Book a session
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
