<template>
  <ul class="tag-list">
    <li v-for="tag in tags" :key="tag.id">
      <n-link :to="{ name: 'tag-slug', params: { slug: tag.slug }}">
        {{ tag.name }}
      </n-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TagList",
  props: {
    tags: Array
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/css/common/variables";

.tag-list {
  display: flex;
  flex-direction: row;
  padding-left: 0;
  list-style: none;
  margin: 0 0 1rem;

  a {
    display: block;
    font-size: var(--tag-font-size);
    margin: 0 .125rem;
    padding: .3rem .5rem;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: var(--font-weight-bold);
    color: var(--tag-color);
    background: var(--tag-bg);
    &:hover {
      color: var(--tag-color-hover);
      background: var(--tag-bg-hover);
    }
  }
}
</style>
