export const state = () => ({
  posts: []
})

export const actions = {
  async getPost({ commit, state, rootState }, payload) {
    const postSlug = payload.postSlug

    // FIND POST IN CATEGORY
    const postsInCategoryName = rootState.posts.category.name
    for ( let item in postsInCategoryName ) {
      let categoryItemList = rootState.posts.category.name[item].posts
      categoryItemList.forEach((category) => {
        let result = category.posts.find(item => item.slug === postSlug)
        if ( result !== undefined ) {
          commit("add", result);
        }
      });
    }

    // FIND POST IN LATEST POSTS
    const postsInLatestPosts = rootState.posts.latest.posts
    postsInLatestPosts.forEach((post) => {
      let result = post.posts.find(item => item.slug === postSlug)
      if ( result !== undefined ) {
        commit("add", result);
      }
    });

    // IF POST IS NOT EXIST IN STORE.POSTS CALL API
    // WHEN I DON'T HAVE AN ARTICLE, I CAL API
    let checkIfPostExistInStore = state.posts.some(item => item.slug === postSlug)
    if ( !checkIfPostExistInStore ) {
      const response = await this.$axios.$get(
        `posts?_embed&slug=${postSlug}`
      );
      // If slug post not exist show error 404
      response[0] ? commit("add", response[0]) : payload.postError({ statusCode: 404, message: 'Page not found' })
    }
  }
}

export const mutations = {
  add(state, article) {
    let checkIfPostExistInStore = state.posts.some(item => item.slug === article.slug)
    if ( !checkIfPostExistInStore ) {
      state.posts = [...state.posts, article];
    }
  }
}

export const getters = {
  getPost: (state) => (slugName) => {
    return state.posts.filter(item => item.slug === slugName)
  }
}
