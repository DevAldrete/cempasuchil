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
	aria-label="Copal e Incienso"
>
	<defs>
		<radialGradient id="copal-clay" cx="40%" cy="30%" r="70%">
			<stop offset="0%" stop-color="#FB923C" />
			<stop offset="60%" stop-color="#C2410C" />
			<stop offset="100%" stop-color="#7C2D12" />
		</radialGradient>
		<radialGradient id="ember-glow" cx="50%" cy="50%" r="50%">
			<stop offset="0%" stop-color="#FF5722" />
			<stop offset="60%" stop-color="#E65100" />
			<stop offset="100%" stop-color="#3E2723" />
		</radialGradient>
	</defs>

	<!-- Humo místico de copal ascendiendo -->
	<g opacity="0.6">
		<path
			d="M48,46 C42,34 56,26 46,12"
			stroke="#E2E8F0"
			stroke-width="2.5"
			stroke-linecap="round"
			fill="none"
		>
			<animate
				attributeName="d"
				values="
					M48,46 C42,34 56,26 46,12;
					M49,46 C54,34 40,26 49,12;
					M48,46 C42,34 56,26 46,12
				"
				dur="3s"
				repeatCount="indefinite"
			/>
		</path>
		<path
			d="M54,46 C58,36 48,28 56,16"
			stroke="#CBD5E1"
			stroke-width="2"
			stroke-linecap="round"
			fill="none"
		>
			<animate
				attributeName="d"
				values="
					M54,46 C58,36 48,28 56,16;
					M53,46 C46,36 56,28 51,16;
					M54,46 C58,36 48,28 56,16
				"
				dur="2.5s"
				repeatCount="indefinite"
			/>
		</path>
	</g>

	<!-- Sombra base -->
	<ellipse cx="50" cy="102" rx="28" ry="6" fill="#000" opacity="0.3" />

	<!-- Base y pie de la copalera de barro -->
	<path
		d="M38,98 L44,78 L56,78 L62,98 Z"
		fill="url(#copal-clay)"
		stroke="#7C2D12"
		stroke-width="1.2"
	/>
	<ellipse cx="50" cy="98" rx="14" ry="4" fill="#9A3412" />

	<!-- Copa superior del sahumador -->
	<path
		d="M24,56 C24,76 76,76 76,56 L24,56 Z"
		fill="url(#copal-clay)"
		stroke="#7C2D12"
		stroke-width="1.5"
	/>

	<!-- Boca de la copalera con brasas ardientes -->
	<ellipse
		cx="50"
		cy="56"
		rx="26"
		ry="7"
		fill="url(#ember-glow)"
		stroke="#B91C1C"
		stroke-width="1"
	/>

	<!-- Granos de resina de copal -->
	<circle cx="46" cy="55" r="3" fill="#FEF08A" />
	<circle cx="54" cy="54" r="2.5" fill="#FDE047" />
	<circle cx="50" cy="57" r="2" fill="#EAB308" />
</svg>
