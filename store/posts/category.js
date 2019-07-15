export const state = () => ({
  items: []
})

export const actions = {

  async getCategory({ commit, state }, payload) {

    const categoryId = payload.categoryId

    if ( !state.items.length ) {
      const response = await this.$axios.$get(
        `posts?categories=${categoryId}&_embed`
      );
      commit("add", response);
    }

  }

}

export const mutations = {
  add(state, response) {
    state.items = response;
  }
}

export const getters = {
  get(state) {
    return state.items
  }
}
