<script>
  export default {
    fetch ({ params, redirect }) {
      redirect(301, { name: 'category-slug', params: { slug: params.slug }})
    },
  }
</script>
