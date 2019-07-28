export const state = () => ({
  posts: [],
  totalPages: null
})

export const actions = {

  // Pagination
  // @link https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/
  async getPosts({ commit, state, rootState }, payload ) {
    const pageId = payload.page
    const postsInPageIdExist = state.posts.some( item => item['pageId'] === pageId )
    const postPerPage = rootState.posts.postPerPage

    // Get total pages count
    if ( state.totalPages === null ) {
      const wpTotalPages = await this.$axios.get(
        `posts?per_page=${postPerPage}`
      );
      commit("addTotalPagesCount", wpTotalPages.headers['x-wp-totalpages']);
    }

    // Get posts on the page
    if ( !postsInPageIdExist ) {
      const response = await this.$axios.$get(
        `posts?_embed&page=${pageId}&per_page=${postPerPage}`
      );
      const postPage = {
        pageId: pageId,
        posts: response
      }
      commit("add", postPage);
    }
  }
}

export const mutations = {
  add(state, articles) {
    state.posts = [...state.posts, articles];
  },
  addTotalPagesCount(state, count) {
    state.totalPages = count
  }
}

export const getters = {
  get: (state) => (id) => {
    return state.posts.filter(item => item.pageId === id)[0].posts
  },
  totalPages (state) {
    return state.totalPages
  }
}
