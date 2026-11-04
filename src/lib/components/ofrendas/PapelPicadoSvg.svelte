<script lang="ts">
	interface Props {
		size?: number;
		color?: string;
		class?: string;
	}

	let { size = 64, color = '#E91E63', class: className = '' }: Props = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 100 80"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class="inline-block transition-transform duration-300 hover:scale-105 {className}"
	role="img"
	aria-label="Papel Picado"
>
	<!-- Hilo superior -->
	<line x1="0" y1="6" x2="100" y2="6" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="3 3" />

	<!-- Pliego de papel picado con ondas festivas inferiores -->
	<path
		d="M10,8 L90,8 L90,65 Q85,72 80,65 Q75,72 70,65 Q65,72 60,65 Q55,72 50,65 Q45,72 40,65 Q35,72 30,65 Q25,72 20,65 Q15,72 10,65 Z"
		fill={color}
		filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.3))"
	/>

	<!-- Calados / Perforaciones geométricas tradicionales -->
	<g fill="#120420" opacity="0.85">
		<!-- Calavera o sol calado central -->
		<circle cx="50" cy="34" r="10" />
		<rect x="45" y="42" width="10" height="6" rx="2" />
		<!-- Agujeros de ojos que dejan ver el color del papel -->
		<circle cx="46" cy="33" r="2.5" fill={color} />
		<circle cx="54" cy="33" r="2.5" fill={color} />

		<!-- Calados decorativos triangulares y romboides -->
		<polygon points="20,18 24,24 20,30 16,24" />
		<polygon points="80,18 84,24 80,30 76,24" />

		<circle cx="26" cy="46" r="3" />
		<circle cx="74" cy="46" r="3" />

		<polygon points="36,16 40,20 36,24 32,20" />
		<polygon points="64,16 68,20 64,24 60,20" />

		<polygon points="50,56 53,60 50,64 47,60" />
	</g>
</svg>
