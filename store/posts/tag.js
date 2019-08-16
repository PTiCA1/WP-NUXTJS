export const state = () => ({
  name: {}
})

export const actions = {
  async getTagPosts({ commit, state, rootState }, payload) {

    const slug = payload.slug
    const pageId = payload.pageId
    const postPerPage = rootState.posts.postPerPage
    let tag

    const thereIsTag = Object.keys( state.name ).some( item => item === slug )
    if ( !thereIsTag ) {

      // Get tag id by slug
      const tagIdBySlug = await this.$axios.$get(
        `tags?slug=${slug}`
      );


      // Get posts by tag id
      tag = tagIdBySlug[0]
      // If tag on server not exist return error404
      if ( tag ) {
        const response = await this.$axios.get(
          `posts?tags=${tag.id}&_embed&page=${pageId}&per_page=${postPerPage}`
        );

        const tagPage = {};
        tagPage[slug] = {
          name: slug,
          title: tag.name,
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

    } else {

      const postsInTagsAndPageIdExist = state.name[slug].posts.some( item => item['pageId'] === pageId )
      if ( !postsInTagsAndPageIdExist ) {

        const tagIdBySlug = await this.$axios.$get(
          `tags?slug=${slug}`
        );

        // Get posts by tag id
        tag = tagIdBySlug[0]
        if ( tag ) {
          const response = await this.$axios.get(
            `posts?tags=${tag.id}&_embed&page=${pageId}&per_page=${postPerPage}`
          );

          const postPageInTags = {
            pageId: pageId,
            posts: response.data
          }

          commit("addPostsTagId", {name: slug, items: postPageInTags });

        } else {
          payload.tagError({ statusCode: 404, message: 'Tag not found' })
        }
      }
    }
  }
}

export const mutations = {
  add(state, items) {
    state.name = Object.assign(state.name, items)
  },
  addPostsTagId(state, payload) {
    const tagName = payload.name
    const tagPosts = payload.items

    state.name[tagName].posts = [...state.name[tagName].posts, tagPosts];
  }
}

export const getters = {
  get: (state) => (payload) => {
    const pageId = payload.id
    const tagname = payload.name

    return state.name[tagname].posts.filter(item => item.pageId === pageId)[0].posts
  },
  getTitle: (state) => (slugName) => {
    return state.name[slugName].title
  },
  totalPages: (state) => (slug) => {
    return state.name[slug].totalPages
  }
}
