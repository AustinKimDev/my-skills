# Layout sweep: empty bands and ragged list columns

Overlap, overflow and box-geometry checks pass on two defects owners still notice at a glance:

- **Empty band**: a block that reserves height but shows nothing. Typical causes are a header whose children are all hidden for this state (a segment control hidden when there is one choice), a wrapper left behind after its content moved, or a fixed-height slot with no data.
- **Ragged column**: rows of one vertical list whose first text starts at different x positions. Typical causes are an optional leading icon, checkbox or tag that only some rows render, or a variant row with its own padding.

Run this sweep after the geometry checks pass, at every width you ship (at least 390 and 1280 on the web), on every route and on each open overlay or step state. A clean geometry result does not mean the screen is aligned. Still look at the captures yourself.

## How to run

`scripts/layout-sweep.js` defines `layoutSweep(options)` for the page. Read the file in the automation script and evaluate it in the page:

```js
const src = (await import('node:fs')).readFileSync('<skill-dir>/scripts/layout-sweep.js', 'utf8');
const findings = await page.evaluate(src + '\nlayoutSweep(' + JSON.stringify({ lists: '.rows,[role=list],tbody' }) + ')');
```

Settle the page before each call: fonts loaded, transitions and animations disabled, and the state's overlay or step opened. Collect findings per `width + route + state`. Report one line per distinct `rule | element`, with the count and the first place it appeared.

Options: `lists` (the project's list containers; add its row-list class), `hidden` (visually hidden helper class), `tag` (leading chip class, aligned by its box), `minRows` (default 3) and `tolerance` (default 2 px).

## Reading the findings

- `empty | header > div.toolbar 358x40` means a 40 px band with nothing visible in it. Hide the container when all its children are hidden, or remove the slot.
- `ragged | ul.rows x24 2/9 off: 상품명@60` means two of nine rows start at x 60 instead of 24. Reserve the leading column for every row (an empty cell of the same width), or move the optional element to the trailing side.

Before calling the check done, prove it can fail: recreate one known defect of each kind (hide every child of one header, add a leading tag to one row) and confirm the sweep reports it. Then restore the screen. A selector that matches no list reports nothing, so a clean run on the wrong selector is not evidence.

## Limits

The sweep reads DOM geometry on the web renderer. Native screens need the same comparison on device captures. Horizontal scrollers, grids and side-by-side cards are skipped as lists, and decorative spacers that should stay empty need a painted surface or an explicit exception in the report.
