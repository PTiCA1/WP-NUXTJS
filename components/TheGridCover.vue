<template>
  <section class="grid-cover">
    <main class="grid-cover__main">
      <slot name="main"></slot>
    </main>
    <aside class="grid-cover__aside">
      <slot name="aside"></slot>
    </aside>
  </section>
</template>

<script>
  export default {
    name: 'TheGridCover'
  }
</script>

<style lang="scss">
@import "~assets/css/common/variables";

// @media breakpoints
// @link https://getbootstrap.com/docs/4.3/layout/overview/#responsive-breakpoints
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins/breakpoints";

.grid-cover {
  @include media-breakpoint-up(md) {
    display: flex;
    flex-direction: row;
  }
  width: 100%;
  max-width: var(--breakpoint-xl);
  padding-left: var(--grid-spacer);
  padding-top: var(--grid-spacer);
  padding-right: var(--grid-spacer);

  &__main {
    @include media-breakpoint-up(md) {
      flex-basis: 0;
      flex-grow: 1;
      max-width: 100%;
    }
    @include media-breakpoint-up(lg) {
      padding-right: calc(var(--grid-spacer) * 2);
    }
  }

  &__aside {
    @include media-breakpoint-only(md) {
      flex: 0 0 50%;
      max-width: 50%;
      padding-left: calc(var(--grid-spacer) * 2);
    }
    @include media-breakpoint-up(lg) {
      flex: 0 0 370px;
      max-width: 370px;
    }
  }
}
</style>
