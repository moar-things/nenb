# @doc
* title nenb example - temperature converter in HTML and JavaScript

Below is a simple temperature conversion app.

Enter a temperature in either the C or F fields, and the temperature will be
converted to the other scale.

```html
<p>temperature C <input id=tempC type=text></p>
<p>temperature F <input id=tempF type=text></p>
```

The JavaScript code to deal with the values being input in the fields
is below.

# @comment =====================================================================
# @comment javascript to implement the temperature converter

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

# @comment =====================================================================
# @comment setting the title with json and js blocks

```json
{
  "title": "nenb example - temperature converter (updated w/json)"
}
```
* name doc

```js
document.title = data.doc.title
```

# @comment =====================================================================
# @comment setting the title with toml and js blocks

```toml
title2 = "nenb example - temperature converter (updated w/toml)"
```
* name doc2

```js
document.title = data.doc2.title2
```

# @comment =====================================================================
# @comment table that has no use

# sample table

```markdown
sample table

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```
* show