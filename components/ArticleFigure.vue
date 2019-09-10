<template>
  <figure v-if="figure" class="article-figure">
    <img
      :src="figure['media_details']['sizes']['medium_large'].source_url"
      :alt="figure.alt_text"
      :width="figure['media_details']['sizes']['medium_large'].width"
      :height="figure['media_details']['sizes']['medium_large'].height">
    <figcaption>{{ figure['caption'].rendered | stripHtml }}</figcaption>
  </figure>
</template>

<script>
  export default {
    name: 'ArticleFigure',
    props: {
      figure: {
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "~assets/css/common/variables";

.article-figure {
  display: block;
  position: relative;
  margin: 0 0 1rem;
  height: 440px;

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-bottom: .5rem;
    line-height: 1;
  }

  figcaption {
    font-size: 90%;
    p {
      margin: 0;
    }
    // color: #6c757d;
  }
}
</style>
