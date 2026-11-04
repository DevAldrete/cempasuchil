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
	aria-label="Vaso de Agua Pura"
>
	<defs>
		<linearGradient id="water-grad" x1="0%" y1="0%" x2="0%" y2="100%">
			<stop offset="0%" stop-color="#38BDF8" stop-opacity="0.8" />
			<stop offset="100%" stop-color="#0284C7" stop-opacity="0.9" />
		</linearGradient>
	</defs>

	<!-- Sombra base -->
	<ellipse cx="50" cy="88" rx="26" ry="6" fill="#000" opacity="0.3" />

	<!-- Vaso de cristal transparente -->
	<path
		d="M30,30 L34,84 C34,87 66,87 66,84 L70,30 Z"
		fill="#E0F2FE"
		fill-opacity="0.35"
		stroke="#BAE6FD"
		stroke-width="1.5"
	/>

	<!-- Nivel de agua -->
	<path d="M32,46 L34,83 C34,86 66,86 66,83 L68,46 Z" fill="url(#water-grad)" />
	<ellipse cx="50" cy="46" rx="18" ry="4" fill="#7DD3FC" stroke="#38BDF8" stroke-width="0.8" />

	<!-- Reflejos de cristal -->
	<line
		x1="36"
		y1="36"
		x2="38"
		y2="78"
		stroke="#FFFFFF"
		stroke-width="2"
		stroke-linecap="round"
		opacity="0.6"
	/>
</svg>
