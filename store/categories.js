export const state = () => ({
  items: []
})

export const actions = {

  async getCategories({ commit, state }) {

    if ( !state.items.length ) {
      const response = await this.$axios.$get(
        `categories`
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
