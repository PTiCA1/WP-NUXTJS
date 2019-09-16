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
@import "~bootstrap/scss/functions";
@import "~assets/css/common/variables";

.tag-list {
  display: flex;
  flex-direction: row;
  padding-left: 0;
  list-style: none;

  a {
    display: inline-block;
    vertical-align: middle;

    color: #fff;
    // color: color-yiq( var(--secondary-color) );
    background: var(--secondary-color);

    font-size: 11px;
    margin: 0 2px;
    padding: .3rem .5rem;
    text-transform: uppercase;
    text-decoration: none;
    transition: opacity .3s;
    font-weight: var(--font-weight-bold);
  }
}
</style>
