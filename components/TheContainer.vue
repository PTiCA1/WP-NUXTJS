<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TheContainer'
}
</script>

<style lang="scss" scoped>
@import "~assets/css/common/variables";

// [1]  Max container width by bootstrap
//      @link https://getbootstrap.com/docs/4.3/layout/grid/#grid-options

.container {
  width: 100%;
  max-width: var(--breakpoint-xl); // [1]
  margin: 2rem auto 0;
  background: var(--container-bg);
  border: 1px solid rgba(130, 130, 130, 0.1);
}
</style>
