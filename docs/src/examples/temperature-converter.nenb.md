# @doc
* title nenb example - temperature converter in HTML and JavaScript
* bodyTitle
* icon ../images/nenb-icon.png

[source file](../src/examples/temperature-converter.nenb.md)

This page provides is a simple temperature conversion app.

Enter a value in either the "temperature C" or "temperature F" input field, and
the value for the other temperature scale will be calculated.

The html block below provides the two input fields.

```html
<p>temperature C <input id=tempC type=number></p>
<p>temperature F <input id=tempF type=number></p>
```
* show

The JavaScript code below deals with the values being input in the fields.

# @comment =====================================================================
# @comment javascript to implement the temperature converter

```js
const tempC = document.getElementById('tempC')
const tempF = document.getElementById('tempF')

tempC.oninput = function () { tempF.value = c2f(tempC.value) }
tempF.oninput = function () { tempC.value = f2c(tempF.value) }

function c2f (c) { return Math.round(c * 9/5 + 32) }
function f2c (f) { return Math.round((f - 32) * 5/9) }
```
* show
