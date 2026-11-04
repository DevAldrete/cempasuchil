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
	aria-label="Pan de Muerto"
>
	<defs>
		<radialGradient id="pan-crust" cx="45%" cy="40%" r="55%">
			<stop offset="0%" stop-color="#FFE0B2" />
			<stop offset="40%" stop-color="#FFA726" />
			<stop offset="85%" stop-color="#D87A16" />
			<stop offset="100%" stop-color="#934600" />
		</radialGradient>
		<radialGradient id="hueso-grad" cx="40%" cy="30%" r="60%">
			<stop offset="0%" stop-color="#FFF3E0" />
			<stop offset="60%" stop-color="#FFCC80" />
			<stop offset="100%" stop-color="#E67E22" />
		</radialGradient>
		<filter id="shadow-pan" x="-10%" y="-10%" width="120%" height="130%">
			<feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000" flood-opacity="0.4" />
		</filter>
	</defs>

	<!-- Sombra de la base -->
	<ellipse cx="50" cy="85" rx="42" ry="10" fill="#000" opacity="0.25" />

	<!-- Hogaza principal -->
	<ellipse
		cx="50"
		cy="56"
		rx="42"
		ry="32"
		fill="url(#pan-crust)"
		stroke="#8D4004"
		stroke-width="1.5"
		filter="url(#shadow-pan)"
	/>

	<!-- Azúcar espolvoreada (detalles sutiles) -->
	<g fill="#FFF" opacity="0.6">
		<circle cx="30" cy="48" r="1.2" />
		<circle cx="36" cy="62" r="1.5" />
		<circle cx="68" cy="50" r="1.3" />
		<circle cx="62" cy="65" r="1.4" />
		<circle cx="45" cy="72" r="1.2" />
		<circle cx="56" cy="40" r="1.5" />
	</g>

	<!-- Huesos (Canillas) diagonal 1 -->
	<g transform="translate(50, 52) rotate(45)">
		<!-- Huesito central con nudos -->
		<ellipse
			cx="-24"
			cy="0"
			rx="6"
			ry="7"
			fill="url(#hueso-grad)"
			stroke="#B75B09"
			stroke-width="0.8"
		/>
		<ellipse
			cx="24"
			cy="0"
			rx="6"
			ry="7"
			fill="url(#hueso-grad)"
			stroke="#B75B09"
			stroke-width="0.8"
		/>
		<ellipse
			cx="0"
			cy="0"
			rx="30"
			ry="4.5"
			fill="url(#hueso-grad)"
			stroke="#B75B09"
			stroke-width="0.8"
		/>
	</g>

	<!-- Huesos (Canillas) diagonal 2 -->
	<g transform="translate(50, 52) rotate(-45)">
		<ellipse
			cx="-24"
			cy="0"
			rx="6"
			ry="7"
			fill="url(#hueso-grad)"
			stroke="#B75B09"
			stroke-width="0.8"
		/>
		<ellipse
			cx="24"
			cy="0"
			rx="6"
			ry="7"
			fill="url(#hueso-grad)"
			stroke="#B75B09"
			stroke-width="0.8"
		/>
		<ellipse
			cx="0"
			cy="0"
			rx="30"
			ry="4.5"
			fill="url(#hueso-grad)"
			stroke="#B75B09"
			stroke-width="0.8"
		/>
	</g>

	<!-- Cráneo o lágrima central (la bolita de arriba) -->
	<circle cx="50" cy="46" r="9.5" fill="url(#hueso-grad)" stroke="#9C4D04" stroke-width="1" />
	<circle cx="47.5" cy="43.5" r="3" fill="#FFF" opacity="0.5" />
</svg>
