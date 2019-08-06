export const state = () => ({
  name: {},
  totalPages: null
})

export const actions = {
  async getTagPosts({ commit, state, rootState }, payload) {

    const slug = payload.slug
    const pageId = payload.pageId
    const postPerPage = rootState.posts.postPerPage


    const thereIsTag = Object.keys( state.name ).some( item => item === slug )
    if ( !thereIsTag ) {

      // Get tag id by slug
      const tagIdBySlug = await this.$axios.$get(
        `tags?slug=${slug}`
      );

      // Get posts by tag id
      const tag = tagIdBySlug[0]
      // If tag on server not exist return error404
      if ( tag ) {



        const response = await this.$axios.get(
          `posts?tags=${tag.id}&_embed&page=${pageId}&per_page=${postPerPage}`
        );

        const tagPage = {};
        tagPage[slug] = {
          name: slug,
          tagId: tag.id,
          totalPages: response.headers['x-wp-totalpages'],
          posts: [
            {
              pageId: pageId,
              posts: response.data
            }
          ]
        }
        commit("add", tagPage);




      } else {
        payload.tagError({ statusCode: 404, message: 'Tag not found' })
      }

    }
  }
}

export const mutations = {
  add(state, items) {
    state.name = Object.assign(state.name, items)
  }
}
