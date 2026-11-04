<script lang="ts">
	import {
		CULTURAL_SECTIONS,
		ALTAR_LEVELS_EXPLANATION,
		CULTURAL_GALLERY,
		type LevelExplanation
	} from '../data/cultural-content';

	let selectedLevelCount = $state<2 | 3 | 7>(3);
	let activeTab = $state<'significado' | 'niveles' | 'galeria'>('significado');

	const currentLevelExplanation = $derived<LevelExplanation>(
		ALTAR_LEVELS_EXPLANATION.find((item) => item.count === selectedLevelCount) ||
			ALTAR_LEVELS_EXPLANATION[1]
	);
</script>

<section
	class="relative mx-auto my-8 max-w-6xl overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#1C0B2B] via-[#2A0845] to-[#120420] p-6 text-amber-50 shadow-2xl backdrop-blur-md sm:p-10"
>
	<!-- Adorno superior estilo papel picado -->
	<div class="mb-8 flex items-center justify-between border-b border-amber-500/20 pb-4">
		<div>
			<span
				class="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold tracking-wider text-amber-400 uppercase"
			>
				Patrimonio Inmaterial de México
			</span>
			<h2 class="mt-2 font-serif text-2xl font-bold tracking-tight text-amber-300 sm:text-4xl">
				El Día de Muertos y el Sagrado Altar
			</h2>
		</div>

		<!-- Selector de Pestañas -->
		<nav
			class="flex gap-2 rounded-2xl border border-amber-500/20 bg-black/40 p-1"
			aria-label="Secciones culturales"
		>
			<button
				type="button"
				class="rounded-xl px-3 py-1.5 text-xs font-medium transition-all sm:text-sm {activeTab ===
				'significado'
					? 'bg-amber-500 font-bold text-black shadow-lg'
					: 'text-amber-200 hover:text-white'}"
				onclick={() => (activeTab = 'significado')}
			>
				Significado
			</button>
			<button
				type="button"
				class="rounded-xl px-3 py-1.5 text-xs font-medium transition-all sm:text-sm {activeTab ===
				'niveles'
					? 'bg-amber-500 font-bold text-black shadow-lg'
					: 'text-amber-200 hover:text-white'}"
				onclick={() => (activeTab = 'niveles')}
			>
				Los Niveles
			</button>
			<button
				type="button"
				class="rounded-xl px-3 py-1.5 text-xs font-medium transition-all sm:text-sm {activeTab ===
				'galeria'
					? 'bg-amber-500 font-bold text-black shadow-lg'
					: 'text-amber-200 hover:text-white'}"
				onclick={() => (activeTab = 'galeria')}
			>
				Tradición Viva
			</button>
		</nav>
	</div>

	{#if activeTab === 'significado'}
		<div class="grid gap-8 lg:grid-cols-2">
			{#each CULTURAL_SECTIONS as section (section.id)}
				<article
					class="flex flex-col justify-between rounded-2xl border border-amber-500/10 bg-black/30 p-6 shadow-inner backdrop-blur-sm transition-all hover:border-amber-500/30"
				>
					<div>
						<h3 class="font-serif text-xl font-bold text-amber-300">{section.title}</h3>
						<p class="mt-1 text-sm font-medium text-pink-400">{section.subtitle}</p>
						<div class="mt-4 space-y-3 text-sm leading-relaxed text-amber-100/90 sm:text-base">
							{#each section.paragraphs as paragraph, i (i)}
								<p>{paragraph}</p>
							{/each}
						</div>
					</div>

					{#if section.quote}
						<blockquote
							class="mt-6 border-l-2 border-amber-400 pl-4 text-xs text-amber-200/80 italic sm:text-sm"
						>
							<p>"{section.quote.text}"</p>
							<cite class="mt-1 block text-right font-semibold text-amber-400 not-italic">
								— {section.quote.author}
							</cite>
						</blockquote>
					{/if}
				</article>
			{/each}
		</div>
	{:else if activeTab === 'niveles'}
		<div>
			<div class="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h3 class="font-serif text-xl font-bold text-amber-300">
						{currentLevelExplanation.title}
					</h3>
					<p class="mt-1 max-w-2xl text-sm text-amber-200/80">
						{currentLevelExplanation.description}
					</p>
				</div>

				<!-- Botones para alternar niveles -->
				<div class="flex gap-2">
					{#each [2, 3, 7] as const as levelOption (levelOption)}
						<button
							type="button"
							class="flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold transition-all {selectedLevelCount ===
							levelOption
								? 'border-amber-400 bg-amber-500 text-black shadow-md shadow-amber-500/30'
								: 'border-amber-500/20 bg-black/40 text-amber-300 hover:border-amber-400'}"
							onclick={() => (selectedLevelCount = levelOption)}
						>
							{levelOption}
						</button>
					{/each}
				</div>
			</div>

			<!-- Escalones ilustrados -->
			<div class="mt-8 space-y-3">
				{#each currentLevelExplanation.levels as lvl (lvl.number)}
					<div
						class="flex flex-col items-start gap-4 rounded-xl border border-amber-500/20 bg-black/40 p-4 transition-all hover:bg-black/60 sm:flex-row sm:items-center"
					>
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 font-bold text-black"
						>
							{lvl.number}
						</div>
						<div>
							<h4 class="font-bold text-amber-300">{lvl.name}</h4>
							<p class="text-sm text-amber-100/80">{lvl.meaning}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else if activeTab === 'galeria'}
		<div>
			<p class="mb-6 text-sm text-amber-200/80">
				Fotografías y representaciones de la festividad: altares, ofrendas, catrinas y la alegría de
				recordar con música y amor.
			</p>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each CULTURAL_GALLERY as item (item.imageSrc)}
					<div
						class="group overflow-hidden rounded-2xl border border-amber-500/20 bg-black/40 shadow-lg transition-all hover:border-amber-400 hover:shadow-amber-500/10"
					>
						<div class="relative aspect-video w-full overflow-hidden bg-black/80">
							<img
								src={item.imageSrc}
								alt={item.title}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							<span
								class="absolute top-2 right-2 rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-amber-300 uppercase backdrop-blur-sm"
							>
								{item.tag}
							</span>
						</div>
						<div class="p-4">
							<h4 class="font-serif font-bold text-amber-300">{item.title}</h4>
							<p class="mt-1 line-clamp-2 text-xs text-amber-100/70">{item.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>
