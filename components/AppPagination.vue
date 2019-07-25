<template>
  <nav aria-label="Page navigation" v-if="totalPages >= 1">
    <ul class="pagination">
      <li class="pagination__item" v-if="hasFirst">
        <n-link class="pagination--link" :to="this.prevPage">Newer</n-link>
      </li>
      <li class="pagination__item" v-if="!hasLast">
        <n-link class="pagination--link" :to="this.nextPage">Older</n-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    routeRootName: {
      type: String,
      required: true,
      default: ''
    },
    routeName: {
      type: String,
      required: true,
      default: ''
    },
    routeSlug: {
      type: String,
      required: true,
      default: ''
    },
    pageNumber: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    nextPage() {
      const index = this.pageNumber + 1
      return { name: this.routeName, params: { slug: this.routeSlug, id: index }}
    },
    prevPage() {
      const index = this.pageNumber - 1

      if ( this.pageNumber === 2 ) {
        return { name: this.routeRootName, params: { slug: this.routeSlug }}
      } else {
        return { name: this.routeName, params: { slug: this.routeSlug, id: index }}
      }
    },
    hasFirst() {
      return (this.pageNumber > 1)
    },
    hasLast() {
      return (this.pageNumber === this.totalPages)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-direction: row;

  list-style: none;
  padding-left: 0;
  border: solid 1px #f2f2f2;

  &__item {
    flex: 1 1 percentage($number: 1/2);
    text-align: center;

    & + & {
      border-left: solid 1px #f2f2f2;
    }
  }

  &--link {
    display: block;
    padding: 1rem;
  }
}
</style>
