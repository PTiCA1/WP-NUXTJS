<template>
  <container>
    <Header />
    <nuxt />
    <Search />
  </container>
</template>

<script>
import Container from "~/components/TheContainer"
import Header from "~/components/TheHeader"
import Search from "~/components/TheSearch"

export default {
  name: "LayoutDefault",
  components: {
    Container,
    Header,
    Search
  }
}
</script>

<style lang="scss">
@import '~assets/css/main';
</style>
