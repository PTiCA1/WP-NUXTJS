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
        commit("add", result);
      });
    }

    // FIND POST IN LATEST POSTS
    const postsInLatestPosts = rootState.posts.latest.posts
    postsInLatestPosts.forEach((post) => {
      let result = post.posts.find(item => item.slug === postSlug)
      commit("add", result);
    });

  }
}

export const mutations = {
  add(state, article) {
    // state.posts = Object.assign(state.posts, article)

    let checkIfPostExistInStore = state.posts.findIndex(item => item.slug === article.slug)
    if (checkIfPostExistInStore === -1){
      state.posts = [...state.posts, article];
    }
  }
}
