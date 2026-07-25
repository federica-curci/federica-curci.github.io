# Federica Curci — portfolio template

A fast, dependency-free static portfolio for an Italian / English / Chinese interpreter. It is deliberately **content-led**: the work is shown through contextual case studies and designed typography, so it does not depend on a library of photos.

## Run locally

No Node, package manager, or build step is required. From this folder:

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`. Stop with `Ctrl+C`.

## Before publishing

Use the global search-and-replace in the repository for these placeholders:

- `REPLACE_WITH_YOUR_EMAIL`
- `REPLACE_WITH_LINKEDIN_URL`
- `https://federicacurci.com/` — change if the final domain differs

Also replace `privacy.html` with a GDPR-compliant policy that matches the services actually used. The current contact call-to-action is `mailto:` only, so it collects no data on the website. If adding a contact form, use a provider with GDPR-ready data processing terms and update the policy.

The four documentary photos currently load from the existing Wix portfolio, with descriptive alt text. Before retiring Wix, download the original approved images and update the `src` values in `index.html` to local files (for example `/images/beijing-event.jpg`) so the new site is fully independent.

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

## Design notes

The palette and editorial layout signal calm expertise, cultural fluency, and precision. The flow answers a client's natural decision sequence: *Can she handle my languages and context? Has she done comparable work? What exactly can she do? What happens next? How do I contact her?*

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Main site, structured data, and content |
| `styles.css` | Responsive visual design |
| `photo-overrides.css` | Presentation rules for Federica's documentary portfolio photos |
| `main.js` | Language switcher, mobile navigation, and animations |
| `robots.txt`, `sitemap.xml` | Crawl discovery |
| `privacy.html` | Required pre-launch replacement placeholder |
