// Single source of truth for everything shown on the site.
// Fields marked TODO need real information from the BlueNova team.

export const brand = {
  name: 'BlueNova Tech',
  short: 'BlueNova',
  email: 'contact@bluenovatech.in',
  // Phone and WhatsApp: international format, digits only.
  whatsapp: '917600236644',
  phone: '+91 76002 36644',
  instagram: 'https://www.instagram.com/bluenova_tech?utm_source=ig_web_button_share_sheet&exln=ZDNlZDc0MzIxNw==',
  // Separate account for the creator network.
  instagramCreators: 'https://www.instagram.com/bluenova_creatorhub/',
  facebook: 'https://www.facebook.com/profile.php?id=61575902398607',
  linkedin: 'https://www.linkedin.com/company/bluenovatech/',
  location: 'Gujarat, India',
  timezone: 'Asia/Kolkata',
  // The address this portfolio is published at. Used for the canonical URL, sitemap,
  // robots.txt and social previews. Change it here if the site moves.
  siteUrl: 'https://portfolio.bluenovatech.in/',
  mainSite: 'https://www.bluenovatech.in/',
};

// Places we work. Shown on the page and in the structured data search engines read.
export const areas = ['Modasa', 'Ahmedabad', 'Rajkot', 'Aravalli', 'Gujarat'];

export const seo = {
  // ~60 characters for the title and ~155 for the description, so Google shows them in full.
  title: 'BlueNova Tech – Digital Marketing & Websites in Modasa, Ahmedabad',
  description:
    'Digital marketing & website development agency in Gujarat. Websites, Instagram, reels, Google & Meta ads for businesses in Modasa, Ahmedabad & Rajkot.',
};

export const services = [
  {
    id: 'social',
    title: 'Social media management',
    line: 'Your Instagram, run like a channel, not a notice board.',
    deliverables: [
      'Monthly content calendar',
      'Feed posts, carousels & stories',
      'Captions, hashtags & publishing',
      'Inbox and comment handling',
      'Monthly performance report',
    ],
  },
  {
    id: 'video',
    title: 'Reels & short-form video',
    line: 'Scripted, shot and edited for the first three seconds.',
    deliverables: [
      'Hook-first scripting',
      'On-location shoots',
      'Editing, captions & sound design',
      'Colour grading & motion titles',
      'Formats for Reels, Shorts & ads',
    ],
  },
  {
    id: 'web',
    title: 'Websites',
    line: 'Fast, clear websites that turn visitors into calls and enquiries.',
    deliverables: [
      'UX & visual design',
      'Responsive build',
      'Call, WhatsApp & enquiry flows',
      'Hosting, domain & SSL setup',
      'On-page SEO foundations',
    ],
  },
  {
    id: 'ads',
    title: 'Performance ads',
    line: 'Meta and Google campaigns tied to leads, not likes.',
    deliverables: [
      'Meta (Instagram & Facebook) ads',
      'Google Search & Maps ads',
      'Pixel & conversion tracking',
      'Creative testing',
      'Budget & ROI reporting',
    ],
  },
  {
    id: 'seo',
    title: 'Local SEO',
    line: 'Show up when people nearby search for what you do.',
    deliverables: [
      'Google Business Profile setup & upkeep',
      'Review strategy',
      'Local keyword pages',
      'Search Console monitoring',
      'Technical site health',
    ],
  },
  {
    id: 'creators',
    title: 'Creator collaborations',
    line: 'We pair brands with local creators and handle the whole campaign.',
    deliverables: [
      'Creator matching',
      'Briefs & scripts',
      'Contracts & payments',
      'Editing support',
      'Campaign reporting',
    ],
  },
];

