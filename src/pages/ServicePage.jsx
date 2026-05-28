import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiCheck,
  FiCheckCircle,
  FiClipboard,
  FiCompass,
  FiFileText,
  FiMic,
  FiSend,
  FiZap,
} from 'react-icons/fi';

import { servicesData } from '../data/servicesData';
import { scrollToSection } from '../utils/scrollToSection';

const WA_NUMBER = '9779768908937';

const getWALink = (serviceName) => {
  const msg = encodeURIComponent(
    `Hello Rionex Education! I am interested in ${serviceName}. Could you please guide me about the process? Thank you.`
  );

  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
};

const levels = [
  { value: '+2', label: '+2 / 12th' },
  { value: 'bachelors', label: "Bachelor's" },
  { value: 'masters', label: "Master's" },
];

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

const extraDetails = {
  counseling: {
    steps: [
      'Initial assessment call',
      'Academic profile review',
      'Destination shortlisting',
      'Budget and timeline planning',
      'Personalized roadmap delivery',
    ],
    duration: '1-2 sessions',
    outcome: 'A clear, personalized study abroad roadmap',
  },

  university: {
    steps: [
      'Profile matching against universities',
      'Ranking and visa compatibility check',
      'Budget and intake alignment',
      'Application strategy planning',
      'Offer letter follow-up',
    ],
    duration: '1-2 weeks',
    outcome: 'Shortlist of best-fit universities',
  },

  test: {
    steps: [
      'Diagnostic mock test',
      'Section-specific strategy planning',
      'Targeted practice for reading, writing, listening, and speaking',
      'Score improvement milestones',
      'Final exam readiness review',
    ],
    duration: '4-8 weeks',
    outcome: 'PTE score-ready performance for university applications',
  },

  visa: {
    steps: [
      'Visa checklist preparation',
      'Financial document review',
      'Mock visa interview',
      'Submission and tracking',
    ],
    duration: '2-4 weeks',
    outcome: 'High visa approval success',
  },

  language: {
    steps: [
      'Placement test and level assessment',
      'A1-A2 foundation modules',
      'B1 conversation and reading practice',
      'B2 academic German and university language prep',
      'Mock visa/university language interview',
    ],
    duration: '3-5 months',
    outcome: 'German proficiency ready for study, visa, and daily life',
  },
};

const ServicePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(levels[0].value);

  const service = servicesData.find((item) => item.icon === slug);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900">
            Service not found
          </p>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-4 text-blue-600 underline"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const Icon = icons[service.icon] || FiCheck;
  const details = extraDetails[service.icon];

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success(
      'Great! Fill in your details below and our counselor will reach out within 24 hours.'
    );

    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 400);
  };

  return (
    <>
      <Helmet>
        <title>{service.title} - Rionex Education</title>
      </Helmet>

      {/* HERO */}
      <div className={`bg-gradient-to-br ${service.color} py-20`}>
        <div className="page-shell">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25"
            >
              <FiArrowLeft size={14} />
              Back to Home
            </button>

            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white/30 bg-white/20 text-white backdrop-blur-sm">
                <Icon size={36} />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-white/60">
                  Our Services
                </p>

                <h1 className="text-4xl font-extrabold text-white md:text-5xl">
                  {service.title}
                </h1>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-lg text-white/85">
              {service.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="section-pad bg-white">
        <div className="page-shell grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div>
            {/* QUICK APPLY */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <FiZap size={15} />
                </span>

                <span className="text-sm font-bold text-red-600">
                  Quick eligibility check — free
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
                What is your current qualification?
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Select your level and we will match you with the right counselor.
              </p>

              <form onSubmit={handleSubmit} className="mt-6">
                <div className="flex flex-wrap gap-3">
                  {levels.map((l) => (
                    <button
                      key={l.value}
                      type="button"
                      onClick={() => setSelected(l.value)}
                      className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                        selected === l.value
                          ? 'bg-gradient-to-r from-[#203568] to-[#D32028] text-white shadow-lg scale-105'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-[#203568]'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#203568] to-[#D32028] px-7 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Check My Eligibility
                  <FiArrowRight size={16} />
                </button>
              </form>
            </div>

            {/* INCLUDED */}
            <h2 className="mt-12 text-2xl font-extrabold text-slate-900">
              What's included
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <FiCheckCircle
                    size={18}
                    className="shrink-0 text-green-600"
                  />

                  <span className="font-semibold text-slate-800">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* HOW IT WORKS */}
            {details && (
              <>
                <h2 className="mt-12 text-2xl font-extrabold text-slate-900">
                  How it works
                </h2>

                <div className="mt-6 space-y-4">
                  {details.steps.map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.07 }}
                      className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-sm font-extrabold text-white`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <p className="pt-1 font-semibold text-slate-800">
                        {step}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl">
              <h3 className="text-xl font-extrabold text-slate-900">
                Ready to get started?
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Book a free consultation with our expert team.
              </p>

              <button
                type="button"
                onClick={() => {
                  navigate('/');
                  setTimeout(() => scrollToSection('contact'), 80);
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#203568] to-[#D32028] py-4 font-bold text-white shadow-lg transition hover:opacity-90"
              >
                Book Consultation
                <FiArrowRight size={15} />
              </button>

              <a
                href="tel:+9779768908937"
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-200 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300"
              >
                Call +977 9768908937
              </a>

              <a
                href={getWALink(service.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1ebe5d]"
              >
                WhatsApp Us About {service.title}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicePage;