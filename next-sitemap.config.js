/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://earninggames.pk",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/search", "/api/"] },
    ],
  },
  transform: async (config, path) => {
    if (path === "/") {
      return { loc: path, priority: 1.0, changefreq: "daily", lastmod: new Date().toISOString() };
    }
    if (path.startsWith("/games/")) {
      return { loc: path, priority: 0.9, changefreq: "weekly", lastmod: new Date().toISOString() };
    }
    if (path.startsWith("/category/")) {
      return { loc: path, priority: 0.8, changefreq: "weekly", lastmod: new Date().toISOString() };
    }
    return { loc: path, priority: 0.5, changefreq: "monthly", lastmod: new Date().toISOString() };
  },
};
