<template>
  <article>
    <h1 class="title" v-html="post.title.rendered"></h1>

    <time class="updated" :datetime="post.date">{{post.date | TimeLocale}}</time>

    <div class="author" v-if="postAuthor" :title="postAuthor.description">
      {{postAuthor.name}}
    </div>

    <div class="category" v-for="category in postInCategory" :key="category.id">
      <n-link :to="{ name: 'category-slug', params: { slug: category.slug }}">
        {{ category.name }}
      </n-link>
    </div>

    <ul class="tag" v-for="tag in postTags" :key="tag.id">
      <li>
        {{ tag.name }}
      </li>
      <!-- <n-link :to="{ name: 'category-slug', params: { slug: category.slug }}">
        {{ tag.name }}
      </n-link> -->
    </ul>


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
  async asyncData( { store, params, route } ) {
    const post = route.params.slug
    await store.dispatch('posts/all/getPost', {
      postSlug: route.params.slug
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
      return this.post['_embedded']['wp:featuredmedia'][0]
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
