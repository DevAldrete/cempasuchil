<script lang="ts">
	interface Props {
		size?: number;
		class?: string;
		isLit?: boolean;
	}

	let { size = 64, class: className = '', isLit = true }: Props = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 100 120"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class="inline-block transition-transform duration-300 hover:scale-110 {className}"
	role="img"
	aria-label="Veladora encendida"
>
	<defs>
		<radialGradient id="vela-glow" cx="50%" cy="40%" r="50%">
			<stop offset="0%" stop-color="#FFEB3B" stop-opacity="0.8" />
			<stop offset="40%" stop-color="#FF9800" stop-opacity="0.4" />
			<stop offset="100%" stop-color="#FF5722" stop-opacity="0" />
		</radialGradient>
		<linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="0%">
			<stop offset="0%" stop-color="#ECEFF1" stop-opacity="0.7" />
			<stop offset="25%" stop-color="#FFFFFF" stop-opacity="0.9" />
			<stop offset="75%" stop-color="#FFE082" stop-opacity="0.6" />
			<stop offset="100%" stop-color="#CFD8DC" stop-opacity="0.8" />
		</linearGradient>
		<linearGradient id="wax-grad" x1="0%" y1="0%" x2="100%" y2="0%">
			<stop offset="0%" stop-color="#FFF8E1" />
			<stop offset="50%" stop-color="#FFE082" />
			<stop offset="100%" stop-color="#FFD54F" />
		</linearGradient>
	</defs>

	<!-- Resplandor exterior animado -->
	{#if isLit}
		<circle cx="50" cy="30" r="32" fill="url(#vela-glow)" class="animate-pulse" />
	{/if}

	<!-- Sombra base -->
	<ellipse cx="50" cy="112" rx="28" ry="6" fill="#000" opacity="0.35" />

	<!-- Vaso de cristal exterior -->
	<path
		d="M26,52 L28,108 C28,112 72,112 72,108 L74,52 Z"
		fill="url(#glass-grad)"
		stroke="#B0BEC5"
		stroke-width="1.2"
	/>

	<!-- Cera interna -->
	<path d="M28,62 L30,106 C30,110 70,110 70,106 L72,62 Z" fill="url(#wax-grad)" />
	<ellipse cx="50" cy="62" rx="21" ry="5" fill="#FFE082" stroke="#FFCA28" stroke-width="0.8" />

	<!-- Pábilo (mecha) -->
	<line x1="50" y1="62" x2="50" y2="48" stroke="#3E2723" stroke-width="2" stroke-linecap="round" />

	<!-- Llama parpadeante -->
	{#if isLit}
		<g class="origin-bottom transform transition-all duration-300">
			<!-- Llama exterior anaranjada -->
			<path d="M50,20 C42,32 44,46 50,49 C56,46 58,32 50,20 Z" fill="#FF5722" opacity="0.9">
				<animate
					attributeName="d"
					values="
						M50,18 C42,30 43,46 50,49 C57,46 58,30 50,18 Z;
						M50,22 C41,33 45,46 50,49 C55,46 59,33 50,22 Z;
						M49,19 C43,31 43,46 50,49 C57,46 57,31 49,19 Z;
						M50,18 C42,30 43,46 50,49 C57,46 58,30 50,18 Z
					"
					dur="1.8s"
					repeatCount="indefinite"
				/>
			</path>
			<!-- Llama interior amarilla resplandeciente -->
			<path d="M50,28 C45,36 46,46 50,48 C54,46 55,36 50,28 Z" fill="#FFF176">
				<animate
					attributeName="d"
					values="
						M50,26 C45,35 46,46 50,48 C54,46 55,35 50,26 Z;
						M50,30 C44,37 47,46 50,48 C53,46 56,37 50,30 Z;
						M50,26 C45,35 46,46 50,48 C54,46 55,35 50,26 Z
					"
					dur="1.2s"
					repeatCount="indefinite"
				/>
			</path>
			<!-- Núcleo blanco brillante -->
			<circle cx="50" cy="45" r="2.5" fill="#FFFFFF" />
		</g>
	{/if}

	<!-- Destellos de luz en el vaso -->
	<path d="M32,60 L34,105" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.7" />
	<path d="M68,60 L66,105" stroke="#FFE082" stroke-width="1" stroke-linecap="round" opacity="0.5" />
</svg>
