<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="pagination__item">
        <n-link class="pagination--link" :to="`/page/${pageCount - 1}`">Previous {{pageCount - 1}}</n-link>
      </li>
      <li class="pagination__item">
        <n-link class="pagination--link" :to="`/page/${pageCount + 1}`">Next {{pageCount + 1}}</n-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: "Pagination",
    props: {
      pageCount: {
        type: Number,
        required: true
      },
      pageTotalCount: {
        type: Number,
        required: true
      },
      clickHandler: {
        type: Function,
        default: () => { }
      },
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
