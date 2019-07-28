<template>
  <transition name="search-animation">
    <div
      v-if="show"
      :id="ariaControlsName"
      class="search">

      <div class="search__header">
        <div class="search__header--title">Search</div>
        <Close :onClick="toggle" class="search__header--close" />
      </div>

      <form class="search__form">
        <label for="search-input" class="sr-only">Search</label>
        <input type="text" id="search-input" placeholder="Search">
      </form>

      <div class="search__result">
        <ul>
          <li>result</li>
          <li>result</li>
          <li>result</li>
          <li>result</li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

import Close from "~/components/AppIconClose"

export default {
  name: "TheSearch",
  components: {
    Close
  },
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
.search {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 990;
  background: var(--white);

  display: flex;
  flex-direction: column;

  &__header {
    flex: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    border-bottom: solid 1px var(--gray);

    &--title {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--blue);
      text-transform: uppercase;
    }
    &--close {
      margin-left: auto;
    }
  }
  &__form {
    flex: 0;
    padding: 2rem 1rem;
  }
  &__result {
    flex: 1;
  }
}

.search-animation-enter-active, .search-animation-leave-active {
  transition: opacity .4s ease;
}
.search-animation-enter, .search-animation-leave-to {
  opacity: 0;
}

</style>
