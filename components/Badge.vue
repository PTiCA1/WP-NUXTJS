<template>
  <n-link class="badge" :to="{ name: this.badgeType, params: { slug: badge.slug }}">
    {{ badge.name }}
  </n-link>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    badge: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'tag'
    }
  },
  computed: {
    badgeType() {
      return this.type === 'category' ? 'category-slug' : 'tag-slug'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/css/common/variables";

.badge {
  font-family: var(--font-family-monospace);
  display: inline-block;
  font-size: var(--tag-font-size);
  margin-left: .125rem;
  margin-right: .125rem;
  padding: .5rem .7rem .4rem;
  text-transform: uppercase;
  text-decoration: none;
  // font-weight: var(--font-weight-bold);
  color: var(--tag-color);
  background: var(--tag-bg);
  line-height: 1;

  &[href] {
    // background: rgba(var(--tag-bg), .4);

    &:hover {
      color: var(--tag-color-hover);
      background: var(--tag-bg-hover);
    }
  }

  .opener & {
    margin-bottom: .5rem;
    position: relative;
    z-index: 20;
  }
}
</style>
