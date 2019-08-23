<template>
  <div class="body">

    <section class="opener">
      dfasdf
    </section>

    <h1>Latest news</h1>

    <Pagination
      :routeRootName="'index'"
      :routeName="'page-id'"
      :routeSlug="this.$route.params.slug"
      :pageNumber="1"
      :totalPages="this.totalPages" />

    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.id">

        <Post :post="post" />

      </li>
    </ul>
    <div v-else>no posts</div>

  </div>
</template>

<script>
import Pagination from '~/components/AppPagination'
import Post from '~/components/Post'

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
    Pagination,
    Post
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

<style lang="scss" scoped>
.body {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}
</style>
