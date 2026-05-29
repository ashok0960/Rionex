import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import { FiArrowRight, FiClock, FiMail, FiMapPin, FiPhone, FiSend, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { contactConfig, telHref, whatsappUrl } from '../../config/contact';
import { countriesData } from '../../data/countriesData';
import ExactLocationMap from '../map/ExactLocationMap';

const emptyForm = { name: '', email: '', phone: '', country: '', education: '', message: '' };

const contactCards = [
  { icon: FiPhone, title: 'Call Us', detail: `01-5928888 / ${contactConfig.mobile} / ${contactConfig.secondaryMobile}`, href: telHref(contactConfig.landline), action: 'Tap to call', color: 'bg-blue-100 text-[#203568]' },
  { icon: FaWhatsapp, title: 'WhatsApp Us', detail: `+977 ${contactConfig.mobile}`, href: whatsappUrl(), action: 'Chat now', color: 'bg-green-50 text-green-700' },
  { icon: FiMail, title: 'Email Us', detail: contactConfig.email, href: `mailto:${contactConfig.email}`, action: 'Send email', color: 'bg-red-100 text-[#D32028]' },
  { icon: FiMapPin, title: 'Visit Us', detail: contactConfig.address, href: null, action: 'Bagbazar office', color: 'bg-blue-100 text-[#203568]' },
  { icon: FiClock, title: 'Office Hours', detail: `${contactConfig.officeHours} / ${contactConfig.closedDay}`, href: null, action: 'Walk-ins welcome', color: 'bg-red-100 text-[#D32028]' },
];

const inputCls = 'focus-ring w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition focus:border-primary-400 focus:bg-white';

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</label>
    {children}
  </div>
);

