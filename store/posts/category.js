export const state = () => ({
  name: {}
})

export const actions = {

  async getCategory({ commit, state }, payload) {

    const slug = payload.slug
    const categoryId = payload.categoryId
    const pageId = payload.pageId
    // const postsInPageIdExist = state.posts.some( item => item['pageId'] === pageId )

    if ( !state.name.length ) {
      const response = await this.$axios.$get(
        `posts?categories=${categoryId}&_embed&page=${pageId}`
      );

      const postPage = {};
      postPage[slug] = {
        name: slug,
        categoryId: categoryId,
        pageId: pageId,
        posts: response
      }
      commit("addTest", postPage);

    }
  }
}

export const mutations = {
  add(state, articles) {
    state.posts = [...state.posts, articles];
  },
  addTest(state, items) {
    state.name = Object.assign(state.name, items)
  }
}

export const getters = {
  // get: (state) => (id) => {
  //   return state.posts.filter(item => item.pageId === id)[0].posts
  // },
}
