<template>
  <div class="container">

    <ul>
      <li v-for="post in posts" :key="post.id">
        <h3><nuxt-link :to="`/${post.slug}`">{{ post.title.rendered }}</nuxt-link></h3>
        <div class="" v-if="post._embedded['wp:featuredmedia']">
          <img :src="`//www.vw-scene.cz${post._embedded['wp:featuredmedia'][0].source_url}`" alt="" width="120" height="auto">
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData( { store, params } ) {
    await store.dispatch('homepage/getArticlesOnHomepage')
  },
  head() {
    return {
      title: '',
      titleTemplate: null,
      bodyAttrs: {
        class: 'home blog'
      },
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      posts: 'homepage/getPosts',
    })
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}
</style>
