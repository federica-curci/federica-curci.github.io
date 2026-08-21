const contactState = { email: 'federicacurci9@gmail.com' };

const assetPath = (src) => {
  if (!src) return '';
  return src.startsWith('/') ? src.slice(1) : src;
};

const setImage = (selector, image) => {
  const element = document.querySelector(selector);
  if (!element || !image) return;
  if (image.src) element.src = assetPath(image.src);
  if (image.alt) element.alt = image.alt;
};

const setHtml = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value !== undefined && value !== null) element.innerHTML = value;
};

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value !== undefined && value !== null) element.textContent = value;
};

const renderParagraphs = (selector, paragraphs) => {
  const element = document.querySelector(selector);
  if (!element || !Array.isArray(paragraphs)) return;
  element.innerHTML = paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('');
};

const renderGallery = (rail, items) => {
  const track = rail?.querySelector('.gallery-track');
  if (!track || !Array.isArray(items)) return;
  track.innerHTML = items.map((item) => {
    const src = assetPath(item.src);
    const alt = item.alt || item.caption || '';
    const caption = item.caption ? `<figcaption>${item.caption}</figcaption>` : '';
    return `<figure><img src="${src}" alt="${alt}" />${caption}</figure>`;
  }).join('');
};

const renderContactChannels = (content) => {
  const profile = content.profile || {};
  const section = content.sections?.contact || {};
  const email = section.email || profile.email || contactState.email;
  const phone = section.phone || profile.phone || '';
  const phoneHref = section.phoneHref || profile.phoneHref || '';
  const whatsapp = section.whatsapp || profile.whatsapp || '';
  contactState.email = email;
  const wrapper = document.querySelector('.contact-channels');
  if (!wrapper) return;
  wrapper.innerHTML = `
    <a class="contact-email" href="mailto:${email}"><span class="contact-icon">✉</span><span>${email}</span><span class="contact-arrow">↗</span></a>
    ${phone && phoneHref ? `<a href="${phoneHref}"><span class="contact-icon">☎</span><span>${phone}</span></a>` : ''}
    ${whatsapp ? `<a href="${whatsapp}" target="_blank" rel="noreferrer"><span class="contact-icon">💬</span><span>WhatsApp</span><span class="contact-arrow">↗</span></a>` : ''}
  `;
};

const applyCmsContent = (content) => {
  if (!content || typeof content !== 'object') return;
  const it = content.languages?.it || {};
  if (content.profile?.linkedin) {
    document.querySelectorAll('a[href*="linkedin.com/in/federica-curci"]').forEach((link) => {
      link.href = content.profile.linkedin;
    });
  }
  if (content.images) {
    setImage('.hero-photo', content.images.hero);
    setImage('.work-heading-photo img', content.images.workHeading);
  }
  setHtml('[data-i18n-html="hero_title"]', it.hero_title);
  setHtml('[data-i18n-html="hero_intro"]', it.hero_intro);
  setHtml('[data-i18n-html="hero_cta"]', it.hero_cta);
  setHtml('[data-i18n-html="hero_link"]', it.hero_link);
  setText('[data-i18n="work_eyebrow"]', it.work_eyebrow);
  setHtml('[data-i18n-html="work_title"]', it.work_title);
  if (it.work_intro) {
    if (it.work_intro.includes('<p>')) {
      setHtml('.about-copy', it.work_intro);
    } else {
      const paragraphs = it.work_intro.split('\n').filter(Boolean);
      renderParagraphs('.about-copy', paragraphs);
    }
  }

  const galleries = document.querySelectorAll('.interpretation .gallery-rail');
  renderGallery(galleries[0], content.galleries?.interpretazione_b2b);
  renderGallery(galleries[1], content.galleries?.interpretazione_consecutiva);
  renderGallery(galleries[2], content.galleries?.interpretazione_simultanea);

  setHtml('#interpretazione .interpretation-block:nth-of-type(1) .mode-line', it.case_one_type?.replace(/^TRATTATIVA B2B:\s*/i, '') || 'Fiere, incontri commerciali');
  setHtml('#interpretazione .interpretation-block:nth-of-type(1) .interpretation-copy p:nth-of-type(3)', it.case_one_title);
  setHtml('#interpretazione .interpretation-block:nth-of-type(1) .interpretation-copy p:nth-of-type(4)', it.case_one_text);
  setHtml('#interpretazione .interpretation-block:nth-of-type(2) .mode-line', it.case_two_type);
  setHtml('#interpretazione .interpretation-block:nth-of-type(2) .interpretation-copy p:nth-of-type(2)', it.case_two_title);
  if (it.case_two_text) {
    const parts = it.case_two_text.split('\n').filter(Boolean);
    const block = document.querySelector('#interpretazione .interpretation-block:nth-of-type(2) .interpretation-copy');
    if (block) {
      block.querySelectorAll('p:nth-of-type(n+3)').forEach((p) => p.remove());
      parts.forEach((part) => block.insertAdjacentHTML('beforeend', `<p>${part}</p>`));
    }
  }
  setHtml('#interpretazione .interpretation-block:nth-of-type(3) .mode-line', it.case_three_type);
  setHtml('#interpretazione .interpretation-block:nth-of-type(3) .interpretation-copy p:nth-of-type(2)', it.case_three_title);
  if (it.case_three_text) {
    const parts = it.case_three_text.split('\n').filter(Boolean);
    const block = document.querySelector('#interpretazione .interpretation-block:nth-of-type(3) .interpretation-copy');
    if (block) {
      block.querySelectorAll('p:nth-of-type(n+3)').forEach((p) => p.remove());
      parts.forEach((part) => block.insertAdjacentHTML('beforeend', `<p>${part}</p>`));
    }
  }

  const translation = content.sections?.translation;
  if (translation) {
    setHtml('#traduzione h2', translation.title);
    renderParagraphs('#traduzione .service-text', translation.paragraphs);
    setImage('#traduzione .service-single-image img', translation.image);
  }

  const consulting = content.sections?.consulting;
  if (consulting) {
    setHtml('#consulenza h2', consulting.title);
    renderParagraphs('#consulenza .service-text', consulting.paragraphs);
    setImage('#consulenza .service-single-image img', consulting.image);
  }

  const formation = content.sections?.formation;
  if (formation) {
    setHtml('.formation h2', formation.title);
    setHtml('.formation-lead', formation.lead);
    const flow = document.querySelector('.formation-flow');
    if (flow && Array.isArray(formation.items)) {
      flow.innerHTML = formation.items.map((item) => `
        <article>
          <h3>${item.title}</h3>
          ${(item.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join('')}
        </article>
      `).join('');
    }
  }

  const process = content.sections?.process;
  if (process) {
    setHtml('.process-heading h2', process.title);
    document.querySelectorAll('.process-list li').forEach((item, index) => {
      const step = process.steps?.[index];
      if (!step) return;
      setHtml(`.process-list li:nth-child(${index + 1}) h3`, step.title);
      setHtml(`.process-list li:nth-child(${index + 1}) p`, step.text);
    });
  }

  const contact = content.sections?.contact;
  if (contact) {
    setHtml('[data-i18n-html="contact_title"]', contact.title);
    setText('[data-i18n="contact_note"]', contact.note);
  }
  const faq = content.sections?.faq;
  if (faq) {
    setHtml('.faq h2', faq.title);
    const list = document.querySelector('.faq-list');
    if (list && Array.isArray(faq.items)) {
      list.innerHTML = faq.items.map((item) => `
        <details ${item.open ? 'open' : ''}>
          <summary>${item.question}<b>+</b></summary>
          <p>${item.answer}</p>
        </details>
      `).join('');
    }
  }
  setHtml('[data-i18n="footer"]', it.footer);
  renderContactChannels(content);
};

