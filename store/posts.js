export const state = () => ({
  // posts: [],
  latest: []
})

export const actions = {

  // Pagination
  // @link https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/
  async getPosts({ commit, state }, payload ) {
    const pageId = payload.page
    const postInPageIdExist = state.latest.some( item => item['pageId'] === pageId )

    if ( !postInPageIdExist ) {
      const response = await this.$axios.$get(
        `posts?_embed&page=${pageId}`
      );
      const postPage = {
        pageId: pageId,
        posts: response
      } 
      commit("addLatest", postPage);
    }
  }
}

export const mutations = {
  addLatest(state, articles) {
    state.latest = [...state.latest, articles];
  }
}

export const getters = {
  getLatest(state) {
    return state.latest
  },

  getLastestPostByPageId: (state) => (id) => {
    return state.latest.filter(item => item.pageId === id)[0].posts
  }
}
