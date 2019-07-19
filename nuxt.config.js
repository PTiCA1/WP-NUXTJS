
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
    { src: '~/plugins/axios' }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: "https://www.vw-scene.cz/wp-json/wp/v2/",
    https: true,
    progress: true
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
  },
  router: {
    // routes: [
    //   // { path: '/a', component: A, alias: '/b' }
    //   { path: '/category/novinky/page/1', redirect: '/category/novinky' }
    // ]

    // redirect: [{ from: "/category/novinky/page/1", to: "/category/novinky" }],
    // routes: [
    //   { path: '/category/novinky/page/1', redirect: '/category/novinky' }
    // ],

    extendRoutes(routes) {
      // routes[0].meta = { needAuth: true }
      // const fullPageNames = ['about', 'guestbook', 'music', 'project']
      // 1:
      // routes.map((route) => {
      //   const isFullPage = fullPageNames.includes(route.name) || route.path.includes('/project/')
      //   return isFullPage ? Object.assign(route, { meta: { fullPage: true }}) : route
      // })
      // 2:
      // routes.forEach((value, index, array) => {
      //   const isFullPage = fullPageNames.includes(routes[index].name) || routes[index].path.includes('/project/')
      //   if(isFullPage) { Object.assign(routes[index], { meta: { fullPage: true }}) }
      // })

      console.log(routes)
    }
  }




}
