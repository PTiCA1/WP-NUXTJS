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
        <h3><nuxt-link :to="`/${post.slug}`">{{ post.title.rendered }}</nuxt-link></h3>
        <!-- <div class="" v-if="post._embedded['wp:featuredmedia']">
          <img :src="`//www.vw-scene.cz${post._embedded['wp:featuredmedia'][0].source_url}`" alt="" width="120" height="auto">
        </div> -->
      </li>
    </ul>
    <div v-else>no posts</div>

  </div>
</template>

<script>
import Pagination from '~/components/AppPagination'

export default {
  async asyncData( { store, params, route } ) {
    const catId = store.getters['categories/getId']((route.params.slug))

    await store.dispatch('posts/category/getCategoryPosts', {
      slug: route.params.slug,
      categoryId: catId,
      pageId: 1
    })
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
    Pagination
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

<style>
.container {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}
</style>
