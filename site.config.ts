import siteConfig from "./src/utils/config";

const config = siteConfig({
	title: "Jinblog",
	prologue: "Welcome!\nSome thoughts and reflections on technology and life.\nHope you like it!",
	author: {
		name: "Jin",
		email: "wjinin25@gmail.com",
		link: "https://your.website"
	},
	description: "A modern Astro theme focused on content creation.",
	copyright: {
		type: "CC BY-NC-ND 4.0",
		year: "2025"
	},
	i18n: {
		locales: ["en", "zh-cn", "ja"],
		defaultLocale: "zh-cn"
	},
	pagination: {
		note: 15,
		jotting: 24
	},
	heatmap: {
		unit: "day",
		weeks: 20
	},
	feed: {
		section: "*",
		limit: 20
	},
	latest: "*"
});

export const monolocale = Number(config.i18n.locales.length) === 1;

export default config;
