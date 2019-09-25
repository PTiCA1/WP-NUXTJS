import { mapMutations } from 'vuex';
<template>
  <article class="opener" :aria-labelledby="`post-id-${post.id}`">
    <h2 class="opener--title" :id="`post-id-${post.id}`">
      <nuxt-link :to="`/${post.slug}`">{{ post.title.rendered }}</nuxt-link>
    </h2>

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
export default {
  name: 'Opener',
  props: {
    post: Object
  },
  computed: {
    coverFigure() {
      const featureMedia = this.post['_embedded']['wp:featuredmedia']
      return featureMedia && !featureMedia[0].data ? featureMedia[0] : false
    }
  }
}
</script>

<style lang="scss" scoped>
.opener {
  display: flex;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
  height: 480px;

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.7) 100%);
  }

  &--figure {
    margin: 0;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -2;

    > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &--title {
    margin: 0;
    padding: 2rem;

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
        z-index: 20;
      }
    }
  }
}
</style>
