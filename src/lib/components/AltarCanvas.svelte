<script lang="ts">
	import { onMount } from 'svelte';
	import type {
		AltarRecord,
		AltarLevelCount,
		SlotItem,
		OfrendaType,
		PhotoRecord
	} from '../types/altar';
	import { ALTAR_LEVELS_EXPLANATION } from '../data/cultural-content';
	import { saveAltar, getAllPhotos } from '../db/altar-db';
	import AltarTier from './AltarTier.svelte';
	import TapeteAserrin from './TapeteAserrin.svelte';
	import OfrendaPicker from './OfrendaPicker.svelte';
	import PhotoFrameModal from './PhotoFrameModal.svelte';
	import PapelPicadoSvg from './ofrendas/PapelPicadoSvg.svelte';

	interface Props {
		altar: AltarRecord;
	}

	let { altar = $bindable() }: Props = $props();

	let isCandleLit = $state(true);
	let photosMap = $state<Record<string, PhotoRecord>>({});

	let pickerState = $state<{
		isOpen: boolean;
		levelIndex: number;
		slotIndex: number;
		currentType?: OfrendaType;
	}>({
		isOpen: false,
		levelIndex: 1,
		slotIndex: 0
	});

	let photoModalState = $state<{
		isOpen: boolean;
		levelIndex: number;
		slotIndex: number;
		currentPhotoId?: string;
	}>({
		isOpen: false,
		levelIndex: 1,
		slotIndex: 0
	});

	onMount(async () => {
		await refreshPhotos();
	});

	async function refreshPhotos() {
		try {
			const list = await getAllPhotos();
			const map: Record<string, PhotoRecord> = {};
			for (const p of list) {
				map[p.id] = p;
			}
			photosMap = map;
		} catch (e) {
			console.error('Error cargando fotos en altar:', e);
		}
	}

	// Determinar nombres didácticos de cada nivel según la configuración
	const currentLevelsMeta = $derived(
		ALTAR_LEVELS_EXPLANATION.find((e) => e.count === altar.levelCount)
	);

	function getLevelName(levelNumber: number): string {
		const found = currentLevelsMeta?.levels.find((l) => l.number === levelNumber);
		return found ? found.name : '';
	}

	// Filtrar ranuras por nivel
	function getSlotsForLevel(lvl: number): SlotItem[] {
		return altar.items.filter((item) => item.levelIndex === lvl);
	}

	// Cambiar número de niveles (2, 3, 7)
	async function setLevelCount(count: AltarLevelCount) {
		altar.levelCount = count;
		// Filtrar ítems que queden fuera del rango de niveles
		altar.items = altar.items.filter((item) => item.levelIndex <= count);
		await saveAltar(altar);
	}

	// Abrir selector de ofrenda o portaretratos
	function handleSlotClick(levelIndex: number, slotIndex: number) {
		const existing = altar.items.find(
			(i) => i.levelIndex === levelIndex && i.slotIndex === slotIndex
		);

		if (existing?.type === 'foto') {
			photoModalState = {
				isOpen: true,
				levelIndex,
				slotIndex,
				currentPhotoId: existing.photoId
			};
			return;
		}

		pickerState = {
			isOpen: true,
			levelIndex,
			slotIndex,
			currentType: existing?.type
		};
	}

	// Colocar ofrenda en la ranura
	async function handleSelectOfrenda(type: OfrendaType) {
		const { levelIndex, slotIndex } = pickerState;
		const existingIndex = altar.items.findIndex(
			(i) => i.levelIndex === levelIndex && i.slotIndex === slotIndex
		);

		const newItem: SlotItem = {
			id: `slot-${levelIndex}-${slotIndex}-${Date.now()}`,
			type,
			levelIndex,
			slotIndex
		};

		if (existingIndex >= 0) {
			altar.items[existingIndex] = newItem;
		} else {
			altar.items.push(newItem);
		}

		pickerState.isOpen = false;
		await saveAltar(altar);
	}

	// Quitar ofrenda de la ranura
	async function handleRemoveOfrenda() {
		const { levelIndex, slotIndex } = pickerState;
		altar.items = altar.items.filter(
			(i) => !(i.levelIndex === levelIndex && i.slotIndex === slotIndex)
		);
		pickerState.isOpen = false;
		await saveAltar(altar);
	}

	// Colocar foto desde PhotoFrameModal
	async function handleSelectPhoto(photo: PhotoRecord) {
		const { levelIndex, slotIndex } = photoModalState;
		photosMap[photo.id] = photo;

		const existingIndex = altar.items.findIndex(
			(i) => i.levelIndex === levelIndex && i.slotIndex === slotIndex
		);

		const newItem: SlotItem = {
			id: `slot-${levelIndex}-${slotIndex}-${Date.now()}`,
			type: 'foto',
			photoId: photo.id,
			levelIndex,
			slotIndex
		};

		if (existingIndex >= 0) {
			altar.items[existingIndex] = newItem;
		} else {
			altar.items.push(newItem);
		}

		photoModalState.isOpen = false;
		await saveAltar(altar);
	}

	// Retirar foto del escalón
	async function handleRemovePhoto() {
		const { levelIndex, slotIndex } = photoModalState;
		altar.items = altar.items.filter(
			(i) => !(i.levelIndex === levelIndex && i.slotIndex === slotIndex)
		);
		photoModalState.isOpen = false;
		await saveAltar(altar);
	}

	// Guardar título o dedicatoria
	async function handleSaveHeader() {
		await saveAltar(altar);
	}
