export const state = () => ({
  posts: []
})

export const actions = {

  // Pagination
  // @link https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/
  async getPosts({ commit, state }, payload ) {
    if (!state.posts.length) {
      const response = await this.$axios.$get(
        `posts?_embed&page=${payload.page}`
      );
      commit("add", response);
    }

    // console.log('test: ' + payload.page);

  }

}

export const mutations = {
  add(state, articles) {
    state.posts = articles;
  }
}

export const getters = {
  get(state) {
    return state.posts
  },

  // getButtonById: (state) => (id) => {
  //   return state.action.buttons.find(button => button.id === id)
  // }
}
