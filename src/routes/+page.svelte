<script lang="ts">
	import { onMount } from 'svelte';
	import type { AltarRecord } from '../lib/types/altar';
	import { getOrCreateDefaultAltar, createInitialAltar } from '../lib/db/altar-db';
	import AltarCanvas from '../lib/components/AltarCanvas.svelte';
	import CulturalGuide from '../lib/components/CulturalGuide.svelte';

	let altar = $state<AltarRecord>(createInitialAltar());
	let isLoading = $state(true);
	let currentView = $state<'altar' | 'guia'>('altar');

	onMount(async () => {
		try {
			const saved = await getOrCreateDefaultAltar();
			altar = saved;
		} catch (error) {
			console.error('Error cargando altar desde Dexie:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<svelte:head>
	<title>Cempasúchil • Crea tu Altar de Muertos Local y Gratuito</title>
	<meta
		name="description"
		content="Plataforma libre, gratuita y 100% privada para crear y honrar tu Altar de Muertos con fotografías, cempasúchil, pan de muerto y ofrendas tradicionales mexicanas."
	/>
</svelte:head>

<main class="min-h-screen bg-[#0C0211] text-amber-50">
	<!-- Encabezado ceremonial con motivos mexicanos -->
	<header
		class="border-b border-amber-500/20 bg-gradient-to-b from-[#1E0528] to-[#0C0211] px-4 py-8 text-center"
	>
		<div class="mx-auto max-w-4xl">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-semibold text-amber-300"
			>
				<span>🌼</span>
				<span>100% Local • Gratuito • Sin Cuentas ni Servidores</span>
			</div>
			<h1
				class="mt-4 font-serif text-3xl font-extrabold tracking-tight text-amber-400 drop-shadow-[0_4px_12px_rgba(255,160,0,0.3)] sm:text-5xl md:text-6xl"
			>
				Cempasúchil
			</h1>
			<p class="mt-2 text-base font-medium text-pink-300 sm:text-xl">
				Crea, conmemora y preserva tu Altar de Muertos
			</p>
			<p class="mx-auto mt-2 max-w-2xl text-xs text-amber-100/70 sm:text-sm">
				Una ofrenda viva en memoria de quienes habitan para siempre en nuestros corazones. Tus
				fotografías y dedicatorias permanecen seguras exclusivamente en la memoria de tu
				dispositivo.
			</p>

			<!-- Navegación de vistas -->
			<nav class="mt-6 flex justify-center gap-3" aria-label="Navegación principal">
				<button
					type="button"
					class="rounded-xl px-5 py-2 text-sm font-bold transition-all {currentView === 'altar'
						? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
						: 'border border-amber-500/30 bg-black/40 text-amber-200 hover:border-amber-400'}"
					onclick={() => (currentView = 'altar')}
				>
					🕯️ Mi Altar
				</button>
				<button
					type="button"
					class="rounded-xl px-5 py-2 text-sm font-bold transition-all {currentView === 'guia'
						? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
						: 'border border-amber-500/30 bg-black/40 text-amber-200 hover:border-amber-400'}"
					onclick={() => (currentView = 'guia')}
				>
					📖 Significado Cultural
				</button>
			</nav>
		</div>
	</header>

	<!-- Contenido principal -->
	<div class="px-4 py-6">
		{#if isLoading}
			<div class="flex h-64 flex-col items-center justify-center gap-3 text-amber-300">
				<div
					class="h-8 w-8 animate-spin rounded-full border-2 border-amber-400 border-t-transparent"
				></div>
				<p class="text-sm">Abriendo el sendero de cempasúchil...</p>
			</div>
		{:else if currentView === 'altar'}
			<AltarCanvas bind:altar />
		{:else if currentView === 'guia'}
			<CulturalGuide />
		{/if}
	</div>

	<!-- Pie de página respetuoso -->
	<footer
		class="mt-16 border-t border-amber-500/20 bg-[#07010A] py-8 text-center text-xs text-amber-200/60"
	>
		<p class="font-serif">"La muerte no es el fin, sino el reencuentro de la memoria y el amor."</p>
		<p class="mt-2 text-[11px] text-amber-400/80">
			Hecho con devoción para la tradición mexicana de Día de Muertos. Almacenamiento local con
			Dexie.js.
		</p>
	</footer>
</main>
