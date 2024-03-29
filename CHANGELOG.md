## v0.2.0

> 2022-07-19

## Summary

Fixed some unfortunate misspellings of WCAG, renamed a bunch of functions and added lots more documentation.

### Commits

- [[`2d95d74`](https://github.com/sondr3/a11y-color-contrast.git)] Yet another tiny mistake
- [[`105b82b`](https://github.com/sondr3/a11y-color-contrast.git)] Temporarily disable doc tests
- [[`a5f5ea9`](https://github.com/sondr3/a11y-color-contrast.git)] Update README
- [[`145b249`](https://github.com/sondr3/a11y-color-contrast.git)] Fix totally wrong values in apcaContrastValue docs
- [[`ad05e86`](https://github.com/sondr3/a11y-color-contrast.git)] Add documentation to isValidColor
- [[`12eb2e9`](https://github.com/sondr3/a11y-color-contrast.git)] Rename more things, more documentation
- [[`a0eebf0`](https://github.com/sondr3/a11y-color-contrast.git)] Create new wcagContrastValue function, more
  documentation
- [[`170b205`](https://github.com/sondr3/a11y-color-contrast.git)] Yeah, nah, no more grouped exports
- [[`99d110c`](https://github.com/sondr3/a11y-color-contrast.git)] And export the class
- [[`0027b63`](https://github.com/sondr3/a11y-color-contrast.git)] Fix names being wrong :facepalm:
- [[`bdb7b48`](https://github.com/sondr3/a11y-color-contrast.git)] Try with a class instead
- [[`75818aa`](https://github.com/sondr3/a11y-color-contrast.git)] Actually export wcag object
- [[`797f2a1`](https://github.com/sondr3/a11y-color-contrast.git)] Function renaming, add documentation
- [[`cfc5893`](https://github.com/sondr3/a11y-color-contrast.git)] Convert functions to named functions for deno doc
- [[`e9b3e07`](https://github.com/sondr3/a11y-color-contrast.git)] Add documentation, example to 'toHex' function
- [[`0d20fe6`](https://github.com/sondr3/a11y-color-contrast.git)] Change toHex method to use bit shifting dark magics
- [[`cfb3d73`](https://github.com/sondr3/a11y-color-contrast.git)] Run doctests on CI, fix README/examples so they
  compile
- [[`f53d244`](https://github.com/sondr3/a11y-color-contrast.git)] Fix wrong URL to documentation

## v0.1.0

> 2022-07-19

## Summary

Initial release of the package. See the README for usage notes.

### Commits

- [[`e8bfaf1`](https://github.com/sondr3/a11y-color-contrast.git)] Move node setup to top of pipeline
- [[`b46fd9a`](https://github.com/sondr3/a11y-color-contrast.git)] Publish job depends on the pipeline job
- [[`f27a99d`](https://github.com/sondr3/a11y-color-contrast.git)] Make publish step a separate CI job
- [[`b11d19d`](https://github.com/sondr3/a11y-color-contrast.git)] Run dnt on CI, add publishing step and tasks
- [[`5b25f03`](https://github.com/sondr3/a11y-color-contrast.git)] Fix links in README
- [[`1eaaefe`](https://github.com/sondr3/a11y-color-contrast.git)] Fix number 100 for optional, partial, default options
- [[`8023a6f`](https://github.com/sondr3/a11y-color-contrast.git)] Update README
- [[`84c3904`](https://github.com/sondr3/a11y-color-contrast.git)] Remove uneeded function, fix passing WCAG parameters
- [[`590de6c`](https://github.com/sondr3/a11y-color-contrast.git)] Remove redundant assert in tests
- [[`633ea4c`](https://github.com/sondr3/a11y-color-contrast.git)] Create utility function to validate a font against a
  Lc value
- [[`6cb7616`](https://github.com/sondr3/a11y-color-contrast.git)] Add documentation
- [[`97c6609`](https://github.com/sondr3/a11y-color-contrast.git)] Refactor and simplify some APCA functions
- [[`19c1267`](https://github.com/sondr3/a11y-color-contrast.git)] Add tests to the interpolated font lookup
- [[`9258c5a`](https://github.com/sondr3/a11y-color-contrast.git)] Implement fontLookupAPCA
- [[`35602d8`](https://github.com/sondr3/a11y-color-contrast.git)] Add contrast to font size table
- [[`12b3e0a`](https://github.com/sondr3/a11y-color-contrast.git)] Add function to get font size contrast
- [[`e2de2a6`](https://github.com/sondr3/a11y-color-contrast.git)] Refactor font contrast to a record object
- [[`9fd2cd2`](https://github.com/sondr3/a11y-color-contrast.git)] Add APCA font to contrast table
- [[`c061efe`](https://github.com/sondr3/a11y-color-contrast.git)] Rename generic 'Readability' type to 'WCAG'
- [[`7cc8203`](https://github.com/sondr3/a11y-color-contrast.git)] Fix some exporting names
- [[`ce84c99`](https://github.com/sondr3/a11y-color-contrast.git)] Fix formatting, convert deno.json -> deno.jsonc
- [[`fd7ca69`](https://github.com/sondr3/a11y-color-contrast.git)] Add dnt build tool for npm publishing
- [[`3105938`](https://github.com/sondr3/a11y-color-contrast.git)] Update README
- [[`8bb9e82`](https://github.com/sondr3/a11y-color-contrast.git)] Hide internal parsing functions
- [[`1f9a9d3`](https://github.com/sondr3/a11y-color-contrast.git)] Change Color type to be a tuple instead of object
- [[`0755453`](https://github.com/sondr3/a11y-color-contrast.git)] Remove WCAG 2.0/2.1 stuff
- [[`4a52171`](https://github.com/sondr3/a11y-color-contrast.git)] Add APCA contrast checking from WCAG3.0
- [[`6328844`](https://github.com/sondr3/a11y-color-contrast.git)] Add WCAG 2.0/2.1/2.2 changes to code
- [[`755ea00`](https://github.com/sondr3/a11y-color-contrast.git)] Extract WCAG stuff to their own file
- [[`7be066b`](https://github.com/sondr3/a11y-color-contrast.git)] Fix stupid misspelling of RGB
- [[`ad5d21d`](https://github.com/sondr3/a11y-color-contrast.git)] Start extracting functionality into small functions
- [[`318ffd0`](https://github.com/sondr3/a11y-color-contrast.git)] Extract parsing to its own file
- [[`30108be`](https://github.com/sondr3/a11y-color-contrast.git)] Port over color code from empyreum
- [[`f877b41`](https://github.com/sondr3/a11y-color-contrast.git)] Add basic RGB and RGBA functionality