// Current projects: websites designed and built by BlueNova.
// TODO: add `url` (the live website address) for each so visitors can open it.
export const websites = [
  {
    client: 'Arisca Light Studio',
    sector: 'Lighting retail',
    city: 'Ahmedabad',
    summary: 'A collection site for chandeliers, pendants and lamps, with search, a wishlist, downloadable catalogues and studio-visit booking.',
    scope: ['Design', 'Development', 'Product catalogue'],
    logo: 'logos/arisca.webp',
    image: 'work/arisca.webp',
    url: '',
    instagram: '',
  },
  {
    client: 'Pulse Hospital & ICU',
    sector: 'Healthcare',
    city: 'Modasa',
    summary: 'The emergency number comes first, followed by appointment booking, facilities, departments and a Gujarati version of the site.',
    scope: ['Design', 'Development', 'Gujarati / English'],
    logo: 'logos/pulse-hospital.webp',
    image: 'work/pulse-hospital.webp',
    url: '',
    instagram: 'https://www.instagram.com/pulse_hospital_icu',
  },
  {
    client: 'Alfa Industries',
    sector: 'Architectural hardware',
    city: 'Rajkot',
    summary: 'A catalogue of 185 stainless steel fittings for the HART brand, searchable by item code, with enquiry and quote requests.',
    scope: ['Design', 'Development', 'Product search'],
    logo: 'logos/alfa-industries.webp',
    image: 'work/alfa-industries.webp',
    url: '',
    instagram: '',
  },
  {
    client: 'Krupa Elevators',
    sector: 'Elevators',
    city: 'Ahmedabad',
    summary: 'Capsule, passenger and goods elevator ranges, with a 60-second estimate, survey requests and one-tap WhatsApp.',
    scope: ['Design', 'Development', 'Lead capture'],
    logo: 'logos/krupa-elevators.webp',
    image: 'work/krupa-elevators.webp',
    url: '',
    instagram: 'https://www.instagram.com/krupa_elevators_',
  },
  {
    client: 'Sunrise Pharma Equipments',
    sector: 'Pharma machinery',
    city: 'Ahmedabad',
    summary: 'Ointment and syrup plants, dryers and bottling lines, organised by product range for buyers in India and abroad.',
    scope: ['Design', 'Development', 'Quote requests'],
    logo: 'logos/sunrise-pharma.webp',
    image: 'work/sunrise-pharma.webp',
    url: '',
    instagram: '',
  },

];

// Instagram accounts BlueNova manages.
export const clients = [
  { name: 'Nyon Ceramica', handle: 'nyon.ceramica', logo: 'logos/nyon-ceramica.webp', sector: 'Industrial', field: 'Luxury tiles & surfaces', work: ['Social', 'Reels'], palette: ['#485cff', '#8affec', '#d7fef7'] },
  { name: 'Pulse Hospital & ICU', handle: 'pulse_hospital_icu', logo: 'logos/pulse-hospital.webp', sector: 'Healthcare', field: 'Emergency & ICU care', work: ['Social', 'Reels', 'Website'], palette: ['#699a9e', '#e5f8fa', '#d3cf93'] },
  { name: 'Krupa Elevators', handle: 'krupa_elevators_', logo: 'logos/krupa-elevators.webp', sector: 'Industrial', field: 'Elevators & escalators', work: ['Social', 'Website', 'Leads'], palette: ['#ea5b07', '#f8cbac', '#ec9457'] },
  { name: 'Prime Hospital', handle: 'primehospital.9', logo: 'logos/prime-hospital.webp', sector: 'Healthcare', field: 'Multispecialty hospital', work: ['Social', 'Branding'], palette: ['#d98d24', '#fef9e4', '#b7fbfb'] },
  { name: 'Vedant Hospital', handle: 'vedanthospital_modasa', logo: 'logos/vedant-hospital.webp', sector: 'Healthcare', field: 'Super-specialty hospital', work: ['Social', 'Website', 'SEO'], palette: ['#ec7a05', '#f9e4f9', '#adfff6'] },
  { name: 'Deep Hospital', handle: 'deephospital_modasa', logo: 'logos/deep-hospital.webp', sector: 'Healthcare', field: 'Clinical care', work: ['Social', 'Reels'], palette: ['#cd583a', '#fefbd5', '#c8fdfe'] },
  { name: 'Radhe Homoeopathy', handle: 'radhehomoeopathy', logo: 'logos/radhe-homoeopathy.webp', sector: 'Healthcare', field: 'Homoeopathic clinic', work: ['Social', 'Reels'], palette: ['#cb1ab5', '#e7e6e8', '#7a7b7a'] },
  { name: 'Avishkaar Infratech', handle: 'avishkaar_infratech', logo: 'logos/avishkaar-infratech.webp', sector: 'Industrial', field: 'Civil infrastructure', work: ['Social', 'Reels'], palette: ['#454444', '#e5e6e5', '#a2fcfc'] },
  { name: 'Aai Khodiyar Dhaba', handle: 'aai_khodiyardhaba', logo: 'logos/aai-khodiyar-dhaba.webp', sector: 'Food & Agri', field: 'Restaurant', work: ['Reels', 'Social'], palette: ['#d4a647', '#d6fdfd', '#a988fd'] },
  { name: 'Green Basket', handle: 'greenbasket.1', logo: 'logos/green-basket.webp', sector: 'Food & Agri', field: 'Organic produce', work: ['Social', 'Reels'], palette: ['#67f3fd', '#d5fbfd', '#bdd8c4'] },
  { name: 'Uma Farm Sweet Mosambi', handle: 'uma_farm_sweet_mosambi', logo: 'logos/uma-farm.webp', sector: 'Food & Agri', field: 'Farm-direct produce', work: ['Social', 'Reels'], palette: ['#aa96dc', '#dcdcc7', '#a9ab97'] },
];

