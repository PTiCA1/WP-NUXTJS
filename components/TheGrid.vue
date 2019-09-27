<template>
  <section class="grid">
    <main class="grid__main">
      <slot name="main"></slot>
    </main>
    <aside class="grid__aside">
      <slot name="aside"></slot>
    </aside>
  </section>
</template>

<script>
  export default {
    name: 'TheGrid'
  }
</script>

<style lang="scss">
@import "~assets/css/common/variables";

.grid {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1140px;
  padding-left: var(--grid-spacer);
  padding-top: var(--grid-spacer);
  padding-right: var(--grid-spacer);
  margin-right: auto;
  margin-left: auto;

  &__main {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }

  &__aside {
    flex: 0 0 320px;
    max-width: 320px;
  }
}

</style>
