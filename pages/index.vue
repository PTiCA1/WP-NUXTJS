<template>
  <div class="container">

    <Pagination
      :routeRootName="'index'"
      :routeName="'page-id'"
      :routeSlug="this.$route.params.slug"
      :pageNumber="1"
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
  async asyncData( { store, params } ) {
    await store.dispatch('posts/latest/getPosts', {
      page: 1
    })
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
  name: 'PagesIndex',
  components: {
    Pagination
  },
  computed: {
    posts() {
      return this.$store.getters['posts/latest/get'](1)
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
