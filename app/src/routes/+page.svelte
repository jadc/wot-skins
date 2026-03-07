<script lang="ts">
	import Card from "$lib/components/Card.svelte";

	let { data } = $props();
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
	{#each data.skins as skin (skin.slug)}
		<Card {skin} />
	{/each}
</div>
