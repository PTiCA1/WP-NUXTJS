<template>
  <header class="header">
    <Navbar />
  </header>
</template>

<script>
import Navbar from "~/components/Navbar"

export default {
  name: "TheHeader",
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
}
</style>
