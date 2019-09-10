<template>
  <div class="wrap">
    <Header />
    <section class="grid">
      <main class="grid__main">
        <nuxt />
      </main>
      <aside class="grid__aside">
        aside
      </aside>
    </section>
    <Search />
  </div>
</template>

<script>
import Header from "~/components/TheHeader"
import Search from "~/components/TheSearch"
export default {
  name: "LayoutDefault",
  components: {
    Header,
    Search
  }
}
</script>


<style lang="scss">
@import '~assets/css/main';
@import "~assets/css/components/grid";
</style>
