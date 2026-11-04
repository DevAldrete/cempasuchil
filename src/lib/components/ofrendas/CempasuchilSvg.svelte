<script lang="ts">
	interface Props {
		size?: number;
		class?: string;
	}

	let { size = 64, class: className = '' }: Props = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 100 100"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class="inline-block transition-transform duration-300 hover:scale-110 {className}"
	role="img"
	aria-label="Flor de Cempasúchil"
>
	<defs>
		<radialGradient id="cempasuchil-glow" cx="50%" cy="50%" r="50%">
			<stop offset="0%" stop-color="#FFF176" />
			<stop offset="30%" stop-color="#FFB300" />
			<stop offset="70%" stop-color="#FF6F00" />
			<stop offset="100%" stop-color="#E65100" />
		</radialGradient>
		<radialGradient id="center-tuft" cx="50%" cy="50%" r="50%">
			<stop offset="0%" stop-color="#FFE082" />
			<stop offset="60%" stop-color="#FF8F00" />
			<stop offset="100%" stop-color="#BF360C" />
		</radialGradient>
	</defs>

	<!-- Pétalos exteriores (capa 1) -->
	<g transform="translate(50, 50)">
		{#each [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330] as angle (angle)}
			<path
				d="M-8,-42 C-4,-48 4,-48 8,-42 C12,-30 8,-15 0,-5 C-8,-15 -12,-30 -8,-42 Z"
				fill="url(#cempasuchil-glow)"
				transform="rotate({angle})"
				stroke="#BF360C"
				stroke-width="0.5"
			/>
		{/each}
	</g>

	<!-- Pétalos medios (capa 2) -->
	<g transform="translate(50, 50)">
		{#each [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345] as angle (angle)}
			<path
				d="M-7,-32 C-3,-37 3,-37 7,-32 C10,-22 6,-10 0,-4 C-6,-10 -10,-22 -7,-32 Z"
				fill="#FFA000"
				transform="rotate({angle})"
				stroke="#E65100"
				stroke-width="0.5"
			/>
		{/each}
	</g>

	<!-- Pétalos interiores (capa 3) -->
	<g transform="translate(50, 50)">
		{#each [0, 40, 80, 120, 160, 200, 240, 280, 320] as angle (angle)}
			<path
				d="M-5,-22 C-2,-26 2,-26 5,-22 C7,-15 4,-8 0,-2 C-4,-8 -7,-15 -5,-22 Z"
				fill="#FFB300"
				transform="rotate({angle})"
			/>
		{/each}
	</g>

	<!-- Botón central denso -->
	<circle cx="50" cy="50" r="14" fill="url(#center-tuft)" />
	<circle cx="48" cy="48" r="7" fill="#FFF59D" opacity="0.6" />
</svg>
