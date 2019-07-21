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
  fetch ({ params, redirect }) {
    if ( params.id === 1 || params.id === "1" ) {
      redirect(301, { name: 'category-slug', params: { slug: params.slug }})
    }
  },
  async asyncData({ store, params, route, redirect }) {
    const catId = store.getters['categories/getId']((route.params.slug))

    await store.dispatch('posts/category/getCategory', {
      slug: route.params.slug,
      categoryId: catId,
      pageId: route.params.id
    })
  },
  validate ({ params, query, store }) {
    // const totalPages = store.getters['posts/category/totalPages'](params.slug)
    // Check if `params.id` is an existing category


    const paramsSlug = params.slug
    const postsInCategory = store.state.categories.items.filter(item => item.slug === paramsSlug)[0].count
    const postsPerPage = store.state.posts.postPerPage
    console.log(postsInCategory + ' ' + postsPerPage);
    console.log( (postsInCategory/postsPerPage) );

    // const paramsId = params.id
    // console.log('tet' + JSON.stringify(store.state.posts.category.name));
    // // return store.state.posts.category.name[params.slug].some((category) => category.id === params.id)


    return true

    // throw new Error('Under Construction!')

    // return store.state.categories.some((category) => category.id === params.id)
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
