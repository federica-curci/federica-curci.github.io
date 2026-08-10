# Federica Curci : portfolio template

A fast, dependency-free static portfolio for an Italian / English / Chinese interpreter. It is deliberately **content-led**: the work is shown through contextual case studies and designed typography, so it does not depend on a library of photos.

## Run locally

No Node, package manager, or build step is required. From this folder:

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`. Stop with `Ctrl+C`.

## Before publishing

The live metadata is currently set for:

- Website: `https://federica-curci.github.io/`
- Email: `federicacurci9@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/federica-curci`

When a custom domain is connected, update `https://federica-curci.github.io/` in `index.html`, `links.html`, `robots.txt`, and `sitemap.xml`.

Also replace `privacy.html` with a GDPR-compliant policy that matches the services actually used. The contact form currently uses FormSubmit to send messages to email. If you later change the form provider, add analytics, or connect a CRM, update the privacy policy before publishing.

The main documentary photos now load from local files in `content/`, so the new site is no longer dependent on Wix for those images.

## Editing without code

The site is now prepared for Pages CMS.

Editable content lives in:

- `content/site.json` for text, contact details, link page text, and image references
- `content/` for images uploaded through the CMS
- `.pages.yml` for the CMS editing interface

To enable browser editing:

1. Push this repository to GitHub.
2. Go to `https://app.pagescms.org`.
3. Sign in with GitHub.
4. Install/authorize the Pages CMS GitHub app for the portfolio repository.
5. Open the repository in Pages CMS.
6. Open **Website Content**.
7. Edit text, email, LinkedIn, or images.
8. Save. Pages CMS commits the change to GitHub.
9. GitHub Pages or Cloudflare Pages redeploys automatically.

Some title/button fields intentionally allow small HTML snippets such as `<br />`, `<em>...</em>`, `<span>↗</span>`, and `<b>+</b>` because the design uses them for line breaks, emphasis, arrows, and FAQ icons. Keep those unless you are intentionally changing the layout.

To add a new portfolio case in Pages CMS, open **Website Content → Portfolio cases → Add item**. Add the photo, visual style, place label, language tag, and the case text in Italian, English, and Chinese. The site will render the new case automatically.

## Deploy with GitHub + Cloudflare Pages

1. Create a GitHub repository and push these files to `main`.
2. In Cloudflare: **Workers & Pages → Create application → Pages → Connect to Git**.
3. Select the repository. Use **no framework / static HTML**, with build command left empty and output directory `/`.
4. Deploy, then add the custom domain in **Pages → Custom domains**. Cloudflare will show the DNS record it needs.
5. In Google Search Console, verify the custom domain and submit `https://YOUR-DOMAIN/sitemap.xml`.

## SEO & answer-engine readiness

- Semantic headings, contextual copy, internal anchors, canonical URL, social metadata, `robots.txt`, and `sitemap.xml` are already included.
- `index.html` includes `Person`, `ProfessionalService`, and `FAQPage` JSON-LD. Keep it truthful; do not add client names, credentials, ratings, or claims that cannot be verified.
- English and Chinese translations work in the interface. For the strongest multilingual SEO, turn them into real `/en/` and `/zh/` pages before launch (the `hreflang` entries are prepared as a reminder but those pages do not exist yet).
- Add an original project note or article after each significant assignment. Describe the challenge, approach, scope, and outcome without disclosing confidential information. This is better for both prospective clients and search/AI discovery than generic keyword pages.

## Link-in-bio page

`links.html` is a simple Linktree-style page for social bios, QR codes, email signatures, and event networking. It currently includes:

- Portfolio
- LinkedIn
- Email me

Useful future links to add once available: a downloadable PDF CV, a Calendly/booking link, a professional headshot/media kit, a published interpreting or translation article, and a WhatsApp link only if Federica wants clients contacting her there.

## Design notes

The palette and editorial layout signal calm expertise, cultural fluency, and precision. The flow answers a client's natural decision sequence: *Can she handle my languages and context? Has she done comparable work? What exactly can she do? What happens next? How do I contact her?*

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Main site, structured data, and content |
| `links.html` | Link-in-bio page with key contact and portfolio links |
| `content/site.json` | Editable CMS content source |
| `.pages.yml` | Pages CMS editor configuration |
| `content/` image files | Images uploaded from the CMS |
| `styles.css` | Responsive visual design |
| `photo-overrides.css` | Presentation rules for Federica's documentary portfolio photos |
| `main.js` | Language switcher, mobile navigation, and animations |
| `links.js` | Loads CMS contact/link content on the link page |
| `favicon.svg` | Simple FC browser icon |
| `.nojekyll`, `robots.txt`, `sitemap.xml` | Static hosting and crawl discovery |
| `privacy.html` | Required pre-launch replacement placeholder |
