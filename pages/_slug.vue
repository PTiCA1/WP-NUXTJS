<template>
  <article class="container" :aria-labelledby="`post-detail-id-${post.id}`">
    <h1 class="title" v-html="post.title.rendered" :id="`post-detail-id-${post.id}`"></h1>

    <time class="updated" :datetime="post.date">{{post.date | TimeLocale}}</time>

    <div class="author" v-if="postAuthor" :title="postAuthor.description">
      {{postAuthor.name}}
    </div>

    <div class="category" v-for="category in postInCategory" :key="category.id">
      <n-link :to="{ name: 'category-slug', params: { slug: category.slug }}">
        {{ category.name }}
      </n-link>
    </div>

    <ul class="tag" v-if="postTags">
      <li v-for="tag in postTags" :key="tag.id">
        <n-link :to="{ name: 'tag-slug', params: { slug: tag.slug }}">
          {{ tag.name }}
        </n-link>
      </li>
    </ul>

figure
    <figure v-if="postFigure">
      <img
        :src="postFigure['media_details']['sizes']['default-wp-medium'].source_url"
        :alt="postFigure.alt_text"
        :width="postFigure['media_details']['sizes']['default-wp-medium'].width"
        :height="postFigure['media_details']['sizes']['default-wp-medium'].height">
      <figcaption v-html="postFigure['caption'].rendered"></figcaption>
    </figure>

    <div v-html="post['content'].rendered"></div>
  </article>
</template>

<script>
export default {
  async asyncData( { store, params, route, error } ) {
    await store.dispatch('posts/all/getPost', {
      postSlug: route.params.slug,
      postError: error
    })
  },
  head() {
    return {
      title: `${this.post.title.rendered}`,
      bodyAttrs: {
        class: `single single-${this.post.type} single-format-${this.post.format} postid-${this.post.id} ${this.post.slug}`
      },
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  name: "PostPage",
  computed: {
    post() {
      return this.$store.getters['posts/all/getPost'](this.$route.params.slug)[0]
    },
    postAuthor() {
      return this.post['_embedded'].author[0]
    },
    postFigure() {
      const featureMedia = this.post['_embedded']['wp:featuredmedia']
      return ( typeof featureMedia == 'undefined' ) ? false : featureMedia[0].source_url ? featureMedia[0] : false
    },
    postInCategory() {
      return this.post['_embedded']['wp:term'][0]
    },
    postTags() {
      return this.post['_embedded']['wp:term'][1]
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}
</style>
