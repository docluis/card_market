export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Card Market",
  url: "http://127.0.0.1/", // TODO: Update this
  description: "Buy beautiful playing cards for every game.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
  },
};
