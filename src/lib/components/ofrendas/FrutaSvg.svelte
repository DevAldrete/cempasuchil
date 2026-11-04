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
	aria-label="Frutas de Temporada"
>
	<!-- Sombra base -->
	<ellipse cx="50" cy="88" rx="36" ry="8" fill="#000" opacity="0.3" />

	<!-- Canasta de mimbre / plato de barro -->
	<path d="M20,62 C20,84 80,84 80,62 L20,62 Z" fill="#B45309" stroke="#78350F" stroke-width="1.5" />
	<ellipse cx="50" cy="62" rx="30" ry="7" fill="#92400E" stroke="#78350F" stroke-width="1" />

	<!-- Cañas de azúcar (cilindros verdes/amarillos) -->
	<rect
		x="36"
		y="30"
		width="8"
		height="32"
		rx="2"
		transform="rotate(-15 40 46)"
		fill="#84CC16"
		stroke="#4D7C0F"
		stroke-width="0.8"
	/>
	<rect
		x="52"
		y="28"
		width="8"
		height="34"
		rx="2"
		transform="rotate(12 56 45)"
		fill="#65A30D"
		stroke="#3F6212"
		stroke-width="0.8"
	/>

	<!-- Mandarina grande -->
	<circle cx="42" cy="58" r="14" fill="#EA580C" stroke="#C2410C" stroke-width="1" />
	<circle cx="40" cy="46" r="2" fill="#15803D" />
	<!-- hojita verde -->
	<path d="M40,46 C42,42 46,43 45,46 Z" fill="#16A34A" />

	<!-- Tejocote amarillo -->
	<circle cx="62" cy="60" r="11" fill="#EAB308" stroke="#CA8A04" stroke-width="1" />
	<circle cx="62" cy="51" r="1.5" fill="#713F12" />

	<!-- Guayaba / fruta frontal -->
	<circle cx="52" cy="66" r="10" fill="#FACC15" stroke="#A16207" stroke-width="0.8" />
</svg>
