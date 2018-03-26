[source file](../src/examples/using-the-doc-directive.nenb.md)

This file mostly contains typical markdown, but does use a **`doc`**
directive to set the web page title, icon, and add a `<h1>` to the
beginning of the document, with the specified title.

The **`doc`** directive is show below:

# @doc
* title nenb example - using the doc directive
* icon ../images/nenb-icon.png
* bodyTitle
* showDirective

Directives are markdown headers - one `#` character at the start of the line
followed by a whitespace character.
The next token on the line starts with `@` which indicates this is a directive
and not a typical markdown header.  The name of this directive is
**`doc`**.

The **`doc`** directive supports a number of attributes, show above as list items
beneath the directive line.  Attributes used here:

- **`title`**

  This attribute sets the title for the document, in the `<head>` of the
  document.  The default value of the title is the base name of the file name,
  without the extension.

-  **`icon`**

  This attribute sets the icon for the document, in the `<head>` of the
  document.

-  **`bodyTitle`**

  This attribute adds a `<h1>` to the beginning of the document, with the title
  specified in the **`title`** attribute.

- **`showDirective`**

  This attribute will display the source for the directive in the document,
  which is only really useful for nenb documents describing the structure of
  nenb documents, like this one.
