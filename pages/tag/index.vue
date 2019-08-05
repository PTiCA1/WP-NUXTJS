<script>
  export default {
    fetch ({ error }) {
      error({ statusCode: 404, message: 'Tag not found' })
    }
  }
</script>
