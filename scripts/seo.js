// Builds everything search engines and AI tools read about the site, from src/data/site.js:
// <head> tags, JSON-LD structured data, sitemap.xml, robots.txt and llms.txt.
import { allBrands, areas, brand, clients, faqs, seo, services, websites } from '../src/data/site.js';

const url = (path = '') => new URL(path, brand.siteUrl).href;
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const sameAs = [brand.instagram, brand.instagramCreators, brand.facebook, brand.linkedin, brand.mainSite].filter(Boolean);
const tel = brand.whatsapp ? `+${brand.whatsapp}` : '';

export function structuredData() {
  const org = `${brand.mainSite}#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': org,
        name: brand.name,
        alternateName: brand.short,
        url: brand.siteUrl,
        logo: url('icons/icon-512.png'),
        image: url('og-image.jpg'),
        email: brand.email,
        ...(tel && {
          telephone: tel,
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            telephone: tel,
            email: brand.email,
            areaServed: 'IN',
            availableLanguage: ['English', 'Gujarati', 'Hindi'],
          },
        }),
        description: seo.description,
        address: { '@type': 'PostalAddress', addressRegion: 'Gujarat', addressCountry: 'IN' },
        areaServed: areas.map((name) => ({ '@type': name === 'Gujarat' ? 'State' : 'City', name })),
        knowsAbout: [
          'Digital marketing',
          'Website development',
          'Social media management',
          'Instagram marketing',
          'Reels and short-form video production',
          'Meta ads',
          'Google ads',
          'Local SEO',
          'Influencer and creator marketing',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Digital marketing and website services',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.line, areaServed: areas },
          })),
        },
        workExample: websites.map((w) => ({
          '@type': 'WebSite',
          name: `${w.client} website`,
          ...(w.url && { url: w.url }),
          image: url(w.image),
          description: w.summary,
          creator: { '@id': org },
          about: { '@type': 'Organization', name: w.client, address: `${w.city}, Gujarat, India` },
        })),
        ...(sameAs.length && { sameAs }),
      },
      {
        '@type': 'WebSite',
        '@id': `${brand.siteUrl}#website`,
        url: brand.siteUrl,
        name: `${brand.name} Portfolio`,
        inLanguage: 'en-IN',
        publisher: { '@id': org },
      },
      {
        '@type': 'WebPage',
        '@id': `${brand.siteUrl}#webpage`,
        url: brand.siteUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: { '@id': `${brand.siteUrl}#website` },
        about: { '@id': org },
        primaryImageOfPage: url('og-image.jpg'),
        inLanguage: 'en-IN',
      },
      {
        '@type': 'FAQPage',
        '@id': `${brand.siteUrl}#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

export function headTags() {
  const image = url('og-image.jpg');
  const keywords = [
    'digital marketing agency',
    'website development',
    'website developer',
    'social media marketing',
    'Instagram management',
    'reels production',
    'Google ads',
    'Meta ads',
    'local SEO',
    ...areas.flatMap((a) => [`digital marketing agency in ${a}`, `website developer in ${a}`]),
  ].join(', ');

  return `
    <title>${esc(seo.title)}</title>
    <meta name="description" content="${esc(seo.description)}" />
    <meta name="keywords" content="${esc(keywords)}" />
    <meta name="author" content="${esc(brand.name)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${brand.siteUrl}" />
    <link rel="alternate" hreflang="en-IN" href="${brand.siteUrl}" />
    <link rel="alternate" hreflang="x-default" href="${brand.siteUrl}" />

    <meta name="geo.region" content="IN-GJ" />
    <meta name="geo.placename" content="${esc(areas.slice(0, 3).join(', '))}, Gujarat" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(brand.name)}" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:url" content="${brand.siteUrl}" />
    <meta property="og:title" content="${esc(seo.title)}" />
    <meta property="og:description" content="${esc(seo.description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(`${brand.name}: digital marketing and website development in Gujarat`)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(seo.title)}" />
    <meta name="twitter:description" content="${esc(seo.description)}" />
    <meta name="twitter:image" content="${image}" />

    <script type="application/ld+json">${JSON.stringify(structuredData()).replace(/</g, '\\u003c')}</script>`;
}

export function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const images = [
    { loc: url('og-image.jpg'), title: `${brand.name}: digital marketing and website development` },
    ...websites.map((w) => ({ loc: url(w.image), title: `${w.client} website by ${brand.name}` })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${brand.siteUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
${images.map((i) => `    <image:image><image:loc>${i.loc}</image:loc><image:title>${esc(i.title)}</image:title></image:image>`).join('\n')}
  </url>
</urlset>
`;
}

export function robots() {
  const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Bingbot'];
  return `# ${brand.name} portfolio
User-agent: *
Allow: /

# AI assistants and answer engines are welcome to read and cite this site.
${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${url('sitemap.xml')}
`;
}

// llms.txt: a plain-language summary for AI tools (https://llmstxt.org).
export function llms() {
  return `# ${brand.name}

> ${seo.description}

${brand.name} (also "${brand.short}") is a digital marketing and website development agency based in Gujarat, India. It works with businesses in ${areas.slice(0, 3).join(', ')} and across Gujarat, and takes on remote projects across India.

## Services
${services.map((s) => `- ${s.title}: ${s.line} (${s.deliverables.join(', ')})`).join('\n')}

## Websites built by ${brand.name}
${websites.map((w) => `- ${w.client} (${w.sector}, ${w.city}): ${w.summary}${w.url ? ` ${w.url}` : ''}`).join('\n')}

## Instagram accounts managed by ${brand.name}
${clients.map((c) => `- ${c.name} (${c.field}): https://www.instagram.com/${c.handle}`).join('\n')}

## Brands worked with
${allBrands.map((b) => b.name).join(', ')}

## Frequently asked questions
${faqs.map((f) => `- ${f.q} ${f.a}`).join('\n')}

## Contact
- Email: ${brand.email}
${tel ? `- Phone / WhatsApp: ${brand.phone} (https://wa.me/${brand.whatsapp})\n` : ''}- Portfolio: ${brand.siteUrl}
- Main website: ${brand.mainSite}

## Social profiles
${sameAs
  .filter((u) => u !== brand.mainSite)
  .map((u) => `- ${u}`)
  .join('\n')}
`;
}

// Vite plugin: injects head tags and emits the SEO files on build.
export function seoPlugin() {
  return {
    name: 'bluenova-seo',
    transformIndexHtml(html) {
      return html.replace('<!--seo-->', headTags());
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots() });
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms() });
    },
  };
}
