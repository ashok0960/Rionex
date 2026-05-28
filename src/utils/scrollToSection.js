const NAV_OFFSET = 112;

const scrollElementIntoView = (el, behavior = 'auto') => {
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior });
};

export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    scrollElementIntoView(el);
    return;
  }

  window.location.href = `/#${id}`;
};

export const scrollAfterNav = (id) => {
  let attempts = 0;
  const tryScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      scrollElementIntoView(el);
      return;
    }

    attempts++;
    if (attempts < 30) requestAnimationFrame(tryScroll);
  };

  requestAnimationFrame(tryScroll);
};
