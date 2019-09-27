<template>
  <div class="wrap">
    <grid-cover>
      <template v-slot:main>

        <Opener :post="openerPost" />

        <ul v-if="topPosts.length">
          <li v-for="post in topPosts" :key="post.id">

            <Post :post="post" />

          </li>
        </ul>
        <div v-else>no posts</div>

      </template>
      <template v-slot:aside>
        aside
      </template>
    </grid-cover>
    <grid>
      <template v-slot:main>

        <h3>Latest news</h3>
        <ul v-if="latestPosts.length">
          <li v-for="post in latestPosts" :key="post.id">

            <Post :post="post" />

          </li>
        </ul>
        <div v-else>no posts</div>

        <Pagination
          :routeRootName="'index'"
          :routeName="'page-id'"
          :routeSlug="$route.params.slug"
          :pageNumber="1"
          :totalPages="totalPages" />
      </template>
      <template v-slot:aside>
        aside
      </template>
    </grid>

  </div>
</template>

<script>
import GridCover from '~/components/TheGridCover'
import Grid from '~/components/TheGrid'
import Pagination from '~/components/AppPagination'
import Opener from '~/components/Opener'
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
  layout: 'homepage',
  name: 'PagesIndex',
  components: {
    GridCover,
    Grid,
    Pagination,
    Opener,
    Post
  },
  computed: {
    posts() {
      return this.$store.getters['posts/latest/get'](1)
    },
    openerPost() {
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
// @import "~assets/css/components/grid";
</style>
