<template>
  <n-link to="/" class="logo">{{this.$store.state.siteName}}</n-link>
</template>

<script>
export default {
  name: "AppLogo"
}
</script>

<style lang="scss" scoped>
.logo {
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;

  background: var(--primary-color);
  color: var(--white);
  display: inline-block;
  padding: .8rem 1.2rem;
  margin-right: 1rem;
}
</style>
