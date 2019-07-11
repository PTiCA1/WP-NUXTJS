<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="pagination__item" v-if="hasFirst">
        <n-link class="pagination--link" to="/">Back to Homepage</n-link>
      </li>
      <li class="pagination__item" v-else>
        <n-link class="pagination--link" :to="this.prevPage">Previous</n-link>
      </li>
      <li class="pagination__item" v-if="!hasLast">
        <n-link class="pagination--link" :to="this.nextPage">Next</n-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageNumber: {
      type: Number,
      required: true
    },
    numberOfPages: {
      type: Number,
      required: true
    },
    clickHandler: {
      type: Function,
      default: () => { }
    },
  },
  computed: {
    nextPage() {
      const index = this.pageNumber + 1
      return `${this.slugName}${index}`
    },
    prevPage() {
      const index = this.pageNumber - 1
      return `${this.slugName}${index}`
    },
    hasFirst() {
      return (this.pageNumber === 1)
    },
    hasLast() {
      return (this.pageNumber === this.numberOfPages)
    },
    slugName() {
      return  this.$route.path.replace(/(\w+)$/, '');
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
