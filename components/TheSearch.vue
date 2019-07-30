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
        <label for="search-input">Search</label>
        <input type="text" id="search-input" placeholder="Search" @keyup="searchValue">
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
import _ from 'lodash'

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
    }),
    searchValue: _.debounce(function (event) {
      console.log(event.target.value);
    }, 300)
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

    > label {
      // Bootstrap .sr-only
      // @link https://github.com/twbs/bootstrap/blob/a4a04cd9ec741050390746f8056cc79a9c04c8df/scss/mixins/_screen-reader.scss
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important; // Fix for https://github.com/twbs/bootstrap/issues/25686
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }

    > input {
      display: block;
      padding: 1rem;
      color: var(--dark);
      font-size: 2rem;

      border-style: solid;
      border-color: transparent transparent var(--gray) transparent;
      border-width: 0 0 2px 0;
    }
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
