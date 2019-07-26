<template>
  <article>
    <h1 class="title" v-html="post.title.rendered"></h1>

    <time class="updated" :datetime="post.date">{{post.date | TimeLocale}}</time>

    <div v-html="post.content.rendered"></div>
  </article>
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
      title: `${this.post.title.rendered}`,
      bodyAttrs: {
        class: `single single-${this.post.type} single-format-${this.post.format} postid-${this.post.id} ${this.post.slug}`
      },
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  name: "PostPage",
  computed: {
    post() {
      return this.$store.getters['posts/all/getPost'](this.$route.params.slug)[0]
    }
  },
}
</script>
