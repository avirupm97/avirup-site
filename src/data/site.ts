import type {
  CareerMilestone,
  ContactLink,
  Launch,
  NavLink,
} from '../types/site'

export const profile = {
  name: 'Avirup Mukherjee',
  role: 'Founding PM, Kombai',
  heroTitle: {
    lines: ['I turn ambitious ideas into', 'products people can'],
    emphasis: 'actually use',
  },
  heroParagraphs: [
    'These days, I’m the Founding PM at Kombai, where I help a small team turn AI into a thoughtful frontend and design partner. My work spans the whole product—from agent workflows, evals, growth, design, and analytics.',
    'Before that, I built coaching and analytics platform products at Mindtickle, a revenue enablement platform. This mix has made me a generalist and helped me realise that working across ambiguity, solving messy problems, and helping teams be more ambitious together is where I have the most fun.',
  ],
  portrait: {
    alt: 'Avirup Mukherjee smiling, standing in front of a bookshelf and plants',
    /** natural intrinsic size — keep in sync with the source asset to avoid layout shift */
    width: 858,
    height: 1673,
    fallbackSrc: '/portrait-600.jpg',
    webpSrcSet:
      '/portrait-400.webp 400w, /portrait-600.webp 600w, /portrait-858.webp 858w',
    /** the portrait only renders from the lg breakpoint up, at a fixed frame width */
    sizes: '380px',
  },
  primaryCta: { label: 'View selected work', href: '#work' },
  secondaryCta: { label: 'Reach out', href: '#contact' },
  copyright: '© 2026 Avirup Mukherjee',
} as const

export const navLinks: NavLink[] = [
  { label: 'Career', href: '#route' },
  { label: 'Work', href: '#work' },
  { label: 'Blog', href: '#notes' },
  { label: 'Reach out', href: '#contact', accent: true },
]

export const workSection = {
  title: 'Launches',
  subtitle: 'Things I’ve shipped at Kombai, straight from the launch posts.',
  showAllLabel: 'Show all launches',
  /** how many launches render before the "show all" button */
  initialCount: 6,
  /** account the launch tweets are posted from; used for fallback links */
  handle: 'Kombaico',
} as const

/** Newest first. Add one as `{ id: 'slug', tweetId: '<number after /status/ in the tweet URL>', product?: 'Name' }`. */
export const launches: Launch[] = [
  { id: 'taste-agent', tweetId: '2122698497040543866', product: 'Taste Agent' },
  { id: 'codex-plugin', tweetId: '2121219045030818119', product: 'Codex plugin' },
  { id: 'draw-tools', tweetId: '2090808644300636281', product: 'Draw tools' },
  { id: 'generate-image', tweetId: '2090453811580264568', product: 'Generate Image skill' },
  { id: 'animations', tweetId: '2087532054405906915' },
  { id: 'clone-url', tweetId: '2082458757640986820', product: 'Clone URL skill' },
  { id: 'design-systems', tweetId: '2080495756671099178', product: 'Design Systems' },
  { id: 'kombai-desktop', tweetId: '2079921961816269176', product: 'Kombai Desktop' },
  { id: 'improve-ui', tweetId: '2072296809850945886', product: 'Improve UI skill' },
  { id: 'inspiration-library', tweetId: '2068023882012086512', product: 'Inspiration Library' },
]

export const careerSection = {
  title: 'My career so far',
  subtitle: 'Product Analyst → Product Engineer → Product Manager',
  /** hand-drawn connectors between the blobs, in the 1176 x 520 map space */
  connectors: [
    'M123 186 Q144 259 205 300',
    'M296 303 Q359 261 379 190',
    'M468 186 Q490 260 551 301',
    'M641 304 Q704 261 723 189',
    'M812 185 Q833 259 894 300',
    'M983 302 Q1043 260 1057 191',
  ],
  mapSize: { width: 1176, height: 520 },
} as const

