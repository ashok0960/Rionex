import { FiArrowUpRight, FiClock, FiExternalLink, FiMapPin, FiNavigation, FiPhone } from 'react-icons/fi';
import { contactConfig, telHref } from '../../config/contact';

const GMAPS_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.0!2d85.3148782!3d27.7058375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190026cf7d05%3A0xf8da7bffb3e1f243!2sRionex%20Education%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp';

const GMAPS_PLACE =
  'https://www.google.com/maps/place/Rionex+Education+Pvt.+Ltd./@27.7058375,85.3148782,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb190026cf7d05:0xf8da7bffb3e1f243!8m2!3d27.7058375!4d85.3174531!16s%2Fg%2F11wwz1d9kx';

const GMAPS_DIR =
  'https://www.google.com/maps/dir/?api=1&destination=27.7058375,85.3174531&destination_place_id=0x39eb190026cf7d05:0xf8da7bffb3e1f243';

const ExactLocationMap = () => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wide text-primary-600">Exact location</p>
        <h3 className="mt-1 text-lg font-extrabold text-ink">Rionex Education Pvt. Ltd.</h3>
        <p className="mt-1 flex items-start gap-2 text-sm leading-6 text-slate-600">
          <FiMapPin size={15} className="mt-1 shrink-0 text-secondary-600" />
          <span>{contactConfig.fullAddress}</span>
        </p>
      </div>
      <a
        href={GMAPS_PLACE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Rionex Education location in Google Maps"
        className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition hover:bg-primary-600 hover:text-white"
      >
        <FiArrowUpRight size={18} />
      </a>
    </div>

    <a
      href={GMAPS_PLACE}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Rionex Education location in Google Maps"
      className="group relative block h-[360px] overflow-hidden bg-slate-100"
    >
      <iframe
        title="Rionex Education Pvt. Ltd. - Bag Bazar, Kathmandu"
        src={GMAPS_EMBED}
        width="100%"
        height="360"
        className="pointer-events-none block h-full w-full border-0 grayscale-[12%] transition duration-300 group-hover:scale-[1.015] group-hover:grayscale-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        tabIndex="-1"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
        <div className="rounded-2xl bg-white/95 px-4 py-3 shadow-xl shadow-slate-900/20 backdrop-blur">
          <p className="text-sm font-extrabold text-ink">Tap map to open location</p>
          <p className="mt-0.5 text-xs text-slate-500">Google Maps opens in a new tab</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-primary-900/20">
          <FiExternalLink size={13} /> Open Map
        </span>
      </div>
    </a>

    <div className="grid gap-3 border-t border-slate-100 bg-slate-50/80 p-4 sm:grid-cols-3">
      <a href={telHref(contactConfig.landline)} className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3">
        <FiPhone size={16} className="shrink-0 text-primary-600" />
        <span className="text-xs font-semibold text-slate-600">01-5928888</span>
      </a>
      <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3">
        <FiClock size={16} className="shrink-0 text-secondary-600" />
        <span className="text-xs font-semibold text-slate-600">{contactConfig.officeHours}</span>
      </div>
      <a
        href={GMAPS_DIR}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring flex items-center justify-center gap-2 rounded-2xl bg-ink px-3 py-3 text-xs font-bold text-white transition hover:bg-primary-700"
      >
        <FiNavigation size={15} /> Get directions
      </a>
    </div>
  </div>
);

export default ExactLocationMap;
