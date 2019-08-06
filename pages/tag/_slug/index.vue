<template>
  <div class="container">

    <h1>{{pageSlug}}</h1>

  </div>
</template>

<script>
export default {
  async asyncData( { store, params, route, error } ) {
    await store.dispatch('posts/tag/getTagPosts', {
      slug: route.params.slug,
      pageId: 1,
      tagError: error
    })
  },
  head() {
    return {
      // title: this.categoryTitle,
      titleTemplate: null,
      bodyAttrs: {
        class: `archive tag tag-audi tag-21`
      },
      meta: [
        // { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  name: "tagSlug",
  components: {

  },
  data() {
    return {
      pageSlug: this.$route.params.slug
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}
</style>
