nend - Non-Editable Note Book
================================================================================

Programmable, editable online notebooks are awesome. Like
[Mathematica][], [TiddlyWiki][], [Jupyter][], [Runkit][], and
[Observable].  I do find the "online editing" experience to be less than
optimal though - I'm happier in a high-function text editor like [Atom][]
or [Sublime Text][].  And do I really need to be able to edit my notebooks
in the same place I'm viewing them in a web browser?

Let's find out!

`nend` is an experiment that allows you to author a "notebook" in plain ole
Markdown in a plain ole editor, and then have that "notebook" compiled to HTML.

Here are some examples:

* foo
* bar

[Mathematica]: https://www.wolfram.com/mathematica/
[TiddlyWiki]: https://tiddlywiki.com/
[Jupyter]: http://jupyter.org/
[Runkit]: https://runkit.com/home
[Observable]: https://observablehq.com
[Atom]: https://atom.io/
[Sublime Text]: https://www.sublimetext.com/


usage from the command-line
================================================================================

    npx github:moar-things/nend [options] file file ...

options:

* `-h --help`

  print some help

* `-v --version`

  print the version number


installation
================================================================================

If you feel you must install it, you can run

    npm install -g @moar-things/nend

which will provide a `nend` command on your path.  You may need to use `sudo`
on that command, depending on your machine setup.

You can also install it as a `devDependency` (or `dependency`) in your own
package, and then use `npm run nend ...` as you wish.


license
================================================================================

This package is licensed under the MIT license.  See the
[LICENSE.md](LICENSE.md) file for more information.


contributing
================================================================================

Awesome!  We're happy that you want to contribute.

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.
