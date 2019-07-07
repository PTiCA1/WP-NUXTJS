export const state = () => ({
  posts: [],
  totalPages: null
})

export const actions = {

  // Pagination
  // @link https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/
  async getPosts({ commit, state }, payload ) {
    const pageId = payload.page
    const postsInPageIdExist = state.posts.some( item => item['pageId'] === pageId )

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
      commit("add", postPage);

      // commit("addPostToAllPosts", {response, rootState});
      // rootState.posts.all.posts = response
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
