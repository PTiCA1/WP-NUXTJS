<template>
  <div class="container">

    pages/category/_slug/index

    <div>
      {{$route.params.slug}}
      {{this.caregoryId}}
    </div>

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
  async asyncData( { store, params, route } ) {
    await store.dispatch('categories/getCategories')
    const catId = store.getters['categories/getId']((route.params.slug))

    await store.dispatch('posts/category/getCategory', {
      slug: route.params.slug,
      categoryId: catId,
      pageId: 1
    })
  },
  head() {
    return {
      title: '',
      titleTemplate: null,
      bodyAttrs: {
        class: `archive category category-${this.caregoryId} category-${this.$route.params.slug}`
      },
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  name: "categorySlug",
  components: {
    // Pagination
  },
  computed: {
    // posts() {
    //   return this.$store.getters['posts/category/get'](1)
    // },
    caregoryId() {
      return this.$store.getters['categories/getId']((this.$route.params.slug))
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
