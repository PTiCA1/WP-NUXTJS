<template>
  <div class="container">

    <h1>{{ this.categoryTitle }}</h1>

    <Pagination
      :routeRootName="'category-slug'"
      :routeName="'category-slug-page-id'"
      :routeSlug="this.pageSlug"
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
  async asyncData( { store, params, route, error } ) {
    const catId = store.getters['categories/getId']((route.params.slug))

    // if the category ID does not exist, I tag the page with 404
    if ( catId ) {
      await store.dispatch('posts/category/getCategoryPosts', {
        slug: route.params.slug,
        categoryId: catId,
        pageId: 1
      })
    } else {
      error({ statusCode: 404, message: 'Category not found' })
    }
  },
  head() {
    return {
      title: this.categoryTitle,
      titleTemplate: null,
      bodyAttrs: {
        class: `archive category category-${this.caregoryId} category-${this.pageSlug}`
      },
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  name: "categorySlug",
  components: {
    Pagination,
    Post
  },
  data() {
    return {
      pageSlug: this.$route.params.slug
    }
  },
  computed: {
    posts() {
      return this.$store.getters['posts/category/get']({
        id: 1,
        name: this.pageSlug
      })
    },
    caregoryId() {
      return this.$store.getters['categories/getId']((this.pageSlug))
    },
    totalPages() {
      return Number( this.$store.getters['posts/category/totalPages'](this.pageSlug) )
    },
    categoryTitle() {
      return this.$store.getters['categories/getTitle']((this.pageSlug))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}
</style>
