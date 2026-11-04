<script lang="ts">
	import type { PhotoRecord } from '../types/altar';

	interface Props {
		photo?: PhotoRecord;
		size?: 'sm' | 'md' | 'lg';
		class?: string;
		onclick?: () => void;
	}

	let { photo, size = 'md', class: className = '', onclick }: Props = $props();

	const sizeClasses = $derived.by(() => {
		switch (size) {
			case 'sm':
				return 'w-20 h-24 text-[9px]';
			case 'lg':
				return 'w-36 h-48 text-xs';
			case 'md':
			default:
				return 'w-28 h-36 text-[10px]';
		}
	});
</script>

<button
	type="button"
	class="group relative flex flex-col items-center justify-between rounded-xl border-2 border-amber-400/80 bg-gradient-to-b from-[#451A03] via-[#78350F] to-[#290F02] p-1.5 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-amber-300 {sizeClasses} {className}"
	{onclick}
	aria-label={photo ? `Portaretrato de ${photo.name}` : 'Portaretrato vacío'}
>
	<!-- Marco labrado con esquinas doradas estilo barroco mexicano -->
	<div class="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-amber-300"></div>
	<div class="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-amber-300"></div>
	<div class="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-amber-300"></div>
	<div class="absolute -right-1 -bottom-1 h-3 w-3 border-r-2 border-b-2 border-amber-300"></div>

	<!-- Área de la fotografía con cristal / paspartú -->
	<div
		class="relative flex h-[72%] w-full items-center justify-center overflow-hidden rounded-lg border border-amber-900/60 bg-black/60 shadow-inner"
	>
		{#if photo && photo.dataUrl}
			<img
				src={photo.dataUrl}
				alt={photo.name}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<!-- Reflejo suave en el cristal -->
			<div
				class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
			></div>
		{:else}
			<div class="flex flex-col items-center justify-center p-1 text-center text-amber-300/70">
				<span class="text-xl">🖼️</span>
				<span class="mt-0.5 font-sans text-[8px] tracking-wider uppercase">Subir Foto</span>
			</div>
		{/if}
	</div>

	<!-- Placa dorada inferior con el Nombre y Dedicatoria -->
	<div class="mt-1 flex w-full flex-col items-center overflow-hidden text-center leading-tight">
		{#if photo && photo.name}
			<span class="w-full truncate font-serif font-bold text-amber-200">
				{photo.name}
			</span>
			{#if photo.years}
				<span class="font-mono text-[8px] text-amber-400/80">
					{photo.years}
				</span>
			{/if}
		{:else}
			<span class="font-serif text-amber-300/60 italic">Recuerdo</span>
		{/if}
	</div>

	<!-- Pequeña flor de cempasúchil en la esquina superior del marco -->
	<div class="absolute -top-2 -right-2 text-xs drop-shadow">🌼</div>
</button>
