import Vue from 'vue';

Vue.filter('stripHtml', (value) => {
  return value.replace(/<\/?[^>]+(>|$)/g, "")
})
