(function() {

// src/quas.js
	(function() {
		"use strict";
		const Q = window.Quas = window.Quas || {};
		const cssWarn = (token, message) => {
			if (Q.CSSWarnings !== false && (typeof Q.CSSWarnings !== "function" || Q.CSSWarnings(token, message))) console.warn(message);
		};
		Q.CleanDOM ??= true;
		Q.CSSClassMode ??= true;
		Q.CSSTagMode ??= true;
		Q.CSSWarnings ??= true;
		Q.CSSPerformance ??= true;
		Q.LegacyV3 ??= false;
		const V3 = Q.LegacyV3 === true;
		Q.CSSNonce ??= document.currentScript?.nonce || null;
		if (Q.CSSPerformance) console.debug("[Quas] Loaded v2.0.0");
		const colorMap = /* @__PURE__ */ new Map([
			["transparent", "transparent"],
			["current", "currentColor"],
			["inherit", "inherit"],
			["white", [
				255,
				255,
				255
			]],
			["black", [
				0,
				0,
				0
			]]
		]);
		for (const n of [
			"base-100",
			"base-200",
			"base-300",
			"base-content",
			"primary",
			"primary-content",
			"secondary",
			"secondary-content",
			"accent",
			"accent-content",
			"neutral",
			"neutral-content",
			"info",
			"info-content",
			"success",
			"success-content",
			"warning",
			"warning-content",
			"error",
			"error-content"
		]) colorMap.set(n, `var(--color-${n})`);
		const colors = {
			amber: [
				"fffbeb",
				"fef3c6",
				"fee685",
				"ffd230",
				"fcba00",
				"f69d00",
				"d87700",
				"b55100",
				"973c00",
				"7b3306",
				"461901"
			],
			blue: [
				"eff6ff",
				"dbeafe",
				"bedbff",
				"8ec5ff",
				"51a2ff",
				"2b7fff",
				"155dfc",
				"1447e6",
				"193cb8",
				"1c398e",
				"162456"
			],
			cyan: [
				"ecfeff",
				"cefafe",
				"a2f4fd",
				"53eafd",
				"00d3f2",
				"00b8db",
				"0092b8",
				"007595",
				"005f78",
				"104e64",
				"053345"
			],
			emerald: [
				"ecfdf5",
				"d0fae5",
				"a4f4cf",
				"5ee9b5",
				"00d492",
				"00bc7d",
				"009966",
				"007a55",
				"006045",
				"004f3b",
				"002c22"
			],
			fuchsia: [
				"fdf4ff",
				"fae8ff",
				"f6cfff",
				"f4a8ff",
				"ed6aff",
				"e12afb",
				"c800de",
				"a800b7",
				"8a0194",
				"721378",
				"4b004f"
			],
			gray: [
				"f9fafb",
				"f3f4f6",
				"e5e7eb",
				"d1d5dc",
				"99a1af",
				"6a7282",
				"4a5565",
				"364153",
				"1e2939",
				"101828",
				"030712"
			],
			green: [
				"f0fdf4",
				"dcfce7",
				"b9f8cf",
				"7bf1a8",
				"05df72",
				"00c950",
				"00a63e",
				"008236",
				"016630",
				"0d542b",
				"032e15"
			],
			indigo: [
				"eef2ff",
				"e0e7ff",
				"c6d2ff",
				"a3b3ff",
				"7c86ff",
				"615fff",
				"4f39f6",
				"432dd7",
				"372aac",
				"312c85",
				"1e1a4d"
			],
			lime: [
				"f7fee7",
				"ecfcca",
				"d8f999",
				"bbf451",
				"9ae600",
				"83cd00",
				"64a400",
				"497d00",
				"3c6300",
				"35530e",
				"192e03"
			],
			neutral: [
				"fafafa",
				"f5f5f5",
				"e5e5e5",
				"d4d4d4",
				"a1a1a1",
				"737373",
				"525252",
				"404040",
				"262626",
				"171717",
				"0a0a0a"
			],
			orange: [
				"fff7ed",
				"ffedd4",
				"ffd6a7",
				"ffb86a",
				"ff8904",
				"f97200",
				"e55b00",
				"c23f00",
				"9f2d00",
				"7e2a0c",
				"441306"
			],
			pink: [
				"fdf2f8",
				"fce7f3",
				"fccee8",
				"fda5d5",
				"fb64b6",
				"f6339a",
				"e60076",
				"c6005c",
				"a3004c",
				"861043",
				"510424"
			],
			purple: [
				"faf5ff",
				"f3e8ff",
				"e9d4ff",
				"dab2ff",
				"c27aff",
				"ad46ff",
				"9810fa",
				"8200db",
				"6e11b0",
				"59168b",
				"3c0366"
			],
			red: [
				"fef2f2",
				"ffe2e2",
				"ffc9c9",
				"ffa2a2",
				"ff6467",
				"fb2c36",
				"e7000b",
				"c10007",
				"9f0712",
				"82181a",
				"460809"
			],
			rose: [
				"fff1f2",
				"ffe4e6",
				"ffccd3",
				"ffa1ad",
				"ff637e",
				"ff2056",
				"eb0040",
				"c60036",
				"a50036",
				"8b0836",
				"4d0218"
			],
			sky: [
				"f0f9ff",
				"dff2fe",
				"b8e6fe",
				"74d4ff",
				"00bcff",
				"00a6f4",
				"0084d1",
				"0069a8",
				"00598a",
				"024a70",
				"052f4a"
			],
			slate: [
				"f8fafc",
				"f1f5f9",
				"e2e8f0",
				"cad5e2",
				"90a1b9",
				"62748e",
				"45556c",
				"314158",
				"1d293d",
				"0f172b",
				"020618"
			],
			stone: [
				"fafaf9",
				"f5f5f4",
				"e7e5e4",
				"d6d3d1",
				"a6a09b",
				"79716b",
				"57534d",
				"44403b",
				"292524",
				"1c1917",
				"0c0a09"
			],
			teal: [
				"f0fdfa",
				"cbfbf1",
				"96f7e4",
				"46ecd5",
				"00d5be",
				"00bba7",
				"009689",
				"00786f",
				"005f5a",
				"0b4f4a",
				"022f2e"
			],
			violet: [
				"f5f3ff",
				"ede9fe",
				"ddd6ff",
				"c4b4ff",
				"a684ff",
				"8e51ff",
				"7f22fe",
				"7008e7",
				"5d0ec0",
				"4d179a",
				"2f0d68"
			],
			yellow: [
				"fefce8",
				"fef9c2",
				"fff085",
				"ffdf20",
				"fbc800",
				"edb200",
				"cc8900",
				"a36100",
				"894b00",
				"733e0a",
				"432004"
			],
			zinc: [
				"fafafa",
				"f4f4f5",
				"e4e4e7",
				"d4d4d8",
				"9f9fa9",
				"71717b",
				"52525c",
				"3f3f46",
				"27272a",
				"18181b",
				"09090b"
			]
		};
		function aliasBareColors() {
			for (const key of [...colorMap.keys()]) if (key.endsWith("-500")) {
				const family = key.slice(0, -4);
				if (!colorMap.has(family)) colorMap.set(family, colorMap.get(key));
			}
		}
		const shadeKeys = [
			"50",
			"100",
			"200",
			"300",
			"400",
			"500",
			"600",
			"700",
			"800",
			"900",
			"950"
		];
		function hexToRgb(hex) {
			const n = parseInt(hex.replace(/^#/, "").replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3"), 16);
			return [
				n >> 16,
				n >> 8 & 255,
				n & 255
			];
		}
		for (const colorName in colors) colors[colorName].forEach((hex, i) => {
			colorMap.set(`${colorName}-${shadeKeys[i]}`, hexToRgb(hex));
		});
		const SC = "--q-shadow-color";
		const SHADOW_MAP = {
			"2xs": `0 1px var(${SC}, rgb(0 0 0 / 0.05))`,
			"xs": `0 1px 2px 0 var(${SC}, rgb(0 0 0 / 0.05))`,
			"sm": V3 ? `0 1px 2px 0 var(${SC}, rgb(0 0 0 / 0.05))` : `0 1px 3px 0 var(${SC}, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(${SC}, rgb(0 0 0 / 0.1))`,
			"": `0 1px 3px 0 var(${SC}, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(${SC}, rgb(0 0 0 / 0.1))`,
			"md": `0 4px 6px -1px var(${SC}, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(${SC}, rgb(0 0 0 / 0.1))`,
			"lg": `0 10px 15px -3px var(${SC}, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(${SC}, rgb(0 0 0 / 0.1))`,
			"xl": `0 20px 25px -5px var(${SC}, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(${SC}, rgb(0 0 0 / 0.1))`,
			"2xl": `0 25px 50px -12px var(${SC}, rgb(0 0 0 / 0.25))`,
			"none": "0 0 #0000",
			"inner": `inset 0 2px 4px 0 var(${SC}, rgb(0 0 0 / 0.05))`
		};
		const ISC = "--q-inset-shadow-color";
		const INSET_SHADOW_MAP = {
			"2xs": `inset 0 1px var(${ISC}, rgb(0 0 0 / 0.05))`,
			"xs": `inset 0 1px 1px var(${ISC}, rgb(0 0 0 / 0.05))`,
			"sm": `inset 0 2px 4px var(${ISC}, rgb(0 0 0 / 0.05))`,
			"none": "inset 0 0 #0000"
		};
		const DSC = "--q-drop-shadow-color";
		const ds = (list) => list.map(([x, c]) => `drop-shadow(${x} var(${DSC}, rgb(0 0 0 / ${c})))`).join(" ");
		const DROP_SHADOW_MAP = {
			"xs": ds([["0 1px 1px", .05]]),
			"sm": V3 ? ds([["0 1px 1px", .05]]) : ds([["0 1px 2px", .15]]),
			"": V3 ? ds([["0 1px 2px", .1], ["0 1px 1px", .06]]) : ds([["0 1px 2px", .15]]),
			"md": V3 ? ds([["0 4px 3px", .07], ["0 2px 2px", .06]]) : ds([["0 3px 3px", .12]]),
			"lg": V3 ? ds([["0 10px 8px", .04], ["0 4px 3px", .1]]) : ds([["0 4px 4px", .15]]),
			"xl": V3 ? ds([["0 20px 13px", .03], ["0 8px 5px", .08]]) : ds([["0 9px 7px", .1]]),
			"2xl": V3 ? ds([["0 25px 25px", .15]]) : ds([["0 25px 25px", .15]]),
			"none": "drop-shadow(0 0 #0000)"
		};
		const BLUR_MAP = {
			"xs": "blur(4px)",
			"sm": V3 ? "blur(4px)" : "blur(8px)",
			"": "blur(8px)",
			"md": "blur(12px)",
			"lg": "blur(16px)",
			"xl": "blur(24px)",
			"2xl": "blur(40px)",
			"3xl": "blur(64px)"
		};
		const BORDER_RADIUS_SCALE = {
			"none": "0",
			"xs": "0.125rem",
			"sm": V3 ? "0.125rem" : "0.25rem",
			"": "0.25rem",
			"md": "0.375rem",
			"lg": "0.5rem",
			"xl": "0.75rem",
			"2xl": "1rem",
			"3xl": "1.5rem",
			"4xl": "2rem",
			"full": "9999px"
		};
		const BREAKPOINT_WIDTHS = {
			"px": "1px",
			"3xs": "16rem",
			"2xs": "18rem",
			"xs": "20rem",
			"sm": "24rem",
			"md": "28rem",
			"lg": "32rem",
			"xl": "36rem",
			"2xl": "42rem",
			"3xl": "48rem",
			"4xl": "56rem",
			"5xl": "64rem",
			"6xl": "72rem",
			"7xl": "80rem"
		};
		const VIEWPORT_W = {
			"screen": "100vw",
			"svw": "100svw",
			"lvw": "100lvw",
			"dvw": "100dvw"
		};
		const VIEWPORT_H = {
			"screen": "100vh",
			"svh": "100svh",
			"lvh": "100lvh",
			"dvh": "100dvh"
		};
		const SIZING_KEYWORDS = {
			"full": "100%",
			"min": "min-content",
			"max": "max-content",
			"fit": "fit-content"
		};
		const TW_EXTEND = window.tailwind?.config?.theme?.extend ?? {};
		const cssList = (value) => Array.isArray(value) ? value.join(", ") : String(value);
		function addColors(colors, prefix = "") {
			for (const [key, value] of Object.entries(colors ?? {})) {
				const name = key === "DEFAULT" ? prefix : [prefix, key].filter(Boolean).join("-");
				if (value && typeof value === "object" && !Array.isArray(value)) addColors(value, name);
				else if (/^#([\da-f]{3}){1,2}$/i.test(value)) colorMap.set(name, hexToRgb(value));
				else cssWarn(name, `[quas] Color "${name}" skipped: use #rgb or #rrggbb, got "${value}"`);
			}
		}
		addColors(TW_EXTEND.colors);
		aliasBareColors();
		Object.assign(SHADOW_MAP, Object.fromEntries(Object.entries(TW_EXTEND.boxShadow ?? {}).map(([name, value]) => [name === "DEFAULT" ? "" : name, cssList(value)])));
		const FONT_FAMILY_UTILITIES = Object.fromEntries(Object.entries(TW_EXTEND.fontFamily ?? {}).map(([name, value]) => [name, `font-family: ${cssList(value)}`]));
		const TRANSFORMERS = {
			px: (v) => `${v}px`,
			rem: (v) => `${v * .25}rem`,
			opacity: (v) => String(Number(v) / 100),
			deg: (v) => `${v}deg`,
			ms: (v) => `${v}ms`
		};
		const SPACING_PADDING_CONFIG = {
			$num: TRANSFORMERS.rem,
			$arbitrary: true,
			"px": "1px"
		};
		const SPACING_MARGIN_CONFIG = {
			$num: TRANSFORMERS.rem,
			$arbitrary: true,
			$negative: true,
			"auto": "auto",
			"px": "1px"
		};
		const $frac = (v) => {
			const [num, den] = String(v).split("/").map(Number);
			return den !== 0 && !isNaN(num) && !isNaN(den) ? `${num / den * 100}%` : void 0;
		};
		const compact = (value) => value.replace(/\s+/g, " ").trim();
		function generateColorCss(name, opacity, opacityVariable) {
			const color = colorMap.get(name);
			if (opacity && opacity.cssVar) return `color-mix(in oklab, ${typeof color === "string" ? color : `rgb(${color.join(" ")})`} ${opacity.cssVar}, transparent)`;
			if (typeof color === "string") {
				if (opacity != null && color.startsWith("var(")) return `color-mix(in oklab, ${color} ${+(opacity * 100).toFixed(1)}%, transparent)`;
				return color;
			}
			const rgb = color.join(" ");
			if (opacityVariable) return `rgb(${rgb} / var(${opacityVariable}, 1))`;
			if (opacity != null) return `rgb(${rgb} / ${+opacity.toFixed(3)})`;
			return `rgb(${rgb})`;
		}
		const NAMED_COLORS = new Set("transparent currentcolor aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen".split(" "));
		function looksLikeColor(value) {
			return /^#[\da-f]{3,8}$/i.test(value) || /^(rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|color-mix|light-dark)\(/i.test(value) || NAMED_COLORS.has(String(value).toLowerCase());
		}
		function isColorValue(value, context) {
			return context && context.$hint ? context.$hint === "color" : looksLikeColor(value);
		}
		const toColorProp = (p) => Array.isArray(p) ? p.map((v) => v.replace("width", "color")) : p.replace("width", "color");
		const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
		const BASE_CSS = {
			translate: "translate: var(--q-translate-x, 0) var(--q-translate-y, 0)",
			translateZ: "translate: var(--q-translate-x, 0) var(--q-translate-y, 0) var(--q-translate-z, 0)",
			scale: "scale: var(--q-scale-x, 1) var(--q-scale-y, 1)",
			scaleZ: "scale: var(--q-scale-x, 1) var(--q-scale-y, 1) var(--q-scale-z, 1)",
			transform: "transform: var(--q-rotate-x,) var(--q-rotate-y,) var(--q-rotate-z,) var(--q-skew-x,) var(--q-skew-y,)",
			transition: "transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms",
			filter: compact(`
    --q-blur: ;
    --q-brightness: ;
    --q-contrast: ;
    --q-grayscale: ;
    --q-hue-rotate: ;
    --q-invert: ;
    --q-saturate: ;
    --q-sepia: ;
    --q-drop-shadow: ;
    filter: var(--q-blur) var(--q-brightness) var(--q-contrast) var(--q-grayscale) var(--q-hue-rotate) var(--q-invert) var(--q-saturate) var(--q-sepia) var(--q-drop-shadow)
    `),
			backdrop: compact(`
    --q-backdrop-blur: ;
    --q-backdrop-brightness: ;
    --q-backdrop-contrast: ;
    --q-backdrop-grayscale: ;
    --q-backdrop-hue-rotate: ;
    --q-backdrop-invert: ;
    --q-backdrop-saturate: ;
    --q-backdrop-sepia: ;
    --q-backdrop-opacity: ;
    -webkit-backdrop-filter: var(--q-backdrop-blur) var(--q-backdrop-brightness) var(--q-backdrop-contrast) var(--q-backdrop-grayscale) var(--q-backdrop-hue-rotate) var(--q-backdrop-invert) var(--q-backdrop-opacity) var(--q-backdrop-saturate) var(--q-backdrop-sepia);
    backdrop-filter: var(--q-backdrop-blur) var(--q-backdrop-brightness) var(--q-backdrop-contrast) var(--q-backdrop-grayscale) var(--q-backdrop-hue-rotate) var(--q-backdrop-invert) var(--q-backdrop-opacity) var(--q-backdrop-saturate) var(--q-backdrop-sepia)
    `),
			shadow: compact(`
    --q-shadow: 0 0 #0000;
    --q-inset-shadow: 0 0 #0000;
    --q-inset-ring-shadow: 0 0 #0000;
    --q-ring-inset: ;
    --q-ring-offset-width: 0px;
    --q-ring-offset-color: #fff;
    --q-ring-color: ${V3 ? "rgb(59 130 246 / 0.5)" : "currentColor"};
    --q-ring-width: 0px;
    --q-ring-offset-shadow: var(--q-ring-inset) 0 0 0 var(--q-ring-offset-width) var(--q-ring-offset-color);
    --q-ring-shadow: var(--q-ring-inset) 0 0 0 calc(var(--q-ring-width) + var(--q-ring-offset-width)) var(--q-ring-color);
    box-shadow: var(--q-inset-shadow, 0 0 #0000), var(--q-inset-ring-shadow, 0 0 #0000), var(--q-ring-offset-shadow), var(--q-ring-shadow), var(--q-shadow, 0 0 #0000)
    `),
			borderSpacing: compact(`
    --q-border-spacing-x: 0;
    --q-border-spacing-y: 0;
    border-spacing: var(--q-border-spacing-x) var(--q-border-spacing-y);
`)
		};
		const aria = (a) => ({
			type: "pseudo",
			handler: (s) => `${s}[aria-${a}="true"]`
		});
		const ARIA_STATES = [
			"busy",
			"checked",
			"disabled",
			"expanded",
			"hidden",
			"pressed",
			"readonly",
			"required",
			"selected"
		];
		const media = (query) => ({
			type: "wrapper",
			handler: (rule) => `@media ${query} {${rule}}`,
			negated: (rule) => `@media not ${query} {${rule}}`
		});
		const atRule = (header, negatedHeader) => ({
			type: "wrapper",
			handler: (rule) => `${header} {${rule}}`,
			negated: negatedHeader ? ((rule) => `${negatedHeader} {${rule}}`) : void 0
		});
		const HOVER_WRAP = V3 ? void 0 : {
			key: "(hover: hover)",
			handler: (rule) => `@media (hover: hover) {${rule}}`
		};
		const pseudo = (suffix) => ({
			type: "pseudo",
			handler: (selector) => `${selector}${suffix}`
		});
		const PREFIX_HANDLERS = {
			"sm": media("(min-width: 40rem)"),
			"md": media("(min-width: 48rem)"),
			"lg": media("(min-width: 64rem)"),
			"xl": media("(min-width: 80rem)"),
			"2xl": media("(min-width: 96rem)"),
			"max-2xl": media("(max-width: 95.999rem)"),
			"max-xl": media("(max-width: 79.999rem)"),
			"max-lg": media("(max-width: 63.999rem)"),
			"max-md": media("(max-width: 47.999rem)"),
			"max-sm": media("(max-width: 39.999rem)"),
			"motion-safe": media("(prefers-reduced-motion: no-preference)"),
			"motion-reduce": media("(prefers-reduced-motion: reduce)"),
			"contrast-more": media("(prefers-contrast: more)"),
			"contrast-less": media("(prefers-contrast: less)"),
			"landscape": media("(orientation: landscape)"),
			"portrait": media("(orientation: portrait)"),
			"print": media("print"),
			"forced-colors": media("(forced-colors: active)"),
			"not-forced-colors": media("(forced-colors: none)"),
			"inverted-colors": media("(inverted-colors: inverted)"),
			"pointer-none": media("(pointer: none)"),
			"pointer-coarse": media("(pointer: coarse)"),
			"pointer-fine": media("(pointer: fine)"),
			"any-pointer-none": media("(any-pointer: none)"),
			"any-pointer-coarse": media("(any-pointer: coarse)"),
			"any-pointer-fine": media("(any-pointer: fine)"),
			"noscript": media("(scripting: none)"),
			"starting": atRule("@starting-style"),
			"hover": {
				type: "pseudo",
				handler: (s) => `${s}:hover`,
				wrap: HOVER_WRAP
			},
			"placeholder-shown": pseudo(":placeholder-shown"),
			"focus": pseudo(":focus"),
			"focus-within": pseudo(":focus-within"),
			"focus-visible": pseudo(":focus-visible"),
			"active": pseudo(":active"),
			"visited": pseudo(":visited"),
			"target": pseudo(":target"),
			"first": pseudo(":first-child"),
			"last": pseudo(":last-child"),
			"only": pseudo(":only-child"),
			"odd": pseudo(":nth-child(odd)"),
			"even": pseudo(":nth-child(even)"),
			"first-of-type": pseudo(":first-of-type"),
			"last-of-type": pseudo(":last-of-type"),
			"only-of-type": pseudo(":only-of-type"),
			"empty": pseudo(":empty"),
			"disabled": pseudo(":disabled"),
			"enabled": pseudo(":enabled"),
			"checked": pseudo(":checked"),
			"indeterminate": pseudo(":indeterminate"),
			"read-only": pseudo(":read-only"),
			"required": pseudo(":required"),
			"optional": pseudo(":optional"),
			"valid": pseudo(":valid"),
			"invalid": pseudo(":invalid"),
			"open": pseudo(":is([open], :popover-open, :open)"),
			"default": pseudo(":default"),
			"autofill": pseudo(":autofill"),
			"user-valid": pseudo(":user-valid"),
			"user-invalid": pseudo(":user-invalid"),
			"in-range": pseudo(":in-range"),
			"out-of-range": pseudo(":out-of-range"),
			"inert": pseudo(":is([inert], [inert] *)"),
			"*": pseudo(" > *"),
			"**": pseudo(" *"),
			"before": pseudo("::before"),
			"after": pseudo("::after"),
			"placeholder": pseudo("::placeholder"),
			"file": pseudo("::file-selector-button"),
			"marker": {
				type: "pseudo",
				handler: (s) => `${s}::marker, ${s} *::marker`
			},
			"selection": {
				type: "pseudo",
				handler: (s) => `${s}::selection, ${s} *::selection`
			},
			"backdrop": pseudo("::backdrop"),
			"details-content": pseudo("::details-content"),
			"first-letter": pseudo("::first-letter"),
			"first-line": pseudo("::first-line"),
			"rtl": pseudo(":where(:dir(rtl), [dir=\"rtl\"], [dir=\"rtl\"] *)"),
			"ltr": pseudo(":where(:dir(ltr), [dir=\"ltr\"], [dir=\"ltr\"] *)"),
			...Object.fromEntries(ARIA_STATES.map((a) => [`aria-${a}`, aria(a)])),
			"dark": {
				type: "pseudo",
				handler: (selector) => `html.dark ${selector}`
			},
			"child": {
				type: "pseudo",
				handler: (selector) => `${selector} > :not([hidden]) ~ :not([hidden])`
			}
		};
		const $inherit = [
			"$prop",
			"$default",
			"$values",
			"$arbitrary",
			"$base",
			"$selector",
			"$negative",
			"$num",
			"$color",
			"$frac"
		];
		const UTILITY_CONFIG = {
			"block": "display: block",
			"isolate": "isolation: isolate",
			"isolation-auto": "isolation: auto",
			"inline": {
				"": "display: inline",
				"block": "display: inline-block",
				"flex": "display: inline-flex",
				"grid": "display: inline-grid"
			},
			"inline-table": "display: inline-table",
			"list-item": "display: list-item",
			"flow-root": "display: flow-root",
			"contents": "display: contents",
			"box-border": "box-sizing: border-box",
			"box-content": "box-sizing: content-box",
			"visible": "visibility: visible",
			"invisible": "visibility: hidden",
			"columns": {
				$prop: "columns",
				"auto": "auto",
				$num: (v) => String(v),
				...BREAKPOINT_WIDTHS,
				$arbitrary: true
			},
			"justify": {
				$prop: "justify-content",
				"normal": "normal",
				"start": "flex-start",
				"end": {
					$inherit,
					"": "flex-end",
					"safe": "safe flex-end"
				},
				"center": {
					$inherit,
					"": "center",
					"safe": "safe center"
				},
				"between": "space-between",
				"around": "space-around",
				"evenly": "space-evenly",
				"stretch": "stretch",
				"baseline": "baseline"
			},
			"justify-items": {
				$prop: "justify-items",
				"normal": "normal",
				"start": "start",
				"end": {
					$inherit,
					"": "end",
					"safe": "safe end"
				},
				"center": {
					$inherit,
					"": "center",
					"safe": "safe center"
				},
				"stretch": "stretch"
			},
			"justify-self": {
				$prop: "justify-self",
				"auto": "auto",
				"start": "start",
				"end": {
					$inherit,
					"": "end",
					"safe": "safe end"
				},
				"center": {
					$inherit,
					"": "center",
					"safe": "safe center"
				},
				"stretch": "stretch"
			},
			"content": {
				$prop: "align-content",
				"normal": "normal",
				"center": "center",
				"start": "flex-start",
				"end": "flex-end",
				"between": "space-between",
				"around": "space-around",
				"evenly": "space-evenly",
				"baseline": "baseline",
				"stretch": "stretch",
				"none": { "": "content: none" },
				$arbitrary: (value, context) => {
					context.$prop = "content";
					return value;
				}
			},
			"items": {
				$prop: "align-items",
				"start": "flex-start",
				"end": {
					$inherit,
					"": "flex-end",
					"safe": "safe flex-end"
				},
				"center": {
					$inherit,
					"": "center",
					"safe": "safe center"
				},
				"baseline": {
					$inherit,
					"": "baseline",
					"last": "last baseline"
				},
				"stretch": "stretch"
			},
			"self": {
				$prop: "align-self",
				"auto": "auto",
				"start": "flex-start",
				"end": {
					$inherit,
					"": "end",
					"safe": "safe end"
				},
				"center": {
					$inherit,
					"": "center",
					"safe": "safe center"
				},
				"stretch": "stretch",
				"baseline": {
					$inherit,
					"": "baseline",
					"last": "last baseline"
				}
			},
			"place-content": {
				$prop: "place-content",
				"center": {
					$inherit,
					"": "center",
					"safe": "safe center"
				},
				"start": "start",
				"end": {
					$inherit,
					"": "end",
					"safe": "safe end"
				},
				"between": "space-between",
				"around": "space-around",
				"evenly": "space-evenly",
				"baseline": "baseline",
				"stretch": "stretch"
			},
			"place-items": {
				$prop: "place-items",
				"start": "start",
				"end": {
					$inherit,
					"": "end",
					"safe": "safe end"
				},
				"center": {
					$inherit,
					"": "center",
					"safe": "safe center"
				},
				"baseline": "baseline",
				"stretch": "stretch"
			},
			"place-self": {
				$prop: "place-self",
				"auto": "auto",
				"start": "start",
				"end": {
					$inherit,
					"": "end",
					"safe": "safe end"
				},
				"center": {
					$inherit,
					"": "center",
					"safe": "safe center"
				},
				"stretch": "stretch"
			},
			"flex": {
				$arbitrary: (value, context) => {
					context.$prop = "flex";
					return value;
				},
				"": "display: flex",
				"row": "flex-direction: row",
				"row-reverse": "flex-direction: row-reverse",
				"col": "flex-direction: column",
				"col-reverse": "flex-direction: column-reverse",
				"wrap": "flex-wrap: wrap",
				"wrap-reverse": "flex-wrap: wrap-reverse",
				"nowrap": "flex-wrap: nowrap",
				"1": "flex: 1 1 0%",
				"auto": "flex: 1 1 auto",
				"initial": "flex: 0 1 auto",
				"none": "flex: none",
				"grow": "flex-grow: 1",
				"shrink-0": "flex-shrink: 0"
			},
			"grow": {
				$prop: "flex-grow",
				"": "1",
				"0": "0",
				$num: (v) => String(v),
				$arbitrary: true
			},
			"shrink": {
				$prop: "flex-shrink",
				"": "1",
				"0": "0",
				$num: (v) => String(v),
				$arbitrary: true
			},
			"basis": {
				$prop: "flex-basis",
				...BREAKPOINT_WIDTHS,
				...SIZING_KEYWORDS,
				"auto": "auto",
				$frac,
				$num: TRANSFORMERS.rem,
				$arbitrary: true
			},
			"order": {
				$prop: "order",
				"first": "-9999",
				"last": "9999",
				"none": "0",
				$num: (v) => String(v),
				$arbitrary: true,
				$negative: true
			},
			"grid": {
				"": "display: grid",
				"cols": {
					$prop: "grid-template-columns",
					"none": "none",
					"subgrid": "subgrid",
					$num: (v) => `repeat(${v}, minmax(0, 1fr))`,
					$arbitrary: true
				},
				"rows": {
					$prop: "grid-template-rows",
					"none": "none",
					"subgrid": "subgrid",
					$num: (v) => `repeat(${v}, minmax(0, 1fr))`,
					$arbitrary: true
				},
				"flow": {
					$prop: "grid-auto-flow",
					"row": "row",
					"col": "column",
					"dense": "dense",
					"row-dense": "row dense",
					"col-dense": "column dense"
				}
			},
			"auto-cols": {
				$prop: "grid-auto-columns",
				"auto": "auto",
				"min": "min-content",
				"max": "max-content",
				"fr": "minmax(0, 1fr)",
				$arbitrary: true
			},
			"auto-rows": {
				$prop: "grid-auto-rows",
				"auto": "auto",
				"min": "min-content",
				"max": "max-content",
				"fr": "minmax(0, 1fr)",
				$arbitrary: true
			},
			"col": {
				$prop: "grid-column",
				"auto": "auto",
				$num: (v) => String(v),
				$arbitrary: true,
				"span": {
					$prop: "grid-column",
					"full": "1 / -1",
					$num: (v) => `span ${v} / span ${v}`,
					$arbitrary: true
				},
				"start": {
					$prop: "grid-column-start",
					"auto": "auto",
					$num: (v) => String(v),
					$arbitrary: true
				},
				"end": {
					$prop: "grid-column-end",
					"auto": "auto",
					$num: (v) => String(v),
					$arbitrary: true
				}
			},
			"row": {
				$prop: "grid-row",
				"auto": "auto",
				$num: (v) => String(v),
				$arbitrary: true,
				"span": {
					$prop: "grid-row",
					"full": "1 / -1",
					$num: (v) => `span ${v} / span ${v}`,
					$arbitrary: true
				},
				"start": {
					$prop: "grid-row-start",
					"auto": "auto",
					$num: (v) => String(v),
					$arbitrary: true
				},
				"end": {
					$prop: "grid-row-end",
					"auto": "auto",
					$num: (v) => String(v),
					$arbitrary: true
				}
			},
			"gap": {
				$prop: "gap",
				...SPACING_PADDING_CONFIG,
				"x": {
					$inherit: [
						"$num",
						"$arbitrary",
						"$values",
						"$prop"
					],
					$prop: "column-gap"
				},
				"y": {
					$inherit: [
						"$num",
						"$arbitrary",
						"$values",
						"$prop"
					],
					$prop: "row-gap"
				}
			},
			"hidden": "display: none",
			"float": {
				$prop: "float",
				$values: [
					"right",
					"left",
					"none"
				],
				"start": "inline-start",
				"end": "inline-end"
			},
			"clear": {
				$prop: "clear",
				$values: [
					"left",
					"right",
					"both",
					"none"
				],
				"start": "inline-start",
				"end": "inline-end"
			},
			"static": "position: static",
			"absolute": "position: absolute",
			"relative": "position: relative",
			"sticky": "position: sticky",
			"fixed": "position: fixed",
			"inset": {
				$prop: "inset",
				$values: {
					"auto": "auto",
					"full": "100%",
					"px": "1px"
				},
				$num: TRANSFORMERS.rem,
				$frac,
				$arbitrary: true,
				$negative: true,
				"x": {
					$inherit,
					$prop: ["left", "right"]
				},
				"y": {
					$inherit,
					$prop: ["top", "bottom"]
				}
			},
			"top": {
				$prop: "top",
				"auto": "auto",
				"full": "100%",
				"px": "1px",
				$num: TRANSFORMERS.rem,
				$frac,
				$arbitrary: true,
				$negative: true
			},
			"right": {
				$prop: "right",
				"auto": "auto",
				"full": "100%",
				"px": "1px",
				$num: TRANSFORMERS.rem,
				$frac,
				$arbitrary: true,
				$negative: true
			},
			"bottom": {
				$prop: "bottom",
				"auto": "auto",
				"full": "100%",
				"px": "1px",
				$num: TRANSFORMERS.rem,
				$frac,
				$arbitrary: true,
				$negative: true
			},
			"left": {
				$prop: "left",
				"auto": "auto",
				"full": "100%",
				"px": "1px",
				$num: TRANSFORMERS.rem,
				$frac,
				$arbitrary: true,
				$negative: true
			},
			"z": {
				$prop: "z-index",
				"auto": "auto",
				$num: (v) => `${v}`,
				$arbitrary: true,
				$negative: true
			},
			"size": {
				$prop: ["width", "height"],
				$frac,
				$num: TRANSFORMERS.rem,
				$arbitrary: true,
				"px": "1px",
				...SIZING_KEYWORDS
			},
			"w": {
				$prop: "width",
				$frac,
				$num: TRANSFORMERS.rem,
				$arbitrary: true,
				"auto": "auto",
				"px": "1px",
				...VIEWPORT_W,
				...SIZING_KEYWORDS
			},
			"h": {
				$prop: "height",
				$frac,
				$num: TRANSFORMERS.rem,
				$arbitrary: true,
				"auto": "auto",
				"px": "1px",
				...VIEWPORT_H,
				...SIZING_KEYWORDS
			},
			"min-w": {
				$prop: "min-width",
				$frac,
				$num: TRANSFORMERS.rem,
				$arbitrary: true,
				"auto": "auto",
				...VIEWPORT_W,
				...BREAKPOINT_WIDTHS,
				...SIZING_KEYWORDS
			},
			"max-w": {
				$prop: "max-width",
				$frac,
				$num: TRANSFORMERS.rem,
				$arbitrary: true,
				"none": "none",
				...VIEWPORT_W,
				...BREAKPOINT_WIDTHS,
				...SIZING_KEYWORDS
			},
			"min-h": {
				$prop: "min-height",
				$frac,
				$num: TRANSFORMERS.rem,
				$arbitrary: true,
				"auto": "auto",
				"px": "1px",
				"lh": "1lh",
				...VIEWPORT_H,
				...SIZING_KEYWORDS
			},
			"max-h": {
				$prop: "max-height",
				$frac,
				$num: TRANSFORMERS.rem,
				$arbitrary: true,
				"none": "none",
				"px": "1px",
				...VIEWPORT_H,
				...SIZING_KEYWORDS
			},
			"aspect": {
				$prop: "aspect-ratio",
				"auto": "auto",
				"square": "1 / 1",
				"video": "16 / 9",
				$frac: (v) => v,
				$arbitrary: true
			},
			"p": {
				$prop: "padding",
				...SPACING_PADDING_CONFIG
			},
			"px": {
				$prop: ["padding-left", "padding-right"],
				...SPACING_PADDING_CONFIG
			},
			"py": {
				$prop: ["padding-top", "padding-bottom"],
				...SPACING_PADDING_CONFIG
			},
			"pt": {
				$prop: "padding-top",
				...SPACING_PADDING_CONFIG
			},
			"pr": {
				$prop: "padding-right",
				...SPACING_PADDING_CONFIG
			},
			"pb": {
				$prop: "padding-bottom",
				...SPACING_PADDING_CONFIG
			},
			"pl": {
				$prop: "padding-left",
				...SPACING_PADDING_CONFIG
			},
			"m": {
				$prop: "margin",
				...SPACING_MARGIN_CONFIG
			},
			"mx": {
				$prop: ["margin-left", "margin-right"],
				...SPACING_MARGIN_CONFIG
			},
			"my": {
				$prop: ["margin-top", "margin-bottom"],
				...SPACING_MARGIN_CONFIG
			},
			"mt": {
				$prop: "margin-top",
				...SPACING_MARGIN_CONFIG
			},
			"mr": {
				$prop: "margin-right",
				...SPACING_MARGIN_CONFIG
			},
			"mb": {
				$prop: "margin-bottom",
				...SPACING_MARGIN_CONFIG
			},
			"ml": {
				$prop: "margin-left",
				...SPACING_MARGIN_CONFIG
			},
			"space": {
				"x": {
					$selector: PREFIX_HANDLERS.child,
					$negative: true,
					"reverse": "--q-space-x-reverse: 1",
					$num: (val) => {
						const rem = TRANSFORMERS.rem(val);
						return `margin-right: calc(${rem} * var(--q-space-x-reverse, 0)); margin-left: calc(${rem} * calc(1 - var(--q-space-x-reverse, 0)));`;
					},
					$arbitrary: (val) => {
						return `margin-right: calc(${val} * var(--q-space-x-reverse, 0)); margin-left: calc(${val} * calc(1 - var(--q-space-x-reverse, 0)));`;
					}
				},
				"y": {
					$selector: PREFIX_HANDLERS.child,
					$negative: true,
					"reverse": "--q-space-y-reverse: 1",
					$num: (val) => {
						const rem = TRANSFORMERS.rem(val);
						return `margin-bottom: calc(${rem} * var(--q-space-y-reverse, 0)); margin-top: calc(${rem} * calc(1 - var(--q-space-y-reverse, 0)));`;
					},
					$arbitrary: (val) => {
						return `margin-bottom: calc(${val} * var(--q-space-y-reverse, 0)); margin-top: calc(${val} * calc(1 - var(--q-space-y-reverse, 0)));`;
					}
				}
			},
			"truncate": "overflow: hidden; text-overflow: ellipsis; white-space: nowrap",
			"text": {
				"xs": "font-size: 0.75rem; line-height: 1.3333333",
				"sm": "font-size: 0.875rem; line-height: 1.4285714",
				"base": "font-size: 1rem; line-height: 1.5",
				"lg": "font-size: 1.125rem; line-height: 1.5555555",
				"xl": "font-size: 1.25rem; line-height: 1.4",
				"2xl": "font-size: 1.5rem; line-height: 1.3333333",
				"3xl": "font-size: 1.875rem; line-height: 1.2",
				"4xl": "font-size: 2.25rem; line-height: 1.1111111",
				"5xl": "font-size: 3rem; line-height: 1",
				"6xl": "font-size: 3.75rem; line-height: 1",
				"7xl": "font-size: 4.5rem; line-height: 1",
				"8xl": "font-size: 6rem; line-height: 1",
				"9xl": "font-size: 8rem; line-height: 1",
				"left": "text-align: left",
				"center": "text-align: center",
				"right": "text-align: right",
				"justify": "text-align: justify",
				"wrap": "text-wrap: wrap",
				"nowrap": "text-wrap: nowrap",
				"balance": "text-wrap: balance",
				"pretty": "text-wrap: pretty",
				"ellipsis": "text-overflow: ellipsis",
				"clip": "text-overflow: clip",
				$color: (colorName, opacity, context) => {
					context.$prop = "color";
					if (opacity != null) context.$base = `--q-text-opacity: ${opacity.toFixed(3)}`;
					return generateColorCss(colorName, opacity, "--q-text-opacity");
				},
				"opacity": {
					$prop: "--q-text-opacity",
					$num: TRANSFORMERS.opacity,
					$arbitrary: true
				},
				$arbitrary: (value, context) => {
					if (isColorValue(value, context)) {
						context.$prop = "color";
						return value;
					}
					context.$prop = "font-size";
					return value;
				}
			},
			"align": {
				$prop: "vertical-align",
				"baseline": "baseline",
				"top": "top",
				"middle": "middle",
				"bottom": "bottom",
				"text-top": "text-top",
				"text-bottom": "text-bottom"
			},
			"font": {
				$arbitrary: (value, context) => {
					context.$prop = /^\d/.test(value) ? "font-weight" : "font-family";
					return value;
				},
				"sans": "font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
				"serif": "font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
				"mono": "font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
				...FONT_FAMILY_UTILITIES,
				"thin": "font-weight: 100",
				"extralight": "font-weight: 200",
				"light": "font-weight: 300",
				"normal": "font-weight: 400",
				"medium": "font-weight: 500",
				"semibold": "font-weight: 600",
				"bold": "font-weight: 700",
				"extrabold": "font-weight: 800",
				"black": "font-weight: 900",
				"stretch": {
					$prop: "font-stretch",
					$values: [
						"ultra-condensed",
						"extra-condensed",
						"condensed",
						"semi-condensed",
						"normal",
						"semi-expanded",
						"expanded",
						"extra-expanded",
						"ultra-expanded"
					],
					$num: (v) => `${v}%`,
					$default: (v) => /^\d+(?:\.\d+)?%$/.test(v) ? v : void 0,
					$arbitrary: true
				}
			},
			"normal-nums": "font-variant-numeric: normal",
			"ordinal": "font-variant-numeric: ordinal",
			"slashed-zero": "font-variant-numeric: slashed-zero",
			"lining-nums": "font-variant-numeric: lining-nums",
			"oldstyle-nums": "font-variant-numeric: oldstyle-nums",
			"proportional-nums": "font-variant-numeric: proportional-nums",
			"tabular-nums": "font-variant-numeric: tabular-nums",
			"diagonal-fractions": "font-variant-numeric: diagonal-fractions",
			"stacked-fractions": "font-variant-numeric: stacked-fractions",
			"leading": {
				$prop: "line-height",
				"none": "1",
				"tight": "1.25",
				"snug": "1.375",
				"normal": "1.5",
				"relaxed": "1.625",
				"loose": "2",
				"": "1.5",
				$num: TRANSFORMERS.rem,
				$arbitrary: true
			},
			"tracking": {
				$prop: "letter-spacing",
				"tighter": "-0.05em",
				"tight": "-0.025em",
				"normal": "0em",
				"wide": "0.025em",
				"wider": "0.05em",
				"widest": "0.1em",
				$arbitrary: true
			},
			"indent": {
				$prop: "text-indent",
				$num: TRANSFORMERS.rem,
				$negative: true,
				$arbitrary: true
			},
			"tab": {
				$prop: "tab-size",
				$num: (value) => String(value),
				$arbitrary: true
			},
			"italic": "font-style: italic",
			"not-italic": "font-style: normal",
			"uppercase": "text-transform: uppercase",
			"lowercase": "text-transform: lowercase",
			"capitalize": "text-transform: capitalize",
			"underline": "text-decoration: underline",
			"no-underline": "text-decoration: none",
			"overline": "text-decoration: overline",
			"line-through": "text-decoration: line-through",
			"underline-offset": {
				$prop: "text-underline-offset",
				$num: TRANSFORMERS.px,
				$arbitrary: true,
				"auto": "auto"
			},
			"decoration": {
				$prop: "text-decoration-thickness",
				"solid": { "": "text-decoration-style: solid" },
				"double": { "": "text-decoration-style: double" },
				"dotted": { "": "text-decoration-style: dotted" },
				"dashed": { "": "text-decoration-style: dashed" },
				"wavy": { "": "text-decoration-style: wavy" },
				"auto": "auto",
				"from-font": "from-font",
				$num: TRANSFORMERS.px,
				$arbitrary: (value, context) => {
					if (isColorValue(value, context)) context.$prop = "text-decoration-color";
					return value;
				},
				$color: (colorName, opacity, context) => {
					context.$prop = "text-decoration-color";
					return generateColorCss(colorName, opacity);
				}
			},
			"whitespace": {
				$prop: "white-space",
				$values: [
					"normal",
					"nowrap",
					"pre",
					"pre-line",
					"pre-wrap",
					"break-spaces"
				]
			},
			"break": {
				"normal": "overflow-wrap: normal; word-break: normal",
				"words": "overflow-wrap: break-word",
				"all": "word-break: break-all"
			},
			"line-clamp": {
				"none": compact(`
            overflow: visible;
            display: block;
            -webkit-box-orient: horizontal;
            -webkit-line-clamp: none;
        `),
				$num: (v) => compact(`
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: ${v};
        `)
			},
			"hyphens": {
				$prop: "hyphens",
				$values: [
					"none",
					"manual",
					"auto"
				]
			},
			"antialiased": "-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale",
			"subpixel-antialiased": "-webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto",
			"text-shadow": {
				$prop: "text-shadow",
				"none": "none",
				"2xs": "0 1px 0 var(--q-text-shadow-color, rgb(0 0 0 / 0.15))",
				"xs": "0 1px 1px var(--q-text-shadow-color, rgb(0 0 0 / 0.20))",
				"sm": "0 1px 2px var(--q-text-shadow-color, rgb(0 0 0 / 0.15))",
				"md": "0 4px 8px var(--q-text-shadow-color, rgb(0 0 0 / 0.25))",
				"lg": "0 8px 16px var(--q-text-shadow-color, rgb(0 0 0 / 0.30))",
				"": "0 2px 4px var(--q-text-shadow-color, rgb(0 0 0 / 0.25))",
				$color: (colorName, opacity, context) => {
					context.$prop = "--q-text-shadow-color";
					return generateColorCss(colorName, opacity);
				},
				$arbitrary: (value, context) => {
					if (CSS.supports("color", value)) context.$prop = "--q-text-shadow-color";
					return value;
				}
			},
			"list": {
				$arbitrary: (value, context) => {
					context.$prop = "list-style-type";
					return value;
				},
				"none": "list-style-type: none",
				"disc": "list-style-type: disc",
				"decimal": "list-style-type: decimal",
				"inside": "list-style-position: inside",
				"outside": "list-style-position: outside"
			},
			"bg": {
				$color: (colorName, opacity, context) => {
					let prop = "background-color: ";
					if (opacity != null) prop = `--q-bg-opacity: ${opacity.toFixed(3)}; ` + prop;
					else context.$base = "--q-bg-opacity: 1";
					return prop + generateColorCss(colorName, opacity, "--q-bg-opacity");
				},
				"opacity": {
					$prop: "--q-bg-opacity",
					$num: TRANSFORMERS.opacity
				},
				$arbitrary: (value, context) => {
					const hint = value.match(/^(color|length|size|percentage|position|image|url):(.+)$/);
					if (hint) {
						context.$prop = {
							color: "background-color",
							length: "background-size",
							size: "background-size",
							percentage: "background-size",
							position: "background-position",
							image: "background-image",
							url: "background-image"
						}[hint[1]];
						return hint[1] === "url" ? `url(${hint[2]})` : hint[2];
					}
					if (isColorValue(value, context)) {
						context.$prop = "background-color";
						return value;
					}
					context.$prop = "background-image";
					return value;
				},
				"none": "background-image: none",
				"fixed": "background-attachment: fixed",
				"local": "background-attachment: local",
				"scroll": "background-attachment: scroll",
				"blend": {
					$prop: "background-blend-mode",
					$values: [
						"normal",
						"multiply",
						"screen",
						"overlay",
						"darken",
						"lighten",
						"color-dodge",
						"color-burn",
						"hard-light",
						"soft-light",
						"difference",
						"exclusion",
						"hue",
						"saturation",
						"color",
						"luminosity"
					]
				},
				"clip": {
					$prop: ["-webkit-background-clip", "background-clip"],
					"border": "border-box",
					"padding": "padding-box",
					"content": "content-box",
					"text": "text"
				},
				"origin": {
					$prop: "background-origin",
					"border": "border-box",
					"padding": "padding-box",
					"content": "content-box"
				},
				"center": "background-position: center",
				"top": {
					$prop: "background-position",
					"": "top",
					"left": "top left",
					"right": "top right"
				},
				"bottom": {
					$prop: "background-position",
					"": "bottom",
					"left": "bottom left",
					"right": "bottom right"
				},
				"left": "background-position: left",
				"right": "background-position: right",
				"repeat": {
					$prop: "background-repeat",
					"": "repeat",
					"x": "repeat-x",
					"y": "repeat-y",
					"round": "round",
					"space": "space"
				},
				"no-repeat": "background-repeat: no-repeat",
				"auto": "background-size: auto",
				"cover": "background-size: cover",
				"contain": "background-size: contain",
				"gradient-to": {
					$prop: "background-image",
					"t": "linear-gradient(to top, var(--q-gradient-stops))",
					"b": "linear-gradient(to bottom, var(--q-gradient-stops))",
					"l": "linear-gradient(to left, var(--q-gradient-stops))",
					"r": "linear-gradient(to right, var(--q-gradient-stops))",
					"tl": "linear-gradient(to top left, var(--q-gradient-stops))",
					"tr": "linear-gradient(to top right, var(--q-gradient-stops))",
					"bl": "linear-gradient(to bottom left, var(--q-gradient-stops))",
					"br": "linear-gradient(to bottom right, var(--q-gradient-stops))",
					$arbitrary: (value) => `linear-gradient(${value}, var(--q-gradient-stops))`
				},
				"radial": {
					$prop: "background-image",
					"": "radial-gradient(ellipse, var(--q-gradient-stops))"
				},
				"conic": {
					$prop: "background-image",
					"": "conic-gradient(var(--q-gradient-stops))"
				}
			},
			"from": {
				$color: (color, opacity) => {
					const fromColor = generateColorCss(color, opacity);
					const toColor = `rgb(from ${fromColor} r g b / 0)`;
					return compact(`
                --q-gradient-from: ${fromColor} var(--q-gradient-from-position, 0%);
                --q-gradient-to: ${toColor} var(--q-gradient-to-position, 100%);
                --q-gradient-stops: var(--q-gradient-from), var(--q-gradient-to);
            `);
				},
				$arbitrary: (value, context) => {
					context.$prop = "--q-gradient-from";
					return value;
				},
				$default: (value, context) => {
					if (/^[\d.]+%$/.test(value)) {
						context.$prop = "--q-gradient-from-position";
						return value;
					}
				}
			},
			"via": {
				$color: (color, opacity) => {
					const viaColor = generateColorCss(color, opacity);
					const toColor = `rgb(from ${viaColor} r g b / 0)`;
					return compact(`
                --q-gradient-via: ${viaColor} var(--q-gradient-via-position, 50%);
                --q-gradient-to: ${toColor} var(--q-gradient-to-position, 100%);
                --q-gradient-stops: var(--q-gradient-from), var(--q-gradient-via), var(--q-gradient-to);
            `);
				},
				$arbitrary: (value, context) => {
					context.$prop = "--q-gradient-via";
					return value;
				},
				$default: (value, context) => {
					if (/^[\d.]+%$/.test(value)) {
						context.$prop = "--q-gradient-via-position";
						return value;
					}
				}
			},
			"to": {
				$prop: "--q-gradient-to",
				$color: (color, opacity) => `${generateColorCss(color, opacity)} var(--q-gradient-to-position, 100%)`,
				$arbitrary: (value) => value,
				$default: (value, context) => {
					if (/^[\d.]+%$/.test(value)) {
						context.$prop = "--q-gradient-to-position";
						return value;
					}
				}
			},
			"transform": {
				"": BASE_CSS.transform,
				"flat": "transform-style: flat",
				"3d": "transform-style: preserve-3d"
			},
			"translate": {
				$base: BASE_CSS.transform,
				$num: TRANSFORMERS.rem,
				$frac,
				$negative: true,
				$arbitrary: true,
				$values: { "full": "100%" },
				"x": {
					$inherit,
					$prop: "--q-translate-x"
				},
				"y": {
					$inherit,
					$prop: "--q-translate-y"
				}
			},
			"scale": {
				$base: BASE_CSS.transform,
				$num: TRANSFORMERS.opacity,
				$arbitrary: true,
				$prop: ["--q-scale-x", "--q-scale-y"],
				"x": {
					$inherit,
					$prop: "--q-scale-x"
				},
				"y": {
					$inherit,
					$prop: "--q-scale-y"
				}
			},
			"rotate": {
				$prop: "--q-rotate",
				$base: BASE_CSS.transform,
				$num: TRANSFORMERS.deg,
				$negative: true,
				$arbitrary: true
			},
			"skew": {
				$base: BASE_CSS.transform,
				$num: TRANSFORMERS.deg,
				$negative: true,
				$arbitrary: true,
				"x": {
					$inherit,
					$prop: "--q-skew-x"
				},
				"y": {
					$inherit,
					$prop: "--q-skew-y"
				}
			},
			"backface": {
				$prop: "backface-visibility",
				"visible": "visible",
				"hidden": "hidden"
			},
			"perspective": {
				$prop: "perspective",
				"none": "none",
				$num: TRANSFORMERS.px,
				$arbitrary: true
			},
			"transform-style": {
				$prop: "transform-style",
				"flat": "flat",
				"3d": "preserve-3d"
			},
			"will-change": {
				$prop: "will-change",
				$values: [
					"auto",
					"scroll-position",
					"contents",
					"transform"
				],
				$arbitrary: true
			},
			"transition": {
				$prop: "transition-property",
				$base: BASE_CSS.transition,
				$arbitrary: true,
				"": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
				"all": "all",
				"colors": "color, background-color, border-color, text-decoration-color, fill, stroke",
				"opacity": "opacity",
				"shadow": "box-shadow",
				"transform": "transform",
				"none": "none"
			},
			"duration": {
				$prop: "transition-duration",
				$num: TRANSFORMERS.ms,
				$arbitrary: true
			},
			"delay": {
				$prop: "transition-delay",
				$num: TRANSFORMERS.ms,
				$arbitrary: true
			},
			"ease": {
				$prop: "transition-timing-function",
				$values: {
					"linear": "linear",
					"in": "cubic-bezier(0.4, 0, 1, 1)",
					"out": "cubic-bezier(0, 0, 0.2, 1)",
					"in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
				},
				$arbitrary: true
			},
			"origin": {
				$prop: "transform-origin",
				$arbitrary: true,
				"center": "center",
				"top": "top",
				"top-right": "top right",
				"right": "right",
				"bottom-right": "bottom right",
				"bottom": "bottom",
				"bottom-left": "bottom left",
				"left": "left",
				"top-left": "top left"
			},
			"opacity": {
				$prop: "opacity",
				$num: TRANSFORMERS.opacity,
				$arbitrary: true
			},
			"mix-blend": {
				$prop: "mix-blend-mode",
				$values: [
					"normal",
					"multiply",
					"screen",
					"overlay",
					"darken",
					"lighten",
					"color-dodge",
					"color-burn",
					"hard-light",
					"soft-light",
					"difference",
					"exclusion",
					"hue",
					"saturation",
					"color",
					"luminosity",
					"plus-darker",
					"plus-lighter"
				]
			},
			"shadow": {
				$prop: "--q-shadow",
				$base: BASE_CSS.shadow,
				...SHADOW_MAP,
				$color: (colorName, opacity, context) => {
					context.$prop = "--q-shadow-color";
					return generateColorCss(colorName, opacity);
				},
				$arbitrary: true
			},
			"inset-shadow": {
				$prop: "--q-shadow",
				$base: BASE_CSS.shadow,
				...INSET_SHADOW_MAP,
				$color: (colorName, opacity, context) => {
					context.$prop = "--q-shadow-color";
					return generateColorCss(colorName, opacity);
				},
				$arbitrary: (value) => `inset ${value}`
			},
			"ring": {
				$base: BASE_CSS.shadow,
				$num: (value, context) => {
					context.$prop = "--q-ring-width";
					return `${value}px`;
				},
				$default: (v, ctx) => {
					if (v === "") {
						ctx.$prop = "--q-ring-width";
						return "1px";
					}
				},
				$arbitrary: (value, context) => {
					if (isColorValue(value, context)) {
						context.$prop = "--q-ring-color";
						return value;
					}
					context.$prop = "--q-ring-width";
					return /^[\d.]+$/.test(value) ? value + "px" : value;
				},
				$color: (colorName, opacity, context) => {
					context.$prop = "--q-ring-color";
					if (opacity != null) context.$base += `; --q-ring-opacity: ${opacity.toFixed(3)}`;
					return generateColorCss(colorName, opacity, "--q-ring-opacity");
				},
				"inset": {
					$prop: "--q-ring-inset",
					"": "inset"
				},
				"opacity": {
					$prop: "--q-ring-opacity",
					$num: TRANSFORMERS.opacity,
					$arbitrary: true
				},
				"offset": {
					$base: BASE_CSS.shadow,
					$num: (value, context) => {
						context.$prop = "--q-ring-offset-width";
						return `${value}px`;
					},
					$color: (color, opacity, context) => {
						context.$prop = "--q-ring-offset-color";
						return generateColorCss(color, opacity);
					},
					$arbitrary: (value, context) => {
						context.$prop = "--q-ring-offset-width";
						return value;
					}
				}
			},
			"filter-none": "filter: none",
			"blur": {
				$prop: "--q-blur",
				$base: BASE_CSS.filter,
				...BLUR_MAP,
				"none": "blur(0)",
				$arbitrary: (value) => `blur(${value})`
			},
			"brightness": {
				$prop: "--q-brightness",
				$base: BASE_CSS.filter,
				$num: (v) => `brightness(${TRANSFORMERS.opacity(v)})`,
				$arbitrary: (value) => `brightness(${value})`
			},
			"contrast": {
				$prop: "--q-contrast",
				$base: BASE_CSS.filter,
				$num: (v) => `contrast(${TRANSFORMERS.opacity(v)})`,
				$arbitrary: (value) => `contrast(${value})`
			},
			"drop-shadow": {
				$prop: "--q-drop-shadow",
				$base: BASE_CSS.filter,
				...DROP_SHADOW_MAP,
				$arbitrary: (value) => `drop-shadow(${value})`
			},
			"grayscale": {
				$prop: "--q-grayscale",
				$base: BASE_CSS.filter,
				"": "grayscale(100%)",
				$num: (v) => `grayscale(${v}%)`,
				$arbitrary: (value) => `grayscale(${value})`
			},
			"hue-rotate": {
				$prop: "--q-hue-rotate",
				$base: BASE_CSS.filter,
				$num: (v) => `hue-rotate(${v}deg)`,
				$negative: true,
				$arbitrary: (value) => `hue-rotate(${value})`
			},
			"invert": {
				$prop: "--q-invert",
				$base: BASE_CSS.filter,
				"": "invert(100%)",
				$num: (v) => `invert(${v}%)`,
				$arbitrary: (value) => `invert(${value})`
			},
			"saturate": {
				$prop: "--q-saturate",
				$base: BASE_CSS.filter,
				$num: (v) => `saturate(${TRANSFORMERS.opacity(v)})`,
				$arbitrary: (value) => `saturate(${value})`
			},
			"sepia": {
				$prop: "--q-sepia",
				$base: BASE_CSS.filter,
				"": "sepia(100%)",
				$num: (v) => `sepia(${v}%)`,
				$arbitrary: (value) => `sepia(${value})`
			},
			"backdrop": {
				"filter": { "none": "backdrop-filter: none" },
				"blur": {
					$prop: "--q-backdrop-blur",
					$base: BASE_CSS.backdrop,
					...BLUR_MAP,
					"none": "blur(0)",
					$arbitrary: (value) => `blur(${value})`
				},
				"brightness": {
					$prop: "--q-backdrop-brightness",
					$base: BASE_CSS.backdrop,
					$num: (v) => `brightness(${TRANSFORMERS.opacity(v)})`,
					$arbitrary: (value) => `brightness(${value})`
				},
				"contrast": {
					$prop: "--q-backdrop-contrast",
					$base: BASE_CSS.backdrop,
					$num: (v) => `contrast(${TRANSFORMERS.opacity(v)})`,
					$arbitrary: (value) => `contrast(${value})`
				},
				"grayscale": {
					$prop: "--q-backdrop-grayscale",
					$base: BASE_CSS.backdrop,
					"": "grayscale(100%)",
					$num: (v) => `grayscale(${v}%)`,
					$arbitrary: (value) => `grayscale(${value})`
				},
				"hue-rotate": {
					$prop: "--q-backdrop-hue-rotate",
					$base: BASE_CSS.backdrop,
					$num: (v) => `hue-rotate(${v}deg)`,
					$negative: true,
					$arbitrary: (value) => `hue-rotate(${value})`
				},
				"invert": {
					$prop: "--q-backdrop-invert",
					$base: BASE_CSS.backdrop,
					"": "invert(100%)",
					$num: (v) => `invert(${v}%)`,
					$arbitrary: (value) => `invert(${value})`
				},
				"saturate": {
					$prop: "--q-backdrop-saturate",
					$base: BASE_CSS.backdrop,
					$num: (v) => `saturate(${TRANSFORMERS.opacity(v)})`,
					$arbitrary: (value) => `saturate(${value})`
				},
				"sepia": {
					$prop: "--q-backdrop-sepia",
					$base: BASE_CSS.backdrop,
					"": "sepia(100%)",
					$num: (v) => `sepia(${v}%)`,
					$arbitrary: (value) => `sepia(${value})`
				}
			},
			"border": {
				$prop: "border-width",
				$values: { "": "1px" },
				$num: TRANSFORMERS.px,
				"x": {
					$inherit,
					$prop: ["border-left-width", "border-right-width"]
				},
				"y": {
					$inherit,
					$prop: ["border-top-width", "border-bottom-width"]
				},
				"t": {
					$inherit,
					$prop: "border-top-width"
				},
				"r": {
					$inherit,
					$prop: "border-right-width"
				},
				"b": {
					$inherit,
					$prop: "border-bottom-width"
				},
				"l": {
					$inherit,
					$prop: "border-left-width"
				},
				"solid": { "": "border-style: solid" },
				"dashed": { "": "border-style: dashed" },
				"dotted": { "": "border-style: dotted" },
				"double": { "": "border-style: double" },
				"none": { "": "border-style: none" },
				$color: (colorName, opacity, context) => {
					context.$base = void 0;
					context.$prop = toColorProp(context.$prop);
					if (opacity != null) context.$base = `--q-border-opacity: ${opacity.toFixed(3)}`;
					return generateColorCss(colorName, opacity, "--q-border-opacity");
				},
				"opacity": {
					$prop: "--q-border-opacity",
					$num: TRANSFORMERS.opacity
				},
				$arbitrary: (value, context) => {
					if (isColorValue(value, context)) {
						context.$base = void 0;
						context.$prop = toColorProp(context.$prop);
					}
					return value;
				}
			},
			"outline": {
				$prop: "outline-width",
				"": "1px",
				$num: TRANSFORMERS.px,
				"none": { "": "outline-style: none" },
				"solid": { "": "outline-style: solid" },
				"dashed": { "": "outline-style: dashed" },
				"dotted": { "": "outline-style: dotted" },
				"double": { "": "outline-style: double" },
				"hidden": { "": "outline: 2px solid transparent; outline-offset: 2px" },
				"offset": {
					$prop: "outline-offset",
					$num: TRANSFORMERS.px,
					$negative: true,
					$arbitrary: true
				},
				$color: (color, opacity, context) => {
					context.$prop = "outline-color";
					return generateColorCss(color, opacity);
				},
				$arbitrary: (value, context) => {
					if (isColorValue(value, context)) context.$prop = "outline-color";
					return value;
				}
			},
			"divide": {
				$selector: PREFIX_HANDLERS.child,
				$prop: "border-style",
				$values: [
					"solid",
					"dashed",
					"dotted",
					"double",
					"none"
				],
				$color: (colorName, opacity, context) => {
					context.$prop = "border-color";
					if (opacity != null) context.$base = `--q-divide-opacity: ${opacity.toFixed(3)}`;
					return generateColorCss(colorName, opacity, "--q-divide-opacity");
				},
				"opacity": {
					$selector: PREFIX_HANDLERS.child,
					$prop: "--q-divide-opacity",
					$num: TRANSFORMERS.opacity
				},
				$arbitrary: (value, context) => {
					if (!looksLikeColor(value)) return null;
					context.$prop = "border-color";
					return value;
				},
				"x": {
					$selector: PREFIX_HANDLERS.child,
					"reverse": "--q-divide-x-reverse: 1",
					$num: (width) => `border-left-width: calc(${width}px * calc(1 - var(--q-divide-x-reverse, 0))); border-right-width: calc(${width}px * var(--q-divide-x-reverse, 0))`,
					$default: (v, ctx) => {
						if (v == "") return ctx.$num(1);
					}
				},
				"y": {
					$selector: PREFIX_HANDLERS.child,
					"reverse": "--q-divide-y-reverse: 1",
					$num: (width) => `border-top-width: calc(${width}px * calc(1 - var(--q-divide-y-reverse, 0))); border-bottom-width: calc(${width}px * var(--q-divide-y-reverse, 0))`,
					$default: (v, ctx) => {
						if (v == "") return ctx.$num(1);
					}
				}
			},
			"rounded": {
				$prop: "border-radius",
				$values: BORDER_RADIUS_SCALE,
				$num: TRANSFORMERS.rem,
				$arbitrary: true,
				"t": {
					$inherit,
					$prop: ["border-top-left-radius", "border-top-right-radius"]
				},
				"r": {
					$inherit,
					$prop: ["border-top-right-radius", "border-bottom-right-radius"]
				},
				"b": {
					$inherit,
					$prop: ["border-bottom-left-radius", "border-bottom-right-radius"]
				},
				"l": {
					$inherit,
					$prop: ["border-top-left-radius", "border-bottom-left-radius"]
				},
				"tl": {
					$inherit,
					$prop: "border-top-left-radius"
				},
				"tr": {
					$inherit,
					$prop: "border-top-right-radius"
				},
				"bl": {
					$inherit,
					$prop: "border-bottom-left-radius"
				},
				"br": {
					$inherit,
					$prop: "border-bottom-right-radius"
				}
			},
			"overflow": {
				$prop: "overflow",
				$values: [
					"auto",
					"hidden",
					"clip",
					"visible",
					"scroll"
				],
				"x": {
					$inherit,
					$prop: "overflow-x"
				},
				"y": {
					$inherit,
					$prop: "overflow-y"
				}
			},
			"animate": {
				$prop: "animation",
				"none": "none",
				"spin": "spin 1s linear infinite",
				"ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
				"pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				"bounce": "bounce 1s infinite",
				"fade": "fade 1s ease-in-out infinite",
				$arbitrary: true
			},
			"accent": {
				$prop: "accent-color",
				$color: (colorName, opacity) => generateColorCss(colorName, opacity),
				$arbitrary: true
			},
			"caret": {
				$prop: "caret-color",
				$color: (colorName, opacity) => generateColorCss(colorName, opacity),
				$arbitrary: true
			},
			"placeholder": {
				$prop: "color",
				$selector: PREFIX_HANDLERS.placeholder,
				$color: (colorName, opacity) => generateColorCss(colorName, opacity),
				$arbitrary: true
			},
			"cursor": {
				$prop: "cursor",
				$arbitrary: true,
				$values: [
					"auto",
					"default",
					"pointer",
					"wait",
					"text",
					"move",
					"help",
					"not-allowed",
					"none",
					"context-menu",
					"progress",
					"cell",
					"crosshair",
					"vertical-text",
					"alias",
					"copy",
					"no-drop",
					"grab",
					"grabbing",
					"all-scroll",
					"col-resize",
					"row-resize",
					"n-resize",
					"e-resize",
					"s-resize",
					"w-resize",
					"ne-resize",
					"nw-resize",
					"se-resize",
					"sw-resize",
					"ew-resize",
					"ns-resize",
					"nesw-resize",
					"nwse-resize",
					"zoom-in",
					"zoom-out"
				]
			},
			"select": {
				$prop: "user-select",
				$values: [
					"none",
					"text",
					"auto",
					"all"
				]
			},
			"appearance-none": "appearance: none",
			"resize": {
				$prop: "resize",
				"": "both",
				"x": "horizontal",
				"y": "vertical",
				"none": "none"
			},
			"pointer-events": {
				$prop: "pointer-events",
				$values: ["none", "auto"]
			},
			"touch": {
				$prop: "touch-action",
				$values: [
					"auto",
					"none",
					"pan-x",
					"pan-left",
					"pan-right",
					"pan-y",
					"pan-up",
					"pan-down",
					"pinch-zoom",
					"manipulation"
				]
			},
			"scroll-smooth": "scroll-behavior: smooth",
			"scroll-auto": "scroll-behavior: auto",
			"snap": {
				"none": "scroll-snap-type: none",
				"x": "scroll-snap-type: x var(--q-scroll-snap-strictness, proximity)",
				"y": "scroll-snap-type: y var(--q-scroll-snap-strictness, proximity)",
				"both": "scroll-snap-type: both var(--q-scroll-snap-strictness, proximity)",
				"mandatory": "--q-scroll-snap-strictness: mandatory",
				"proximity": "--q-scroll-snap-strictness: proximity",
				"start": "scroll-snap-align: start",
				"end": "scroll-snap-align: end",
				"center": "scroll-snap-align: center",
				"align-none": "scroll-snap-align: none",
				"normal": "scroll-snap-stop: normal",
				"always": "scroll-snap-stop: always"
			},
			"overscroll": {
				$prop: "overscroll-behavior",
				$values: [
					"auto",
					"contain",
					"none"
				],
				"x": {
					$inherit,
					$prop: "overscroll-behavior-x"
				},
				"y": {
					$inherit,
					$prop: "overscroll-behavior-y"
				}
			},
			"scroll-m": {
				$prop: "scroll-margin",
				...SPACING_MARGIN_CONFIG
			},
			"scroll-mx": {
				$prop: ["scroll-margin-left", "scroll-margin-right"],
				...SPACING_MARGIN_CONFIG
			},
			"scroll-my": {
				$prop: ["scroll-margin-top", "scroll-margin-bottom"],
				...SPACING_MARGIN_CONFIG
			},
			"scroll-mt": {
				$prop: "scroll-margin-top",
				...SPACING_MARGIN_CONFIG
			},
			"scroll-mr": {
				$prop: "scroll-margin-right",
				...SPACING_MARGIN_CONFIG
			},
			"scroll-mb": {
				$prop: "scroll-margin-bottom",
				...SPACING_MARGIN_CONFIG
			},
			"scroll-ml": {
				$prop: "scroll-margin-left",
				...SPACING_MARGIN_CONFIG
			},
			"scroll-p": {
				$prop: "scroll-padding",
				...SPACING_PADDING_CONFIG
			},
			"scroll-px": {
				$prop: ["scroll-padding-left", "scroll-padding-right"],
				...SPACING_PADDING_CONFIG
			},
			"scroll-py": {
				$prop: ["scroll-padding-top", "scroll-padding-bottom"],
				...SPACING_PADDING_CONFIG
			},
			"scroll-pt": {
				$prop: "scroll-padding-top",
				...SPACING_PADDING_CONFIG
			},
			"scroll-pr": {
				$prop: "scroll-padding-right",
				...SPACING_PADDING_CONFIG
			},
			"scroll-pb": {
				$prop: "scroll-padding-bottom",
				...SPACING_PADDING_CONFIG
			},
			"scroll-pl": {
				$prop: "scroll-padding-left",
				...SPACING_PADDING_CONFIG
			},
			"fill": {
				$prop: "fill",
				"none": "none",
				$color: (colorName, opacity) => generateColorCss(colorName, opacity),
				$arbitrary: true
			},
			"stroke": {
				"none": "stroke: none",
				$num: (value, context) => {
					context.$prop = "stroke-width";
					return `${value}px`;
				},
				$color: (colorName, opacity, context) => {
					context.$prop = "stroke";
					return generateColorCss(colorName, opacity);
				},
				$arbitrary: (value, context) => {
					if (isColorValue(value, context)) context.$prop = "stroke";
					else context.$prop = "stroke-width";
					return value;
				}
			},
			"object": {
				$arbitrary: (value, context) => {
					context.$prop = "object-position";
					return value;
				},
				"contain": "object-fit: contain",
				"cover": "object-fit: cover",
				"fill": "object-fit: fill",
				"none": "object-fit: none",
				"scale-down": "object-fit: scale-down",
				"bottom": "object-position: bottom",
				"center": "object-position: center",
				"left": "object-position: left",
				"right": "object-position: right",
				"top": "object-position: top",
				"left-top": "object-position: left top",
				"right-top": "object-position: right top",
				"left-bottom": "object-position: left bottom",
				"right-bottom": "object-position: right bottom"
			},
			"sr-only": compact(`
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    `),
			"not-sr-only": compact(`
        position: static;
        width: auto;
        height: auto;
        padding: 0;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
    `),
			"table": {
				"": "display: table",
				"auto": "table-layout: auto",
				"fixed": "table-layout: fixed",
				"row": "display: table-row",
				"cell": "display: table-cell",
				"caption": "display: table-caption",
				"column": "display: table-column",
				"column-group": "display: table-column-group",
				"header-group": "display: table-header-group",
				"footer-group": "display: table-footer-group",
				"row-group": "display: table-row-group"
			},
			"caption": {
				$prop: "caption-side",
				$values: ["top", "bottom"]
			},
			"border-collapse": "border-collapse: collapse",
			"border-separate": "border-collapse: separate",
			"border-spacing": {
				$prop: ["--q-border-spacing-x", "--q-border-spacing-y"],
				$base: BASE_CSS.borderSpacing,
				$values: { "px": "1px" },
				$num: TRANSFORMERS.rem,
				$arbitrary: true,
				"x": {
					$inherit,
					$prop: "--q-border-spacing-x"
				},
				"y": {
					$inherit,
					$prop: "--q-border-spacing-y"
				}
			}
		};
		const merge = (a, b) => Object.entries(b ?? {}).reduce((a, [k, v]) => (a[k] = v?.constructor === Object && a[k]?.constructor === Object ? merge(a[k], v) : v, a), a);
		{
			const U = UTILITY_CONFIG;
			const STOPS = "var(--q-gradient-stops)";
			const OKLAB = V3 ? "" : " in oklab";
			const deg = (v) => `${v}deg`;
			Object.assign(U, {
				"transform": {
					"": BASE_CSS.transform,
					"cpu": BASE_CSS.transform,
					"gpu": "transform: translateZ(0) var(--q-rotate-x,) var(--q-rotate-y,) var(--q-rotate-z,) var(--q-skew-x,) var(--q-skew-y,)",
					"none": "transform: none",
					"flat": "transform-style: flat",
					"3d": "transform-style: preserve-3d"
				},
				"translate": {
					$base: BASE_CSS.translate,
					$num: TRANSFORMERS.rem,
					$frac,
					$negative: true,
					$arbitrary: true,
					$values: {
						"full": "100%",
						"px": "1px"
					},
					"x": {
						$inherit,
						$prop: "--q-translate-x"
					},
					"y": {
						$inherit,
						$prop: "--q-translate-y"
					},
					"z": {
						$inherit,
						$base: BASE_CSS.translateZ,
						$prop: "--q-translate-z"
					}
				},
				"translate-none": "translate: none",
				"scale": {
					$base: BASE_CSS.scale,
					$num: (v) => `${v}%`,
					$negative: true,
					$arbitrary: true,
					$prop: [
						"--q-scale-x",
						"--q-scale-y",
						"--q-scale-z"
					],
					"x": {
						$inherit,
						$prop: "--q-scale-x"
					},
					"y": {
						$inherit,
						$prop: "--q-scale-y"
					},
					"z": {
						$inherit,
						$base: BASE_CSS.scaleZ,
						$prop: "--q-scale-z"
					}
				},
				"scale-none": "scale: none",
				"rotate": {
					$prop: "rotate",
					$num: deg,
					$negative: true,
					$arbitrary: true,
					"none": "none",
					"x": {
						$prop: "--q-rotate-x",
						$base: BASE_CSS.transform,
						$num: (v) => `rotateX(${v}deg)`,
						$negative: true,
						$arbitrary: (v) => `rotateX(${v})`
					},
					"y": {
						$prop: "--q-rotate-y",
						$base: BASE_CSS.transform,
						$num: (v) => `rotateY(${v}deg)`,
						$negative: true,
						$arbitrary: (v) => `rotateY(${v})`
					},
					"z": {
						$prop: "--q-rotate-z",
						$base: BASE_CSS.transform,
						$num: (v) => `rotateZ(${v}deg)`,
						$negative: true,
						$arbitrary: (v) => `rotateZ(${v})`
					}
				},
				"skew": {
					$base: BASE_CSS.transform,
					$negative: true,
					$num: (v, ctx) => {
						ctx.$prop = "";
						return `--q-skew-x: skewX(${v}deg); --q-skew-y: skewY(${v}deg)`;
					},
					$arbitrary: (v, ctx) => {
						ctx.$prop = "";
						return `--q-skew-x: skewX(${v}); --q-skew-y: skewY(${v})`;
					},
					"x": {
						$prop: "--q-skew-x",
						$base: BASE_CSS.transform,
						$negative: true,
						$num: (v) => `skewX(${v}deg)`,
						$arbitrary: (v) => `skewX(${v})`
					},
					"y": {
						$prop: "--q-skew-y",
						$base: BASE_CSS.transform,
						$negative: true,
						$num: (v) => `skewY(${v}deg)`,
						$arbitrary: (v) => `skewY(${v})`
					}
				},
				"perspective": {
					$prop: "perspective",
					$num: TRANSFORMERS.px,
					$arbitrary: true,
					"none": "none",
					"dramatic": "100px",
					"near": "300px",
					"normal": "500px",
					"midrange": "800px",
					"distant": "1200px",
					"origin": {
						$prop: "perspective-origin",
						$arbitrary: true,
						"center": "center",
						"top": "top",
						"top-right": "top right",
						"right": "right",
						"bottom-right": "bottom right",
						"bottom": "bottom",
						"bottom-left": "bottom left",
						"left": "left",
						"top-left": "top left"
					}
				},
				"zoom": {
					$prop: "zoom",
					$num: (v) => `${v}%`,
					$arbitrary: true
				}
			});
			merge(U.transition, {
				"": "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter",
				"colors": "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
				"transform": "transform, translate, scale, rotate",
				"normal": { "": "transition-behavior: normal" },
				"allow-discrete": { "": "transition-behavior: allow-discrete" }
			});
			merge(U.ease, { $values: { "initial": "initial" } });
			Object.assign(U, {
				"inset-shadow": {
					$prop: "--q-inset-shadow",
					$base: BASE_CSS.shadow,
					...INSET_SHADOW_MAP,
					$color: (c, o, ctx) => {
						ctx.$prop = "--q-inset-shadow-color";
						return generateColorCss(c, o);
					},
					$arbitrary: (value, ctx) => {
						if (isColorValue(value, ctx)) {
							ctx.$prop = "--q-inset-shadow-color";
							return value;
						}
						return `inset ${value}`;
					}
				},
				"inset-ring": {
					$base: BASE_CSS.shadow,
					$default: (v, ctx) => {
						if (v === "") {
							ctx.$prop = "--q-inset-ring-shadow";
							return "inset 0 0 0 1px var(--q-inset-ring-color, currentColor)";
						}
					},
					$num: (v, ctx) => {
						ctx.$prop = "--q-inset-ring-shadow";
						return `inset 0 0 0 ${v}px var(--q-inset-ring-color, currentColor)`;
					},
					$arbitrary: (value, ctx) => {
						if (isColorValue(value, ctx)) {
							ctx.$prop = "--q-inset-ring-color";
							return value;
						}
						ctx.$prop = "--q-inset-ring-shadow";
						return `inset 0 0 0 ${/^[\d.]+$/.test(value) ? value + "px" : value} var(--q-inset-ring-color, currentColor)`;
					},
					$color: (c, o, ctx) => {
						ctx.$prop = "--q-inset-ring-color";
						return generateColorCss(c, o);
					}
				}
			});
			merge(U["drop-shadow"], { $color: (c, o, ctx) => {
				ctx.$prop = "--q-drop-shadow-color";
				return generateColorCss(c, o);
			} });
			merge(U.backdrop, { "opacity": {
				$prop: "--q-backdrop-opacity",
				$base: BASE_CSS.backdrop,
				$num: (v) => `opacity(${TRANSFORMERS.opacity(v)})`,
				$arbitrary: (v) => `opacity(${v})`
			} });
			if (V3) merge(U.outline, { "none": { "": "outline: 2px solid transparent; outline-offset: 2px" } });
			{
				const dirs = {
					t: "to top",
					tr: "to top right",
					r: "to right",
					br: "to bottom right",
					b: "to bottom",
					bl: "to bottom left",
					l: "to left",
					tl: "to top left"
				};
				const space = (mod) => ({
					srgb: " in srgb",
					hsl: " in hsl",
					oklab: " in oklab",
					oklch: " in oklch",
					longer: " in oklch longer hue",
					shorter: " in oklch shorter hue",
					increasing: " in oklch increasing hue",
					decreasing: " in oklch decreasing hue"
				})[mod];
				const linearTo = () => ({
					$prop: "background-image",
					...Object.fromEntries(Object.entries(dirs).map(([k, d]) => [k, `linear-gradient(${d}${OKLAB}, ${STOPS})`])),
					$default: (v) => {
						const [dir, mod] = v.split("/");
						if (!hasOwn(dirs, dir) || space(mod) === void 0) return;
						return `linear-gradient(${dirs[dir]}${space(mod)}, ${STOPS})`;
					},
					$arbitrary: (value) => `linear-gradient(${value}, ${STOPS})`
				});
				Object.assign(U.bg, {
					"gradient-to": linearTo(),
					"linear": {
						$prop: "background-image",
						$negative: true,
						$num: (v) => `linear-gradient(${v}deg${OKLAB}, ${STOPS})`,
						$default: (v) => {
							const m = v.match(/^(-?[\d.]+)\/(\w+)$/);
							if (m && space(m[2]) !== void 0) return `linear-gradient(${m[1]}deg${space(m[2])}, ${STOPS})`;
						},
						$arbitrary: (value) => `linear-gradient(${value})`,
						"to": linearTo()
					},
					"radial": {
						$prop: "background-image",
						"": V3 ? `radial-gradient(ellipse, ${STOPS})` : `radial-gradient(in oklab, ${STOPS})`,
						$arbitrary: (value) => `radial-gradient(${value}, ${STOPS})`
					},
					"conic": {
						$prop: "background-image",
						$negative: true,
						"": `conic-gradient(${V3 ? "" : "in oklab, "}${STOPS})`,
						$num: (v) => `conic-gradient(from ${v}deg${OKLAB}, ${STOPS})`,
						$arbitrary: (value) => `conic-gradient(${value}, ${STOPS})`
					},
					"right-top": "background-position: right top",
					"right-bottom": "background-position: right bottom",
					"left-top": "background-position: left top",
					"left-bottom": "background-position: left bottom",
					"top-right": "background-position: top right",
					"bottom-right": "background-position: bottom right",
					"bottom-left": "background-position: bottom left",
					"top-left": "background-position: top left",
					$arbitrary: (value, ctx) => {
						const hint = ctx.$hint;
						if (hint) {
							ctx.$prop = {
								color: "background-color",
								length: "background-size",
								size: "background-size",
								"bg-size": "background-size",
								percentage: "background-size",
								position: "background-position",
								image: "background-image",
								url: "background-image"
							}[hint] || "background-image";
							return hint === "url" ? `url(${value})` : value;
						}
						if (looksLikeColor(value) || /^var\(/.test(value)) {
							ctx.$prop = "background-color";
							return value;
						}
						ctx.$prop = "background-image";
						return value;
					}
				});
				merge(U.via, { "none": "--q-gradient-via: ; --q-gradient-stops: var(--q-gradient-from), var(--q-gradient-to)" });
			}
			const inset = {
				"auto": "auto",
				"full": "100%",
				"px": "1px",
				$num: TRANSFORMERS.rem,
				$frac,
				$arbitrary: true,
				$negative: true
			};
			Object.assign(U, {
				"start": {
					$prop: "inset-inline-start",
					...inset
				},
				"end": {
					$prop: "inset-inline-end",
					...inset
				},
				"collapse": "visibility: collapse",
				"box-decoration": {
					"clone": "-webkit-box-decoration-break: clone; box-decoration-break: clone",
					"slice": "-webkit-box-decoration-break: slice; box-decoration-break: slice"
				},
				"ps": {
					$prop: "padding-inline-start",
					...SPACING_PADDING_CONFIG
				},
				"pe": {
					$prop: "padding-inline-end",
					...SPACING_PADDING_CONFIG
				},
				"ms": {
					$prop: "margin-inline-start",
					...SPACING_MARGIN_CONFIG
				},
				"me": {
					$prop: "margin-inline-end",
					...SPACING_MARGIN_CONFIG
				},
				"is": {
					...U.w,
					$prop: "inline-size"
				},
				"min-is": {
					...U["min-w"],
					$prop: "min-inline-size"
				},
				"max-is": {
					...U["max-w"],
					$prop: "max-inline-size"
				},
				"bs": {
					...U.h,
					$prop: "block-size"
				},
				"min-bs": {
					...U["min-h"],
					$prop: "min-block-size"
				},
				"max-bs": {
					...U["max-h"],
					$prop: "max-block-size"
				},
				"wrap": {
					$prop: "overflow-wrap",
					"normal": "normal",
					"break-word": "break-word",
					"anywhere": "anywhere"
				}
			});
			const screens = {
				"screen-sm": "40rem",
				"screen-md": "48rem",
				"screen-lg": "64rem",
				"screen-xl": "80rem",
				"screen-2xl": "96rem"
			};
			merge(U["max-w"], {
				"prose": "65ch",
				...screens
			});
			merge(U["min-w"], {
				"prose": "65ch",
				...screens
			});
			const brk = {
				$prop: "",
				"auto": "auto",
				"avoid": "avoid",
				"all": "all",
				"avoid-page": "avoid-page",
				"page": "page",
				"left": "left",
				"right": "right",
				"column": "column"
			};
			merge(U.break, {
				"keep": "word-break: keep-all",
				"after": {
					...brk,
					$prop: "break-after"
				},
				"before": {
					...brk,
					$prop: "break-before"
				},
				"inside": {
					$prop: "break-inside",
					"auto": "auto",
					"avoid": "avoid",
					"avoid-page": "avoid-page",
					"avoid-column": "avoid-column"
				}
			});
			Object.assign(U, { "normal-case": "text-transform: none" });
			merge(U.text, {
				"start": "text-align: start",
				"end": "text-align: end"
			});
			U.text.$default = (v, ctx) => {
				const m = v.match(/^([a-z0-9]+)\/(.+)$/);
				const size = m && U.text[m[1]];
				if (typeof size !== "string" || !size.startsWith("font-size")) return;
				const named = {
					none: "1",
					tight: "1.25",
					snug: "1.375",
					normal: "1.5",
					relaxed: "1.625",
					loose: "2"
				};
				let lh = m[2];
				if (hasOwn(named, lh)) lh = named[lh];
				else if (/^\d+(\.\d+)?$/.test(lh)) lh = `calc(var(--spacing) * ${lh})`;
				else if (/^\[.+\]$/.test(lh)) lh = decodeArbitraryValue(lh.slice(1, -1));
				else if (/^\(--[\w-]+\)$/.test(lh)) lh = `var(${lh.slice(1, -1)})`;
				else return;
				ctx.$prop = "";
				return `${size.split(";")[0]}; line-height: ${lh}`;
			};
			U.text.$arbitrary = (value, ctx) => {
				if (ctx.$hint ? ctx.$hint === "color" : looksLikeColor(value) || /^var\(/.test(value)) ctx.$prop = "color";
				else ctx.$prop = "font-size";
				return value;
			};
			merge(U.align, {
				"sub": "sub",
				"super": "super"
			});
			merge(U.list, { "image": {
				$prop: "list-style-image",
				"none": "none",
				$arbitrary: true
			} });
			U["will-change"].$values = {
				"auto": "auto",
				"scroll": "scroll-position",
				"scroll-position": "scroll-position",
				"contents": "contents",
				"transform": "transform"
			};
			merge(U.rounded, {
				"s": {
					$inherit,
					$prop: ["border-start-start-radius", "border-end-start-radius"]
				},
				"e": {
					$inherit,
					$prop: ["border-start-end-radius", "border-end-end-radius"]
				},
				"ss": {
					$inherit,
					$prop: "border-start-start-radius"
				},
				"se": {
					$inherit,
					$prop: "border-start-end-radius"
				},
				"ee": {
					$inherit,
					$prop: "border-end-end-radius"
				},
				"es": {
					$inherit,
					$prop: "border-end-start-radius"
				}
			});
			merge(U.border, {
				"s": {
					$inherit,
					$prop: "border-inline-start-width"
				},
				"e": {
					$inherit,
					$prop: "border-inline-end-width"
				},
				"hidden": { "": "border-style: hidden" }
			});
			{
				const m2 = (prop, val) => `-webkit-mask-${prop}: ${val}; mask-${prop}: ${val}`;
				const mp = (prop) => [`-webkit-mask-${prop}`, `mask-${prop}`];
				const box = {
					"border": "border-box",
					"padding": "padding-box",
					"content": "content-box",
					"fill": "fill-box",
					"stroke": "stroke-box",
					"view": "view-box"
				};
				U.mask = {
					$arbitrary: (value, ctx) => {
						ctx.$prop = mp("image");
						return value;
					},
					"none": { "": m2("image", "none") },
					"clip": {
						$prop: mp("clip"),
						...box,
						"no-clip": "no-clip"
					},
					"origin": {
						$prop: mp("origin"),
						...box
					},
					"composite": {
						"add": "-webkit-mask-composite: source-over; mask-composite: add",
						"subtract": "-webkit-mask-composite: source-out; mask-composite: subtract",
						"intersect": "-webkit-mask-composite: source-in; mask-composite: intersect",
						"exclude": "-webkit-mask-composite: xor; mask-composite: exclude"
					},
					"alpha": "mask-mode: alpha",
					"luminance": "mask-mode: luminance",
					"match": "mask-mode: match-source",
					"type": {
						$prop: "mask-type",
						"alpha": "alpha",
						"luminance": "luminance"
					},
					"center": m2("position", "center"),
					"top": m2("position", "top"),
					"right": m2("position", "right"),
					"bottom": m2("position", "bottom"),
					"left": m2("position", "left"),
					"top-left": m2("position", "top left"),
					"top-right": m2("position", "top right"),
					"bottom-left": m2("position", "bottom left"),
					"bottom-right": m2("position", "bottom right"),
					"repeat": {
						$prop: mp("repeat"),
						"": "repeat",
						"x": "repeat-x",
						"y": "repeat-y",
						"round": "round",
						"space": "space"
					},
					"no-repeat": m2("repeat", "no-repeat"),
					"auto": m2("size", "auto"),
					"cover": m2("size", "cover"),
					"contain": m2("size", "contain"),
					"size": {
						$prop: mp("size"),
						$arbitrary: true
					},
					"position": {
						$prop: mp("position"),
						$arbitrary: true
					}
				};
			}
			Object.assign(U, {
				"scheme": {
					$prop: "color-scheme",
					"normal": "normal",
					"light": "light",
					"dark": "dark",
					"light-dark": "light dark",
					"only-light": "only light",
					"only-dark": "only dark"
				},
				"field-sizing": {
					$prop: "field-sizing",
					"fixed": "fixed",
					"content": "content"
				},
				"forced-color-adjust-auto": "forced-color-adjust: auto",
				"forced-color-adjust-none": "forced-color-adjust: none",
				"appearance-auto": "appearance: auto",
				"scrollbar": {
					"auto": "scrollbar-width: auto",
					"thin": "scrollbar-width: thin",
					"none": "scrollbar-width: none",
					"gutter": {
						$prop: "scrollbar-gutter",
						"auto": "auto",
						"stable": "stable",
						"stable-both-edges": "stable both-edges"
					},
					$color: (c, o, ctx) => {
						ctx.$prop = "";
						return `--q-scrollbar-thumb: ${generateColorCss(c, o)}; scrollbar-color: var(--q-scrollbar-thumb, auto) var(--q-scrollbar-track, auto)`;
					},
					"track": { $color: (c, o, ctx) => {
						ctx.$prop = "";
						return `--q-scrollbar-track: ${generateColorCss(c, o)}; scrollbar-color: var(--q-scrollbar-thumb, auto) var(--q-scrollbar-track, auto)`;
					} }
				}
			});
			for (const key of ["accent", "caret"]) if (U[key]) merge(U[key], { "auto": "auto" });
		}
		for (const ext of Q.cssExtensions ?? []) {
			addColors(ext.colors);
			aliasBareColors();
			merge(UTILITY_CONFIG, ext.utilities);
			Object.assign(PREFIX_HANDLERS, ext.prefixes);
		}
		const spaceMathOperators = (value) => {
			const saved = [];
			const hide = (text) => `__q${saved.push(text) - 1}__`;
			const innermost = /([a-zA-Z]\w*)?\(([^()]*)\)/g;
			let prev;
			do {
				prev = value;
				value = value.replace(innermost, (m, fn, body) => {
					fn = fn || "";
					if (fn === "" || /^(?:calc|min|max|clamp)$/.test(fn)) body = body.replace(/([\w)%])([+-])([\w(.])/g, "$1 $2 $3");
					return hide(`${fn}(${body})`);
				});
			} while (value !== prev);
			let restored = value;
			for (let i = 0; i < 50 && /__q\d+__/.test(restored); i++) restored = restored.replace(/__q(\d+)__/g, (m, n) => saved[n]);
			return restored;
		};
		const decodeArbitraryValue = (raw) => spaceMathOperators(raw.replace(/__|_/g, (v) => v === "__" ? "_" : " "));
		function _resolveUtility(className) {
			const isImportant = className.startsWith("!") || className.length > 1 && className.endsWith("!");
			const classNameWithoutImportant = !isImportant ? className : className.startsWith("!") ? className.substring(1) : className.slice(0, -1);
			const containerMatch = classNameWithoutImportant.match(/^@container(?:-(size|normal))?(?:\/([\w-]+))?$/);
			if (containerMatch) {
				const [, kind, name] = containerMatch;
				return {
					css: `container-type: ${kind === "size" ? "size" : kind === "normal" ? "normal" : "inline-size"};${name ? ` container-name: ${name};` : ""}`,
					base: void 0,
					selector: void 0,
					order: [8e15 - 1]
				};
			}
			const arbitraryProperty = classNameWithoutImportant.match(/^\[(--[\w-]+|[a-z][\w-]*):(.+)\]$/i);
			if (arbitraryProperty) {
				const value = decodeArbitraryValue(arbitraryProperty[2]).trim();
				if (!value) return null;
				return {
					css: `${arbitraryProperty[1]}: ${value}${isImportant ? " !important" : ""};`,
					base: void 0,
					selector: void 0,
					order: [8e15]
				};
			}
			const isNegative = classNameWithoutImportant.startsWith("-");
			let baseClassName = isNegative ? classNameWithoutImportant.substring(1) : classNameWithoutImportant;
			{
				const vs = baseClassName.match(/^(.+?)-\((?:([a-z-]+):)?(--[\w-]+)(?:,([^)]*))?\)(\/.+)?$/);
				if (vs) baseClassName = `${vs[1]}-[${vs[2] ? vs[2] + ":" : ""}var(${vs[3]}${vs[4] ? "," + vs[4] : ""})]${vs[5] || ""}`;
			}
			let modifierOpacity = null;
			{
				const endsWithColor = (base) => base.endsWith("]") || base.split("-").some((_, i, a) => i > 0 && colorMap.has(a.slice(i).join("-")));
				let m, base = null;
				if ((m = baseClassName.match(/^(.+)\/\((--[\w-]+)\)$/)) && endsWithColor(m[1])) {
					base = m[1];
					const cssVar = `var(${m[2]})`;
					modifierOpacity = Object.assign(/* @__PURE__ */ new Number(1), {
						cssVar,
						toFixed: () => cssVar
					});
				} else if (m = baseClassName.match(/^(.+-\[.+\])\/(\d+(?:\.\d+)?)$/)) {
					base = m[1];
					modifierOpacity = Number(m[2]) / 100;
				} else if ((m = baseClassName.match(/^(.+)\/\[(\d*\.?\d+)(%?)\]$/)) && endsWithColor(m[1])) {
					base = m[1];
					modifierOpacity = m[3] ? Number(m[2]) / 100 : Number(m[2]);
				}
				if (base !== null) {
					baseClassName = base;
					if (!(modifierOpacity >= 0 && modifierOpacity <= 1)) return null;
				}
			}
			const arbitraryStart = baseClassName.indexOf("-[");
			const isArbitrary = arbitraryStart > 0 && baseClassName.endsWith("]") && arbitraryStart + 2 < baseClassName.length - 1;
			const utilityPathParts = (isArbitrary ? baseClassName.slice(0, arbitraryStart) : baseClassName).split("-");
			let remainingPath = "";
			let prevConfig = {};
			let config = UTILITY_CONFIG;
			let consumedParts = 0;
			const utilityOrder = [];
			for (let i = 0; i < utilityPathParts.length; i++) {
				const part = utilityPathParts[i];
				const nextPart = utilityPathParts[i + 1];
				let matchedKey = part;
				if (nextPart && hasOwn(config, `${part}-${nextPart}`)) {
					matchedKey = `${part}-${nextPart}`;
					i++;
				}
				const hasMatch = hasOwn(config, matchedKey);
				const nextNode = hasMatch && config[matchedKey];
				if (hasMatch) utilityOrder.push(Object.keys(config).indexOf(matchedKey));
				if (nextNode !== null && typeof nextNode === "object" && !Array.isArray(nextNode)) {
					prevConfig = config;
					config = nextNode;
					consumedParts = i + 1;
				} else {
					remainingPath = utilityPathParts.slice(consumedParts).join("-");
					break;
				}
			}
			if (isArbitrary && remainingPath !== "") return null;
			const context = { $prop: "" };
			if (config.$inherit) {
				for (const key of config.$inherit) if (hasOwn(prevConfig, key)) context[key] = prevConfig[key];
			}
			if (typeof config === "object" && config !== null) {
				for (const key in config) if (key.startsWith("$")) context[key] = config[key];
			}
			let valuePart = isArbitrary ? decodeArbitraryValue(baseClassName.slice(arbitraryStart + 2, -1)) : remainingPath;
			let negateResolvedValue = false;
			if (isNegative) {
				if (!context.$negative) return null;
				if ([config, context.$values].some((map) => map && typeof map === "object" && !Array.isArray(map) && hasOwn(map, valuePart))) negateResolvedValue = true;
				else valuePart = `-${valuePart}`;
			}
			if (modifierOpacity !== null && !isArbitrary && !(typeof context.$color === "function" && colorMap.has(valuePart))) return null;
			let cssValue = null;
			if (isArbitrary) {
				const hint = valuePart.match(/^(color|length|size|percentage|position|image|url|number|ratio|angle|integer|line-width|family-name|absolute-size|relative-size|bg-size|shadow):(?!\/)([\s\S]+)$/);
				if (hint) {
					context.$hint = hint[1];
					valuePart = hint[2];
				}
				if (/^-{2,}[\w-]/.test(valuePart)) return null;
				if (modifierOpacity !== null) {
					const hex = valuePart.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
					if (modifierOpacity.cssVar) valuePart = `color-mix(in oklab, ${valuePart} ${modifierOpacity.cssVar}, transparent)`;
					else if (hex) valuePart = `rgb(${hexToRgb(valuePart).join(" ")} / ${+modifierOpacity.toFixed(3)})`;
					else if (isColorValue(valuePart, context) || /^var\(/.test(valuePart)) valuePart = `color-mix(in oklab, ${valuePart} ${+(modifierOpacity * 100).toFixed(1)}%, transparent)`;
					else return null;
					context.$hint = context.$hint || "color";
				}
				if (typeof context.$arbitrary === "function") cssValue = context.$arbitrary(valuePart, context);
				else if (context.$arbitrary === true) cssValue = valuePart;
			} else if (typeof config === "string") cssValue = config;
			else if (typeof config === "object" && config !== null && hasOwn(config, valuePart)) cssValue = config[valuePart];
			else if (context.$values) {
				if (Array.isArray(context.$values) && context.$values.includes(valuePart)) cssValue = valuePart;
				else if (typeof context.$values === "object" && !Array.isArray(context.$values)) cssValue = context.$values[valuePart];
			}
			if (cssValue == null) {
				const parts = valuePart.split("/");
				if (typeof context.$color === "function" && colorMap.has(parts[0])) {
					const opacity = modifierOpacity !== null ? modifierOpacity : parts[1] ? Number(parts[1]) / 100 : null;
					if (isNaN(opacity)) return null;
					cssValue = context.$color(parts[0], opacity, context);
				} else if (typeof context.$frac === "function" && parts.length > 1) cssValue = context.$frac(valuePart, context);
				else if (typeof context.$num === "function" && valuePart !== "" && !isNaN(Number(valuePart))) cssValue = context.$num(valuePart, context);
				else if (typeof context.$default === "function") cssValue = context.$default(valuePart, context);
			}
			if (cssValue == null) return null;
			if (negateResolvedValue) {
				const value = String(cssValue).trim();
				if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?[a-z%]*$/i.test(value)) return null;
				cssValue = value[0] === "-" ? value.slice(1) : `-${value.replace(/^\+/, "")}`;
			}
			const importantSuffix = isImportant ? " !important" : "";
			const prop = context.$prop;
			if (Array.isArray(prop)) cssValue = prop.map((p) => `${p}: ${cssValue}${importantSuffix};`).join(" ");
			else if (prop?.length > 0) cssValue = `${prop}: ${cssValue}${importantSuffix};`;
			else if (isImportant) cssValue = cssValue.split(";").filter((declaration) => declaration.trim()).map((declaration) => `${declaration.trim()}${importantSuffix}`).join("; ") + ";";
			else cssValue += ";";
			const base = context.$base && !context.$base.endsWith(";") ? `${context.$base};` : context.$base;
			return {
				css: cssValue.trim(),
				base,
				selector: context.$selector,
				order: utilityOrder
			};
		}
		const memo = (fn) => {
			const cache = /* @__PURE__ */ new Map();
			return (key) => {
				if (!cache.has(key)) cache.set(key, fn(key));
				return cache.get(key);
			};
		};
		const resolveUtility = memo(_resolveUtility);
		function splitSelectorList(s) {
			const out = [];
			let start = 0, depth = 0, quote = "", escaped = false;
			for (let i = 0; i < s.length; i++) {
				const c = s[i];
				if (escaped) {
					escaped = false;
					continue;
				}
				if (c === "\\") {
					escaped = true;
					continue;
				}
				if (quote) {
					if (c === quote) quote = "";
					continue;
				}
				if (c === "\"" || c === "'") {
					quote = c;
					continue;
				}
				if (c === "(" || c === "[") depth++;
				else if (c === ")" || c === "]") depth = Math.max(0, depth - 1);
				else if (c === "," && depth === 0) {
					out.push(s.slice(start, i).trim());
					start = i + 1;
				}
			}
			out.push(s.slice(start).trim());
			return out.filter(Boolean);
		}
		const applySelectorHandler = (selectors, handler) => selectors.flatMap((s) => splitSelectorList(handler(s)));
		const splitVariants = (s) => s.match(/(?:\[[^\]]*]|\([^)]*\)|[^:])+/g) ?? [];
		const DOC_LEVEL_CONTEXT = /^(:root|html|body|\.dark)\b/i;
		function warnDocumentLevelScope(selector, scopeClass) {
			if (!selector.includes("&") && DOC_LEVEL_CONTEXT.test(selector)) cssWarn(selector, `[Quas] Selector "${selector}" can't match when scoped as "${scopeClass} ${selector}"; anchor the component with "&" instead.`);
		}
		/**
		* The core CSS generation logic, refactored from compileCss.
		* It takes a map of selectors to utility classes and returns the compiled CSS string.
		* @param {Map<string, string[]>} rules - A map where keys are CSS selectors and values are arrays of utility classes.
		* @param {string | null} [scopeClass=null] - An optional scoping class (e.g., '.q-css-1') to prepend to selectors.
		* @returns {string} The compiled CSS.
		*/
		function generateCssFromRules(rules, scopeClass = null) {
			const groupByWrapper = /* @__PURE__ */ new Map();
			const wrappersByKey = /* @__PURE__ */ new Map();
			const sequence = [{
				key: "noWrapper",
				map: /* @__PURE__ */ new Map(),
				wrappers: []
			}];
			for (const [rawSelector, selectorRule] of rules.entries()) {
				const baseSelectorParts = splitSelectorList(rawSelector);
				if (scopeClass) for (let i = 0; i < baseSelectorParts.length; i++) {
					const part = baseSelectorParts[i].trim();
					warnDocumentLevelScope(part, scopeClass);
					baseSelectorParts[i] = part.includes("&") ? part.replaceAll("&", scopeClass) : `${scopeClass} ${part}`;
				}
				for (const utilityWithPrefix of selectorRule) {
					let selectorParts = Array.from(baseSelectorParts);
					const prefixList = splitVariants(utilityWithPrefix);
					const utility = prefixList.pop();
					prefixList.sort((a, b) => (a === "dark") - (b === "dark"));
					const ruleWrappers = [];
					const wrapperPrefixes = [];
					const orderedKeys = [];
					let hasUnorderedWrapper = false;
					for (const prefix of prefixList) {
						const handlerConfig = getPrefixHandler(prefix);
						if (!handlerConfig) {
							cssWarn(utilityWithPrefix, `[Quas] Skipped unknown prefix '${prefix}' in "${utilityWithPrefix}"`);
							continue;
						}
						if (handlerConfig.type === "pseudo") {
							selectorParts = applySelectorHandler(selectorParts, handlerConfig.handler);
							if (handlerConfig.wrap) {
								ruleWrappers.push(handlerConfig.wrap.handler);
								wrapperPrefixes.push(handlerConfig.wrap.key);
								orderedKeys.push(handlerConfig.wrap.key);
							}
						} else {
							ruleWrappers.push(handlerConfig.handler);
							wrapperPrefixes.push(prefix);
							hasUnorderedWrapper = true;
						}
					}
					const wrapperKey = wrapperPrefixes.length ? JSON.stringify(wrapperPrefixes) : "noWrapper";
					let declarationsBySelectorByWrapper;
					if (!hasUnorderedWrapper) {
						if (sequence[sequence.length - 1].key !== wrapperKey) sequence.push({
							key: wrapperKey,
							map: /* @__PURE__ */ new Map(),
							wrappers: ruleWrappers
						});
						declarationsBySelectorByWrapper = sequence[sequence.length - 1].map;
					} else {
						if (!groupByWrapper.has(wrapperKey)) {
							groupByWrapper.set(wrapperKey, /* @__PURE__ */ new Map());
							wrappersByKey.set(wrapperKey, ruleWrappers);
						}
						declarationsBySelectorByWrapper = groupByWrapper.get(wrapperKey);
					}
					const resolved = resolveUtility(utility);
					if (resolved) {
						if (resolved.selector) selectorParts = applySelectorHandler(selectorParts, resolved.selector.handler);
						const finalSelector = selectorParts.join(",");
						if (resolved.base) {
							const supportBaseSelector = selectorParts.map((p) => p.replace(/^(.*?)(::.*)?$/, ":where($1)$2")).join(",");
							if (!declarationsBySelectorByWrapper.has(supportBaseSelector)) declarationsBySelectorByWrapper.set(supportBaseSelector, /* @__PURE__ */ new Set());
							declarationsBySelectorByWrapper.get(supportBaseSelector).add(resolved.base);
						}
						if (!declarationsBySelectorByWrapper.has(finalSelector)) declarationsBySelectorByWrapper.set(finalSelector, /* @__PURE__ */ new Set());
						declarationsBySelectorByWrapper.get(finalSelector).add(resolved.css);
					} else {
						const relevantSelector = scopeClass ? `selector="${rawSelector}"` : `class="${utility}"`;
						cssWarn(utility, `[Quas] Unknown class "${utility}" found on ${relevantSelector}`);
					}
				}
			}
			const finalCssChunks = [];
			const chunks = [...sequence.map((c) => [c.map, c.wrappers]), ...[...groupByWrapper.entries()].map(([key, map]) => [map, wrappersByKey.get(key)])];
			for (const [declarationsBySelector, wrappers] of chunks) {
				const group = [];
				for (const [ruleSelector, declarations] of declarationsBySelector.entries()) if (declarations.size > 0) group.push(`${ruleSelector} { ${[...declarations].join(" ")} }\n`);
				let groupStr = group.join("");
				for (let i = wrappers.length - 1; i >= 0; i--) groupStr = wrappers[i](`\n  ${groupStr}`);
				if (wrappers.length) groupStr += "\n";
				finalCssChunks.push(groupStr);
			}
			return finalCssChunks.join("");
		}
		const DYNAMIC_VARIANT_STATES = /* @__PURE__ */ new Set([
			"open",
			"hover",
			"focus",
			"focus-within",
			"focus-visible",
			"active",
			"visited",
			"target",
			"disabled",
			"enabled",
			"checked",
			"indeterminate",
			"placeholder-shown",
			"autofill",
			"required",
			"valid",
			"invalid",
			"in-range",
			"out-of-range",
			"read-only"
		]);
		const SCOPE_REGEX = /(\.q-css-[\w-]+)/;
		function _getPrefixHandler(prefix) {
			if (hasOwn(PREFIX_HANDLERS, prefix)) return PREFIX_HANDLERS[prefix];
			const decode = (raw) => raw.replace(/__|_/g, (v) => v === "__" ? "_" : " ");
			let m;
			const attributeMatch = prefix.match(/^(data|aria)-\[(.+)]$/);
			if (attributeMatch) {
				const [, namespace, rawExpression] = attributeMatch;
				const match = decode(rawExpression).match(/^([\w-]+)(?:=(.*))?$/s);
				if (!match) return null;
				const [, name, value] = match;
				const attribute = `${namespace}-${name}`;
				const suffix = value === void 0 ? `[${attribute}]` : `[${attribute}="${value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}"]`;
				return pseudo(suffix);
			}
			if (m = prefix.match(/^data-([\w-]+)$/)) return pseudo(`[data-${m[1]}]`);
			if (prefix.length > 2 && prefix.startsWith("[") && prefix.endsWith("]")) {
				const template = decode(prefix.slice(1, -1));
				if (template.startsWith("@")) return {
					type: "wrapper",
					handler: (rule) => `${template} {${rule}}`
				};
				return {
					type: "pseudo",
					handler(selector) {
						return template.includes("&") ? template.replaceAll("&", () => selector) : `${template} ${selector}`;
					}
				};
			}
			const SENTINEL = "";
			const suffixOf = (cfg) => {
				if (!cfg || cfg.type !== "pseudo") return null;
				const out = cfg.handler(SENTINEL);
				if (typeof out !== "string" || !out.startsWith(SENTINEL)) return null;
				const suffix = out.slice(1);
				return suffix.includes(SENTINEL) ? null : suffix;
			};
			if (m = prefix.match(/^(min|max)-\[(.+)]$/)) {
				const size = decode(m[2]);
				return media(m[1] === "min" ? `(width >= ${size})` : `(width < ${size})`);
			}
			if (m = prefix.match(/^@(?:(min|max)-)?(\[.+]|[\w]+)(?:\/([\w-]+))?$/)) {
				const [, kind, rawSize, name] = m;
				const size = rawSize.startsWith("[") ? decode(rawSize.slice(1, -1)) : BREAKPOINT_WIDTHS[rawSize];
				if (!size || rawSize === "px") return null;
				return atRule(`@container${name ? " " + name : ""} (width ${kind === "max" ? "<" : ">="} ${size})`);
			}
			if (m = prefix.match(/^supports-(?:\[(.+)]|([\w-]+))$/)) {
				let cond = m[1] ? decode(m[1]) : `${m[2]}: var(--q)`;
				if (!cond.includes(":") && !cond.includes("(")) cond = `${cond}: var(--q)`;
				const wrapped = cond.startsWith("(") || /^(not|selector)\b/.test(cond) ? cond : `(${cond})`;
				return atRule(`@supports ${wrapped}`, `@supports not ${wrapped}`);
			}
			if (m = prefix.match(/^nth-(last-)?(of-type-)?(.+)$/)) {
				const [, last, ofType, arg] = m;
				const value = arg.startsWith("[") && arg.endsWith("]") ? decode(arg.slice(1, -1)) : arg;
				if (!/^[\w+\-*n ]+$/.test(value)) return null;
				return pseudo(`:nth-${last ? "last-" : ""}${ofType ? "of-type" : "child"}(${value})`);
			}
			if (m = prefix.match(/^has-(.+)$/)) {
				if (m[1].startsWith("[") && m[1].endsWith("]")) return pseudo(`:has(${decode(m[1].slice(1, -1))})`);
				const sfx = suffixOf(getPrefixHandler(m[1]));
				return sfx ? pseudo(`:has(*${sfx})`) : null;
			}
			if (m = prefix.match(/^not-(.+)$/)) {
				if (m[1].startsWith("[") && m[1].endsWith("]")) return pseudo(`:not(${decode(m[1].slice(1, -1))})`);
				const inner = getPrefixHandler(m[1]);
				if (inner && inner.type === "wrapper" && inner.negated) return {
					type: "wrapper",
					handler: inner.negated
				};
				const sfx = suffixOf(inner);
				return sfx ? pseudo(`:not(*${sfx})`) : null;
			}
			if (m = prefix.match(/^in-(.+)$/)) {
				let ancestor;
				if (m[1].startsWith("[") && m[1].endsWith("]")) ancestor = decode(m[1].slice(1, -1));
				else {
					const sfx = suffixOf(getPrefixHandler(m[1]));
					if (!sfx) return null;
					ancestor = `*${sfx}`;
				}
				return {
					type: "pseudo",
					handler: (selector) => `:where(${ancestor}) ${selector}`
				};
			}
			const dynamicMatch = prefix.match(/^(group|peer)-(.+)$/);
			if (!dynamicMatch) return null;
			const [, type, rest] = dynamicMatch;
			const named = rest.match(/^(.*?)(?:\/([\w-]+))?$/);
			const state = named[1];
			const groupName = named[2];
			const inner = state.startsWith("group-") || state.startsWith("peer-") ? null : getPrefixHandler(state);
			let suffix = suffixOf(inner);
			if (!suffix && DYNAMIC_VARIANT_STATES.has(state)) suffix = state === "open" ? "[open]" : `:${state}`;
			if (!suffix) return null;
			const modifierSelector = `${groupName ? `.${CSS.escape(`${type}/${groupName}`)}` : `.${type}`}${suffix}`;
			return {
				type: "pseudo",
				wrap: inner && inner.wrap,
				handler(selector) {
					const generatedSelectors = /* @__PURE__ */ new Set();
					for (const item of splitSelectorList(selector)) {
						const currentSelector = item.trim();
						if (!currentSelector) continue;
						const hasScope = SCOPE_REGEX.test(currentSelector);
						if (type === "group") {
							generatedSelectors.add(`${modifierSelector} ${currentSelector}`);
							if (hasScope) {
								generatedSelectors.add(currentSelector.replace(SCOPE_REGEX, `$1${modifierSelector}`));
								generatedSelectors.add(currentSelector.replace(SCOPE_REGEX, `$1 ${modifierSelector}`));
							}
						} else if (!hasScope) generatedSelectors.add(`${modifierSelector} ~ ${currentSelector}`);
						else {
							const parts = currentSelector.split(/\s+/);
							if (parts.length > 1) {
								const target = parts.pop();
								const base = parts.join(" ");
								generatedSelectors.add(`${base} ${modifierSelector} ~ ${target}`);
							}
							generatedSelectors.add(currentSelector.replace(SCOPE_REGEX, `$1${modifierSelector}`));
						}
					}
					return [...generatedSelectors].join(", ");
				}
			};
		}
		const getPrefixHandler = memo(_getPrefixHandler);
		const CSS_PARSE_PATTERN = /(?<native_block>(?<native_selector>[^;{}]+?)\s*\{(?<native_body>[\s\S]*?)\})|(?<custom_rule>[^;{}]+?:\s*[^;{}]+?;)/g;
		const CSS_STRIP_COMMENTS = /\/\*[\s\S]*?\*\/|\/\/[ \t]+[^\r\n]*|<!--[\s\S]*?-->/g;
		/**
		* Parses the custom text format and compiles it into standard CSS.
		* It supports grouping prefixes at the line level, e.g., 'selector:prefix: class1 class2',
		* while correctly handling selectors that contain colons, like '[data-state:open]'.
		* @param {string} text - The content of the style tag.
		* @param {string} scopeClass - The unique class for component scoping (e.g., '.q-css-1').
		* @returns {string} The compiled, standard CSS.
		*/
		function compileCss(text, scopeClass) {
			const cleanedText = text.replace(CSS_STRIP_COMMENTS, "");
			const rules = /* @__PURE__ */ new Map();
			const nativeCssBlocks = [];
			for (const match of cleanedText.matchAll(CSS_PARSE_PATTERN)) {
				const { native_selector, native_body, custom_rule } = match.groups;
				if (native_selector !== void 0) {
					const trimmedSelector = native_selector.trim();
					if (trimmedSelector) {
						if (trimmedSelector[0] === "@" || native_body.includes("{")) {
							cssWarn(trimmedSelector, `[Quas] Nested rules and at-rules are not supported inside <css>: '${trimmedSelector} { ... }'`);
							continue;
						}
						const scopedSelector = splitSelectorList(trimmedSelector).map((s) => {
							warnDocumentLevelScope(s, scopeClass);
							return s.includes("&") ? s.replaceAll("&", () => scopeClass) : (s.startsWith("::") ? scopeClass : `${scopeClass} `) + s;
						}).join(", ");
						nativeCssBlocks.push(`${scopedSelector} {${native_body}}`);
					}
				} else if (custom_rule) {
					const trimmedLine = custom_rule.trim().slice(0, -1);
					if (!trimmedLine) continue;
					const lineMatch = trimmedLine.match(/^(.*?):\s+(.*)$/s);
					if (!lineMatch) {
						cssWarn(trimmedLine, `[Quas] Can't parse line '${trimmedLine}', no ': ' found`);
						continue;
					}
					const selectorAndPrefixes = lineMatch[1];
					const classesString = lineMatch[2];
					const selectorParts = selectorAndPrefixes.split(":");
					let firstPrefixIndex = selectorParts.length;
					for (let i = selectorParts.length - 1; i > 0; i--) {
						if (selectorParts[i - 1] === "") break;
						const part = selectorParts[i];
						if (getPrefixHandler(part)) firstPrefixIndex = i;
						else break;
					}
					const rawSelector = selectorParts.slice(0, firstPrefixIndex).join(":");
					const linePrefixes = selectorParts.slice(firstPrefixIndex);
					const classes = classesString.split(/\s+/).filter((c) => c);
					const finalClasses = linePrefixes.length > 0 ? classes.map((cls) => `${linePrefixes.join(":")}:${cls}`) : classes;
					if (!rules.has(rawSelector)) rules.set(rawSelector, []);
					rules.get(rawSelector).push(...finalClasses);
				}
			}
			return [generateCssFromRules(rules, scopeClass), ...nativeCssBlocks].join("\n");
		}
		function appendStyleTag(id, text = "") {
			const style = document.createElement("style");
			style.id = id;
			if (Q.CSSNonce) style.nonce = Q.CSSNonce;
			style.textContent = text;
			document.head.appendChild(style);
			return style;
		}
		const noTransitionStyle = appendStyleTag("q-css-no-transitions", "*, *::before, *::after { transition: none !important; }");
		if (Q.AutoDarkMode !== false) {
			const query = window.matchMedia("(prefers-color-scheme: dark)");
			const sync = () => document.documentElement.classList.toggle("dark", query.matches);
			sync();
			query.addEventListener("change", sync);
		}
		appendStyleTag("q-css-preflight", `
@layer base{
:root{--spacing:.25rem;--font-sans:ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';--font-serif:ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace}*,::after,::backdrop,::before,::file-selector-button{box-sizing:border-box;margin:0;padding:0;border:0 solid ${V3 ? "#e5e7eb" : "currentColor"}}:host,html{line-height:1.5;-webkit-text-size-adjust:none;tab-size:4;font-family:var( --font-sans, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' );font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:var( --font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace );font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}menu,ol,ul{list-style:none}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}::file-selector-button,button,input,optgroup,select,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;border-radius:0;background-color:transparent;opacity:1}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not (-webkit-appearance:-apple-pay-button)) or (contain-intrinsic-size:1px){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-meridiem-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type='button'],[type='reset'],[type='submit']),::file-selector-button{appearance:button}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden='until-found'])){display:none !important}}
.container{width:100%}
@media(min-width:40rem){.container{max-width:40rem}}
@media(min-width:48rem){.container{max-width:48rem}}
@media(min-width:64rem){.container{max-width:64rem}}
@media(min-width:80rem){.container{max-width:80rem}}
@media(min-width:96rem){.container{max-width:96rem}}
@keyframes spin {
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
}
@keyframes pulse {
50% { opacity: .5; }
}
@keyframes bounce {
0%, 100% {
transform: translateY(-25%);
animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
}
50% {
transform: translateY(0);
animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
}
@keyframes ping {
75%, 100% {
transform: scale(2);
opacity: 0;
}
}
/* A custom animation, as an example */
@keyframes fade {
0%, 100% { opacity: 1; }
50% { opacity: 0.5; }
}
/* j-transition="fade" */
.fade-enter-active,
.fade-leave-active {
transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
opacity: 0;
}
/* j-transition="slide-up" */
.slide-up-enter-active,
.slide-up-leave-active {
transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
opacity: 0;
transform: translateY(20px);
}
/* j-transition="zoom" */
.zoom-enter-active,
.zoom-leave-active {
/* cubic-bezier дает легкий эффект пружинки (bounce-back) в конце */
transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
}
.zoom-enter-from,
.zoom-leave-to {
opacity: 0;
transform: scale(0.9);
}
/* j-transition="bounce-in" */
.bounce-in-enter-active {
animation: bounce-in-keyframe 0.4s;
}
.bounce-in-leave-active {
animation: bounce-in-keyframe 0.4s reverse;
}
@keyframes bounce-in-keyframe {
0% {
transform: scale(0);
opacity: 0;
}
50% {
transform: scale(1.1);
}
100% {
transform: scale(1);
opacity: 1;
}
}
`);
		const generatedUtilityClasses = /* @__PURE__ */ new Set();
		const knownUtilityClasses = /* @__PURE__ */ new Set();
		let utilityStyleElement = null;
		const scopedStyles = /* @__PURE__ */ new Map();
		let scopeCount = 0;
		/**
		* Registers a scoped stylesheet and returns its scope class.
		* Anonymous scopes are deduplicated by text, named scopes are reused by id.
		* Usable as Q.css(text), Q.css(text, id) and Q.css`...`
		*/
		Q.css = function(strings, ...rest) {
			const tagged = Array.isArray(strings) && hasOwn(strings, "raw");
			const text = tagged ? String.raw(strings, ...rest) : String(strings);
			let id = tagged ? "" : String(rest[0] ?? "");
			if (id && !/^[\w-]+$/.test(id)) {
				cssWarn(id, `[Quas] Invalid css id "${id}", using an anonymous scope`);
				id = "";
			}
			const key = id ? `id:${id}` : `text:${text}`;
			const prev = scopedStyles.get(key);
			if (prev?.text === text && prev.style.parentNode === document.head) return prev.scope;
			const scope = prev?.scope ?? (id ? `q-css-${id}` : `q-css-${++scopeCount}`);
			const style = prev?.style ?? document.getElementById(scope) ?? appendStyleTag(scope);
			if (!prev || prev.style.parentNode !== document.head) {
				utilityStyleElement ||= appendStyleTag("q-css-utilities");
				document.head.insertBefore(style, utilityStyleElement);
			}
			const css = compileCss(text, "." + scope);
			if (style.textContent !== css) style.textContent = css;
			scopedStyles.set(key, {
				scope,
				text,
				style
			});
			return scope;
		};
		{
			const V4_ORDER = [
				"*",
				"**",
				"first-letter",
				"first-line",
				"marker",
				"selection",
				"file",
				"placeholder",
				"backdrop",
				"details-content",
				"before",
				"after",
				"first",
				"last",
				"only",
				"odd",
				"even",
				"first-of-type",
				"last-of-type",
				"only-of-type",
				"visited",
				"target",
				"open",
				"default",
				"checked",
				"indeterminate",
				"placeholder-shown",
				"autofill",
				"optional",
				"required",
				"valid",
				"invalid",
				"user-valid",
				"user-invalid",
				"in-range",
				"out-of-range",
				"read-only",
				"empty",
				"focus-within",
				"hover",
				"focus",
				"focus-visible",
				"active",
				"enabled",
				"disabled",
				"inert",
				...ARIA_STATES.map((a) => `aria-${a}`),
				"motion-safe",
				"motion-reduce",
				"contrast-more",
				"contrast-less",
				"max-2xl",
				"max-xl",
				"max-lg",
				"max-md",
				"max-sm",
				"sm",
				"md",
				"lg",
				"xl",
				"2xl",
				"portrait",
				"landscape",
				"ltr",
				"rtl",
				"dark",
				"starting",
				"print",
				"forced-colors",
				"not-forced-colors",
				"inverted-colors",
				"pointer-none",
				"pointer-coarse",
				"pointer-fine",
				"any-pointer-none",
				"any-pointer-coarse",
				"any-pointer-fine",
				"noscript"
			];
			const entries = Object.entries(PREFIX_HANDLERS);
			for (const key of Object.keys(PREFIX_HANDLERS)) delete PREFIX_HANDLERS[key];
			for (const key of V4_ORDER) {
				const hit = entries.find(([k]) => k === key);
				if (hit) PREFIX_HANDLERS[key] = hit[1];
			}
			for (const [k, v] of entries) if (!hasOwn(PREFIX_HANDLERS, k)) PREFIX_HANDLERS[k] = v;
		}
		const PREFIX_ORDER = new Map(Object.keys(PREFIX_HANDLERS).map((prefix, index) => [prefix, index]));
		function getPrefixRank(prefix) {
			const staticRank = PREFIX_ORDER.get(prefix);
			if (staticRank !== void 0) return staticRank * 3;
			const at = (name, offset) => (PREFIX_ORDER.get(name) ?? PREFIX_ORDER.size) * 3 + offset;
			let m;
			if (m = prefix.match(/^(group|peer)-(.+)$/)) {
				const [, type, rest] = m;
				return getPrefixRank(rest.replace(/\/[\w-]+$/, "")) + (type === "group" ? 1 : 2);
			}
			if (/^(in|has|not)-/.test(prefix)) return at("inert", .4);
			if (/^(aria|data)-/.test(prefix)) return at("aria-selected", .5);
			if (prefix.startsWith("nth-")) return at("aria-selected", .6);
			if (prefix.startsWith("supports-")) return at("contrast-less", .5);
			if (prefix.startsWith("max-[")) return at("max-sm", .5);
			if (prefix.startsWith("min-[")) return at("2xl", .5);
			if (prefix.startsWith("@")) return at("2xl", .7);
			if (prefix.startsWith("[")) return at("noscript", 1.5);
			return PREFIX_ORDER.size * 3 + 3;
		}
		function compareOrderPaths(a, b) {
			const length = Math.min(a.length, b.length);
			for (let i = 0; i < length; i++) if (a[i] !== b[i]) return a[i] - b[i];
			return a.length - b.length;
		}
		function rebuildUtilityStylesheet() {
			const rules = /* @__PURE__ */ new Map();
			const meta = /* @__PURE__ */ new Map();
			for (const className of knownUtilityClasses) {
				const parts = splitVariants(className);
				const utility = parts.pop();
				meta.set(className, [parts.map(getPrefixRank), resolveUtility(utility)?.order ?? [9e15]]);
			}
			const classNames = [...knownUtilityClasses].sort((a, b) => {
				const mA = meta.get(a), mB = meta.get(b);
				return compareOrderPaths(mA[0], mB[0]) || compareOrderPaths(mA[1], mB[1]) || (a < b ? -1 : 1);
			});
			for (const className of classNames) rules.set(`.${CSS.escape(className)}`, [className]);
			utilityStyleElement ||= appendStyleTag("q-css-utilities");
			utilityStyleElement.textContent = generateCssFromRules(rules);
		}
		/**
		* Registers utility classes and immediately regenerates the utility stylesheet.
		* Accepts a whitespace-separated string or any iterable of class names.
		* Works even with `CSSClassMode: false` (observer disabled).
		*/
		Q.processClasses = (c) => c && generateAndInjectCssForClasses(typeof c === "string" ? c.trim().split(/\s+/) : c);
		/**
		* Collects classes from a DOM subtree (element, fragment or document) and
		* registers them via Q.processClasses. Useful for detached or freshly built
		* nodes, without waiting for the MutationObserver.
		*/
		Q.scan = (root = document) => Q.processClasses(collectClasses(root));
		/**
		* Checks whether a class can produce at least one CSS rule.
		* Ordinary application classes such as "card" or "modal" are silently ignored.
		*/
		function isKnownUtilityToken(token) {
			const parts = splitVariants(token);
			const utility = parts.pop();
			for (const prefix of parts) if (!getPrefixHandler(prefix)) return false;
			return resolveUtility(utility) !== null;
		}
		function generateAndInjectCssForClasses(classNames) {
			const start = Q.CSSPerformance ? performance.now() : 0;
			const before = knownUtilityClasses.size;
			let hasNewUtilities = false;
			for (const className of classNames) {
				if (!className || generatedUtilityClasses.has(className)) continue;
				generatedUtilityClasses.add(className);
				if (className.startsWith("q-css-")) continue;
				if (className === "group" || className === "peer") continue;
				if (!isKnownUtilityToken(className)) {
					const parts = splitVariants(className);
					const utility = parts.pop().replace(/^!?-?/, "");
					const keys = Object.keys(UTILITY_CONFIG).filter((k) => k[0] !== "$");
					const badVariant = parts.find((p) => !getPrefixHandler(p));
					const family = keys.find((k) => utility === k || utility.startsWith(k + "-"));
					const similar = !family && utility.length > 2 && keys.find((k) => k.length > 2 && (k.startsWith(utility) || utility.startsWith(k)));
					if (badVariant) cssWarn(className, `[Quas] Unknown variant "${badVariant}" in "${className}"`);
					else if (family) cssWarn(className, `[Quas] Unknown value in "${className}" (utility: "${family}")`);
					else if (similar) cssWarn(className, `[Quas] Unknown utility "${className}". Did you mean "${similar}"?`);
					else if (parts.length) cssWarn(className, `[Quas] Unknown utility "${className}"`);
					continue;
				}
				knownUtilityClasses.add(className);
				hasNewUtilities = true;
			}
			if (hasNewUtilities) rebuildUtilityStylesheet();
			if (Q.CSSPerformance) console.debug(`[Quas] ${classNames.size} classes found, ${knownUtilityClasses.size - before} new, ${(performance.now() - start).toFixed(2)} ms`);
		}
		function collectElementClasses(element, output) {
			for (const className of element.classList) output.add(className);
		}
		function collectClasses(root, output = /* @__PURE__ */ new Set()) {
			if (!root) return output;
			if (root.nodeType === Node.ELEMENT_NODE && root.classList) collectElementClasses(root, output);
			if (root.querySelectorAll) for (const element of root.querySelectorAll("[class]")) collectElementClasses(element, output);
			return output;
		}
		/**
		* Observe:
		*
		* 1. Elements inserted by j-if, j-for and j-html.
		* 2. Class changes made by :class / j-bind:class.
		*/
		let utilityClassObserver = null;
		function startUtilityClassObserver() {
			if (!Q.CSSClassMode || utilityClassObserver) return;
			utilityClassObserver = new MutationObserver((mutations) => {
				const discoveredClasses = /* @__PURE__ */ new Set();
				for (const mutation of mutations) if (mutation.type === "childList") for (const addedNode of mutation.addedNodes) collectClasses(addedNode, discoveredClasses);
				else if (mutation.type === "attributes") collectElementClasses(mutation.target, discoveredClasses);
				if (discoveredClasses.size) generateAndInjectCssForClasses(discoveredClasses);
			});
			utilityClassObserver.observe(document.documentElement, {
				subtree: true,
				childList: true,
				attributes: true,
				attributeFilter: ["class"]
			});
		}
		if (Q.CSSClassMode) generateAndInjectCssForClasses(collectClasses(document));
		startUtilityClassObserver();
		setTimeout(() => {
			requestAnimationFrame(() => {
				noTransitionStyle.remove();
			});
		}, 1);
		if (Q.CSSTagMode) {
			const processedCssNodes = /* @__PURE__ */ new WeakSet();
			function processStandaloneCssNode(node) {
				if (!node || node.nodeType !== Node.ELEMENT_NODE || node.localName !== "css" || processedCssNodes.has(node)) return;
				const parent = node.parentElement;
				if (!parent) return;
				processedCssNodes.add(node);
				parent.classList.add(Q.css(node.textContent, node.getAttribute("id")));
				if (Q.CleanDOM) node.replaceWith(document.createComment(""));
				else node.hidden = true;
			}
			function scanStandaloneCssTags(root = document) {
				if (!root) return;
				processStandaloneCssNode(root);
				if (root.querySelectorAll) for (const node of root.querySelectorAll("css")) processStandaloneCssNode(node);
			}
			scanStandaloneCssTags(document);
			new MutationObserver((mutations) => {
				for (const mutation of mutations) {
					if (mutation.type !== "childList") continue;
					for (const addedNode of mutation.addedNodes) scanStandaloneCssTags(addedNode);
				}
			}).observe(document.documentElement, {
				subtree: true,
				childList: true
			});
		}
	})();

})();