# Hairline Lab

A library of custom pointer-reactive isometric line animations. Each figure is one self-contained HTML file (SVG, no dependencies).

Live: https://dipannama.github.io/hairline-lab/

## Figures

| Figure | Idea |
| --- | --- |
| funnel | Five slabs narrowing to the bottom. Touch a stage and it, with all it feeds, lifts away. |
| rack | Five server units. Touch one and it slides out, neighbours easing after. |
| layers | Four app layers. Touch one and it lifts clear and slides aside. |

`figures/<name>.html` is the built page, `src/<name>.js` is the figure source.

## Adding a figure

Add a source in `src/`, its standalone HTML page in `figures/`, an entry in `app.js`, and the page in `sitemap.xml`. Check pointer behavior, both themes and small screens before release.

## Local checks

Node 22: `npm test` validates static assets and `npm run build` stages the Pages artifact. Browser checks cover the three frames, theme, downloads and pointer reaction on desktop/mobile.

## Credits and license

Built in the style of hairline by Lucas Markes (MIT). The kernel inside each figure page is from that project. This repo is MIT licensed, see `LICENSE`.
