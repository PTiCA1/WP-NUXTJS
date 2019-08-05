<template>
  <div class="container">
    {{error.message}}
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-if="error.statusCode === 400">Error 400</h1>
    <h1 v-if="error.statusCode === 500">Error 500</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
