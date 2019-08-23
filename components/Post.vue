<template>
  <article class="post" :aria-labelledby="`post-id-${post.id}`">
    <h2 class="post--title" :id="`post-id-${post.id}`">
      <nuxt-link :to="`/${post.slug}`">{{ post.title.rendered }}</nuxt-link>
    </h2>

    <figure v-if="postFigure && !postFigure[0].data">
      <img :src="postFigure[0].source_url" alt="" width="200">
    </figure>

  </article>
</template>

<script>
  export default {
    name: "Post",
    props: {
      post: Object
    },
    computed: {
      postFigure() {
        return this.post._embedded['wp:featuredmedia']
      }
    }
  }
</script>

<style lang="scss" scoped>
  .post {
    background: #f2f2f2;
  }
</style>
