<h1 align="center">a11y-color-contrast</h1>
<p align="center">
    <a href="https://github.com/sondr3/a11y-color-contrast/actions"><img alt="GitHub Actions Status" src="https://github.com/sondr3/a11y-color-contrast/workflows/pipeline/badge.svg" /></a>
    <a href="https://www.npmjs.com/package/a11y-color-contrast"><img alt="npm" src="https://img.shields.io/npm/v/a11y-color-contrast" /></a>
    <a href="https://jsr.io/@sondr3/a11y-color-contrast"> <img src="https://jsr.io/badges/@sondr3/a11y-color-contrast" alt="" /></a>
</p>

<p align="center">
    <b>A simple utility package for working with WCAG 2.2/3.0 color contrasts</b>
</p>

- **a11y**: Built for checking how readable colors are together
- **Simple:** Parsing of hex strings, contrast checks
- **WCAG**: Support for checking both WCAG 2.0 and WCAG 3.0 contrasts
- **APCA**: Support for the upcoming [APCA][apca] contrast algorithm

<details>
<summary>Table of Contents</summary>
<br />

- [Installation](#installation)
  - [Deno](#deno)
  - [Node](#node)
- [Getting started](#getting-started)
  - [`hex`](#hex)
  - [`wcag`](#wcag)
  - [`wcagContrastValue`](#wcagContrastValue)
  - [`wcagIsReadable`](#wcagIsReadable)
  - [`apcaContrastValue`](#apcaScore)
  - [`apcaToInterpolatedFont`](#apcaToInterpolatedFont)
  - [`apcaValidateFont`](#apcaValidateFont)
  - [Utilities](#utilities)
- [Inspiration and resources](#inspiration-and-resources)
- [License](#license)

</details>

# Installation

## Deno

```ts
import { apcaContrastValue, hex, wcagContrastValue } from "@sondr3/a11y-color-contrast";

const wcag = wcagContrastValue(hex("#e1e1e1"), hex("#fff"));
const apca = apcaContrastValue(hex("#e1e1e1"), hex("#fff"));
```

## Node

Install the module with your favorite manager: `pnpm add a11y-color-contrast`

```ts 
import { apcaContrastValue, hex, wcagContrastValue } from "a11y-color-contrast";

const wcag = wcagContrastValue(hex("#e1e1e1"), hex("#fff"));
const apca = apcaContrastValue(hex("#e1e1e1"), hex("#fff"));
```

# Getting started

See more details and documentations at [JSR](https://jsr.io/@sondr3/a11y-color-contrast).

## `hex`

`hex` is a utility function to parse a hex string to a `[number, number, number]`, useful if your colors are not in the
`RBG` format. Supports both short and long hex colors, and will strip out the alpha channel when the hex string contains
it. **Note,** the returned tripled will contain `NaN` if the string cannot be parsed. Use [`isValidColor`](#utilities)
to check if the input can be invalid.

```ts
import { hex } from "a11y-color-contrast";

hex("#fff");
hex("#e1e1e1");

// Also support hex4/hex8
hex("#1234");
hex("#11ff0000");

// And missing #
hex("fff");
```

## `wcag`

Based on the [WCAG 2.2][wcag] algorithm to calculate how readable two colors are when used together. The first argument
is the foreground color and the second the background. By default, the function defaults to checking whether the colors
pass the WCAG AAA standard (7:1 contrast ratio) for normal text.

```ts
import { hex, wcag } from "a11y-color-contrast";

wcag(hex("#fff"), hex("#e1e1e1"));
// { level: "AAA", size: "normal", score: 1.3076906134240802, pass: false }

wcag(hex("#0f0f0f"), hex("#fff"));
// { level: "AAA", size: "normal", score: 19.168645448127652, pass: true }

wcag(hex("#0f0f0f"), hex("#f4f"), { level: "AA" });
// { level: "AA", size: "normal", score: 6.8668010864317885, pass: true }

wcag(hex("#0f0f0f"), hex("#f4f"), { level: "AA", size: "large" });
// { level: "AA", size: "large", score: 6.8668010864317885, pass: true }
```

## `wcagContrastValue`

A simpler version of the [`wcag`](#wcag) function, this returns the contrast value between two colors based on the WCAG
2.2 algorithm.

```ts
import { hex, wcagContrastValue } from "a11y-color-contrast";

wcagContrastValue(hex("#fff"), hex("#e1e1e1"));
// 1.3076906134240802

wcagContrastValue(hex("#0f0f0f"), hex("#fff"));
// 19.168645448127652
```

## `wcagIsReadable`

A simpler version of the [`wcag`](#wcag) function, this checks whether two colors used together are readable based on
the WCAG parameters passed.

```ts
import { hex, wcagIsReadable } from "a11y-color-contrast";

wcagIsReadable(hex("#fff"), hex("#e1e1e1"));
// false

wcagIsReadable(hex("#0f0f0f"), hex("#fff"));
// true

wcagIsReadable(hex("#0f0f0f"), hex("#f4f"), { level: "AAA" });
// false

wcagIsReadable(hex("#0f0f0f"), hex("#f4f"), { level: "AA" });
// true
```

## `apcaContrastValue`

Based on the upcoming WCAG 3.0 standard, this function is based on the [APCA][apca-nut] algorithm to calculate how
readable two colors are when used together. The first argument is the foreground color and the second the background. It
is highly recommended reading the linked article and [resources](#inspiration-and-resources) to get an overview over the
differences between the WCAG and APCA standard.

```ts
import { apcaContrastValue, hex } from "a11y-color-contrast";

apcaContrastValue(hex("#fff"), hex("#e1e1e1"));
// -17.5

apcaContrastValue(hex("#0f0f0f"), hex("#fff"));
// 105.5

apcaContrastValue(hex("#0f0f0f"), hex("#f4f"));
// 51.2
```

## `apcaToInterpolatedFont`

Based on a Lc between two colors, this will find the appropriate font sizes for it. The returned array will show
`"placeholder"` for when the contrast is too low for text and `"prohibited"` when the contrast is unusable and otherwise
a font size. If no font size can be calculated it will return null.

The returned array contains nine values, corresponding to the font useable at font weight 100 at index 0, and so on
until weight 900 at index 8.

```ts
import { apcaToInterpolatedFont, hex } from "a11y-color-contrast";

apcaToInterpolatedFont(-17.5);
//  100 200 300 400 500 600 700 800 900
// [ "placeholder", ...]

apcaToInterpolatedFont(105.5);
//  100  200 300 400   500 600 700 800 900
// [ 39, 25, 18, 14.5, 14, 13, 12, 16, 18 ]

apcaToInterpolatedFont(51.2);
//  100  200 300 400 500 600   700   800   900
// [ 92, 69, 57, 31, 27, 23.5, 20.5, 20.5, 20.5 ]
```

## `apcaValidateFont`

Based on a Lc value, this function allows you to check whether a given font and weight combination passes the required
minimum contrast based on the APCA contrast table.

The first parameter is the Lc value, the second is either a single font size or an array of them and the third, optional
parameter is either a single font weight or an array of them. If the weight parameter is undefined, it will default to
all the font weights.

```ts
import { apcaValidateFont, hex } from "a11y-color-contrast";

apcaValidateFont(-17.5, 36, 800);
// { "36": { "800": false } }

apcaValidateFont(105.5, [14, 16, 18], [400, 600, 800]);
// {
//   "14": { "400": true, "600": true, "800": false },
//   "16": { "400": true, "600": true, "800": true },
//   "18": { "400": true, "600": true, "800": true }
// }

apcaValidateFont(51.2, [18, 32]);
// {
//   "18": { "100": false, "200": false, ..., "700": false, "800": false, "900": false },
//   "32": { "100": false, "200": false, ..., "500": true, "600": true, "700": true, "800": true, "900": true }
// }
```

## Utility functions

### `toHex`

Converts an RGB triplet to its hex string representation.

```ts
import { toHex } from "a11y-color-contrast";

toHex([0, 0, 0]);
// "#000000"
```

### `isValidColor`

Checks whether a color parsed via [`hex`](#hex) is valid.

```ts
import { isValidColor } from "a11y-color-contrast";

isValidColor([0, 0, 0]);
// true

isValidColor([NaN, 0, 0]);
// false
```

### `colorFromObject`

Converts an RGB object into an RGB triplet.

```ts
import { colorFromObject } from "a11y-color-contrast";

colorFromObject({ r: 0, g: 0, b: 0 });
// [0, 0, 0]
```

# Inspiration and resources

- APCA homepage: https://git.apcacontrast.com/
- APCA calculator: https://www.myndex.com/APCA/
- APCA/WCAG calculator: https://www.myndex.com/BPCA/
- Contrast Calculator: https://contrast.tools/
- Accessible Palette: https://accessiblepalette.com/
- It’s time for a more sophisticated color contrast check for data visualizations:
  https://blog.datawrapper.de/color-contrast-check-data-vis-wcag-apca/

# License

MIT

[apca]: https://git.apcacontrast.com/
[apca-nut]: https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell
[wcag]: https://www.w3.org/WAI/WCAG22/Techniques/general/G17.html
