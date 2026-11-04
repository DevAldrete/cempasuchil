<script lang="ts">
	import type { OfrendaType } from '../../types/altar';
	import CempasuchilSvg from './CempasuchilSvg.svelte';
	import PanDeMuertoSvg from './PanDeMuertoSvg.svelte';
	import CalaveritaAzucarSvg from './CalaveritaAzucarSvg.svelte';
	import CalaveritaBarroSvg from './CalaveritaBarroSvg.svelte';
	import VeladoraSvg from './VeladoraSvg.svelte';
	import PapelPicadoSvg from './PapelPicadoSvg.svelte';
	import VasoAguaSvg from './VasoAguaSvg.svelte';
	import PlatoSalSvg from './PlatoSalSvg.svelte';
	import CopalSvg from './CopalSvg.svelte';
	import CruzCalSvg from './CruzCalSvg.svelte';
	import FrutaSvg from './FrutaSvg.svelte';

	interface Props {
		type: OfrendaType;
		size?: number;
		class?: string;
		isLit?: boolean;
		color?: string;
	}

	let { type, size = 64, class: className = '', isLit = true, color = '#E91E63' }: Props = $props();
</script>

{#if type === 'cempasuchil'}
	<CempasuchilSvg {size} class={className} />
{:else if type === 'pan_de_muerto'}
	<PanDeMuertoSvg {size} class={className} />
{:else if type === 'calaverita_azucar'}
	<CalaveritaAzucarSvg {size} class={className} />
{:else if type === 'calaverita_barro'}
	<CalaveritaBarroSvg {size} class={className} />
{:else if type === 'veladora'}
	<VeladoraSvg {size} class={className} {isLit} />
{:else if type === 'papel_picado'}
	<PapelPicadoSvg {size} class={className} {color} />
{:else if type === 'agua'}
	<VasoAguaSvg {size} class={className} />
{:else if type === 'sal'}
	<PlatoSalSvg {size} class={className} />
{:else if type === 'copal'}
	<CopalSvg {size} class={className} />
{:else if type === 'cruz_cal'}
	<CruzCalSvg {size} class={className} />
{:else if type === 'fruta'}
	<FrutaSvg {size} class={className} />
{/if}
