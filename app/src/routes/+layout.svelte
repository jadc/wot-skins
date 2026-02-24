<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/icons/search.svg" />

	<!-- OG / Discord -->
	<meta property="og:site_name" content="chems" />
	<meta name="twitter:site" content="chems" />
	<meta content="#2F3136" data-react-helmet="true" name="theme-color" />
	<meta property="og:type" content="website" />

	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Mono&display=swap"
		rel="stylesheet"
	/>

	<!-- Ads -->
	<meta name="google-adsense-account" content="ca-pub-5365509455453456" />
	<script
		async
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5365509455453456"
		crossorigin="anonymous"
	></script>

	<title>chems</title>
	<meta property="og:title" content="chems" />
	<meta name="twitter:title" content="chems" />
</svelte:head>

{@render children()}
