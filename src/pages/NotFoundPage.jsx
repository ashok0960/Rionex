import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGlobe, FiMail, FiPhone } from 'react-icons/fi';
import { contactConfig, telHref } from '../config/contact';

const NotFoundPage = () => (
  <>
    <Helmet><title>Page Not Found — Rionex Education</title></Helmet>
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-4">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary-600/15 blur-[100px]" />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-secondary-600/15 blur-[100px]" />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 max-w-2xl text-center">
        {/* Big 404 */}
        <div className="relative">
          <p className="text-[10rem] font-extrabold leading-none text-white/5 select-none md:text-[14rem]">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-7xl font-extrabold text-white md:text-8xl">404</p>
          </div>
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-white md:text-3xl">Page not found</h1>
        <p className="mt-3 text-base text-slate-400">This page may have moved, but your study abroad journey can still stay on track.</p>

        {/* Quick links */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="focus-ring gradient-bg inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white shadow-lg shadow-primary-600/30 transition hover:opacity-90">
            <FiArrowLeft size={15} /> Back to Home
          </Link>
          <Link to="/countries/australia" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/15">
            <FiGlobe size={15} /> Explore Countries
          </Link>
        </div>

        {/* Contact strip */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
          <a href={telHref(contactConfig.mobile)} className="inline-flex items-center gap-2 transition hover:text-white">
            <FiPhone size={13} /> +977 {contactConfig.mobile}
          </a>
          <a href={`mailto:${contactConfig.email}`} className="inline-flex items-center gap-2 transition hover:text-white">
            <FiMail size={13} /> {contactConfig.email}
          </a>
        </div>
      </motion.div>
    </main>
  </>
);

export default NotFoundPage;
