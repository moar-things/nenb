# @doc
* title nenb - Non-Editable Note Book
* icon images/nenb-icon.png

<div style="float:right; margin-left:1em;">
  <a href="https://github.com/nenb">
    <img width=32 src="images/nenb-icon.png">
  </a>

  <p></p>

  <a href="https://github.com/nenb">
    <img width=32 src="images/GitHub-Mark-120px-plus.png">
  </a>
</div>

<h1>nenb - Non-Editable Note Book</h1>

Programmable, editable online notebooks are awesome. Like
[Mathematica][], [TiddlyWiki][], [Jupyter][], [Runkit][], and
[Observable].  I do find the "online editing" experience to be less than
optimal though - I'm happier in a high-function text editor like [Atom][]
or [Sublime Text][].  And do I really need to be able to edit my notebooks
in the same place I'm viewing them in a web browser?

Let's find out!

**nenb** is an experiment that allows you to author a "notebook" in plain ole
Markdown in a plain ole editor, and then have that "notebook" compiled to HTML.

## what is this?

**nenb** notebooks are authored in [Markdown][] files, but process two Markdown
structures differently.

[Atx headings at level one][Markdown headings] whose first character of the
heading is `@` are **directives**.

[Markdown fenced code blocks][] are **blocks**, and by default not shown in the
rendered HTML, but interpreted instead.

Both **directives** and **blocks** may be immediately followed by (ie, no blank
lines) lines starting with with `*` (list items), which are the **attributes**
of the the **directive** or **block**.

Let's look at some examples.

## examples

* [only markdown](examples/just-markdown.html)
* [using the doc directive](examples/using-the-doc-directive.html)
* [sets the document title with JavaScript and a data block](examples/set-title-with-data.html)
* [a temperature converter](examples/temperature-converter.html)
* [using vue](examples/using-vue.html)

## reference

**nend** provides some default **directives** and **block** renderers

* [directives](directives.html)

* [blocks](blocks.html)

## extending nend

TBD

## usage from the command-line

    npx nenb/nenb [options] file file ...

options:

    -h --help      print some help
    -v --version   print the version number
    -o --output    directory to write output (default: same as input file)

## installation

If you feel you must install it globally, you can run

    npm install -g nenb/nenb

which will provide a `nenb` command on your path.  You may need to use `sudo`
on that command, depending on your machine setup.

You can also install it as a `devDependency` (or `dependency`) in your own
package, and then perhaps add an npm script to run it as you wish.

## license

This package is licensed under the MIT license.  See the [LICENSE.md][] file for
more information.

## contributing

Awesome!  We're happy that you want to contribute.

Please read the [CONTRIBUTING.md][] file for more information.

[Mathematica]: https://www.wolfram.com/mathematica/
[TiddlyWiki]: https://tiddlywiki.com/
[Jupyter]: http://jupyter.org/
[Runkit]: https://runkit.com/home
[Observable]: https://observablehq.com
[Atom]: https://atom.io/
[Sublime Text]: https://www.sublimetext.com/
[Markdown]: https://daringfireball.net/projects/markdown/syntax
[Markdown headings]: https://daringfireball.net/projects/markdown/syntax#header
[Markdown fenced code blocks]: https://help.github.com/articles/creating-and-highlighting-code-blocks/#fenced-code-blocks
[LICENSE.md]: https://github.com/nenb/nenb/blob/master/LICENSE.md
[CONTRIBUTING.md]: https://github.com/nenb/nenb/blob/master/CONTRIBUTING.md