const buildRequestText = (form) => [
  'New consultation request for Rionex Education',
  '',
  'Office: Bagbazar',
  `Office address: ${contactConfig.address}`,
  '',
  `Full name: ${form.name}`,
  `Email: ${form.email}`,
  `Phone: ${form.phone}`,
  `Preferred country: ${form.country || 'Not selected'}`,
  `Education level: ${form.education || 'Not selected'}`,
  '',
  'Message:',
  form.message || 'No additional message provided.',
].join('\n');

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (contactConfig.emailJsPublicKey) {
      emailjs.init(contactConfig.emailJsPublicKey);
    }
  }, []);

  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    window.addEventListener('rionex-contact-open', openHandler);
    return () => window.removeEventListener('rionex-contact-open', openHandler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setForm({ ...form, [name]: nextValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requestText = buildRequestText(form);
    const subject = `Consultation request from ${form.name}`;
    const templateParams = {
      to_email: contactConfig.email,
      from_name: form.name,
      from_email: form.email,
      reply_to: form.email,
      subject,
      phone: form.phone,
      preferred_country: form.country || 'Not selected',
      education_level: form.education || 'Not selected',
      office: 'Bagbazar',
      office_address: contactConfig.address,
      message: form.message || 'No additional message provided.',
      request_text: requestText,
    };
    const mailtoLink = `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(requestText)}`;

    if (contactConfig.emailJsConfigured) {
      try {
        await emailjs.send(
          contactConfig.emailJsServiceId,
          contactConfig.emailJsTemplateId,
          templateParams,
          contactConfig.emailJsPublicKey
        );
        toast.success('Your message was sent to the office email successfully.', { duration: 2000 });
      } catch (error) {
        console.error('EmailJS send error:', error);
        toast.error('EmailJS failed. Opening in email app instead.', { duration: 2000 });
        window.location.href = mailtoLink;
      }
    } else {
      toast.error('EmailJS is not configured. Opening in email app instead.', { duration: 2000 });
      window.location.href = mailtoLink;
    }

    setForm(emptyForm);
    setStep(1);
    setLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm md:items-center"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl rounded-[32px] bg-white p-6 shadow-2xl shadow-slate-900/10 md:p-8"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                aria-label="Close contact form"
              >
                <FiX size={18} />
              </button>
              <div className="overflow-y-auto pr-1" style={{ maxHeight: '85vh' }}>
                <div className="mx-auto max-w-3xl text-center">
                  <span className="eyebrow">Contact Us</span>
                  <h2 className="section-title mt-5">
                    Start with a <span className="gradient-text bg-gradient-to-r from-[#203568] to-[#D32028] ">free consultation</span>
                  </h2>
                  <p className="section-copy">
                    Tell us your destination, academic background, and timeline. We will map out your next step.
                  </p>
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  {contactCards.map(({ icon: Icon, title, detail, href, action, color }) => {
                    const Wrap = href ? 'a' : 'div';
                    const props = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {};
                    return (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <Wrap {...props} className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg transition duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                        >
                          <div className="flex flex-col gap-4">
                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color} shadow-lg transition group-hover:scale-110`}>
                              <Icon size={24} />
                            </div>
                            <div>
                              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">{action}</p>
                              <h3 className="mt-2 text-lg font-extrabold text-slate-900">{title}</h3>
                            </div>
                          </div>
                          <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">{detail}</p>
                        </Wrap>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-900/8 md:p-10">
                    <div className="mb-7 flex items-center gap-3">
                      {[1, 2].map((s) => (
                        <button key={s} type="button" onClick={() => setStep(s)} className="flex items-center gap-2">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold transition ${step >= s ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {s}
                          </div>
                          <span className={`text-xs font-semibold ${step >= s ? 'text-ink' : 'text-slate-400'}`}>
                            {s === 1 ? 'Your Info' : 'Study Goals'}
                          </span>
                          {s < 2 && <div className={`h-px w-8 ${step > s ? 'bg-primary-600' : 'bg-slate-200'}`} />}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                          <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Full Name">
                              <input type="text" name="name"  value={form.name} onChange={onChange} required className={inputCls} />
                            </Field>
                            <Field label="Email Address">
                              <input type="email" name="email" value={form.email} onChange={onChange} required className={inputCls} />
                            </Field>
                          </div>
                          <Field label="Phone Number">
                            <input
                              type="tel"
                              name="phone"
                              value={form.phone}
                              onChange={onChange}
                              inputMode="numeric"
                              maxLength={10}
                              pattern="[0-9]{10}"
                              title="Enter a 10 digit phone number"
                              required
                              className={inputCls}
                            />
                            <span className="text-[11px] font-semibold text-slate-400">Use a 10 digit mobile number.</span>
                          </Field>
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            disabled={!form.name || !form.email || form.phone.length !== 10}
                            className="focus-ring bg-gradient-to-r from-[#203568] to-[#D32028] flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-lg shadow-primary-600/20 disabled:opacity-50"
                          >
                            Continue <FiArrowRight size={15} />
                          </button>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                          <div className="grid gap-5 sm:grid-cols-2">
                            <Field label="Preferred Country">
                              <select name="country" value={form.country} onChange={onChange} className={inputCls}>
                                <option value="">Select country</option>
                                {countriesData.map((country) => <option key={country.name}>{country.name}</option>)}
                                <option value="Other">Other</option>
                              </select>
                            </Field>
                            <Field label="Education Level">
                              <select name="education" value={form.education} onChange={onChange} className={inputCls}>
                                <option value="">Select level</option>
                                {['SEE / 10th passed', '+2 / 12th passed', "Bachelor's degree", "Master's degree"].map((education) => <option key={education}>{education}</option>)}
                              </select>
                            </Field>
                          </div>
                          <Field label="Your Message">
                            <textarea name="message" placeholder="Tell us about your study abroad goals..." value={form.message} onChange={onChange} rows={4} className={`${inputCls} resize-none`} />
                          </Field>
                          <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(1)} className="focus-ring rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                              Back
                            </button>
                            <button type="submit" disabled={loading} className="focus-ring bg-gradient-to-r from-[#203568] to-[#D32028]  flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-lg shadow-primary-600/20 disabled:opacity-60">
                              {loading ? 'Preparing...' : 'Send Email + WhatsApp'}
                              <FiSend size={15} />
                            </button>
                          </div>
                          <p className="text-xs leading-5 text-slate-500">
                            Your selected country, education level, phone, email, and message will be added to both Email and WhatsApp.
                          </p>
                        </motion.div>
                      )}
                    </form>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary-700">Office details</p>
                      <h3 className="mt-2 text-2xl font-extrabold text-ink">Visit Rionex in Bagbazar</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        Bring your academic documents, passport details, English test score if available, and preferred destination list. Our team will review your profile and explain the best next step.
                      </p>
                      <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-700">
                        <span className="inline-flex items-center gap-2"><FiMapPin className="text-secondary-600" />{contactConfig.address}</span>
                        <span className="inline-flex items-center gap-2"><FiClock className="text-secondary-600" />{contactConfig.officeHours}; {contactConfig.closedDay}</span>
                      </div>
                    </div>
                    <ExactLocationMap />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="contact" className="section-pad bg-white">
        <div className="page-shell">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">Contact Us</span>
          <h2 className="section-title mt-5">
            Start with a <span className="gradient-text bg-gradient-to-r from-[#203568] to-[#D32028]">free consultation</span>
          </h2>
          <p className="section-copy">
            Tell us your destination, academic background, and timeline. We will map out your next step.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-5"
        >
          {contactCards.map(({ icon: Icon, title, detail, href, action, color }) => {
            const Wrap = href ? 'a' : 'div';
            const props = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {};
            return (
              <Wrap key={title} {...props} className="group flex min-h-[132px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-600/8">
                <div className="flex items-center justify-between gap-3">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{action}</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-extrabold text-ink">{title}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{detail}</p>
                </div>
              </Wrap>
            );
          })}
        </motion.div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-900/8 md:p-10"
          >
            <div className="mb-7 flex items-center gap-3">
              {[1, 2].map((s) => (
                <button key={s} type="button" onClick={() => setStep(s)} className="flex items-center gap-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold transition ${step >= s ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {s}
                  </div>
                  <span className={`text-xs font-semibold ${step >= s ? 'text-ink' : 'text-slate-400'}`}>
                    {s === 1 ? 'Your Info' : 'Study Goals'}
                  </span>
                  {s < 2 && <div className={`h-px w-8 ${step > s ? 'bg-primary-600' : 'bg-slate-200'}`} />}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name">
                      <input type="text" name="name"  value={form.name} onChange={onChange} required className={inputCls} />
                    </Field>
                    <Field label="Email Address">
                      <input type="email" name="email" value={form.email} onChange={onChange} required className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Phone Number">
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      inputMode="numeric"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      title="Enter a 10 digit phone number"
                      required
                      className={inputCls}
                    />
                    <span className="text-[11px] font-semibold text-slate-400">Use a 10 digit mobile number.</span>
                  </Field>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!form.name || !form.email || form.phone.length !== 10}
                    className="focus-ring bg-gradient-to-r from-[#203568] to-[#D32028] flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-lg shadow-primary-600/20 disabled:opacity-50"
                  >
                    Continue <FiArrowRight size={15} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Preferred Country">
                      <select name="country" value={form.country} onChange={onChange} className={inputCls}>
                        <option value="">Select country</option>
                        {countriesData.map((country) => <option key={country.name}>{country.name}</option>)}
                        <option value="Other">Other</option>
                      </select>
                    </Field>
                    <Field label="Education Level">
                      <select name="education" value={form.education} onChange={onChange} className={inputCls}>
                        <option value="">Select level</option>
                        {['SEE / 10th passed', '+2 / 12th passed', "Bachelor's degree", "Master's degree"].map((education) => <option key={education}>{education}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Your Message">
                    <textarea name="message" placeholder="Tell us about your study abroad goals..." value={form.message} onChange={onChange} rows={4} className={`${inputCls} resize-none`} />
                  </Field>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="focus-ring rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                      Back
                    </button>
                    <button type="submit" disabled={loading} className="focus-ring bg-gradient-to-r from-[#203568] to-[#D32028]  flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-lg shadow-primary-600/20 disabled:opacity-60">
                        {loading ? 'Preparing...' : 'Send Request'}
                        <FiSend size={15} />
                      </button>
                    </div>
                    <p className="text-xs leading-5 text-slate-500">
                      Your request will be sent directly to our office email. WhatsApp is available separately if needed.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-700">Office details</p>
              <h3 className="mt-2 text-2xl font-extrabold text-ink">Visit Rionex in Bagbazar</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Bring your academic documents, passport details, English test score if available, and preferred destination list. Our team will review your profile and explain the best next step.
              </p>
              <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-700">
                <span className="inline-flex items-center gap-2"><FiMapPin className="text-secondary-600" />{contactConfig.address}</span>
                <span className="inline-flex items-center gap-2"><FiClock className="text-secondary-600" />{contactConfig.officeHours}; {contactConfig.closedDay}</span>
              </div>
            </div>
            <ExactLocationMap />
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactSection;
