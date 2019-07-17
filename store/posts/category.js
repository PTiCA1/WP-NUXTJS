export const state = () => ({
  name: {}
})

export const actions = {

  async getCategory({ commit, state }, payload) {

    const slug = payload.slug
    const categoryId = payload.categoryId
    const pageId = payload.pageId

    // Kontroluju jestli uz kategorie neexistuje ve state.name
    const thereIsCategory = Object.keys( state.name ).some( item => item === slug )

    if ( !thereIsCategory ) {
      // Category not exist in state.name

      const response = await this.$axios.get(
        `posts?categories=${categoryId}&_embed&page=${pageId}`
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
          `posts?categories=${categoryId}&_embed&page=${pageId}`
        );

        const postPageInCategory = {
          pageId: pageId,
          posts: response
        }

        commit("addPostsPageId", {name: slug, items: postPageInCategory });

        console.log( 'snazim se pridat clanky pod strankou ID : ' + postsInCategoryAndPageIdExist );
      }
      console.log( 'clanky pro tuto kategorii: ' + postsInCategoryAndPageIdExist );

    }








      // const response = await this.$axios.get(
      //   `posts?categories=${categoryId}&_embed&page=${pageId}`
      // );

      // const postPage = {};
      // postPage[slug] = {
      //   name: slug,
      //   categoryId: categoryId,
      //   totalPages: response.headers['x-wp-totalpages'],
      //   posts: [
      //     {
      //       pageId: pageId,
      //       posts: response.data
      //     }
      //   ]
      // }
      // commit("add", postPage);


  }
}

export const mutations = {
  add(state, items) {
    state.name = Object.assign(state.name, items)
  },
  addPostsPageId(state, payload) {
    state.name = Object.assign(state.name[payload.name].posts, payload.items)
    // state.name = {...state.name[slug].posts, items};
  },
}

export const getters = {
  // get: (state) => (id) => {
  //   return state.posts.filter(item => item.pageId === id)[0].posts
  // },
}
