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
	aria-label="Plato con Sal Purificadora"
>
	<defs>
		<radialGradient id="sal-mound" cx="50%" cy="40%" r="55%">
			<stop offset="0%" stop-color="#FFFFFF" />
			<stop offset="65%" stop-color="#F1F5F9" />
			<stop offset="100%" stop-color="#CBD5E1" />
		</radialGradient>
	</defs>

	<!-- Sombra base -->
	<ellipse cx="50" cy="85" rx="38" ry="8" fill="#000" opacity="0.3" />

	<!-- Plato de barro exterior -->
	<ellipse cx="50" cy="72" rx="38" ry="14" fill="#C2410C" stroke="#7C2D12" stroke-width="1.5" />
	<ellipse cx="50" cy="70" rx="34" ry="11" fill="#9A3412" />

	<!-- Montículo cónico de sal pura -->
	<path
		d="M26,68 Q50,34 74,68 C66,74 34,74 26,68 Z"
		fill="url(#sal-mound)"
		stroke="#94A3B8"
		stroke-width="0.8"
	/>

	<!-- Cristales de sal brillantes -->
	<circle cx="50" cy="48" r="1.5" fill="#FFFFFF" />
	<circle cx="44" cy="56" r="1.2" fill="#FFFFFF" />
	<circle cx="56" cy="58" r="1.4" fill="#FFFFFF" />
</svg>
