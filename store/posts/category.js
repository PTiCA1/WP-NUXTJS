export const state = () => ({
  name: {}
})

export const actions = {

  async getCategoryPosts({ commit, state, rootState }, payload) {

    const slug = payload.slug
    const categoryId = payload.categoryId
    const pageId = payload.pageId
    const postPerPage = rootState.posts.postPerPage

    // Kontroluju jestli uz kategorie neexistuje ve state.name
    const thereIsCategory = Object.keys( state.name ).some( item => item === slug )

    if ( !thereIsCategory ) {
      // Category not exist in state.name

      const response = await this.$axios.get(
        `posts?categories=${categoryId}&_embed&page=${pageId}&per_page=${postPerPage}`
      );

      const postPage = {};
      postPage[slug] = {
        name: slug,
        categoryId: categoryId,
        totalPages: response.headers['x-wp-totalpages'],
        posts: [
          {
            pageId: pageId,
            posts: response.data
          }
        ]
      }
      commit("add", postPage);

    } else {
      // Category exist in state.name
      // Update articles in pageId
      // Kategorie existuje ale nactu clanky na strance XY

      // I check if there are articles in the category and pageId
      // Kontrola jestli clanky pro stranky pageId existuji. Pokud ne, tak je nactu
      const postsInCategoryAndPageIdExist = state.name[slug].posts.some( item => item['pageId'] === pageId )
      if ( !postsInCategoryAndPageIdExist ) {

        const response = await this.$axios.get(
          `posts?categories=${categoryId}&_embed&page=${pageId}&per_page=${postPerPage}`
        );

        const postPageInCategory = {
          pageId: pageId,
          posts: response.data
        }

        commit("addPostsPageId", {name: slug, items: postPageInCategory });
      }
    }

  }
}

export const mutations = {
  add(state, items) {
    state.name = Object.assign(state.name, items)
  },
  addPostsPageId(state, payload) {
    const categoryName = payload.name
    const categoryPosts = payload.items

    state.name[categoryName].posts = [...state.name[categoryName].posts, categoryPosts];
  }
}

export const getters = {
  get: (state) => (payload) => {
    const categoryId = payload.id
    const categoryName = payload.name

    return state.name[categoryName].posts.filter(item => item.pageId === categoryId)[0].posts
  },
  totalPages: (state) => (slug) => {
    return state.name[slug].totalPages
  }
}
