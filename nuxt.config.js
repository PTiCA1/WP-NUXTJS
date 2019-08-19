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
  router: {
    // extendRoutes(routes) {
    //   const index = routes.findIndex(route => route.path === 'category-slug-page-id')
    //   routes[index] = {
    //     path: '/1',
    //     redirect: '/category/novinky/'
    //   }
    // }
  },
  /**
   * Sitemap
   */
  sitemap: {
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 15,
    hostname: 'https://example.com',
    gzip: false,
    exclude: [
      '/category',
      '/page',
      '/tag'
    ],
    async routes () {

      // Sitemap for categories
      const categories = await axios.get(
        `${state.baseUrl}categories`
      );
      let routesCategories = categories.data.map(category => '/category/' + category.slug)



      // Get Total Pages posts
      const getTotalPages = await axios.get(
        `${state.baseUrl}posts`
      )
      const totalPagesCount = getTotalPages.headers['x-wp-totalpages']



      // All Posts
      let posts = []
      for (let page = 1; page <= totalPagesCount; page++) {
        const postsOnPage = await axios.get(
          `${state.baseUrl}posts?page=${page}`
        );
        // posts.push(postsOnPage.data.map(post => '/' + post.slug))
        posts.push(postsOnPage.data.map(post => ({
          url: `/${post.slug}`,
          changefreq: 'daily',
          priority: 1,
          lastmodISO: `${post.date}`
        }) ))
      }

      // callback(null, response)
      console.log(posts);
      // https://cmty.app/nuxt/sitemap-module/issues/c40
      // let response = routesCategories.concat( posts.flat() )
      let response = posts
      return response

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
