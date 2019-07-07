<template>
  <div>
    <!-- <h1 class="title">{{post.title.rendered}}</h1> -->
    <!-- {{post}} -->

    <!-- kategorie: {{this.$store.state.postInCategories}} -->
    <!-- {{postCategoryId}} -->

    <div class="post-content">
      <!-- <div v-if="post.content.rendered" v-html="post.content.rendered"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  // async asyncData( { store, params } ) {
    // await store.dispatch('getPost', params);
    // await store.dispatch('ADD_CATEGORY_ID', params.categories);
  // },
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
      // return this.$store.getters.getPostBySlug(this.$route.params.slug)
    }
  },
  // beforeDestroy() {
  //   this.$store.state.postInCategories = []
  // }
}
</script>
