<template>
  <button 
    role="button" 
    class="icon-close" 
    @click.prevent="onClick">
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M437.5 386.6L306.9 256l130.6-130.6c14.1-14.1 14.1-36.8 0-50.9-14.1-14.1-36.8-14.1-50.9 0L256 205.1 125.4 74.5c-14.1-14.1-36.8-14.1-50.9 0-14.1 14.1-14.1 36.8 0 50.9L205.1 256 74.5 386.6c-14.1 14.1-14.1 36.8 0 50.9 14.1 14.1 36.8 14.1 50.9 0L256 306.9l130.6 130.6c14.1 14.1 36.8 14.1 50.9 0 14-14.1 14-36.9 0-50.9z"/>
    </svg>
  </button>
</template>

<script>
export default {
  name: "IconClose",
  props: {
    onClick: {
      type: Function
    }
  }
}
</script>

<style lang="scss" scoped>
$icon-close-size:          1rem !default;

.icon-close {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 0 none;
  padding: .5rem;

  > svg {
    display: block;
    width: $icon-close-size;
    height: $icon-close-size;

    > path {
      fill: var(--gray);
    }
  }
}
</style>