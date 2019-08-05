<script>
  export default {
    fetch ({ error }) {
      error({ statusCode: 404, message: 'Category not found' })
    }
  }
</script>
