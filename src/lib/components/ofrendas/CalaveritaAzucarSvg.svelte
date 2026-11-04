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
	viewBox="0 0 100 110"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class="inline-block transition-transform duration-300 hover:scale-110 {className}"
	role="img"
	aria-label="Calaverita de Azúcar"
>
	<defs>
		<radialGradient id="azucar-base" cx="40%" cy="35%" r="65%">
			<stop offset="0%" stop-color="#FFFFFF" />
			<stop offset="70%" stop-color="#F1F5F9" />
			<stop offset="100%" stop-color="#CBD5E1" />
		</radialGradient>
		<linearGradient id="foil-shine" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" stop-color="#00E5FF" />
			<stop offset="50%" stop-color="#E040FB" />
			<stop offset="100%" stop-color="#FFD700" />
		</linearGradient>
	</defs>

	<!-- Sombra base -->
	<ellipse cx="50" cy="100" rx="34" ry="7" fill="#000" opacity="0.3" />

	<!-- Silueta de la calavera -->
	<path
		d="M22,50 C22,25 32,12 50,12 C68,12 78,25 78,50 C78,60 72,66 70,72 C68,78 68,92 64,94 C60,96 40,96 36,94 C32,92 32,78 30,72 C28,66 22,60 22,50 Z"
		fill="url(#azucar-base)"
		stroke="#94A3B8"
		stroke-width="1.5"
	/>

	<!-- Papel estaño brillante en la frente (tradición mexicana) -->
	<rect
		x="34"
		y="16"
		width="32"
		height="10"
		rx="2"
		fill="url(#foil-shine)"
		stroke="#FFF"
		stroke-width="0.8"
	/>
	<text
		x="50"
		y="23.5"
		font-size="6"
		text-anchor="middle"
		fill="#FFF"
		font-weight="bold"
		font-family="sans-serif">RECUERDO</text
	>

	<!-- Ojos floreados (Azúcar betún morado y fucsia) -->
	<!-- Ojo izquierdo -->
	<g transform="translate(38, 48)">
		<circle cx="0" cy="0" r="10" fill="#E91E63" />
		<circle cx="0" cy="0" r="7.5" fill="#311B92" />
		<circle cx="0" cy="0" r="4" fill="#00E5FF" />
		<circle cx="0" cy="0" r="1.5" fill="#FFF" />
	</g>

	<!-- Ojo derecho -->
	<g transform="translate(62, 48)">
		<circle cx="0" cy="0" r="10" fill="#E91E63" />
		<circle cx="0" cy="0" r="7.5" fill="#311B92" />
		<circle cx="0" cy="0" r="4" fill="#00E5FF" />
		<circle cx="0" cy="0" r="1.5" fill="#FFF" />
	</g>

	<!-- Nariz de corazón invertido -->
	<path d="M50,58 C52,58 54,62 50,66 C46,62 48,58 50,58 Z" fill="#E91E63" />

	<!-- Dientes con betún de colores -->
	<g transform="translate(50, 80)">
		<rect
			x="-14"
			y="-2"
			width="6"
			height="10"
			rx="2"
			fill="#FFF"
			stroke="#64748B"
			stroke-width="0.8"
		/>
		<rect
			x="-7"
			y="-2"
			width="6"
			height="11"
			rx="2"
			fill="#FFF"
			stroke="#64748B"
			stroke-width="0.8"
		/>
		<rect
			x="1"
			y="-2"
			width="6"
			height="11"
			rx="2"
			fill="#FFF"
			stroke="#64748B"
			stroke-width="0.8"
		/>
		<rect
			x="8"
			y="-2"
			width="6"
			height="10"
			rx="2"
			fill="#FFF"
			stroke="#64748B"
			stroke-width="0.8"
		/>
		<!-- Sonrisa de betún -->
		<path
			d="M-18,-2 Q0,4 18,-2"
			stroke="#FF5722"
			stroke-width="2"
			fill="none"
			stroke-linecap="round"
		/>
	</g>

	<!-- Flores de betún en pómulos -->
	<circle cx="28" cy="62" r="3" fill="#FFEB3B" />
	<circle cx="72" cy="62" r="3" fill="#FFEB3B" />
</svg>
