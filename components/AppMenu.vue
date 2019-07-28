<template>
  <ul class="menu">
    <li class="menu__item" v-for="category in categories" :key="category.id">
      <n-link class="menu--link" :to="{ name: 'category-slug', params: { slug: category.slug }}">
        {{ category.name }}
      </n-link>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Menu",
  computed: mapGetters({
    categories: 'categories/get'
  }),
}
</script>

<style lang="scss" scoped>
.menu {
  padding-left: 0;
  margin: 0;
  list-style: none;

  display: flex;
  flex-direction: row;

  &__item {
    & + & {
      margin-left: .5rem;
    }
  }

  &--link {
    display: block;
    padding: .5rem;

    color: var(--dark);
    text-decoration: none;
    font-size: .9rem;
    letter-spacing: -.2px;

    &:hover {
      color: var(--link-color-hover);
    }
    &.nuxt-link-active {
      color: var(--link-color);
    }
  }
}
</style>
