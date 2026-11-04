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
	aria-label="Cruz de Cal y Ceniza"
>
	<!-- Sombra suave sobre suelo -->
	<ellipse cx="50" cy="52" rx="40" ry="25" fill="#000" opacity="0.2" />

	<!-- Trazo vertical de cal -->
	<path
		d="M44,12 C44,10 56,10 56,12 L56,88 C56,90 44,90 44,88 Z"
		fill="#F8FAFC"
		stroke="#E2E8F0"
		stroke-width="1.5"
		filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
	/>

	<!-- Trazo horizontal de cal -->
	<path
		d="M16,36 C14,36 14,48 16,48 L84,48 C86,48 86,36 84,36 Z"
		fill="#F8FAFC"
		stroke="#E2E8F0"
		stroke-width="1.5"
	/>

	<!-- Polvillo de cal y pétalos en la intersección -->
	<circle cx="50" cy="42" r="6" fill="#F59E0B" />
	<circle cx="50" cy="42" r="3" fill="#D97706" />
	<circle cx="40" cy="42" r="1.5" fill="#CBD5E1" />
	<circle cx="60" cy="42" r="1.5" fill="#CBD5E1" />
	<circle cx="50" cy="28" r="1.5" fill="#CBD5E1" />
	<circle cx="50" cy="60" r="1.5" fill="#CBD5E1" />
</svg>
