export default function ({ $axios, error }) {
  $axios.onError(apiError => {
    if(apiError.response.status === 400) {
      // @link https://nuxtjs.org/guide/async-data#handling-errors
      error({statusCode: '404', message: 'Page not Found'})
      // @link https://github.com/nuxt-community/axios-module/issues/149
      return Promise.resolve(false);
    } else {
      // @link https://nuxtjs.org/guide/async-data#handling-errors
      error({statusCode: '403', message: 'Forbidden'})
      // @link https://github.com/nuxt-community/axios-module/issues/149
      return Promise.resolve(false);
    }
  })
}
