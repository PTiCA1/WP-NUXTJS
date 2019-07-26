<template>
  <div>
    <h1 class="title">{{post.title.rendered}}</h1>
    <!-- {{this.post}} -->

    <!-- kategorie: {{this.$store.state.postInCategories}} -->
    <!-- {{postCategoryId}} -->

    {{this.$route.params.slug}}

    <div class="post-content">
      <!-- <div v-if="post.content.rendered" v-html="post.content.rendered"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  async asyncData( { store, params, route } ) {
    const post = route.params.slug
    await store.dispatch('posts/all/getPost', {
      postSlug: route.params.slug
    })
  },
  head() {
    return {
      // title: `${this.post.title.rendered}`,
      bodyAttrs: {
        // class: `single single-${this.post.type} single-format-${this.post.format} postid-${this.post.id} ${this.post.slug}`
      },
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  name: "PostPage",
  computed: {
    post() {
      return this.$store.getters['posts/all/getPost'](this.$route.params.slug)
    }
  },
}
</script>