fetch('content/site.json')
  .then((response) => (response.ok ? response.json() : null))
  .then((content) => {
    applyCmsContent(content);
    initGalleries();
  })
  .catch(() => initGalleries());

const menuButton = document.querySelector('.menu-button');
if (menuButton) {
  menuButton.addEventListener('click', (event) => {
    const open = document.body.classList.toggle('menu-open');
    event.currentTarget.setAttribute('aria-expanded', open);
  });
}

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const initGalleries = () => document.querySelectorAll('.gallery-rail').forEach((rail) => {
  if (rail.dataset.galleryReady === 'true') return;
  rail.dataset.galleryReady = 'true';
  const track = rail.querySelector('.gallery-track');
  const prev = rail.querySelector('.gallery-prev');
  const next = rail.querySelector('.gallery-next');
  const slides = track ? Array.from(track.children) : [];
  let autoTimer;
  let stoppedByUser = false;
  const move = (direction) => {
    if (!track) return;
    const amount = Math.max(track.clientWidth * .78, 280);
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };
  const stopAuto = () => {
    stoppedByUser = true;
    if (autoTimer) clearInterval(autoTimer);
  };
  const moveManual = (direction) => {
    stopAuto();
    move(direction);
  };
  prev?.addEventListener('click', () => moveManual(-1));
  next?.addEventListener('click', () => moveManual(1));
  if (track && slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    autoTimer = setInterval(() => {
      if (stoppedByUser) return;
      const maxScroll = track.scrollWidth - track.clientWidth - 8;
      if (track.scrollLeft >= maxScroll) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        move(1);
      }
    }, 5200);
  }
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const button = contactForm.querySelector('button[type="submit"]');
    const note = contactForm.querySelector('.form-note');
    const originalButton = button.innerHTML;
    button.disabled = true;
    button.textContent = 'Invio...';
    if (note) note.textContent = 'Invio del messaggio...';
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactState.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.get('name') || '',
          email: formData.get('email') || '',
          message: formData.get('message') || '',
          _subject: 'Nuova richiesta dal sito Federica Curci',
          _template: 'table',
          _honey: formData.get('_honey') || ''
        })
      });
      if (!response.ok) throw new Error('Form submit failed');
      contactForm.reset();
      if (note) note.textContent = 'Messaggio inviato. Grazie.';
    } catch (error) {
      if (note) note.innerHTML = `Qualcosa non ha funzionato. Scrivimi a <a href="mailto:${contactState.email}">${contactState.email}</a>.`;
    } finally {
      button.disabled = false;
      button.innerHTML = originalButton;
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
