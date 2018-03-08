# @title nend example - temperature converter in HTML and JavaScript

Below is a simple temperature conversion app.  The first block contains
some HTML that displays some input fields.

```html
<p>temperature C <input id=tempC type=text></p>
<p>temperature F <input id=tempF type=text></p>
```

The JavaScript code to deal with the values being input in the fields
is below.

```js
const tempC = document.getElementById('tempC')
const tempF = document.getElementById('tempF')

tempC.oninput = function () {
  tempF.value = c2f(tempC.value)
}

tempF.oninput = function () {
  tempC.value = f2c(tempF.value)
}

function c2f (c) {
  return Math.round(c * 9/5 + 32)
}

function f2c (f) {
  return Math.round((f - 32) * 5/9)
}
```
