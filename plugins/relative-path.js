import Vue from 'vue';

Vue.filter('relativePath', (url) => {
  return url.replace(/(.+\w\/)(.+)/,"/$2", '')
})
