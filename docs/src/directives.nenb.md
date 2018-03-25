# @doc
* title nenb directives
* bodyTitle
* icon images/nenb-icon.png

<img width=64 src="images/nenb-icon.png" style="position:absolute; top:10px; right:10px;">

Atx-style h1 headers (ie, lines that start with a single `#`) whose first
character of the heading test start with `@` are **directives**. The first
"word" indicates the directive.

Immediately following lines that start with `*` (ie, list items), specify
**attributes**.  Attributes are parsed as the first word after the `*` as the
attribute name, and the remainder of the line as the attribute value.

The rest of the **directive** line, if any, is also parsed as an **attribute**.

All **directive**s support the `showDirective` attribute, which will end up
rendering the source of the directive in the rendered HTML document.

The following directives are available:

---

## `# @comment`

The **@comment** directive will generate HTML comments for the specified attributes.

---

## `# @doc`

The **@doc** directive applies document-specific settings to the generated HTML
file.

**attributes**

### `title`

The value of the `title` attribute specifies the title used with the rendered
HTML document.

### `icon`

The value of the `icon` attribute specifies the icon used with the rendered
HTML document.

### `bodyTitle`

The value of the `bodyTitle` attribute specifies that an `h1` element will
be generated at the beginning of the document with the same value as the
`title` attribute.
