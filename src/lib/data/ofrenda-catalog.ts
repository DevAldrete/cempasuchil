import type { OfrendaDefinition, OfrendaType } from '../types/altar';

export interface CatalogItem extends OfrendaDefinition {
	category: 'esenciales' | 'alimentos' | 'simbolos' | 'flores_aromas';
	colorScheme: string;
}

export const OFRENDA_CATALOG: CatalogItem[] = [
	{
		type: 'cempasuchil',
		name: 'Flor de Cempasúchil',
		description: 'Flor ceremonial de veinte pétalos de intenso color anaranjado y perfume sagrado.',
		meaning: 'Su color resplandeciente como el sol y su aroma guían a las ánimas hacia la ofrenda.',
		category: 'flores_aromas',
		colorScheme: 'from-amber-400 to-orange-500'
	},
	{
		type: 'pan_de_muerto',
		name: 'Pan de Muerto Tradicional',
		description: 'Pan esponjoso aromatizado con azahar, espolvoreado con azúcar y huesos cruzados.',
		meaning:
			'La esfera superior representa el cráneo y las tiras laterales simbolizan los cuatro rumbos del universo y los huesos.',
		category: 'alimentos',
		colorScheme: 'from-amber-200 to-amber-600'
	},
	{
		type: 'calaverita_azucar',
		name: 'Calaverita de Azúcar',
		description:
			'Calavera artesanal decorada con betún de colores brillantes y papel estaño en la frente.',
		meaning:
			'Recuerda que la muerte puede ser dulce y que es parte natural e inevitable del ciclo vital.',
		category: 'simbolos',
		colorScheme: 'from-pink-300 to-purple-500'
	},
	{
		type: 'calaverita_barro',
		name: 'Calaverita de Barro / Cerámica',
		description:
			'Pieza de alfarería mexicana pintada a mano con flores folclóricas y motivos alegres.',
		meaning:
			'Homenaje a la tradición artesanal de los pueblos originarios y la eternidad de los recuerdos.',
		category: 'simbolos',
		colorScheme: 'from-cyan-400 to-indigo-600'
	},
	{
		type: 'veladora',
		name: 'Veladora de Vaso',
		description: 'Vela tradicional en vaso de vidrio que emite una llama cálida y oscilante.',
		meaning:
			'La flama representa la luz, la fe y la esperanza que alumbra el tránsito de las almas en la noche.',
		category: 'esenciales',
		colorScheme: 'from-yellow-200 to-amber-500'
	},
	{
		type: 'papel_picado',
		name: 'Papel Picado Mexicano',
		description: 'Banderines de papel calado con figuras de catrinas y flores festivas.',
		meaning:
			'Representa el elemento viento; su movimiento anuncia la llegada sutil de los difuntos a la casa.',
		category: 'simbolos',
		colorScheme: 'from-pink-500 to-rose-600'
	},
	{
		type: 'agua',
		name: 'Vaso con Agua Pura',
		description: 'Vaso de cristal con agua cristalina y fresca.',
		meaning:
			'Calma la sed del ánima tras su largo peregrinaje desde el más allá y fortalece su regreso.',
		category: 'esenciales',
		colorScheme: 'from-sky-300 to-blue-500'
	},
	{
		type: 'sal',
		name: 'Plato con Sal',
		description: 'Montículo de sal pura de mar colocado en pequeño recipiente ceremonial.',
		meaning:
			'Elemento purificador que evita que el cuerpo del difunto se corrompa durante su tránsito terrenal.',
		category: 'esenciales',
		colorScheme: 'from-slate-100 to-slate-300'
	},
	{
		type: 'copal',
		name: 'Sahumador con Copal e Incienso',
		description:
			'Copalera de barro con carbón vegetal y resina aromática que despide un humo sagrado.',
		meaning:
			'Limpia el lugar de malas energías y eleva las oraciones y el respeto de los vivos hacia el cielo.',
		category: 'flores_aromas',
		colorScheme: 'from-stone-400 to-amber-700'
	},
	{
		type: 'cruz_cal',
		name: 'Cruz de Cal y Ceniza',
		description: 'Cruz tendida sobre el suelo o peldaño inferior.',
		meaning:
			'Orienta hacia los cuatro puntos cardinales y ayuda al difunto a expiar sus culpas pendientes.',
		category: 'simbolos',
		colorScheme: 'from-stone-200 to-stone-400'
	},
	{
		type: 'fruta',
		name: 'Canasta de Frutas de Temporada',
		description: 'Mandarinas, tejocotes, cañas de azúcar y guayabas aromáticas.',
		meaning:
			'El banquete terrenal y el dulce aroma que deleita el olfato espiritual de los visitantes.',
		category: 'alimentos',
		colorScheme: 'from-orange-400 to-red-500'
	},
	{
		type: 'foto',
		name: 'Portaretratos con Fotografía',
		description: 'Marco adornado que resguarda el rostro querido de nuestro ser recordado.',
		meaning:
			'El corazón de la ofrenda: convoca directamente al ser querido cuya memoria honramos con amor.',
		category: 'esenciales',
		colorScheme: 'from-amber-400 to-yellow-600'
	}
];

export function getOfrendaByType(type: OfrendaType): CatalogItem | undefined {
	return OFRENDA_CATALOG.find((item) => item.type === type);
}
