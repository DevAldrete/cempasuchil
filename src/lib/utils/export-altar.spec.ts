import { describe, it, expect } from 'vitest';
import { validateAndParseAltarBackup } from './export-altar';
import { createInitialAltar } from '../db/altar-db';

describe('Export Altar & Backup Utilities', () => {
	it('valida y procesa un respaldo JSON correctamente', () => {
		const initialAltar = createInitialAltar();
		const validBundle = {
			version: 1,
			exportedAt: Date.now(),
			altar: initialAltar,
			photos: [
				{
					id: 'foto-1',
					name: 'Don Pedro',
					dataUrl: 'data:image/png;base64,123',
					createdAt: Date.now()
				}
			]
		};

		const parsed = validateAndParseAltarBackup(JSON.stringify(validBundle));
		expect(parsed.altar.id).toBe(initialAltar.id);
		expect(parsed.photos.length).toBe(1);
		expect(parsed.photos[0].name).toBe('Don Pedro');
	});

	it('lanza un error si el JSON no tiene estructura válida de altar', () => {
		const invalidBundle = {
			version: 1,
			exportedAt: Date.now(),
			altar: { foo: 'bar' }
		};

		expect(() => validateAndParseAltarBackup(JSON.stringify(invalidBundle))).toThrow(
			'El archivo JSON no tiene una estructura válida'
		);
	});
});
