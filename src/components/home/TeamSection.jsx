import { motion } from 'framer-motion';
import { FiAward, FiUsers } from 'react-icons/fi';
import { teamData } from '../../data/teamData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { scrollToSection } from '../../utils/scrollToSection';

const TeamSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const member = teamData?.[0];

  if (!member) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 py-28 flex justify-center">

      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute -left-1/4 top-10 h-[80vh] w-[80vh] rounded-full bg-purple-600/20 blur-[180px] animate-pulse" />
      <div className="pointer-events-none absolute -right-1/4 bottom-10 h-[80vh] w-[80vh] rounded-full bg-cyan-500/20 blur-[180px] animate-pulse" />

      {/* GRID OVERLAY */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* CONTAINER */}
      <div className="relative w-full max-w-5xl px-6 sm:px-10 mx-auto flex flex-col items-center">

        {/* HEADER */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-10 py-5 text-2xl sm:text-3xl font-extrabold tracking-widest text-white shadow-lg backdrop-blur-xl">
            Meet Our Expert
          </span>

          <p className="mt-5 text-sm text-slate-300 max-w-xl mx-auto">
            Skilled professional dedicated to guiding your success with expertise and passion.
          </p>
        </motion.div>

        {/* HERO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-20 w-full rounded-[50px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl"
        >

          {/* FIXED IMAGE SECTION */}
          <div className="relative flex justify-center pt-14">

            <div className="relative w-[420px] h-[520px] sm:w-[500px] sm:h-[600px] rounded-[40px] overflow-hidden shadow-2xl border border-white/10">

              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
            </div>

            {/* NAME ON IMAGE */}
            <div className="absolute bottom-16 text-center px-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg">
                {member.name}
              </h2>

              <p className="mt-2 text-base sm:text-lg font-semibold text-white/90">
                {member.role}
              </p>
            </div>
          </div>

          {/* CONTENT BODY */}
          <div className="p-10 sm:p-14">

            {/* BIO */}
            <p className="text-base leading-7 text-slate-200 text-center max-w-2xl mx-auto">
              {member.bio}
            </p>

            {/* STATS */}
            <div className="mt-10 grid grid-cols-2 gap-6 max-w-xl mx-auto">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition">
                <FiUsers className="mx-auto text-cyan-400" size={22} />
                <div className="mt-3 text-2xl font-extrabold text-white">
                  {member.students}+
                </div>
                <p className="text-sm text-slate-300">Students</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition">
                <div className="text-2xl font-extrabold text-white">
                  {member.experience}
                </div>
                <p className="text-sm text-slate-300">Experience</p>
              </div>
            </div>

            {/* EXPERTISE */}
            <div className="mt-10 flex flex-wrap gap-2 justify-center">
              {member.expertise?.map((e) => (
                <span
                  key={e}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  {e}
                </span>
              ))}
            </div>

            {/* CERTIFICATIONS */}
            <div className="mt-8 space-y-2 text-center">
              {member.certifications?.map((c) => (
                <div
                  key={c}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-300"
                >
                  <FiAward size={14} className="text-purple-400" />
                  {c}
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-10 w-full rounded-[36px] bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-pink-500/20 border border-white/20 py-5 text-sm font-bold text-white backdrop-blur-xl transition-all hover:scale-[1.02] hover:border-purple-400/50"
            >
              Book a session
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TeamSection;