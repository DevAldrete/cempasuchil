import { describe, it, expect } from 'vitest';
import { CULTURAL_SECTIONS, ALTAR_LEVELS_EXPLANATION, CULTURAL_GALLERY } from './cultural-content';

describe('Cultural Content & Altar Guide', () => {
	it('contiene las secciones principales de significado y conexión', () => {
		expect(CULTURAL_SECTIONS.length).toBeGreaterThanOrEqual(2);
		const ids = CULTURAL_SECTIONS.map((s) => s.id);
		expect(ids).toContain('significado');
		expect(ids).toContain('conexion');
	});

	it('incluye explicaciones para los tres formatos de altar: 2, 3 y 7 niveles', () => {
		const levelCounts = ALTAR_LEVELS_EXPLANATION.map((l) => l.count);
		expect(levelCounts).toEqual([2, 3, 7]);

		const level7 = ALTAR_LEVELS_EXPLANATION.find((l) => l.count === 7);
		expect(level7?.levels.length).toBe(7);
	});

	it('contiene elementos de galería con fuentes de imagen válidas en /assets/', () => {
		expect(CULTURAL_GALLERY.length).toBe(6);
		for (const item of CULTURAL_GALLERY) {
			expect(item.imageSrc.startsWith('/assets/')).toBe(true);
			expect(item.title.length).toBeGreaterThan(0);
		}
	});
});
