<template>
  <div>

    <h1>Latest news</h1>

    <Pagination
      :routeRootName="'index'"
      :routeName="'page-id'"
      :routeSlug="this.$route.params.slug"
      :pageNumber="this.pageId"
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
  fetch ({ params, redirect }) {
    if ( params.id === 1 || params.id === "1" ) {
      redirect(301, { name: 'index' })
    }
  },
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
    Pagination,
    Post
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
