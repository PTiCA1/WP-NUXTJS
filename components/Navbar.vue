<template>
  <nav class="navbar">
    <Logo />
    <Menu />
    <IconSearch />
  </nav>
</template>

<script>
import Logo from "~/components/AppLogo"
import Menu from "~/components/AppMenu"
import IconSearch from "~/components/AppIconSearch"

export default {
  name: "Navbar",
  components: {
    Logo,
    Menu,
    IconSearch
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
