# @doc
* title nenb blocks
* bodyTitle
* icon images/nenb-icon.png

<img width=64 src="images/nenb-icon.png" style="position:absolute; top:10px; right:10px;">

Fenced code **blocks** (ie, lines that start with <tt>\`\`\`</tt> up to lines
ending with a line that starts with <tt>\`\`\`</tt>) are handled specially.

The string immediately following the <tt>\`\`\`</tt> on the first line indicates
the language of the **block**.

Immediately following lines that start with `*` (ie, list items), specify
**attributes**.  Attributes are parsed as the first word after the `*` as the
attribute name, and the remainder of the line as the attribute value.

All **blocks** support the `show` property, which will end up rendering the
block in generated HTML.

The following languages have special support.

---

## comment

Used for multi-line comments.

---

## css

Used for css that will be rendered into the generated HTML.

---

## html

Used for html that will be rendered into the generated HTML.

---

## js

Used for JavaScript that will be rendered into the generated HTML.

---

## json

Used for data that will be added to the global `data` object, at the specified
`name` attribute.

---

## markdown

Used for content that will be rendered as Markdown content.

---

## toml

Used for data that will be added to the global `data` object, at the specified
`name` attribute.

The data is parsed as [toml][].

[toml]: https://github.com/toml-lang/toml

---

## txt

Used for content that will be rendered as plain text content.
