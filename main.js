const contactState = { email: 'federicacurci9@gmail.com' };

const setImage = (selector, image) => {
  const element = document.querySelector(selector);
  if (!element || !image) return;
  if (image.src) element.src = image.src;
  if (image.alt) element.alt = image.alt;
};

const applyCmsContent = (content) => {
  if (!content || typeof content !== 'object') return;
  if (content.profile?.email) contactState.email = content.profile.email;
  document.querySelectorAll('.contact-email').forEach((link) => {
    link.href = `mailto:${contactState.email}`;
    link.innerHTML = `${contactState.email} <span>↗</span>`;
  });
  if (content.profile?.linkedin) {
    document.querySelectorAll('a[href*="linkedin.com/in/federica-curci"]').forEach((link) => {
      link.href = content.profile.linkedin;
    });
  }
  if (content.images) {
    setImage('.hero-photo', content.images.hero);
  }
};

fetch('content/site.json')
  .then((response) => (response.ok ? response.json() : null))
  .then(applyCmsContent)
  .catch(() => {});

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

document.querySelectorAll('.gallery-rail').forEach((rail) => {
  const track = rail.querySelector('.gallery-track');
  const prev = rail.querySelector('.gallery-prev');
  const next = rail.querySelector('.gallery-next');
  const move = (direction) => {
    if (!track) return;
    const amount = Math.max(track.clientWidth * .78, 280);
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };
  prev?.addEventListener('click', () => move(-1));
  next?.addEventListener('click', () => move(1));
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
