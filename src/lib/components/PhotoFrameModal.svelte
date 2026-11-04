<script lang="ts">
	import type { PhotoRecord } from '../types/altar';
	import { getAllPhotos, savePhoto, deletePhoto } from '../db/altar-db';
	import { compressImageFile, validateImageFile } from '../utils/image-processor';

	interface Props {
		isOpen: boolean;
		currentPhotoId?: string;
		onSelectPhoto: (photo: PhotoRecord) => void;
		onRemovePhoto?: () => void;
		onClose: () => void;
	}

	let { isOpen, currentPhotoId, onSelectPhoto, onRemovePhoto, onClose }: Props = $props();

	let photosList = $state<PhotoRecord[]>([]);
	let activeTab = $state<'subir' | 'galeria'>('subir');
	let isProcessing = $state(false);
	let errorMessage = $state<string | null>(null);

	// Campos del formulario
	let personName = $state('');
	let relation = $state('');
	let years = $state('');
	let dedication = $state('');
	let selectedPreviewDataUrl = $state<string | null>(null);

	$effect(() => {
		if (isOpen) {
			loadSavedPhotos();
		}
	});

	async function loadSavedPhotos() {
		try {
			photosList = await getAllPhotos();
			if (photosList.length > 0 && !selectedPreviewDataUrl) {
				activeTab = 'subir';
			}
		} catch (e) {
			console.error('Error cargando fotos:', e);
		}
	}

	async function handleFileInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		errorMessage = null;
		const validation = validateImageFile(file);
		if (!validation.valid) {
			errorMessage = validation.error || 'Archivo no válido';
			return;
		}

		isProcessing = true;
		try {
			const compressed = await compressImageFile(file);
			selectedPreviewDataUrl = compressed;
		} catch (err: unknown) {
			errorMessage = err instanceof Error ? err.message : 'Error al procesar la foto';
		} finally {
			isProcessing = false;
		}
	}

	async function handleSaveNewPhoto() {
		if (!personName.trim()) {
			errorMessage = 'Por favor escribe el nombre de la persona o ser querido.';
			return;
		}
		if (!selectedPreviewDataUrl) {
			errorMessage = 'Por favor selecciona una fotografía.';
			return;
		}

		isProcessing = true;
		try {
			const newPhoto: PhotoRecord = {
				id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
				name: personName.trim(),
				relation: relation.trim() || undefined,
				years: years.trim() || undefined,
				dedication: dedication.trim() || undefined,
				dataUrl: selectedPreviewDataUrl,
				createdAt: Date.now()
			};

			await savePhoto(newPhoto);
			onSelectPhoto(newPhoto);
			resetForm();
			onClose();
		} catch (err: unknown) {
			errorMessage = err instanceof Error ? err.message : 'Error al guardar la fotografía';
		} finally {
			isProcessing = false;
		}
	}

	async function handleDeletePhoto(id: string) {
		if (confirm('¿Deseas eliminar este portaretratos de tu biblioteca local?')) {
			await deletePhoto(id);
			await loadSavedPhotos();
		}
	}

	function resetForm() {
		personName = '';
		relation = '';
		years = '';
		dedication = '';
		selectedPreviewDataUrl = null;
		errorMessage = null;
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') onClose();
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

{#if isOpen}
	<div
		class="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
		role="dialog"
		aria-modal="true"
		aria-labelledby="photo-modal-title"
	>
		<div
			class="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#240B36] via-[#1A0426] to-[#12001A] text-amber-50 shadow-2xl"
		>
			<!-- Cabecera -->
			<div class="flex items-center justify-between border-b border-amber-500/20 px-6 py-4">
				<div>
					<span class="text-xs font-semibold tracking-wider text-amber-400 uppercase">
						Portaretratos Sagrado
					</span>
					<h3 id="photo-modal-title" class="font-serif text-xl font-bold text-amber-200">
						Honrar a un Ser Querido
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

			<!-- Navegación entre Subir y Galería Local -->
			<div class="flex gap-2 border-b border-amber-500/10 bg-black/20 px-6 py-2.5">
				<button
					type="button"
					class="rounded-xl px-4 py-1.5 text-xs font-bold transition-all {activeTab === 'subir'
						? 'bg-amber-500 text-black shadow-md'
						: 'bg-black/40 text-amber-200 hover:bg-white/10'}"
					onclick={() => (activeTab = 'subir')}
				>
					Nueva Fotografía
				</button>
				<button
					type="button"
					class="rounded-xl px-4 py-1.5 text-xs font-bold transition-all {activeTab === 'galeria'
						? 'bg-amber-500 text-black shadow-md'
						: 'bg-black/40 text-amber-200 hover:bg-white/10'}"
					onclick={() => (activeTab = 'galeria')}
				>
					Mis Retratos ({photosList.length})
				</button>
			</div>

			{#if errorMessage}
				<div
					class="mx-6 mt-4 rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-xs text-rose-200"
				>
					⚠️ {errorMessage}
				</div>
			{/if}

			<!-- Contenido -->
			<div class="flex-1 overflow-y-auto p-6">
				{#if activeTab === 'subir'}
					<div class="space-y-4">
						<!-- Selector de archivo local -->
						<div>
							<label
								for="photo-file"
								class="block text-xs font-semibold tracking-wider text-amber-300 uppercase"
							>
								Fotografía (JPG, PNG o WEBP, máx. 10 MB)
							</label>
							<div class="mt-2 flex items-center gap-4">
								<input
									id="photo-file"
									type="file"
									accept="image/jpeg,image/png,image/webp,image/gif"
									onchange={handleFileInput}
									class="block w-full cursor-pointer text-xs text-amber-200 file:mr-4 file:rounded-xl file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-xs file:font-bold file:text-black hover:file:bg-amber-400"
								/>
							</div>
							<p class="mt-1 text-[11px] text-amber-200/60">
								🛡️ Tu foto se comprime y guarda únicamente en tu navegador; jamás se sube a
								internet.
							</p>
						</div>

						<!-- Vista previa de la foto seleccionada -->
						{#if selectedPreviewDataUrl}
							<div
								class="flex items-center gap-4 rounded-2xl border border-amber-500/20 bg-black/40 p-3"
							>
								<img
									src={selectedPreviewDataUrl}
									alt="Vista previa"
									class="h-20 w-16 rounded-lg border border-amber-400 object-cover"
								/>
								<div class="text-xs text-amber-200/80">
									<p class="font-bold text-amber-300">Foto optimizada con éxito</p>
									<p class="text-[10px]">Listo para enmarcar en el altar</p>
								</div>
							</div>
						{/if}

						<!-- Datos de la persona honrada -->
						<div class="grid gap-3 sm:grid-cols-2">
							<div>
								<label for="person-name" class="block text-xs font-semibold text-amber-200"
									>Nombre *</label
								>
								<input
									id="person-name"
									type="text"
									bind:value={personName}
									placeholder="Ej. Abuela Elena"
									class="mt-1 w-full rounded-xl border border-amber-500/30 bg-black/40 px-3 py-2 text-sm text-white placeholder-amber-200/30 outline-none focus:border-amber-400"
								/>
							</div>

							<div>
								<label for="relation" class="block text-xs font-semibold text-amber-200"
									>Parentesco / Vínculo</label
								>
								<input
									id="relation"
									type="text"
									bind:value={relation}
									placeholder="Ej. Abuelita, Hermano, Mascota"
									class="mt-1 w-full rounded-xl border border-amber-500/30 bg-black/40 px-3 py-2 text-sm text-white placeholder-amber-200/30 outline-none focus:border-amber-400"
								/>
							</div>
						</div>

						<div class="grid gap-3 sm:grid-cols-2">
							<div>
								<label for="years" class="block text-xs font-semibold text-amber-200"
									>Años / Fechas</label
								>
								<input
									id="years"
									type="text"
									bind:value={years}
									placeholder="Ej. 1938 - 2019"
									class="mt-1 w-full rounded-xl border border-amber-500/30 bg-black/40 px-3 py-2 text-sm text-white placeholder-amber-200/30 outline-none focus:border-amber-400"
								/>
							</div>

							<div>
								<label for="dedication" class="block text-xs font-semibold text-amber-200"
									>Dedicatoria o Frase</label
								>
								<input
									id="dedication"
									type="text"
									bind:value={dedication}
									placeholder="Ej. Tu luz guía nuestro camino"
									class="mt-1 w-full rounded-xl border border-amber-500/30 bg-black/40 px-3 py-2 text-sm text-white placeholder-amber-200/30 outline-none focus:border-amber-400"
								/>
							</div>
						</div>
					</div>
				{:else}
					<!-- Galería de retratos guardados localmente -->
					{#if photosList.length === 0}
						<div class="py-12 text-center text-sm text-amber-200/60">
							No tienes retratos guardados aún. Sube uno en la pestaña "Nueva Fotografía".
						</div>
					{:else}
						<div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
							{#each photosList as photo (photo.id)}
								<div
									class="group relative flex flex-col items-center rounded-2xl border p-3 text-center transition-all {currentPhotoId ===
									photo.id
										? 'border-amber-400 bg-amber-500/20 shadow-md shadow-amber-500/20'
										: 'border-amber-500/20 bg-black/40 hover:border-amber-400'}"
								>
									<img
										src={photo.dataUrl}
										alt={photo.name}
										class="h-24 w-20 rounded-lg border border-amber-400/60 object-cover"
									/>
									<h4 class="mt-2 w-full truncate font-serif text-xs font-bold text-amber-200">
										{photo.name}
									</h4>
									{#if photo.years}
										<span class="text-[9px] text-amber-400/80">{photo.years}</span>
									{/if}

									<div class="mt-2 flex w-full gap-1">
										<button
											type="button"
											class="flex-1 rounded-lg bg-amber-500 py-1 text-[10px] font-bold text-black hover:bg-amber-400"
											onclick={() => {
												onSelectPhoto(photo);
												onClose();
											}}
										>
											Colocar
										</button>
										<button
											type="button"
											class="rounded-lg bg-rose-950/60 px-2 py-1 text-[10px] text-rose-300 hover:bg-rose-900"
											onclick={() => handleDeletePhoto(photo.id)}
											title="Eliminar de biblioteca"
										>
											✕
										</button>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				{/if}
			</div>

			<!-- Pie con acciones -->
			<div
				class="flex items-center justify-between border-t border-amber-500/20 bg-black/40 px-6 py-4"
			>
				{#if currentPhotoId && onRemovePhoto}
					<button
						type="button"
						class="rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-900/60"
						onclick={() => {
							onRemovePhoto();
							onClose();
						}}
					>
						Retirar portaretratos del escalón
					</button>
				{:else}
					<span></span>
				{/if}

				<div class="flex gap-2">
					<button
						type="button"
						class="rounded-xl border border-amber-500/30 px-4 py-2 text-xs font-semibold text-amber-200 hover:bg-white/10"
						onclick={onClose}
					>
						Cancelar
					</button>
					{#if activeTab === 'subir'}
						<button
							type="button"
							disabled={isProcessing}
							class="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black transition-all hover:bg-amber-400 disabled:opacity-50"
							onclick={handleSaveNewPhoto}
						>
							{isProcessing ? 'Guardando...' : 'Guardar y Colocar'}
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
