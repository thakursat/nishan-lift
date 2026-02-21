/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://nishan-lift-solutions.vercel.app',
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/components'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL ||
      'https://nishan-lift-solutions.vercel.app'
      }/sitemap.xml`,
    ],
  },
};
