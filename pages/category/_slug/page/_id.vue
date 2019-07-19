<template>
  <div class="container">

    <Pagination :categorySlug="this.$route.params.slug" :pageNumber="this.pageId" :numberOfPages="this.totalPages" :routeInfo="this.$route" />

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
  // fetch ({ params, redirect, route }) {
  //   if ( params.id === 1 || `/category/${params.slug}/page`) {
  //     redirect(301, `/category/${params.slug}`)
  //   }

  //   console.log('route: ' + JSON.stringify(route) );
  //   console.log('route path: ' + route.path.replace(/\/$/, '') );

  // },

  // fetch ({ params, redirect, route }) {
  //   // redirect page 1 or /page/
  //   if ( 1 === parseInt( params.id ) || '/page' === route.path.replace(/\/$/, '') ) {
  //     redirect( 301, '/' )
  //   }
  // },
  async asyncData( { store, params, route, redirect } ) {
    await store.dispatch('categories/getCategories')
    const catId = store.getters['categories/getId']((route.params.slug))

    await store.dispatch('posts/category/getCategory', {
      slug: route.params.slug,
      categoryId: catId,
      pageId: route.params.id
    })
  },
  name: "CategoryPageId",
  components: {
    Pagination
  },
  computed: {
    posts() {
      return this.$store.getters['posts/category/get']({
        id: this.$route.params.id,
        name: this.$route.params.slug
      })
    },
    pageId() {
      return Number( this.$route.params.id )
    },
    totalPages() {
      return Number( this.$store.getters['posts/category/totalPages'](this.$route.params.slug) )
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
