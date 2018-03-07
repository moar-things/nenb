```html
<p>temperature C <input id=tempC type=text></p>
<p>temperature F <input id=tempF type=text></p>
```

# !block 

```

```jsx
<h1>
  Hello, {user)}!
</h1>
```

header
================================================================================

header
--------------------------------------------------------------------------------

# !block name=temperature.js show=false
# !block name=temperature.js show=false

block name=temperature.js show=false
================================================================================

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
