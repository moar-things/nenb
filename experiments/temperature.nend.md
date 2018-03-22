# @doc
* title nend example - temperature converter in HTML and JavaScript

Below is a simple temperature conversion app.

Enter a temperature in either the C or F fields, and the temperature will be
converted to the other scale.

```html
<p>temperature C <input id=tempC type=text></p>
<p>temperature F <input id=tempF type=text></p>
```

The JavaScript code to deal with the values being input in the fields
is below.

```comment =====================================================================
javascript to implement the temperature converter
```

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
* show

```comment =====================================================================
setting the title with json and js blocks
```

```json
{
  "title": "nend example - temperature converter (updated w/json)"
}
```
* name doc

```js
document.title = data.doc.title
```

```comment =====================================================================
setting the title with toml and js blocks
```

```toml
title2 = "nend example - temperature converter (updated w/toml)"
```
* name doc2

```js
document.title = data.doc2.title2
```
