const normalizeOfficeHours = (text) => {
  if (!text) return text;
  return text
    .replace(/\b(am|AM)\b/g, 'Am')
    .replace(/\b(pm|PM)\b/g, 'Pm');
};

export const contactConfig = {
  email: import.meta.env.VITE_CONTACT_EMAIL || 'rionexedu@gmail.com',
  landline: import.meta.env.VITE_PRIMARY_PHONE || '015928888',
  mobile: import.meta.env.VITE_MOBILE_PHONE || '9768908937',
  secondaryMobile: import.meta.env.VITE_SECONDARY_PHONE || '9768908956',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '9779768908937',
  address: import.meta.env.VITE_OFFICE_ADDRESS || '31 Bag Bazar Sadak, Kathmandu 44600',
  fullAddress: import.meta.env.VITE_OFFICE_FULL_ADDRESS || 'Near Bhaktapur Bus Stop, 31 Bag Bazar Sadak, Kathmandu 44600',
  officeHours: normalizeOfficeHours(import.meta.env.VITE_OFFICE_HOURS || 'Sun-Fri / 10 Am - 5 Pm'),
  closedDay: import.meta.env.VITE_OFFICE_CLOSED || 'Saturday closed',
  officeHoursLabel: `${normalizeOfficeHours(import.meta.env.VITE_OFFICE_HOURS || 'Sun-Fri / 10 Am - 5 Pm')}; ${import.meta.env.VITE_OFFICE_CLOSED || 'Saturday closed'}`,
  emailJsServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_qzqfq2p',
  emailJsTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_0n5x92l',
  emailJsPublicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'xy0Uzusbdi0TlSda7',
  emailJsConfigured:
    Boolean(
      (import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_qzqfq2p') &&
      (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_0n5x92l') &&
      (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'xy0Uzusbdi0TlSda7')
    ),
};

export const telHref = (phone) => `tel:+977${phone.replace(/^0/, '')}`;

export const whatsappUrl = (message = 'Hello Rionex Education, I would like to book a consultation.') =>
  `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(message)}`;
