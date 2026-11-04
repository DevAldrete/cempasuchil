export interface CulturalSection {
	id: string;
	title: string;
	subtitle: string;
	paragraphs: string[];
	quote?: {
		text: string;
		author: string;
	};
}

export interface LevelExplanation {
	count: 2 | 3 | 7;
	title: string;
	description: string;
	levels: {
		number: number;
		name: string;
		meaning: string;
	}[];
}

export interface CulturalGalleryItem {
	imageSrc: string;
	title: string;
	description: string;
	tag: string;
}

export const CULTURAL_SECTIONS: CulturalSection[] = [
	{
		id: 'significado',
		title: 'El Retorno Cálido de la Memoria',
		subtitle: 'Una fiesta milenaria donde el amor trasciende la muerte',
		paragraphs: [
			'En México, el Día de Muertos no representa una ausencia dolorosa, sino el reencuentro más vivo y festivo del año. Declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO, esta tradición ancestral entrelaza las cosmovisiones indígenas mesoamericanas con el sincretismo virreinal.',
			'Para nosotros, la muerte no es un final absoluto, sino un paso hacia otra dimensión de la existencia. Durante los primeros días de noviembre, se abre un umbral espiritual donde las ánimas de quienes partieron regresan a sus hogares para convivir, saborear sus manjares favoritos y ser cobijadas por el amor inquebrantable de sus familias.'
		],
		quote: {
			text: 'Para los antiguos mexicanos, la oposición entre muerte y vida no era tan absoluta. La muerte no era el fin natural de la vida, sino fase de un ciclo infinito.',
			author: 'Octavio Paz'
		}
	},
	{
		id: 'conexion',
		title: 'Cómo nos Conectamos con Nuestros Ancestros',
		subtitle: 'Luz, aroma, sabor y devoción compartida',
		paragraphs: [
			'El altar es un puente tangible entre mundos. Cada elemento colocado en la ofrenda tiene un propósito sensorial y espiritual: el aroma del copal limpia las malas energías y eleva nuestras plegarias; el naranja radiante del cempasúchil ilumina el sendero para que las almas no pierdan el rumbo; y el agua calma la sed del alma tras su largo viaje desde el Mictlán.',
			'Colocar las fotos de nuestros abuelos, padres, amigos y mascotas no es un ejercicio de nostalgia pasiva; es un acto de afirmación viva: mientras los recordemos con alegría, nunca dejarán de existir entre nosotros.'
		]
	}
];

export const ALTAR_LEVELS_EXPLANATION: LevelExplanation[] = [
	{
		count: 2,
		title: 'Altar de 2 Niveles: Dualidad Cósmica',
		description:
			'La representación más sencilla e íntima de la existencia, enfocada en la comunión entre dos planos.',
		levels: [
			{
				number: 1,
				name: 'El Cielo (Plano Superior)',
				meaning: 'La bóveda celeste, la luz divina, la espiritualidad y los santos protectores.'
			},
			{
				number: 2,
				name: 'La Tierra (Plano Terrenal)',
				meaning:
					'El mundo físico de los vivos, donde se colocan los alimentos, el agua y las flores.'
			}
		]
	},
	{
		count: 3,
		title: 'Altar de 3 Niveles: Tríada Espiritual',
		description:
			'Uno de los formatos más populares en los hogares mexicanos, integrando el espacio de transición de las ánimas.',
		levels: [
			{
				number: 1,
				name: 'El Cielo',
				meaning: 'La morada eterna, la divinidad y la iluminación espiritual.'
			},
			{
				number: 2,
				name: 'La Tierra y el Purgatorio',
				meaning:
					'El espacio intermedio de purificación y tránsito para que las ánimas alcancen la paz.'
			},
			{
				number: 3,
				name: 'El Inframundo / Plano Físico',
				meaning:
					'El arraigo a la tierra nutricia, los manjares que disfrutaban en vida y el sendero de bienvenida.'
			}
		]
	},
	{
		count: 7,
		title: 'Altar de 7 Niveles: La Travesía Completa del Alma',
		description:
			'El altar ceremonial más tradicional y solemne. Simboliza los siete escalones que el alma recorre para alcanzar el descanso eterno y la expiación de los pecados.',
		levels: [
			{
				number: 1,
				name: 'Primer Escalón: Santo o Divinidad',
				meaning:
					'Imagen del santo patrón familiar o de la devoción del hogar para bendecir la ofrenda.'
			},
			{
				number: 2,
				name: 'Segundo Escalón: Las Ánimas del Purgatorio',
				meaning:
					'Dedicado al permiso de salida para que las almas puedan visitar el plano terrenal.'
			},
			{
				number: 3,
				name: 'Tercer Escalón: La Purificación (Sal)',
				meaning:
					'La sal para los niños y para evitar que el cuerpo de las almas se corrompa en el trayecto.'
			},
			{
				number: 4,
				name: 'Cuarto Escalón: La Eucaristía y el Pan de Muerto',
				meaning: 'La ofrenda del pan consagrado a la memoria, símbolo del ciclo de vida y muerte.'
			},
			{
				number: 5,
				name: 'Quinto Escalón: La Comida y Bebida Favorita',
				meaning:
					'Mole, tamales, frutas, dulces tradicionales y las bebidas predilectas de los difuntos.'
			},
			{
				number: 6,
				name: 'Sexto Escalón: Los Retratos de los Difuntos',
				meaning:
					'Las fotografías de nuestros seres amados que visitan la ofrenda esa noche sagrada.'
			},
			{
				number: 7,
				name: 'Séptimo Escalón: La Cruz y el Tapete',
				meaning:
					'La cruz de cal, ceniza o flores junto al tapete de aserrín para la expiación final.'
			}
		]
	}
];

export const CULTURAL_GALLERY: CulturalGalleryItem[] = [
	{
		imageSrc: '/assets/altar-muerto1.png',
		title: 'Altar Tradicional con Cempasúchil',
		description:
			'Cálida atmósfera iluminada por veladoras, papel picado y abundantes flores de cempasúchil.',
		tag: 'Altar Monumental'
	},
	{
		imageSrc: '/assets/altar-muerto2.png',
		title: 'Ofrenda Familiar e Íntima',
		description:
			'Estructura escalonada adornada con retratos queridos, pan de muerto, frutas y calaveritas.',
		tag: 'Tradición Hogareña'
	},
	{
		imageSrc: '/assets/altar-muerto3.png',
		title: 'Camino de Luz y Pétalos',
		description:
			'Sendero de cempasúchil que orienta a los difuntos directamente hacia su banquete de bienvenida.',
		tag: 'El Sendero Sagrado'
	},
	{
		imageSrc: '/assets/dia-de-muertos-evento1.png',
		title: 'Fiesta y Desfile Popular',
		description:
			'Celebración viva en las calles de México con flores, música y rostros de catrina que festejan la memoria.',
		tag: 'Comunidad y Fiesta'
	},
	{
		imageSrc: '/assets/mariachi1.png',
		title: 'Música para los Recuerdos',
		description:
			'El mariachi acompaña el retorno con canciones que tocan el alma y reviven las sonrisas de antaño.',
		tag: 'Música y Gozo'
	},
	{
		imageSrc: '/assets/woman-dressed1.png',
		title: 'La Elegancia de la Catrina',
		description:
			'Corona de cempasúchil y traje tradicional que rinden homenaje a la figura inmortalizada por Posada.',
		tag: 'Símbolo Vivo'
	}
];
