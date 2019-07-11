<template>
  <div class="container">

    pages/category/_slug/index

    <!-- <Pagination :pageNumber="this.pageId" :numberOfPages="this.totalPages" /> -->

    <!-- <ul>
      <li v-for="post in posts" :key="post.id">
        <h3><nuxt-link :to="`/${post.slug}`">{{ post.title.rendered }}</nuxt-link></h3>
        <div class="" v-if="post._embedded['wp:featuredmedia']">
          <img :src="`//www.vw-scene.cz${post._embedded['wp:featuredmedia'][0].source_url}`" alt="" width="120" height="auto">
        </div>
      </li>
    </ul> -->

  </div>
</template>

<script>
// import Pagination from '~/components/Pagination'

export default {
  // async asyncData( { store, params, route, redirect } ) {
  //   await store.dispatch('posts/latest/getPosts', {
  //     page: route.params.id
  //   })
  // },
  head() {
    return {
      title: '',
      titleTemplate: null,
      bodyAttrs: {
        class: `archive category category-NAME category-${this.pageId}`
      },
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  name: "categorySlug",
  components: {
    Pagination
  },
  computed: {
    // posts() {
    //   return this.$store.getters['posts/latest/get'](this.$route.params.id)
    // },
    pageId() {
      return Number(this.$route.params.id)
    }
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
