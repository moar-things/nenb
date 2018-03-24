# @doc
* title nenb example - setting the document title with data
* bodyTitle
* icon ../images/nenb-icon.png

# @comment =====================================================================
# @comment setting the title with json and js blocks

The following block contains JSON data which will be used in a later block.
In this case, the object in the fence block will be stored in a data property
named `doc`.  The block's source is displayed since the block attribute `show`
is set on the block.

```json
{
  "title": "nenb example - set-title-with-data (updated w/json)"
}
```
* name doc
* show

The full source for the block is show below.

<pre class=nenb>
    ```json
    {
      "title": "nenb example - set-title-with-data (updated w/json)"
    }
    ```
    * name doc
    * show
</pre>

The block below uses the data stored by the `json` block above to set the
window title.

```js
document.title = data.doc.title
```
* show

# @comment =====================================================================
# @comment setting the title with toml and js blocks

This is the same data as from the `json` block above, but in [`toml`][toml]
format.

[toml]: https://github.com/toml-lang/toml

```toml
title2 = "nenb example - set-title-with-data (updated w/toml)"
```
* name doc2
* show

Again, a JavaScript block is used to set the title from a data block previously
set in the document.

```js
document.title = data.doc2.title2
```
* show
