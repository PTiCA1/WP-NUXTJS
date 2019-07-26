export const state = () => ({
  posts: []
})

export const actions = {

  async getPost({ commit, state, rootState }, payload) {

    const postSlug = payload.postSlug

    // FIND POST IN CATEGORY
    const postsInCategoryName = rootState.posts.category.name
    // Prochazim pole a hledam jestli mam clanek nacterny!!!!!!
    for ( let item in postsInCategoryName ) {



      // vypis postu z kategorie "item"
      // console.log($nuxt.$store.state.posts.category.name[item].posts);
      let categoryItemList = rootState.posts.category.name[item].posts

      // Vypis postu v kategorii a stranky
      // for ( var page in categoryItemList ) {
      //   // console.log(categoryItemList[item2].posts);
      //   // .forEach(function(element) {
      //   //   console.log(element);
      //   // });
      //   console.log( page.posts.filter(item => item.slug === 'seat-tarraco') );
      // }

      categoryItemList.forEach((category) => {
        // console.log(category.posts);

        // Filter vraci i prazne pole
        // let result = category.posts.filter(item => item.slug === postSlug)[0]

        // Find vraci jen plne pole
        let result = category.posts.find(item => item.slug === postSlug)
        commit("add", result);
      });

    }





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
