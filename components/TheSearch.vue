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

      <form class="search__form" @submit="sendForm">
        <label for="search-input">Search</label>
        <input type="text" id="search-input" placeholder="Search" @keyup="searchValue">

        <svg class="loading" v-show="this.$nuxt.$loading.show" width="40px"  height="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <circle cx="50" cy="50" fill="none" stroke-linecap="round" r="27" stroke-width="4" stroke="#e74c3c" stroke-dasharray="42.411500823462205 42.411500823462205" transform="rotate(60 50 50)">
            <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
          </circle>
        </svg>
      </form>

      <div class="search__result">
        <div class="search-info" v-if="!posts.length">{{ emptySearch }}</div>

        <ul v-if="posts.length">
          <li v-for="post in posts" :key="post.id">
            <n-link :to="post.url | relativePath" @click.native="toggle">
              {{ post.title }}
            </n-link>
          </li>
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
  data() {
    return {
      loading: false,
      emptySearch: 'Enter the search word',
      posts: []
    }
  },
  components: {
    Close
  },
  computed: {
    ...mapGetters({
      show: 'search/show',
      ariaControlsName: 'search/ariaControlsName'
    }),
    // loadingIndicator: this.$nuxt.$loading.show
  },
  methods: {
    ...mapMutations({
      toggle: 'search/toggle'
    }),
    searchValue: _.debounce(async function (event) {
      this.posts = []
      const value = event.target.value
        .toLowerCase()
        .replace(/[^a-z0-9À-ž]+/g,',')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

      if ( event.target.value.length >= 3 ) {
        const response = await this.$axios.$get(
          `search?search=${event.target.value}`
        );
        this.posts = response
        this.emptySearch = 'No results'
      } else {
        this.emptySearch = 'Minimum 3 characters'
      }
    }, 400),
    sendForm(e) {
      e.preventDefault();
    }
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
    position: relative;

    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;

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
      width: 100%;

      border-style: solid;
      border-color: transparent transparent var(--gray) transparent;
      border-width: 0 0 2px 0;
    }
  }

  &__result {
    flex: 1;
  }
}

.search-info {
  text-align: center;
  color: var(--orange);
}

.loading {
  position: absolute;
  right: 1.5rem;
  top: 2.9rem;
}

.search-animation-enter-active, .search-animation-leave-active {
  transition: opacity .4s ease;
}
.search-animation-enter, .search-animation-leave-to {
  opacity: 0;
}

</style>
