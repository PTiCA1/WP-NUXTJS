<template>
  <div class="container">

    <h1>{{ this.tagTitle }}</h1>

    <Pagination
      :routeRootName="'tag-slug'"
      :routeName="'tag-slug-page-id'"
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
      redirect(301, { name: 'tag-slug', params: { slug: params.slug }})
    }
  },
  async asyncData( { store, params, route, error } ) {
    await store.dispatch('posts/tag/getTagPosts', {
      slug: route.params.slug,
      pageId: route.params.id,
      tagError: error
    })
  },
  head() {
    return {
      title: this.tagTitle,
      titleTemplate: null,
      bodyAttrs: {
        class: `archive paged tag tag-${this.pageSlug} tag-${this.tagId} paged-${this.pageId} tag-paged-${this.pageId}`
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
      return this.$store.getters['posts/tag/get']({
        id: this.$route.params.id,
        name: this.pageSlug
      })
    },
    pageId() {
      return Number( this.$route.params.id )
    },
    totalPages() {
      return Number( this.$store.getters['posts/tag/totalPages'](this.pageSlug) )
    },
    tagId() {
      return this.$store.getters['posts/tag/getId']((this.pageSlug))
    },
    tagTitle() {
      return this.$store.getters['posts/tag/getTitle']((this.pageSlug))
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