// Platforms we run for clients, and what we handle on each. Based on the services above.
export const platforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#e1306c',
    what: 'Feeds, reels and stories planned, designed and posted every week.',
    tasks: ['Monthly content calendar', 'Feed posts, carousels & stories', 'Reels: script, shoot & edit', 'Captions, hashtags & publishing', 'Comments & DM handling'],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877f2',
    what: 'The same campaign carried to Facebook, so no audience is missed.',
    tasks: ['Page posting alongside Instagram', 'Reels cross-posting', 'Inbox & comment handling'],
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    color: '#0866ff',
    what: 'Instagram and Facebook ads tied to calls, leads and WhatsApp chats.',
    tasks: ['Campaign setup & targeting', 'Pixel & conversion tracking', 'Creative testing', 'Budget & ROI reporting'],
  },
  {
    id: 'youtube',
    name: 'YouTube Shorts',
    color: '#ff0033',
    what: 'Every reel we shoot is also cut for Shorts.',
    tasks: ['Shorts formats of each reel', 'Titles & descriptions', 'Consistent posting'],
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    color: '#fbbc04',
    what: 'Search and Maps ads for people already looking for you.',
    tasks: ['Google Search ads', 'Google Maps ads', 'Call & enquiry tracking', 'Monthly ROI reports'],
  },
  {
    id: 'gbp',
    name: 'Google Business Profile',
    color: '#34a853',
    what: 'Show up on Maps when people nearby search for what you do.',
    tasks: ['Profile setup & upkeep', 'Photos, posts & offers', 'Review strategy', 'Local keyword pages'],
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    color: '#25d366',
    what: 'Every ad, post and page ends in a one-tap WhatsApp chat.',
    tasks: ['Click-to-chat from ads & website', 'Enquiry flows', 'Quick replies'],
  },
];

// Readable names for the `work` tags on clients.
export const workLabels = {
  Social: 'Social media management',
  Reels: 'Reels & short video',
  Website: 'Website',
  Leads: 'Lead generation',
  Branding: 'Logo & branding',
  SEO: 'Local SEO',
};

