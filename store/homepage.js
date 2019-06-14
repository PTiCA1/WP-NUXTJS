export const state = () => ({
  posts: {}
})

export const actions = {

  // Setting max inputs on page site.com/wp-admin/options-reading.php
  async getArticlesOnHomepage({ commit, state }) {
    if (!state.posts.length) {
      const response = await this.$axios.$get(
        `posts?orderby=date&_embed`
      );
      commit("ADD_ARTICLE_ON_HOMEPAGE", response);
    }
  }

}

export const mutations = {
  ADD_ARTICLE_ON_HOMEPAGE(state, articles) {
    state.posts = articles;
  }
}

export const getters = {
  getPosts(state) {
    return state.posts
  }
}
