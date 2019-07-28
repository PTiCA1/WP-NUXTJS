export const state = () => ({
  siteName: 'WP-NUXTJS'
})

export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('categories/getCategories')
  }
}