export const careerMilestones: CareerMilestone[] = [
  {
    id: 'niki',
    lines: ['Data Analyst intern', 'Niki.ai'],
    date: 'May 2018 – Jun 2018',
    datePosition: { left: 8, top: 198 },
    annotation: {
      text: 'everyday assistant, machine learning, and a lot of Tableau',
      left: 4,
      top: 2,
      maxWidth: 192,
      rotate: -3,
    },
    radius: '62% 38% 55% 45%/48% 60% 40% 52%',
    box: { left: 10, top: 60, width: 140, height: 130 },
  },
  {
    id: 'mindtickle-engineer',
    lines: ['Product engineer', '& analyst · Mindtickle'],
    date: 'Mar 2019 – Oct 2023',
    datePosition: { left: 186, top: 442 },
    annotation: {
      text: 'SQL, big data, AWS and stackoverflow-era coding',
      left: 180,
      top: 466,
      maxWidth: 200,
      rotate: 3,
    },
    radius: '40% 60% 48% 52%/58% 42% 56% 44%',
    box: { left: 178, top: 300, width: 148, height: 130 },
  },
  {
    id: 'mindtickle-spm',
    lines: ['Senior PM,', 'coaching & analytics'],
    annotation: {
      text: '2 PMs, 50 devs, 200 enterprise customers',
      left: 346,
      top: 2,
      maxWidth: 200,
      rotate: -3,
    },
    radius: '55% 45% 62% 38%/42% 58% 44% 56%',
    box: { left: 352, top: 60, width: 144, height: 130 },
  },
  {
    id: 'readiness-index',
    lines: ['Readiness', 'Index'],
    annotation: {
      text: 'New product launch and GTM, tying training to outcomes',
      left: 522,
      top: 444,
      maxWidth: 215,
      rotate: 3,
    },
    radius: '38% 62% 45% 55%/56% 44% 60% 40%',
    box: { left: 528, top: 300, width: 140, height: 130 },
  },
  {
    id: 'insights-platform',
    lines: ['Insights', 'platform'],
    annotation: {
      text: 'platform for cross teams to build analytics quickly and ship',
      left: 692,
      top: 2,
      maxWidth: 200,
      rotate: -3,
    },
    radius: '58% 42% 38% 62%/44% 56% 48% 52%',
    box: { left: 700, top: 60, width: 138, height: 130 },
  },
  {
    id: 'kombai',
    lines: ['Founding PM', 'Kombai'],
    date: 'Nov 2023 – present',
    datePosition: { left: 884, top: 442 },
    current: true,
    radius: '45% 55% 60% 40%/52% 40% 60% 48%',
    box: { left: 866, top: 300, width: 150, height: 130 },
  },
  {
    id: 'ai-workflows',
    lines: ['AI workflows', '& evals'],
    annotation: {
      text: 'static + LLM-driven evals, model grading',
      left: 1000,
      top: 2,
      maxWidth: 176,
      rotate: 3,
    },
    radius: '60% 40% 48% 52%/46% 58% 42% 54%',
    box: { left: 1032, top: 60, width: 140, height: 130 },
  },
]

export const blogSection = {
  title: 'Blogs',
} as const

/** Shared chrome copy for every `/cases/:slug` write-up. */
export const casePage = {
  eyebrow: 'Case study',
  backLabel: 'Back to the site',
} as const

export const wipPage = {
  eyebrow: 'Work in progress',
  title: 'This one’s still on my desk.',
  paragraphs: [
    'I’m writing this piece up properly — the decisions, the dead ends, and the numbers that actually moved. It isn’t ready to read yet.',
    'Everything else on the site is live, so do have a wander. Or email me and I’ll happily talk you through this one before it’s published.',
  ],
  backLabel: 'Back to the site',
  contactLabel: 'Email me about it',
} as const

export const contactSection = {
  title: "Eager to talk about the product you're building!",
  backToTop: 'Back to top',
} as const

export const contactLinks: ContactLink[] = [
  { label: 'avirup.m97@gmail.com', href: 'mailto:avirup.m97@gmail.com', icon: 'mail' },
  {
    label: 'linkedin.com/in/avirupm97',
    href: 'https://www.linkedin.com/in/avirupm97/',
    icon: 'linkedin',
  },
  { label: '@avirupm97', href: 'https://x.com/avirupm97', icon: 'x' },
]
