import { FiArrowRight, FiFacebook, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { contactConfig, telHref } from '../../config/contact';
import { scrollToSection } from '../../utils/scrollToSection';
import logo from '../../assets/logo.svg';
import { FaTiktok, FaWhatsapp } from 'react-icons/fa';


const Footer = () => {
  const year = new Date().getFullYear();
  const links = ['home', 'services', 'countries', 'reviews', 'contact'];
  const socials = [
    { Icon: FiFacebook, href: 'https://www.facebook.com/rionexeducation', label: 'Facebook' },
    { Icon: FiInstagram, href: 'https://www.instagram.com/rionexedu?igsh=czlvOGlsd2g2MnZk', label: 'Instagram' },
    { Icon: FaTiktok, href: 'https://www.tiktok.com/@rionexeducation?_r=1&_t=ZS-96k5wPIgcJo', label: 'TikTok' },
  ];

  return (
    <footer className="relative overflow-hidden bg-ink text-slate-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary-600/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-secondary-600/5 blur-3xl" />

      <div className="relative border-b border-white/8">
        <div className="page-shell py-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-lg font-extrabold text-white">Get intake and visa updates in your inbox</p>
              <p className="mt-1 text-sm text-slate-400">Join 2,000+ Nepali students who stay informed with Rionex.</p>
            </div>
            <div className="flex w-full max-w-sm items-center gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-primary-500/50 focus:bg-white/12"
              />
              <button
                type="button"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#203568] to-[#D32028]  px-5 py-3 text-sm font-bold text-white transition hover:brightness-110"
              >
                <FiSend size={14} />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="page-shell relative py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_0.7fr_0.9fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-44 items-center rounded-xl bg-white px-3 py-2">
                <img src={logo} alt="Rionex Education" className="h-full w-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">Rionex Education</h3>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] bg-gradient-to-r from-[#203568] to-[#D32028] ">Dream big, achieve bigger</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Trusted study abroad consultancy in Bagbazar, Kathmandu. Guiding Nepali students to universities worldwide since 2014.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-primary-500/50 hover:bg-primary-600 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {['British Council', 'IDP Partner', 'EducationUSA'].map((badge) => (
                <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-slate-400">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Navigation</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {links.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link)}
                    className="group flex items-center gap-2 capitalize text-slate-400 transition hover:text-white"
                  >
                    <FiArrowRight size={11} className="opacity-0 transition group-hover:opacity-100" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Services</h4>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              {['Profile Counseling', 'University Selection', 'Visa Guidance', 'Test Preparation', 'Document Review', 'Pre-Departure Support'].map((service) => (
                <li key={service} className="flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-secondary-500" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm text-slate-400">
              <li className="flex gap-3">
                <FiMapPin className="mt-0.5 shrink-0 text-secondary-500" size={15} />
                {contactConfig.fullAddress}
              </li>
              <li>
                <a href={telHref(contactConfig.landline)} className="flex gap-3 transition hover:text-white">
                  <FiPhone className="mt-0.5 shrink-0 text-secondary-500" size={15} />
                  01-5928888 / {contactConfig.mobile} / {contactConfig.secondaryMobile}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactConfig.email}`} className="flex gap-3 transition hover:text-white">
                  <FiMail className="mt-0.5 shrink-0 text-secondary-500" size={15} />
                  {contactConfig.email}
                </a>
              </li>
              <li className="rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-xs font-semibold text-secondary-400">
                {contactConfig.officeHours}; {contactConfig.closedDay}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-slate-500 sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <p>&copy; {year} Rionex Education Pvt. Ltd. All rights reserved.</p>
            <p>
              Made by{" "}
              <a
                href="https://ashokkumarkarki.com.np"
                className="text-primary-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ashok kumar karki
              </a>
            </p>
          </div>
          <p>{contactConfig.address}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
