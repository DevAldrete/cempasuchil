<script lang="ts">
	import { OFRENDA_CATALOG, type CatalogItem } from '../data/ofrenda-catalog';
	import type { OfrendaType } from '../types/altar';
	import OfrendaIcon from './ofrendas/OfrendaIcon.svelte';

	interface Props {
		isOpen: boolean;
		levelIndex: number;
		slotIndex: number;
		currentType?: OfrendaType;
		onSelect: (type: OfrendaType) => void;
		onRemove: () => void;
		onOpenPhotoManager?: () => void;
		onClose: () => void;
	}

	let {
		isOpen,
		levelIndex,
		slotIndex,
		currentType,
		onSelect,
		onRemove,
		onOpenPhotoManager,
		onClose
	}: Props = $props();

	let selectedCategory = $state<
		'todas' | 'esenciales' | 'alimentos' | 'simbolos' | 'flores_aromas'
	>('todas');

	const filteredCatalog = $derived<CatalogItem[]>(
		selectedCategory === 'todas'
			? OFRENDA_CATALOG
			: OFRENDA_CATALOG.filter((item) => item.category === selectedCategory)
	);

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

{#if isOpen}
	<div
		class="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
		role="dialog"
		aria-modal="true"
		aria-labelledby="picker-title"
	>
		<div
			class="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#240B36] via-[#1A0426] to-[#12001A] text-amber-50 shadow-2xl"
		>
			<!-- Cabecera -->
			<div class="flex items-center justify-between border-b border-amber-500/20 px-6 py-4">
				<div>
					<span class="text-xs font-semibold tracking-wider text-amber-400 uppercase">
						Escalón {levelIndex} • Lugar {slotIndex + 1}
					</span>
					<h3 id="picker-title" class="font-serif text-xl font-bold text-amber-200">
						Elige una Ofrenda Tradicional
					</h3>
				</div>
				<button
					type="button"
					class="rounded-full p-2 text-amber-300 hover:bg-white/10 hover:text-white"
					onclick={onClose}
					aria-label="Cerrar modal"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Filtro de Categorías -->
			<div class="flex flex-wrap gap-2 border-b border-amber-500/10 bg-black/20 px-6 py-3">
				{#each [{ id: 'todas', label: 'Todas' }, { id: 'esenciales', label: 'Esenciales' }, { id: 'flores_aromas', label: 'Flores y Aromas' }, { id: 'alimentos', label: 'Alimentos' }, { id: 'simbolos', label: 'Símbolos' }] as const as cat (cat.id)}
					<button
						type="button"
						class="rounded-xl px-3 py-1 text-xs font-medium transition-all {selectedCategory ===
						cat.id
							? 'bg-amber-500 font-bold text-black shadow-md'
							: 'bg-black/40 text-amber-200 hover:bg-white/10'}"
						onclick={() => (selectedCategory = cat.id)}
					>
						{cat.label}
					</button>
				{/each}
			</div>

			<!-- Lista de Elementos -->
			<div class="grid grid-cols-1 gap-3 overflow-y-auto p-6 sm:grid-cols-2 md:grid-cols-3">
				{#each filteredCatalog as item (item.type)}
					<button
						type="button"
						class="group flex flex-col items-center rounded-2xl border p-4 text-center transition-all hover:scale-[1.02] {currentType ===
						item.type
							? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/20'
							: 'border-amber-500/20 bg-black/40 hover:border-amber-400 hover:bg-black/60'}"
						onclick={() => {
							if (item.type === 'foto' && onOpenPhotoManager) {
								onOpenPhotoManager();
							} else {
								onSelect(item.type);
							}
						}}
					>
						<div class="flex h-20 w-20 items-center justify-center">
							<OfrendaIcon type={item.type} size={64} />
						</div>
						<h4 class="mt-2 font-serif text-sm font-bold text-amber-200 group-hover:text-amber-300">
							{item.name}
						</h4>
						<p class="mt-1 line-clamp-2 text-xs text-amber-100/70">{item.description}</p>
						<span class="mt-2 text-[10px] font-medium text-amber-400/90 italic">
							"{item.meaning}"
						</span>
					</button>
				{/each}
			</div>

			<!-- Pie con acciones -->
			<div
				class="flex items-center justify-between border-t border-amber-500/20 bg-black/40 px-6 py-4"
			>
				{#if currentType}
					<button
						type="button"
						class="rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-2 text-xs font-semibold text-rose-300 transition-all hover:bg-rose-900/60"
						onclick={onRemove}
					>
						Quitar elemento del lugar
					</button>
				{:else}
					<span></span>
				{/if}

				<button
					type="button"
					class="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black transition-all hover:bg-amber-400"
					onclick={onClose}
				>
					Listo
				</button>
			</div>
		</div>
	</div>
{/if}
