# @doc
* title nenb example - temperature converter in Vue
* bodyTitle
* icon ../images/nenb-icon.png

[source file](../src/examples/temperature-converter-vue.nenb.md)

This page provides a simple temperature conversion app using Vue.

Enter a value in either the "temperature C" or "temperature F" input field, and
the value for the other temperature scale will be calculated.

<!-- ======================================================================= -->

Vue / HTML template used to create the compoent

```html
<div id="my-vue-app">
  <p>temperature C <input v-model=tempC @change="c2f()" @input="c2f()" type=number></p>
  <p>temperature F <input v-model=tempF @change="f2c()" @input="f2c()" type=number></p>
</div>
```
* name myVueTemplate
* dataOnly
* showAll

<!-- ======================================================================= -->

JavaScript to create the vue component.

```js
const Vue = require('vue/dist/vue.common.js')

Vue.config.devtools = true

var app = new Vue({
  el: '#my-vue-target-element',
  data: {
    tempC: 0,
    tempF: 0
  },
  methods: {
    c2f: function () { this.tempF = Math.round((this.tempC * 9/5) + 32) },
    f2c: function () { this.tempC = Math.round((this.tempF - 32) * 5/9) }
  },
  template: data.myVueTemplate
})

```
* module
* showAll

<!-- ======================================================================= -->

HTML defining the location of the Vue component

```html
<div id="my-vue-target-element"></div>
```
* showAll
