<template>
  <figure v-if="figure" class="article-figure">
    <img
      :src="figure['media_details']['sizes']['medium_large'].source_url"
      :alt="figure.alt_text"
      :width="figure['media_details']['sizes']['medium_large'].width"
      :height="figure['media_details']['sizes']['medium_large'].height">
    <figcaption class="article-figure--caption" v-if="figure['caption'].rendered">{{ figure['caption'].rendered | stripHtml }}</figcaption>
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
  }

  &--caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 90%;
    padding: .8rem 1rem;
    text-align: right;
    background: linear-gradient(to bottom, rgba(#000, 0) 0%, rgba(#000, .9) 100%);
    color: #fff;
  }
}
</style>
