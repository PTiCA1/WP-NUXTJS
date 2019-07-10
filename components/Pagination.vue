<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="pagination__item">
        <n-link class="pagination--link" :to="this.prevPage">Previous {{this.prevPage}}</n-link>
      </li>
      <li class="pagination__item" v-if="!hasLast">
        <n-link class="pagination--link" :to="this.nextPage">Next {{this.nextPage}}</n-link>
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
      pageTotalNumber: {
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
        let val = this.pageNumber > 1 ? (this.pageNumber + 1) : '/'

        return val === '/' ? `/` : `/page/${val}`
      },
      prevPage() {
        const prevIndex = this.pageNumber - 1
        const val = prevIndex === 1 ? '/' : `/page/${prevIndex}`
        return val
      },
      hasLast() {
        return (this.pageNumber === this.pageTotalNumber)
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
