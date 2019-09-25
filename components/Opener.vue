<template>
  <article class="opener" :aria-labelledby="`post-id-${post.id}`">
    <h2 class="opener--title" :id="`post-id-${post.id}`">
      <nuxt-link :to="`/${post.slug}`">{{ post.title.rendered }}</nuxt-link>
    </h2>

    <figure v-if="coverFigure">
      <img :src="coverFigure.source_url" alt="" width="200">
    </figure>

    <figure v-if="coverFigure" class="opener-figure">
      <div class="opener-figure--box">
        <img
          :src="coverFigure['media_details']['sizes']['medium_large'].source_url"
          :alt="coverFigure.alt_text"
          :width="coverFigure['media_details']['sizes']['medium_large'].width"
          :height="coverFigure['media_details']['sizes']['medium_large'].height">
      </div>
      <figcaption v-if="coverFigure['caption'].rendered">{{ coverFigure['caption'].rendered | stripHtml }}</figcaption>
    </figure>
  </article>
</template>

<script>
  export default {
    name: 'Cover',
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
  position: relative;
  background: #000;
  color: white;
}
</style>
