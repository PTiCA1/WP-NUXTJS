export const state = () => ({
  // posts: [],
  latest: [],
  totalPages: null
})

export const actions = {

  // Pagination
  // @link https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/
  async getLatestPosts({ commit, state }, payload ) {
    const pageId = payload.page
    const postsInPageIdExist = state.latest.some( item => item['pageId'] === pageId )

    // Get total pages count
    if ( state.totalPages === null ) {
      const wpTotalPages = await this.$axios.get(
        `posts`
      );
      commit("addTotalPagesCount", wpTotalPages.headers['x-wp-totalpages']);
    }

    // Get posts on the page
    if ( !postsInPageIdExist ) {
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
  },
  addTotalPagesCount(state, count) {
    state.totalPages = count
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
