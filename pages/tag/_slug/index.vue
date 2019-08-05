<template>
  <div class="container">

    <h1>{{pageSlug}}</h1>

  </div>
</template>

<script>
export default {
  head() {
    return {
      // title: this.categoryTitle,
      titleTemplate: null,
      bodyAttrs: {
        // class: `archive category category-${this.caregoryId} category-${this.pageSlug}`
      },
      meta: [
        // { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  name: "tagSlug",
  components: {

  },
  data() {
    return {
      pageSlug: this.$route.params.slug
    }
  },
  computed: {

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
