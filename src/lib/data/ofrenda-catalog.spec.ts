import { describe, it, expect } from 'vitest';
import { OFRENDA_CATALOG, getOfrendaByType } from './ofrenda-catalog';
import type { OfrendaType } from '../types/altar';

describe('Catálogo de Ofrendas Tradicionales', () => {
	it('contiene todos los elementos canónicos del Altar de Muertos', () => {
		const expectedTypes: OfrendaType[] = [
			'cempasuchil',
			'pan_de_muerto',
			'calaverita_azucar',
			'calaverita_barro',
			'veladora',
			'papel_picado',
			'agua',
			'sal',
			'copal',
			'cruz_cal',
			'fruta',
			'foto'
		];

		const catalogTypes = OFRENDA_CATALOG.map((item) => item.type);
		for (const type of expectedTypes) {
			expect(catalogTypes).toContain(type);
		}
	});

	it('cada elemento contiene significado cultural y descripción en español', () => {
		for (const item of OFRENDA_CATALOG) {
			expect(item.name.length).toBeGreaterThan(0);
			expect(item.description.length).toBeGreaterThan(10);
			expect(item.meaning.length).toBeGreaterThan(15);
			expect(item.category).toBeDefined();
		}
	});

	it('getOfrendaByType devuelve la definición correcta para cada tipo', () => {
		const pan = getOfrendaByType('pan_de_muerto');
		expect(pan).toBeDefined();
		expect(pan?.name).toContain('Pan de Muerto');

		const cempasuchil = getOfrendaByType('cempasuchil');
		expect(cempasuchil?.category).toBe('flores_aromas');
	});
});
