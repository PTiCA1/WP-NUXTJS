import Vue from 'vue';

Vue.filter('TimeLocale', (value) => {
  let date = new Date(value)
  return date.toLocaleString()
})
