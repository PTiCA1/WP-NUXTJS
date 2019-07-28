<template>
  <button
    role="button"
    class="icon-search"
    :class="show ? 'is-open' : null"
    :aria-expanded="show ? 'true' : 'false'"
    :aria-controls="ariaControlsName"
    aria-label="Toggle search"
    @click="toggle">
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.427 21.427a8.5 8.5 0 1 1 2-2l5.585 5.585c.55.55.546 1.43 0 1.976l-.024.024a1.399 1.399 0 0 1-1.976 0l-5.585-5.585zM14.5 21a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z" fill="#157EFB" fill-rule="evenodd"/>
    </svg>
  </button>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: "AppIconSearch",
  computed: mapGetters({
    show: 'search/show',
    ariaControlsName: 'search/ariaControlsName'
  }),
  methods: {
    ...mapMutations({
      toggle: 'search/toggle'
    })
  }
}
</script>

<style lang="scss" scoped>
$icon-search-size:          24px !default;

.icon-search {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 0 none;
  margin-left: auto;
  margin-right: 1rem;
  padding: .5rem;

  > svg {
    width: $icon-search-size;
    height: $icon-search-size;

    > path {
      fill: var(--gray);
    }
  }

  &:hover {
    > svg > path {
      fill: var(--link-color);
    }
  }
}
</style>
