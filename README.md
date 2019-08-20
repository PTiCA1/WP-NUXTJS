# WP-NUXTJS

> WordPress REST-API + NUXT.JS

## Wordpress REST API Reference
 - [x] Posts
 - [x] Categories
 - [x] Pagination
 - [x] Search
 - [x] Tags
 - [x] Sitemaps (categories + posts)
 - [ ] Pages
 - [ ] Author

 More info: https://developer.wordpress.org/rest-api/

## SEO
 - [x] Vue Meta
 - [ ] Basic SEO module

### INFO
#### Don't see the author's name?
Wordpress add-ons like Wordfence Security prohibit the display of author information in the REST API. To display user information in the REST API, you must enable this feature.
*Enabling this feature is at your own risk*

## Build Setup

``` bash
# install dependencies
$ yarn install

# set wordpress rest api url in file nuxt.config.js
const baseUrl = 'http://demo.wp-api.org/wp-json/wp/v2/'

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project (Dynamic routes will not work when using static hosting)
$ yarn run generate
```
