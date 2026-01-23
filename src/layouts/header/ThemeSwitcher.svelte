<script lang="ts">
import { onMount } from "svelte";
import Icon from "$components/Icon.svelte";

let { dark = $bindable(false) } = $props();

/**
 * Apply theme to DOM and persist to localStorage
 * @param on whether to enable dark mode
 */
function turnDark(on: boolean) {
	// #region agent log
	fetch("http://127.0.0.1:7243/ingest/e69208c1-343b-4982-9b44-784bb3d593bb", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			sessionId: "debug-session",
			runId: "pre-fix",
			hypothesisId: "C",
			location: "src/layouts/header/ThemeSwitcher.svelte:turnDark:before",
			message: "turnDark() called",
			data: {
				on,
				currentDark: dark,
				existingDatasetTheme: document?.documentElement?.dataset?.theme ?? null,
				existingStoredTheme: typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null
			},
			timestamp: Date.now()
		})
	}).catch(() => {});
	// #endregion agent log
	let theme = (dark = on) ? "dark" : "light";
	// Update CSS custom properties via data attribute
	document.documentElement.dataset.theme = theme;
	// Persist user preference across sessions
	localStorage.setItem("theme", theme);
	// #region agent log
	fetch("http://127.0.0.1:7243/ingest/e69208c1-343b-4982-9b44-784bb3d593bb", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			sessionId: "debug-session",
			runId: "pre-fix",
			hypothesisId: "D",
			location: "src/layouts/header/ThemeSwitcher.svelte:turnDark:after",
			message: "turnDark() applied",
			data: { theme, datasetTheme: document.documentElement.dataset.theme, storedTheme: localStorage.getItem("theme") },
			timestamp: Date.now()
		})
	}).catch(() => {});
	// #endregion agent log
}

/**
 * Handle theme toggle with animated transition effect
 * @param event Mouse event for click coordinates
 */
function triggerDark(event: MouseEvent) {
	// #region agent log
	fetch("http://127.0.0.1:7243/ingest/e69208c1-343b-4982-9b44-784bb3d593bb", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			sessionId: "debug-session",
			runId: "pre-fix",
			hypothesisId: "A",
			location: "src/layouts/header/ThemeSwitcher.svelte:triggerDark:entry",
			message: "toggle button clicked",
			data: {
				currentDark: dark,
				hasStartViewTransition: typeof (document as any).startViewTransition === "function",
				x: event?.clientX,
				y: event?.clientY
			},
			timestamp: Date.now()
		})
	}).catch(() => {});
	// #endregion agent log
	const trigger = () => turnDark(!dark);

	let transition: ViewTransition;
	if (!(transition = document.startViewTransition?.(trigger))) {
		// #region agent log
		fetch("http://127.0.0.1:7243/ingest/e69208c1-343b-4982-9b44-784bb3d593bb", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				sessionId: "debug-session",
				runId: "pre-fix",
				hypothesisId: "A",
				location: "src/layouts/header/ThemeSwitcher.svelte:triggerDark:noTransition",
				message: "startViewTransition unavailable; falling back to direct toggle",
				data: { currentDark: dark },
				timestamp: Date.now()
			})
		}).catch(() => {});
		// #endregion agent log
		return trigger(); // Compatibility check
	}

	// Get click coordinates for radial animation origin
	const x = event.clientX;
	const y = event.clientY;
	transition.ready.then(() => {
		// Create expanding circle animation from click point
		const path = [`circle(0% at ${x}px ${y}px)`, `circle(130% at ${x}px ${y}px)`];
		document.documentElement.animate(
			{
				// Reverse animation direction based on theme transition
				clipPath: dark ? [...path].reverse() : path
			},
			{
				duration: 400,
				easing: "ease-in",
				// Keep end state after animation completes to avoid flicker
				fill: "forwards",
				// Target different pseudo-elements for incoming/outgoing content
				pseudoElement: dark ? "::view-transition-old(root)" : "::view-transition-new(root)"
			}
		);
	});
}

onMount(() => {
	// Detect system color scheme preference
	const mode = window.matchMedia("(prefers-color-scheme: dark)");
	const theme = localStorage.getItem("theme");

	// #region agent log
	fetch("http://127.0.0.1:7243/ingest/e69208c1-343b-4982-9b44-784bb3d593bb", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			sessionId: "debug-session",
			runId: "pre-fix",
			hypothesisId: "E",
			location: "src/layouts/header/ThemeSwitcher.svelte:onMount",
			message: "ThemeSwitcher mounted",
			data: { storedTheme: theme, systemPrefersDark: mode.matches, initialDatasetTheme: document.documentElement.dataset.theme ?? null },
			timestamp: Date.now()
		})
	}).catch(() => {});
	// #endregion agent log

	// Use stored preference or fallback to system preference
	turnDark(theme ? theme === "dark" : mode.matches);
	// Listen for system theme changes and apply automatically
	mode.addEventListener("change", ({ matches }) => turnDark(matches));
});
</script>

<button class="items-center" aria-label="Toggle dark theme" onclick={triggerDark}>
	{#if dark}
		<Icon name="lucide--moon" />
	{:else}
		<Icon name="lucide--sun" />
	{/if}
</button>
