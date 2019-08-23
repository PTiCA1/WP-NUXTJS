<template>
  <div class="container">

    <h1>{{ this.categoryTitle }}</h1>

    <Pagination
      :routeRootName="'category-slug'"
      :routeName="'category-slug-page-id'"
      :routeSlug="this.pageSlug"
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
      redirect(301, { name: 'category-slug', params: { slug: params.slug }})
    }
  },
  async asyncData({ store, params, route, redirect }) {
    const catId = store.getters['categories/getId']((route.params.slug))

    await store.dispatch('posts/category/getCategoryPosts', {
      slug: route.params.slug,
      categoryId: catId,
      pageId: route.params.id
    })
  },
  validate ({ params, query, store }) {
    const postsInCategory = store.state.categories.items.filter(item => item.slug === params.slug)[0].count
    const postsPerPage = store.state.posts.postPerPage
    const pages = Math.ceil(postsInCategory/postsPerPage)

    return (params.id > pages || params.id <= 0) ? false : true
  },
  head() {
    return {
      title: this.categoryTitle,
      titleTemplate: null,
      bodyAttrs: {
        class: `archive category category-${this.caregoryId} paged paged-${this.$route.params.id} category-${this.pageSlug} category-paged-${this.$route.params.id}`
      },
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  name: "TagPageId",
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
        id: this.$route.params.id,
        name: this.pageSlug
      })
    },
    pageId() {
      return Number( this.$route.params.id )
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
