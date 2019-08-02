<template>
  <div>
    <Header />
    <nuxt />
    <Search />
  </div>
</template>

<script>
import Header from "~/components/TheHeader"
import Search from "~/components/TheSearch"
export default {
  name: "LayoutDefault",
  components: {
    Header,
    Search
  }
}
</script>


<style lang="scss">
$blue:          #007bff !default;
$purple:        #6f42c1 !default;
$red:           #dc3545 !default;
$orange:        #fd7e14 !default;
$yellow:        #ffc107 !default;
$green:         #28a745 !default;
$white:         #ffffff !default;
$black:         #000000 !default;
$dark:          #343a40 !default;
$gray:          #aaa !default;

$colors: () !default;
// stylelint-disable-next-line scss/dollar-variable-default
$colors: map-merge(
  (
    "blue":       $blue,
    // "purple":     $purple,
    // "red":        $red,
    "orange":     $orange,
    // "yellow":     $yellow,
    // "green":      $green,
    "dark":       $dark,
    "white":      $white,
    "gray":       $gray
  ),
  $colors
);

:root {
  --body-bg:                  #fafafa;
  --body-color:               #555;
  --link-color:               #{$blue};
  --link-color-hover:         #{darken($blue, 10%)};

  --primary-color:            var(--link-color);

  --font-weight-base:         400;
  --line-height-base:         1.5;

  --font-weight-bolder:       700;

  @each $color, $value in $colors {
    --#{$color}: #{$value};
  }

  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
@media (prefers-color-scheme: dark) {
  :root {
    --body-bg:                  #212529;
    --body-color:               #6c757d;
    --link-color:               #dee2e6;
    --link-color-hover:         #fff;
  }
}

//
// Reboot
//
*,
*::before,
*::after {
  box-sizing: border-box;
}

main {
  display: block;
}

body {
  margin: 0;
  font-family: var(--font-family-sans-serif);
  font-size: 1rem;
  font-weight: var(--font-weight-base);
  line-height: var(--line-height-base);
  color: var(--body-color);
  text-align: left;
  background-color: var(--body-bg);
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba($black, 0);
}

//
// Images
//
img {
  vertical-align: middle;
  border-style: none;
}
@media (prefers-color-scheme: dark) {
  img {
    opacity: .75;
    transition: opacity .5s ease-in-out;
  }
  img:hover {
    opacity: 1;
  }
}

//
// Links
//
a {
  color: var(--link-color);
  text-decoration: underline;
  background-color: transparent;

  &:hover {
    color: var(--link-color-hover);
    text-decoration: underline;
  }

  &:not([href]):not([tabindex]) {
    &,
    &:hover,
    &:focus {
      color: inherit;
      text-decoration: none;
      outline: 0;
    }
  }
}

//
// Abbreviations
//
b,
strong {
  font-weight: var(--font-weight-bolder);
}

// Always hide an element with the `hidden` HTML attribute (from PureCSS).
// Needed for proper display in IE 10-.
[hidden] {
  display: none !important;
}
</style>
