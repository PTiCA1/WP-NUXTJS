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
  background: var(--white);
  box-shadow: 0 0 2rem rgba(0,0,0,.15);

  position: sticky;
  top: 0;
}
</style>
