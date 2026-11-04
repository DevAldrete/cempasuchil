<script lang="ts">
	import type { SlotItem, PhotoRecord } from '../types/altar';
	import OfrendaIcon from './ofrendas/OfrendaIcon.svelte';
	import PhotoFrame from './PhotoFrame.svelte';

	interface Props {
		levelIndex: number;
		totalLevels: 2 | 3 | 7;
		levelName?: string;
		slots: SlotItem[];
		photosMap?: Record<string, PhotoRecord>;
		slotCount?: number;
		isCandleLit?: boolean;
		onSlotClick: (levelIndex: number, slotIndex: number) => void;
	}

	let {
		levelIndex,
		totalLevels,
		levelName = '',
		slots,
		photosMap = {},
		slotCount = 3,
		isCandleLit = true,
		onSlotClick
	}: Props = $props();

	// Ancho escalonado para dar la apariencia piramidal del altar tradicional
	const tierWidthClass = $derived.by(() => {
		const ratio = levelIndex / totalLevels;
		if (ratio <= 0.35) return 'max-w-xl sm:max-w-2xl';
		if (ratio <= 0.65) return 'max-w-2xl sm:max-w-3xl';
		return 'max-w-3xl sm:max-w-5xl';
	});

	// Array de índices para cada ranura/slot
	const slotIndices = $derived(Array.from({ length: slotCount }, (_, i) => i));

	function getItemForSlot(index: number): SlotItem | undefined {
		return slots.find((s) => s.slotIndex === index);
	}
</script>

<div class="relative mx-auto w-full {tierWidthClass} transition-all duration-500">
	<!-- Placa indicadora del Nivel -->
	<div class="mb-1 flex items-center justify-between px-4">
		<span
			class="rounded-full border border-amber-500/30 bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300"
		>
			Nivel {levelIndex}
		</span>
		{#if levelName}
			<span class="max-w-xs truncate font-serif text-xs text-amber-200/80 italic">
				{levelName}
			</span>
		{/if}
	</div>

	<!-- Plataforma o escalón del Altar -->
	<div
		class="relative rounded-2xl border-x border-t-2 border-amber-500/40 bg-gradient-to-b from-[#3B0746] via-[#2A0533] to-[#190220] p-4 shadow-xl sm:p-6"
	>
		<!-- Superficie de madera/mantel con brillo cálido -->
		<div
			class="absolute inset-x-0 top-0 h-3 rounded-t-2xl bg-gradient-to-r from-amber-500/20 via-amber-300/30 to-amber-500/20"
		></div>

		<!-- Ranuras de colocación de ofrendas -->
		<div class="relative z-10 flex flex-wrap items-center justify-around gap-4 py-2">
			{#each slotIndices as slotIdx (slotIdx)}
				{@const item = getItemForSlot(slotIdx)}
				<button
					type="button"
					class="group relative flex h-24 w-24 flex-col items-center justify-center rounded-2xl border transition-all duration-300 hover:scale-105 sm:h-28 sm:w-28 {item
						? 'border-amber-500/30 bg-black/40 shadow-lg hover:border-amber-400'
						: 'border-dashed border-amber-500/30 bg-black/20 hover:border-amber-400 hover:bg-amber-500/10'}"
					onclick={() => onSlotClick(levelIndex, slotIdx)}
					aria-label={item ? `Ofrenda: ${item.type}` : `Colocar ofrenda en ranura ${slotIdx + 1}`}
				>
					{#if item}
						{#if item.type === 'foto'}
							<div class="relative flex h-full w-full items-center justify-center p-1">
								<PhotoFrame
									photo={item.photoId ? photosMap[item.photoId] : undefined}
									size="sm"
									class="pointer-events-none"
								/>
							</div>
						{:else}
							<div class="relative flex h-full w-full items-center justify-center p-2">
								<OfrendaIcon type={item.type} size={64} isLit={isCandleLit} />
							</div>
						{/if}
						<!-- Indicador para cambiar / editar -->
						<span
							class="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black opacity-0 shadow transition-opacity group-hover:opacity-100"
						>
							✎
						</span>
					{:else}
						<div class="flex flex-col items-center text-amber-400/60 group-hover:text-amber-300">
							<span class="text-2xl font-light">+</span>
							<span class="text-[10px] font-medium tracking-wider uppercase">Ofrendar</span>
						</div>
					{/if}
				</button>
			{/each}
		</div>

		<!-- Cenefa inferior estilo papel picado del mantel -->
		<div
			class="pointer-events-none absolute inset-x-0 -bottom-3 flex justify-around overflow-hidden px-2"
		>
			{#each [0, 1, 2, 3, 4, 5, 6, 7] as picadoId (picadoId)}
				<div
					class="h-3 w-8 rounded-b-lg border-x border-b border-pink-500/40 bg-pink-600/30 backdrop-blur-xs sm:w-12"
				></div>
			{/each}
		</div>
	</div>
</div>
