<template>
  <div class="body">

    <section class="opener">
      <Post :post="this.opener" />
    </section>

    <hr>

    <ul v-if="this.topPosts.length">
      <li v-for="post in this.topPosts" :key="post.id">

        <Post :post="post" />

      </li>
    </ul>
    <div v-else>no posts</div>

    <hr>

    <h3>Latest news</h3>
    <ul v-if="this.latestPosts.length">
      <li v-for="post in this.latestPosts" :key="post.id">

        <Post :post="post" />

      </li>
    </ul>
    <div v-else>no posts</div>

    <Pagination
      :routeRootName="'index'"
      :routeName="'page-id'"
      :routeSlug="this.$route.params.slug"
      :pageNumber="1"
      :totalPages="this.totalPages" />

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
    opener() {
      return this.posts.slice(0, 1)[0]
    },
    topPosts() {
      return this.posts.slice(1, 3)
    },
    latestPosts() {
      return this.posts.slice(3)
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
