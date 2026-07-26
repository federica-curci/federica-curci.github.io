fetch('content/site.json')
  .then((response) => (response.ok ? response.json() : null))
  .then((content) => {
    if (!content || !content.profile) return;
    const intro = document.querySelector('[data-links-intro]');
    const linkedin = document.querySelector('[data-links-linkedin]');
    const email = document.querySelector('[data-links-email]');
    if (intro && content.profile.linksIntro) intro.textContent = content.profile.linksIntro;
    if (linkedin && content.profile.linkedin) linkedin.href = content.profile.linkedin;
    if (email && content.profile.email) email.href = `mailto:${content.profile.email}`;
  })
  .catch(() => {});
