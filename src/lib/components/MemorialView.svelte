<script lang="ts">
	import type { AltarRecord, PhotoRecord } from '../types/altar';
	import { getAllPhotos, saveAltar, savePhoto } from '../db/altar-db';
	import {
		exportAltarToJson,
		validateAndParseAltarBackup,
		exportElementToPng
	} from '../utils/export-altar';

	interface Props {
		altar: AltarRecord;
		onAltarImported: (newAltar: AltarRecord) => void;
	}

	let { altar, onAltarImported }: Props = $props();

	let photos = $state<PhotoRecord[]>([]);
	let isExportingPng = $state(false);
	let isPlayingSound = $state(false);
	let audioContext: AudioContext | null = null;
	let soundInterval: number | null = null;
	let feedbackMessage = $state<string | null>(null);

	$effect(() => {
		loadPhotos();
		return () => {
			stopChimes();
		};
	});

	async function loadPhotos() {
		try {
			photos = await getAllPhotos();
		} catch (e) {
			console.error('Error cargando fotos en modo conmemorativo:', e);
		}
	}

	// Campanas tibetanas / cuencos suaves generados con Web Audio API puro
	function toggleChimes() {
		if (isPlayingSound) {
			stopChimes();
		} else {
			startChimes();
		}
	}

	function startChimes() {
		try {
			const AudioCtx =
				window.AudioContext ||
				(window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
			audioContext = new AudioCtx();
			isPlayingSound = true;
			playSingingBowlTone();
			soundInterval = window.setInterval(playSingingBowlTone, 6000);
		} catch (e) {
			console.error('No se pudo iniciar el audio:', e);
		}
	}

	function playSingingBowlTone() {
		if (!audioContext || audioContext.state === 'closed') return;
		const now = audioContext.currentTime;

		const osc = audioContext.createOscillator();
		const gain = audioContext.createGain();

		// Frecuencias armónicas cálidas (campana en Fa sostenido ~370Hz / 440Hz)
		const freqs = [369.99, 440, 554.37, 739.99];
		const chosenFreq = freqs[Math.floor(Math.random() * freqs.length)];

		osc.type = 'sine';
		osc.frequency.setValueAtTime(chosenFreq, now);

		gain.gain.setValueAtTime(0, now);
		gain.gain.linearRampToValueAtTime(0.08, now + 0.3);
		gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

		osc.connect(gain);
		gain.connect(audioContext.destination);

		osc.start(now);
		osc.stop(now + 5);
	}

	function stopChimes() {
		isPlayingSound = false;
		if (soundInterval) {
			clearInterval(soundInterval);
			soundInterval = null;
		}
		if (audioContext && audioContext.state !== 'closed') {
			audioContext.close();
			audioContext = null;
		}
	}

	async function handleExportPng() {
		const targetElement = document.getElementById('altar-canvas-container');
		if (!targetElement) {
			feedbackMessage = 'No se encontró el contenedor del altar para exportar.';
			return;
		}

		isExportingPng = true;
		feedbackMessage = null;
		try {
			await exportElementToPng(targetElement, `${altar.title || 'altar-de-muertos'}.png`);
			feedbackMessage = '¡Altar exportado con éxito a imagen PNG!';
		} catch (e) {
			console.error('Error al exportar PNG:', e);
			feedbackMessage = 'No se pudo generar la imagen PNG en este navegador.';
		} finally {
			isExportingPng = false;
		}
	}

	function handleExportJson() {
		exportAltarToJson(altar, photos);
		feedbackMessage = 'Respaldo JSON descargado correctamente.';
	}

	async function handleImportJson(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		feedbackMessage = null;
		try {
			const text = await file.text();
			const bundle = validateAndParseAltarBackup(text);

			await saveAltar(bundle.altar);
			for (const p of bundle.photos) {
				await savePhoto(p);
			}

			onAltarImported(bundle.altar);
			photos = bundle.photos;
			feedbackMessage = '¡Altar y fotografías restaurados exitosamente!';
		} catch (err: unknown) {
			feedbackMessage = err instanceof Error ? err.message : 'Error al importar el archivo JSON';
		}
	}
</script>

<div
	class="relative mx-auto my-6 max-w-6xl rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#1C0829] via-[#100318] to-[#08010C] p-6 text-amber-50 shadow-2xl sm:p-10"
>
	<!-- Encabezado Conmemorativo -->
	<div class="text-center">
		<span
			class="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold tracking-wider text-amber-400 uppercase"
		>
			Modo Conmemorativo y Preservación
		</span>
		<h2 class="mt-3 font-serif text-3xl font-extrabold text-amber-300 drop-shadow sm:text-4xl">
			{altar.title || 'Altar de Muertos'}
		</h2>
		<p class="mt-2 text-sm text-pink-300 italic sm:text-base">
			"{altar.dedicationTo || 'En honor a quienes viven por siempre en nuestro recuerdo'}"
		</p>
	</div>

	<!-- Barra de Acciones: Descarga de Imagen, Respaldo JSON y Música -->
	<div
		class="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border-y border-amber-500/20 bg-black/30 px-4 py-4"
	>
		<!-- Descarga en PNG -->
		<button
			type="button"
			disabled={isExportingPng}
			class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2.5 text-xs font-bold text-black shadow-lg shadow-amber-500/20 transition-all hover:brightness-110 disabled:opacity-50"
			onclick={handleExportPng}
		>
			<span>📸</span>
			<span>{isExportingPng ? 'Generando Imagen PNG...' : 'Descargar Altar (PNG)'}</span>
		</button>

		<!-- Respaldo JSON -->
		<button
			type="button"
			class="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-black/40 px-4 py-2.5 text-xs font-semibold text-amber-200 transition-all hover:bg-white/10 hover:text-white"
			onclick={handleExportJson}
		>
			<span>💾</span>
			<span>Descargar Respaldo (JSON)</span>
		</button>

		<!-- Restaurar JSON -->
		<label
			class="flex cursor-pointer items-center gap-2 rounded-xl border border-amber-500/40 bg-black/40 px-4 py-2.5 text-xs font-semibold text-amber-200 transition-all hover:bg-white/10 hover:text-white"
		>
			<span>📂</span>
			<span>Importar Respaldo</span>
			<input
				type="file"
				accept=".json,application/json"
				class="hidden"
				onchange={handleImportJson}
			/>
		</label>

		<!-- Ambiente Sonoro Cuencos / Campana sagrada -->
		<button
			type="button"
			class="flex items-center gap-2 rounded-xl border border-amber-500/40 px-4 py-2.5 text-xs font-semibold transition-all {isPlayingSound
				? 'bg-amber-500 font-bold text-black'
				: 'bg-black/40 text-amber-200 hover:text-white'}"
			onclick={toggleChimes}
		>
			<span>{isPlayingSound ? '🔔 Cuencos Activados' : '🔕 Sonido Meditativo'}</span>
		</button>
	</div>

	{#if feedbackMessage}
		<div
			class="mx-auto mt-4 max-w-lg rounded-xl border border-amber-500/30 bg-black/60 p-2.5 text-center text-xs text-amber-200"
		>
			✨ {feedbackMessage}
		</div>
	{/if}

	<!-- Muro de Honor: Difuntos recordados en el altar -->
	<div class="mt-10">
		<h3 class="text-center font-serif text-xl font-bold text-amber-200">
			🌼 Cuadro de Honor y Memoria
		</h3>
		<p class="mt-1 text-center text-xs text-amber-100/60">
			Las almas a quienes dedicamos nuestra luz y gratitud.
		</p>

		{#if photos.length === 0}
			<div
				class="mt-6 rounded-2xl border border-dashed border-amber-500/20 p-8 text-center text-xs text-amber-200/60"
			>
				Aún no has agregado fotografías de tus seres queridos al altar. Puedes agregarlas desde la
				pestaña "Mi Altar".
			</div>
		{:else}
			<div class="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
				{#each photos as p (p.id)}
					<div
						class="flex items-center gap-4 rounded-2xl border border-amber-500/20 bg-black/40 p-4 transition-all hover:border-amber-400"
					>
						<img
							src={p.dataUrl}
							alt={p.name}
							class="h-16 w-14 rounded-xl border border-amber-400/60 object-cover shadow-md"
						/>
						<div class="min-w-0 flex-1">
							<h4 class="truncate font-serif font-bold text-amber-300">{p.name}</h4>
							{#if p.relation}
								<p class="text-xs text-pink-300">{p.relation}</p>
							{/if}
							{#if p.years}
								<p class="font-mono text-[10px] text-amber-400/80">{p.years}</p>
							{/if}
							{#if p.dedication}
								<p class="mt-1 truncate text-[11px] text-amber-100/80 italic">"{p.dedication}"</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
