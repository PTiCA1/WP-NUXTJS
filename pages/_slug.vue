<template>
  <article :aria-labelledby="`post-detail-id-${post.id}`" class="article">

    <h1 class="article--title" v-html="post.title.rendered" :id="`post-detail-id-${post.id}`"></h1>

    <div class="article__info">
      <div class="article__info--author" v-if="postAuthor.description" :title="postAuthor.description">
        {{postAuthor.name}}
      </div>
      <time class="article__info--date" :datetime="post.date">{{post.date | TimeLocale}}</time>
      <div class="article__info--category" v-for="category in postInCategory" :key="category.id">
        <n-link :to="{ name: 'category-slug', params: { slug: category.slug }}">
          {{ category.name }}
        </n-link>
      </div>
    </div>

    <div class="article__box">
      <ArticleFigure :figure="postFigure" />
      <div class="article__box--tags">
        <Badge :badge="tags" :type="'tag'" v-for="tags in this.postTags" :key="tags.id" />
      </div>
    </div>

    <div class="article__body" v-html="post['content'].rendered"></div>
  </article>
</template>

<script>
import ArticleFigure from '~/components/ArticleFigure'
import Badge from "~/components/Badge"

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
  components: {
    ArticleFigure,
    Badge
  },
  computed: {
    post() {
      return this.$store.getters['posts/all/getPost'](this.$route.params.slug)[0]
    },
    postAuthor() {
      return this.post['_embedded'].author[0]
    },
    postFigure() {
      const featureMedia = this.post['_embedded']['wp:featuredmedia']
      return featureMedia && !featureMedia[0].data ? featureMedia[0] : false
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
@import "~assets/css/common/variables";

.article {
  margin-bottom: 2rem;

  &--title {
    margin-top: 0;
    margin-bottom: .25em;
    letter-spacing: -.03em;
    line-height: 1.15;
    font-weight: var(--font-weight-bolder);
    color: var(--font-title-color);

    font-size: 2rem;
    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
    @media (min-width: 1024px) {
      font-size: 3rem;
    }
  }

  &__info {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
    font-size: .875rem;

    &--author,
    &--date,
    &--category {
      margin-right: 1rem;
    }
  }

  &__box {
    position: relative;

    &--tags {
      position: absolute;
      left: 1rem;
      top: 1rem;
    }
  }

  &__body {
    max-width: 600px;
    margin: auto;
  }
}
</style>
