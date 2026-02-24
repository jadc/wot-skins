<script lang="ts">
	let { slug, file }: { slug: string; file: string } = $props();

	let isWotmod = $derived(file.endsWith(".wotmod"));
	let isFbx = $derived(file.endsWith(".fbx"));

	let label = $derived(isWotmod ? "Download" : isFbx ? "Download FBX" : "Download ZIP");
</script>

<a
	href="/content/{slug}/{file}"
	download
	class="selectable mb-2 block max-w-[7em] whitespace-nowrap rounded border border-[#301a81] px-4 py-1 text-center text-white no-underline"
	style:background-color={isWotmod ? '#1d811a' : undefined}
>
	{label}
</a>
