<template>
  <div class="container">

    <h1>Latest news</h1>

    <Pagination
      :routeRootName="'index'"
      :routeName="'page-id'"
      :routeSlug="this.$route.params.slug"
      :pageNumber="this.pageId"
      :totalPages="this.totalPages" />

    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.id">
        <h3><nuxt-link :to="`/${post.slug}`">{{ post.title.rendered }}</nuxt-link></h3>
        <div class="" v-if="post._embedded['wp:featuredmedia']">
          <img :src="`//www.vw-scene.cz${post._embedded['wp:featuredmedia'][0].source_url}`" alt="" width="120" height="auto">
        </div>
      </li>
    </ul>
    <div v-else>no posts</div>

  </div>
</template>

<script>
import Pagination from '~/components/AppPagination'

export default {
  async asyncData( { store, params, route, redirect } ) {
    await store.dispatch('posts/latest/getPosts', {
      page: route.params.id
    })
  },
  head() {
    return {
      title: '',
      titleTemplate: null,
      bodyAttrs: {
        class: `home blog paged paged-${this.pageId}`
      },
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  name: "pageId",
  components: {
    Pagination
  },
  computed: {
    posts() {
      return this.$store.getters['posts/latest/get'](this.$route.params.id)
    },
    pageId() {
      return Number(this.$route.params.id)
    },
    totalPages() {
      return Number(this.$store.getters['posts/latest/totalPages'])
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