</script>

<div
	id="altar-canvas-container"
	class="relative mx-auto my-6 max-w-6xl overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#16061F] via-[#240B36] to-[#0E0314] p-4 text-amber-50 shadow-2xl sm:p-8"
>
	<!-- Guirnalda festiva de Papel Picado en la cima -->
	<div class="mb-6 flex justify-between overflow-hidden opacity-90">
		{#each ['#E91E63', '#00E5FF', '#FF9800', '#9C27B0', '#4CAF50', '#FFEB3B', '#E91E63'] as color, idx (idx)}
			<div class="w-12 sm:w-20">
				<PapelPicadoSvg {color} size={70} class="w-full" />
			</div>
		{/each}
	</div>

	<!-- Barra de Herramientas y Configuración del Altar -->
	<div
		class="mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-amber-500/20 bg-black/40 p-4 backdrop-blur-sm sm:flex-row"
	>
		<!-- Título y Dedicatoria editables -->
		<div class="w-full flex-1 sm:w-auto">
			<input
				type="text"
				bind:value={altar.title}
				onblur={handleSaveHeader}
				class="w-full border-b border-transparent bg-transparent font-serif text-xl font-bold text-amber-300 placeholder-amber-400/50 outline-none focus:border-amber-400 sm:text-3xl"
				placeholder="Escribe el título de tu Altar..."
				aria-label="Título del Altar"
			/>
			<input
				type="text"
				bind:value={altar.dedicationTo}
				onblur={handleSaveHeader}
				class="mt-1 w-full border-b border-transparent bg-transparent text-xs text-pink-300/90 placeholder-pink-300/40 outline-none focus:border-pink-400 sm:text-sm"
				placeholder="Dedicatoria o recuerdo..."
				aria-label="Dedicatoria del Altar"
			/>
		</div>

		<!-- Selector de Niveles tradicionales (2, 3 o 7) -->
		<div class="flex items-center gap-2">
			<span class="hidden text-xs font-semibold tracking-wider text-amber-300 uppercase md:inline">
				Niveles:
			</span>
			<div class="flex gap-1 rounded-xl border border-amber-500/20 bg-black/60 p-1">
				{#each [2, 3, 7] as const as count (count)}
					<button
						type="button"
						class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all {altar.levelCount ===
						count
							? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
							: 'text-amber-200 hover:text-white'}"
						onclick={() => setLevelCount(count)}
					>
						{count}
					</button>
				{/each}
			</div>

			<!-- Alternar llama de veladoras -->
			<button
				type="button"
				class="flex items-center gap-1.5 rounded-xl border border-amber-500/20 bg-black/40 px-3 py-1.5 text-xs font-semibold text-amber-200 transition-all hover:border-amber-400 hover:text-white"
				onclick={() => (isCandleLit = !isCandleLit)}
				aria-label="Alternar veladoras encendidas"
			>
				<span>{isCandleLit ? '🔥 Velas Encendidas' : '💨 Velas Apagadas'}</span>
			</button>
		</div>
	</div>

	<!-- Escalones del Altar (de Nivel 1 hacia abajo) -->
	<div class="space-y-4">
		{#each Array.from({ length: altar.levelCount }, (_, i) => i + 1) as lvl (lvl)}
			<AltarTier
				levelIndex={lvl}
				totalLevels={altar.levelCount}
				levelName={getLevelName(lvl)}
				slots={getSlotsForLevel(lvl)}
				{photosMap}
				slotCount={lvl === 1 ? 3 : Math.min(3 + Math.floor(lvl / 2), 5)}
				{isCandleLit}
				onSlotClick={handleSlotClick}
			/>
		{/each}
	</div>

	<!-- Suelo / Tapete de Aserrín tradicional con Cempasúchil -->
	<div class="mt-8">
		<TapeteAserrin
			pattern={altar.tapetePattern || 'cempasuchil-sol'}
			hasPetalsTrail={altar.hasPetalsTrail}
		/>
	</div>

	<!-- Selector Modal de Ofrendas -->
	<OfrendaPicker
		isOpen={pickerState.isOpen}
		levelIndex={pickerState.levelIndex}
		slotIndex={pickerState.slotIndex}
		currentType={pickerState.currentType}
		onSelect={handleSelectOfrenda}
		onRemove={handleRemoveOfrenda}
		onOpenPhotoManager={() => {
			const { levelIndex, slotIndex } = pickerState;
			pickerState.isOpen = false;
			photoModalState = {
				isOpen: true,
				levelIndex,
				slotIndex
			};
		}}
		onClose={() => (pickerState.isOpen = false)}
	/>

	<!-- Modal de Gestión y Subida de Fotos -->
	<PhotoFrameModal
		isOpen={photoModalState.isOpen}
		currentPhotoId={photoModalState.currentPhotoId}
		onSelectPhoto={handleSelectPhoto}
		onRemovePhoto={handleRemovePhoto}
		onClose={() => (photoModalState.isOpen = false)}
	/>
</div>
