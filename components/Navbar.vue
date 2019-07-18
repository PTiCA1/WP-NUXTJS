<template>
  <nav class="navbar">

    <Logo />

    <ul>
      <li v-for="category in categories" :key="category.id">
        <n-link :to="{ name: 'category-slug', params: { slug: category.slug }}">
          {{ category.name }}
        </n-link>
      </li>
    </ul>

  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

import Logo from "~/components/AppLogo"

export default {
  name: "Navbar",
  components: {
    Logo
  },
  computed: mapGetters({
    categories: 'categories/get'
  }),
}
</script>

<style lang="scss" scoped>
.navbar {

  &__list {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;

    display: flex;
    flex-direction: row;
  }
}
</style>