// Every brand we work with (Instagram clients + website-only clients), with rich metadata for the B-Hive.
export const allBrands = [
  ...clients.map((c) => ({
    ...c,
    href: `https://www.instagram.com/${c.handle}`,
    type: 'Instagram & Campaign',
  })),
  ...websites
    .filter((w) => !clients.some((c) => c.logo === w.logo))
    .map((w) => ({
      name: w.client,
      logo: w.logo,
      sector: w.sector,
      field: w.summary,
      work: ['Website'],
      href: w.url || w.instagram || '#work',
      handle: w.instagram ? w.instagram.split('/').filter(Boolean).pop() : null,
      type: 'Website & Engineering',
    })),
];

// Official Instagram profile. Counts come from the public profile; update them now and then.
export const instagramProfile = {
  name: 'Bluenova Tech Pvt. Ltd.',
  handle: 'bluenova_tech',
  url: 'https://www.instagram.com/bluenova_tech/',
  // Instagram's own profile widget: always shows the latest real posts, no API key needed.
  embedUrl: 'https://www.instagram.com/bluenova_tech/embed/',
  postsCount: 185,
  followersCount: '442',
  followingCount: 23,
  creatorHubUrl: 'https://www.instagram.com/bluenova_creatorhub/',
};

// Posts shown in the Instagram section, newest first. To add one: paste its link from
// Instagram ("Copy link") at the top of this list, then run `npm run instagram` to download
// the image in full quality and its caption into public/instagram/ and src/data/instagram.json.
export const instagramPosts = [
  'https://www.instagram.com/p/DeYSTuGI-Wk/',
  'https://www.instagram.com/p/DeUmFZWSNqB/',
  'https://www.instagram.com/p/DeTCk5HoWdp/',
  'https://www.instagram.com/p/DeQrJ1WIg3Y/',
  'https://www.instagram.com/p/DeOBS6ZSGBU/',
  'https://www.instagram.com/p/DeLb6uZIFFH/',
  'https://www.instagram.com/reel/DeJ6m2noSJq/',
  'https://www.instagram.com/p/DeJdoaYouEa/',
  'https://www.instagram.com/p/DeIyovSCJl_/',
  'https://www.instagram.com/p/DeGSQ5loR-K/',
  'https://www.instagram.com/p/DeDwIgOIhND/',
  'https://www.instagram.com/p/DeBGfXeicvr/',
];

export const process = [
  { title: 'Audit', text: 'We study your current pages, competitors and what your customers actually search for and watch.' },
  { title: 'Plan', text: 'A one-page plan with goals, channels, a content calendar and the numbers we will report on.' },
  { title: 'Produce', text: 'Shoots, edits, posts, pages and campaigns go out on schedule, each approved by you first.' },
  { title: 'Report', text: 'Every month: what worked, what didn’t, and what we’re changing next.' },
];

// TODO: review these answers with the team before going live.
export const faqs = [
  {
    q: 'Which cities do you work in?',
    a: 'Our clients are in Modasa, Ahmedabad and Rajkot, and we work with businesses across Gujarat. Websites, ads and social media management also work remotely, so we take on clients anywhere in India.',
  },
  {
    q: 'Do you build websites for hospitals and manufacturers?',
    a: 'Yes. We have built websites for Pulse Hospital & ICU and Vedant Hospital in Modasa, Krupa Elevators and Sunrise Pharma Equipments in Ahmedabad, and Alfa Industries in Rajkot.',
  },
  {
    q: 'Can I hire you for just one thing, like a website or a set of reels?',
    a: 'Yes. Websites are usually one-off projects. Social media and ads tend to run as monthly engagements, but you can start with a single service.',
  },
  {
    q: 'Who owns the content and the website?',
    a: 'You do. Final videos, designs, domain and site access are handed over to you.',
  },
  {
    q: 'How do approvals work?',
    a: 'Nothing goes live without your sign-off. You see the calendar, scripts and edits before anything is posted.',
  },
  {
    q: 'I’m a creator. How do I join your network?',
    a: 'Send us your profile and the niche you create in. When a brand campaign fits your audience, we reach out with a paid brief.',
  },
];
