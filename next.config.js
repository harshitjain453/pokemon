/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   trailingSlash:true,
   images: { unoptimized: true }
  // output:  "export",
  // exportPathMap: async function (defaultPathMap) {
  //   const pages = {
  //     // '/': { page: '/' },
  //     // '/components/Pokemon': { page: '/components/Pokemon' },
  //     // '/containers/PokemonsContainer': { page: '/containers/PokemonsContainer' },
  //   };

  //   // If you have dynamic routes, add them to the `pages` object like this:
  //   // pages['/posts/[slug]'] = { page: '/posts/[slug]' };

  //   return pages;
  // },
}

module.exports = nextConfig
