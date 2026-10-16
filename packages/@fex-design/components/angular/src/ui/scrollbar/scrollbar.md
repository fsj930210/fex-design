# Scrollbar

Scrollbar assembles Primitive Root, Viewport, Bar, Track, Thumb and Corner with the same shared controller. Import the named Scrollbar from `@fex-design/angular/ui/scrollbar`.

Root accepts native class/style, overflow and interaction options. Omitted overflow axes inherit auto. Viewport overflow overrides Root per axis. All option defaults and scroll notifications follow Primitive.

Use classNames/styles with viewport, barX, barY, trackX, trackY, thumbX, thumbY and corner. Root uses its native class/style. Set styles.barY.top or styles.barX.insetInlineStart to reposition a bar. The table example measures its own wrapped header and passes the result as a CSS variable; Scrollbar has no table-specific height API.

Project a native div[scrollbarViewport] to customize Viewport attributes, events, overflow or element references. Without one, Scrollbar creates the Viewport. The component reference exposes element, viewportElement and controller.



Primitive parts and standalone logic remain available from this entry for custom composition. An explicitly consumed Bar still requires explicit Track/Thumb.


## CSS Variables

`--scrollbar-size`, `--scrollbar-padding`, `--scrollbar-radius`, `--scrollbar-track-color`, `--scrollbar-thumb-color`, `--scrollbar-thumb-hover-color`, `--scrollbar-thumb-active-color`, `--scrollbar-corner-color`, `--scrollbar-transition-duration`.

`showTrack` defaults to `false` (transparent track/corner). Set it to `true` for visible default backgrounds. It preserves DOM, layout and interaction; CSS variables customize the colors.

`showCorner` inherits showTrack when omitted. Override it with true/false to control only the corner background; slider clearance remains reserved.
