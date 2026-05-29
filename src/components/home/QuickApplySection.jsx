import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiArrowRight, FiCheckCircle, FiZap } from 'react-icons/fi';

const levels = [
  { value: '+2', label: '+2 / 12th' },
  { value: 'bachelors', label: "Bachelor's" },
  { value: 'masters', label: "Master's" },
];

const QuickApplySection = () => {
  // First option selected by default
  const [selected, setSelected] = useState(levels[0].value);

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success(
      'Great! Fill in your details below and our counselor will reach out within 24 hours.'
    );

    setTimeout(() => {
      document
        .getElementById('contact')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    }, 400);
  };

  return (
    <section className="relative z-10 -mt-8 bg-transparent pb-0 md:-mt-12">
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10"
        >
          <div className="grid lg:grid-cols-[1fr_auto]">
            {/* Left Side */}
            <div className="p-6 md:p-8">
              {/* Top Badge */}
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <FiZap size={15} />
                </span>

                <span className="text-sm font-bold text-red-600">
                  Quick eligibility check — free
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-4 text-2xl font-extrabold leading-tight text-slate-900 md:text-3xl">
                What is your current qualification?
              </h2>

              <p className="mt-2 text-sm text-slate-500 md:text-base">
                Select your level and we will match you with the right
                counselor and destinations.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6">
                {/* Level Buttons */}
                <div className="flex flex-wrap gap-3">
                  {levels.map((l) => (
                    <button
                      key={l.value}
                      type="button"
                      onClick={() => setSelected(l.value)}
                      className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                        selected === l.value
                          ? 'bg-gradient-to-r from-[#203568] to-[#D32028] text-white shadow-lg scale-105'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-[#203568] hover:bg-slate-100 hover:scale-105'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#203568] to-[#D32028] px-7 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:opacity-90"
                >
                  Check My Eligibility
                  <FiArrowRight size={16} />
                </button>
              </form>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickApplySection;