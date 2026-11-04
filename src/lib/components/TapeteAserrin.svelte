<script lang="ts">
	interface Props {
		pattern?: string;
		hasPetalsTrail?: boolean;
		class?: string;
	}

	let {
		pattern = 'cempasuchil-sol',
		hasPetalsTrail = true,
		class: className = ''
	}: Props = $props();
</script>

<div
	class="relative w-full overflow-hidden rounded-3xl border border-amber-500/20 bg-[#16061F] p-6 text-center shadow-2xl {className}"
>
	<!-- Título del tapete -->
	<div class="mb-4 flex items-center justify-center gap-2">
		<span class="h-px w-12 bg-gradient-to-r from-transparent to-amber-500"></span>
		<h4 class="font-serif text-xs font-bold tracking-widest text-amber-300 uppercase sm:text-sm">
			Tapete de Aserrín y Camino Sagrado
		</h4>
		<span class="h-px w-12 bg-gradient-to-l from-transparent to-amber-500"></span>
	</div>

	<!-- Ilustración SVG del Tapete de Aserrín -->
	<div class="relative mx-auto max-w-xl">
		<svg
			viewBox="0 0 600 240"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="w-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
			role="img"
			aria-label="Tapete de aserrín artesanal"
		>
			<defs>
				<!-- Granulado y colores de aserrín teñido -->
				<linearGradient id="tapete-base" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="#4A0E4E" />
					<stop offset="50%" stop-color="#2D0832" />
					<stop offset="100%" stop-color="#1A021E" />
				</linearGradient>
				<radialGradient id="sol-aserrin" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stop-color="#FFEB3B" />
					<stop offset="45%" stop-color="#FF9800" />
					<stop offset="85%" stop-color="#E65100" />
					<stop offset="100%" stop-color="#B71C1C" />
				</radialGradient>
				<linearGradient id="petalos-grad" x1="50%" y1="0%" x2="50%" y2="100%">
					<stop offset="0%" stop-color="#FFA000" stop-opacity="0.8" />
					<stop offset="50%" stop-color="#FF6F00" stop-opacity="0.95" />
					<stop offset="100%" stop-color="#E65100" stop-opacity="0.6" />
				</linearGradient>
			</defs>

			<!-- Marco exterior de aserrín morado y fucsia -->
			<rect
				x="20"
				y="20"
				width="560"
				height="200"
				rx="16"
				fill="url(#tapete-base)"
				stroke="#D81B60"
				stroke-width="3"
				stroke-dasharray="10 5"
			/>
			<rect x="32" y="32" width="536" height="176" rx="12" stroke="#FFB300" stroke-width="1.5" />

			{#if pattern === 'cempasuchil-sol' || true}
				<!-- Mandala / Sol Central de Cempasúchil -->
				<g transform="translate(300, 120)">
					<!-- Rayos del sol -->
					{#each [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330] as deg (deg)}
						<polygon points="0,-70 8,-45 -8,-45" fill="#FFC107" transform="rotate({deg})" />
					{/each}
					<!-- Círculos concéntricos de aserrín teñido -->
					<circle cx="0" cy="0" r="48" fill="url(#sol-aserrin)" />
					<circle cx="0" cy="0" r="32" fill="#E91E63" />
					<circle cx="0" cy="0" r="18" fill="#00E5FF" />
					<circle cx="0" cy="0" r="8" fill="#FFF" />
				</g>

				<!-- Flores en las esquinas -->
				{#each [[70, 60], [530, 60], [70, 180], [530, 180]] as [cx, cy], i (i)}
					<circle {cx} {cy} r="14" fill="#FF9800" stroke="#E65100" stroke-width="1.5" />
					<circle {cx} {cy} r="6" fill="#FFF176" />
				{/each}
			{/if}

			{#if hasPetalsTrail}
				<!-- Camino sagrado de pétalos esparcidos hacia el frente -->
				<path
					d="M260,20 C270,100 240,160 210,230 L390,230 C360,160 330,100 340,20 Z"
					fill="url(#petalos-grad)"
					opacity="0.75"
				/>
				<!-- Pétalos individuales dispersos sobre el sendero -->
				{#each [[270, 40], [330, 50], [295, 75], [315, 95], [260, 120], [340, 130], [285, 155], [325, 175], [240, 205], [365, 215]] as [px, py], idx (idx)}
					<ellipse
						cx={px}
						cy={py}
						rx="7"
						ry="4"
						fill="#FFE082"
						stroke="#E65100"
						stroke-width="0.5"
						transform="rotate({(idx * 37) % 360} {px} {py})"
					/>
				{/each}
			{/if}
		</svg>
	</div>
</div>
