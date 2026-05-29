import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiMessageCircle } from 'react-icons/fi';
import { faqData } from '../../data/faqData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { contactConfig } from '../../config/contact';
import { scrollToSection } from '../../utils/scrollToSection';

const categories = ['All', ...new Set(faqData.map((f) => f.category))];

const catColor = {
  Visa:          'bg-red-100 text-[#D32028]',
  Documents:     'bg-blue-100 text-[#203568]',
  'Test Prep':   'bg-blue-100 text-[#203568]',
  'After Arrival':'bg-red-100 text-[#D32028]',
  General:       'bg-slate-100 text-slate-600',
};

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState(1);

  const visible = activeCategory === 'All'
    ? faqData
    : faqData.filter((f) => f.category === activeCategory);

  return (
    <section className="section-pad bg-white">
      <div className="page-shell">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow"><FiMessageCircle size={13} /> FAQ</span>
          <h2 className="section-title mt-5">
            Questions students{' '}
            <span className="gradient-text bg-gradient-to-r from-[#203568] to-[#D32028]">ask us every day</span>
          </h2>
          <p className="section-copy">
            Answers to the most common questions about studying abroad, visas, documents, and test preparation from Nepal.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* Sidebar categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => { setActiveCategory(cat); setOpenId(null); }}
                className={`focus-ring rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-slate-50 text-slate-600 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                {cat}
                <span className="ml-2 text-[10px] opacity-60">
                  ({cat === 'All' ? faqData.length : faqData.filter(f => f.category === cat).length})
                </span>
              </button>
            ))}

            {/* CTA block */}
            <div className="mt-4 hidden rounded-2xl border border-primary-100 bg-primary-50 p-5 lg:block">
              <p className="text-sm font-bold text-ink">Still have questions?</p>
              <p className="mt-1 text-xs leading-5 text-slate-600">Our counselors are available {contactConfig.officeHours}. {contactConfig.closedDay}</p>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="focus-ring bg-gradient-to-r from-[#203568] to-[#D32028] mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white shadow-md shadow-primary-600/20"
              >
                <FiMessageCircle size={12} /> Ask a counselor
              </button>
            </div>
          </motion.div>

          {/* Accordion */}
          <div className="space-y-3">
            <AnimatePresence>
              {visible.map((faq, i) => {
                const isOpen = openId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                      isOpen
                        ? 'border-primary-200 bg-white shadow-lg shadow-primary-600/8'
                        : 'border-slate-200 bg-white shadow-sm hover:border-primary-100'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${catColor[faq.category] ?? 'bg-slate-100 text-slate-600'}`}>
                          {faq.category}
                        </span>
                        <span className="font-bold text-ink">{faq.question}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0 text-slate-400"
                      >
                        <FiChevronDown size={18} />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="border-t border-slate-100 px-6 pb-5 pt-4">
                            <p className="text-sm leading-7 text-slate-600">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-10 max-w-xl rounded-2xl border border-primary-100 bg-primary-50 p-6 text-center lg:hidden"
        >
          <p className="font-bold text-ink">Still have questions?</p>
          <p className="mt-1 text-sm text-slate-600">Our counselors are available {contactConfig.officeHours}. {contactConfig.closedDay}.</p>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="focus-ring gradient-bg mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-600/20"
          >
            <FiMessageCircle size={14} /> Ask a counselor
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
