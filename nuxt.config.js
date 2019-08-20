const axios = require('axios')
const api = 'https://www.vw-scene.cz/wp-json/wp/v2/' // demo: http://demo.wp-api.org/wp-json/wp/v2/
let state = {
  baseUrl: 'https://www.vw-scene.cz/wp-json/wp/v2/',
  wpFetchHeaders: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'x-wp-total'
    }
  }
}

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#6f42c1' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/time-locale' },
    { src: '~/plugins/relative-path' },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/sitemap'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: api,
    https: true,
    progress: true
  },
  /**
   * router
   */
  // router: {
  //   //
  // },
  /**
   * Sitemap
   */
  sitemap: {
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 120,
    hostname: 'https://example.com',
    gzip: false,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
      lastmodrealtime: true,
      sitemapSize: 100,
    },
    exclude: [
      '/category',
      '/page',
      '/tag'
    ],
    async routes () {
      let sitemapItems = []

      // All Categories
      const categories = await axios.get(
        `${state.baseUrl}categories`
      );
      let categoriesItems = categories.data.map(category => ({
        url: '/category/' + category.slug,
        changefreq: 'monthly',
        priority: 0.7,
      }) )
      sitemapItems = [...sitemapItems, categoriesItems]

      // Get Total Pages
      const getTotalPages = await axios.get(
        `${state.baseUrl}posts`
      )
      const totalPagesCount = getTotalPages.headers['x-wp-totalpages']

      // All Posts
      for (let page = 1; page <= totalPagesCount; page++) {
        const postsOnPage = await axios.get(
          `${state.baseUrl}posts?page=${page}`
        );

        let postsItems = postsOnPage.data.map(post => ({
          url: `/${post.slug}`,
          changefreq: 'daily',
          priority: 1,
          lastmod: new Date(post.date)
        }) )
        sitemapItems = [...sitemapItems, postsItems]
      }

      return apiItems.flat()
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
