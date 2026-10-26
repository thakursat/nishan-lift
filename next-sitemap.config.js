/* global module, process */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://nishan-lift-solutions.vercel.app';

// Search and AI-answer crawlers we explicitly welcome, so assistants like
// ChatGPT, Claude, Perplexity and Gemini can read and cite the site.
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'DuckAssistBot',
  'meta-externalagent',
  'CCBot',
];

/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl,
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/components', '/llms.txt', '/llms-full.txt'],
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === '/' ? 'daily' : config.changefreq,
    priority:
      path === '/'
        ? 1
        : ['/safety', '/products-services', '/contact'].includes(path)
          ? 0.9
          : path === '/privacy-policy'
            ? 0.3
            : config.priority,
    lastmod: new Date().toISOString(),
  }),
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/components'] },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/'],
      })),
    ],
  },
};
