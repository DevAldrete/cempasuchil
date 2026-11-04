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
	aria-label="Calaverita de Barro y Cerámica"
>
	<defs>
		<radialGradient id="barro-base" cx="40%" cy="35%" r="65%">
			<stop offset="0%" stop-color="#E07A5F" />
			<stop offset="60%" stop-color="#C85A32" />
			<stop offset="100%" stop-color="#8B381A" />
		</radialGradient>
	</defs>

	<!-- Sombra base -->
	<ellipse cx="50" cy="100" rx="34" ry="7" fill="#000" opacity="0.3" />

	<!-- Silueta de la calavera de cerámica -->
	<path
		d="M22,50 C22,25 32,12 50,12 C68,12 78,25 78,50 C78,60 72,66 70,72 C68,78 68,92 64,94 C60,96 40,96 36,94 C32,92 32,78 30,72 C28,66 22,60 22,50 Z"
		fill="url(#barro-base)"
		stroke="#5C2411"
		stroke-width="1.8"
	/>

	<!-- Diseños de Talavera / flor folclórica en la frente -->
	<g transform="translate(50, 26)">
		<circle cx="0" cy="0" r="4" fill="#F4F1DE" />
		<path d="M0,-8 L2,-3 L0,0 L-2,-3 Z" fill="#3D5A80" />
		<path d="M0,8 L2,3 L0,0 L-2,3 Z" fill="#3D5A80" />
		<path d="M-8,0 L-3,2 L0,0 L-3,-2 Z" fill="#3D5A80" />
		<path d="M8,0 L3,2 L0,0 L3,-2 Z" fill="#3D5A80" />
	</g>

	<!-- Ojos estilizados en cerámica esmaltada -->
	<g transform="translate(38, 50)">
		<circle cx="0" cy="0" r="9.5" fill="#293241" stroke="#F4F1DE" stroke-width="1.2" />
		<circle cx="0" cy="0" r="5" fill="#EE6C4D" />
		<circle cx="0" cy="0" r="2" fill="#F4F1DE" />
	</g>

	<g transform="translate(62, 50)">
		<circle cx="0" cy="0" r="9.5" fill="#293241" stroke="#F4F1DE" stroke-width="1.2" />
		<circle cx="0" cy="0" r="5" fill="#EE6C4D" />
		<circle cx="0" cy="0" r="2" fill="#F4F1DE" />
	</g>

	<!-- Nariz -->
	<path d="M50,60 L54,67 L46,67 Z" fill="#293241" />

	<!-- Dientes tradicionales -->
	<g transform="translate(50, 81)">
		<line x1="-15" y1="0" x2="15" y2="0" stroke="#F4F1DE" stroke-width="2.5" />
		<line x1="-12" y1="-5" x2="-12" y2="5" stroke="#F4F1DE" stroke-width="2" />
		<line x1="-6" y1="-5" x2="-6" y2="5" stroke="#F4F1DE" stroke-width="2" />
		<line x1="0" y1="-6" x2="0" y2="6" stroke="#F4F1DE" stroke-width="2" />
		<line x1="6" y1="-5" x2="6" y2="5" stroke="#F4F1DE" stroke-width="2" />
		<line x1="12" y1="-5" x2="12" y2="5" stroke="#F4F1DE" stroke-width="2" />
	</g>

	<!-- Motivos decorativos laterales de cerámica -->
	<path d="M26,38 C28,42 32,42 32,38" stroke="#F4F1DE" stroke-width="1.5" fill="none" />
	<path d="M74,38 C72,42 68,42 68,38" stroke="#F4F1DE" stroke-width="1.5" fill="none" />
</svg>
