import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const categories = ['All', 'Office', 'Events', 'Students', 'Visa Success'];

const photos = [
  { id: 1, category: 'Students', caption: 'Students celebrating visa approval', color: 'from-blue-400 to-cyan-400', aspect: 'aspect-[4/3]' },
  { id: 2, category: 'Office', caption: 'Counseling session at Bagbazar office', color: 'from-primary-500 to-blue-500', aspect: 'aspect-square' },
  { id: 3, category: 'Events', caption: 'Study abroad seminar 2024', color: 'from-secondary-500 to-teal-400', aspect: 'aspect-[4/3]' },
  { id: 4, category: 'Visa Success', caption: 'Australia visa approval ', color: 'from-blue-600 to-cyan-500', aspect: 'aspect-[3/4]' },
  { id: 5, category: 'Students', caption: 'Pre-departure orientation batch', color: 'from-amber-400 to-orange-400', aspect: 'aspect-[4/3]' },
  { id: 6, category: 'Office', caption: 'Document review session', color: 'from-slate-600 to-primary-600', aspect: 'aspect-square' },
  { id: 7, category: 'Visa Success', caption: 'Canada visa — Sita Gurung', color: 'from-red-500 to-rose-400', aspect: 'aspect-[4/3]' },
  { id: 8, category: 'Events', caption: 'University fair Kathmandu 2024', color: 'from-violet-500 to-purple-400', aspect: 'aspect-[3/4]' },
  { id: 9, category: 'Students', caption: 'IELTS preparation class', color: 'from-emerald-500 to-secondary-400', aspect: 'aspect-[4/3]' },
  { id: 10, category: 'Visa Success', caption: 'UK visa — Hari Pandey', color: 'from-indigo-600 to-red-400', aspect: 'aspect-square' },
  { id: 11, category: 'Office', caption: 'Team meeting — Rionex counselors', color: 'from-primary-600 to-secondary-500', aspect: 'aspect-[4/3]' },
  { id: 12, category: 'Events', caption: 'Japan education expo 2024', color: 'from-rose-500 to-slate-600', aspect: 'aspect-[3/4]' },
];

const GalleryPage = () => {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const visible = active === 'All' ? photos : photos.filter(p => p.category === active);

  const prev = () => {
    const idx = visible.findIndex(p => p.id === lightbox.id);
    setLightbox(visible[(idx - 1 + visible.length) % visible.length]);
  };
  const next = () => {
    const idx = visible.findIndex(p => p.id === lightbox.id);
    setLightbox(visible[(idx + 1) % visible.length]);
  };

  return (
    <>
      <Helmet><title>Gallery — Rionex Education</title></Helmet>

      {/* Hero */}
      <div className="relative bg-ink py-16 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="page-shell relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70">Gallery</span>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">Our moments &amp; milestones</h1>
          <p className="mt-3 text-base text-slate-400">Office life, student events, visa celebrations, and more.</p>
        </motion.div>
      </div>

      <div className="section-pad bg-slate-50">
        <div className="page-shell">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(c => (
              <button key={c} type="button" onClick={() => setActive(c)}
                className={`focus-ring rounded-full border px-4 py-2 text-sm font-semibold transition-all ${active === c ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-600/25' : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700'}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            <AnimatePresence>
              {visible.map((photo, i) => (
                <motion.div key={photo.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}
                  className="mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => setLightbox(photo)}>
                  <div className={`${photo.aspect} bg-gradient-to-br ${photo.color} relative`}>
                    <div className="absolute inset-0 flex items-end p-4">
                      <p className="text-xs font-semibold text-white/90 drop-shadow">{photo.caption}</p>
                    </div>
                    <div className="absolute inset-0 bg-black/0 transition hover:bg-black/20" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}>
            <button type="button" onClick={() => setLightbox(null)} className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><FiX size={20} /></button>
            <button type="button" onClick={e => { e.stopPropagation(); prev(); }} className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><FiChevronLeft size={22} /></button>
            <motion.div key={lightbox.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`${lightbox.aspect} w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-br ${lightbox.color}`} onClick={e => e.stopPropagation()}>
              <div className="flex h-full items-end p-6">
                <p className="text-sm font-semibold text-white">{lightbox.caption}</p>
              </div>
            </motion.div>
            <button type="button" onClick={e => { e.stopPropagation(); next(); }} className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><FiChevronRight size={22} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;
