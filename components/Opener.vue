import { mapMutations } from 'vuex';
<template>
  <article class="opener" :aria-labelledby="`post-id-${post.id}`">

    <header class="opener__header">

      <div class="opener__category">
        <Badge :badge="category" :type="'category'" v-for="category in this.postInCategory" :key="category.id" />
      </div>

      <h2 class="opener--title" :id="`post-id-${post.id}`">
        <nuxt-link :to="`/${post.slug}`">{{ post.title.rendered }}</nuxt-link>
      </h2>
    </header>

    <figure v-if="coverFigure" class="opener--figure">
      <img
        :src="coverFigure['media_details']['sizes']['medium_large'].source_url"
        :alt="coverFigure.alt_text"
        :width="coverFigure['media_details']['sizes']['medium_large'].width"
        :height="coverFigure['media_details']['sizes']['medium_large'].height">
      <!-- <figcaption v-if="coverFigure['caption'].rendered">{{ coverFigure['caption'].rendered | stripHtml }}</figcaption> -->
    </figure>
  </article>
</template>

<script>
import Badge from "~/components/Badge"

export default {
  name: 'Opener',
  props: {
    post: Object
  },
  components: {
    Badge
  },
  computed: {
    coverFigure() {
      const featureMedia = this.post['_embedded']['wp:featuredmedia']
      return featureMedia && !featureMedia[0].data ? featureMedia[0] : false
    },
    postInCategory() {
      return this.post['_embedded']['wp:term'][0]
    },
  }
}
</script>

<style lang="scss" scoped>
.opener {
  display: flex;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
  height: 430px;

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    // z-index: -1;
    // background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.7) 100%);
    background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,.8) 100%);
  }

  &--figure {
    margin: 0;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    // z-index: -2;

    > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__header {
    padding: 2rem;
    z-index: 5;
  }

  &--title {
    font-size: 2rem;
    line-height: 1.3;
    margin-bottom: 0;

    a {
      color: #fff;
      text-decoration: none;

      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
      }
    }
  }
}
</style>
