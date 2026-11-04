import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
	AltarDatabase,
	createInitialAltar,
	getOrCreateDefaultAltar,
	saveAltar,
	savePhoto,
	getAllPhotos,
	deletePhoto,
	DEFAULT_ALTAR_ID
} from './altar-db';
import type { PhotoRecord } from '../types/altar';

describe('Altar Database (Dexie.js)', () => {
	let testDb: AltarDatabase;

	beforeEach(async () => {
		testDb = new AltarDatabase(`TestDB_${Date.now()}_${Math.random()}`);
		await testDb.open();
	});

	afterEach(async () => {
		await testDb.delete();
	});

	it('crea un altar inicial con estructura válida y 3 niveles por defecto', () => {
		const altar = createInitialAltar();
		expect(altar.id).toBe(DEFAULT_ALTAR_ID);
		expect(altar.levelCount).toBe(3);
		expect(altar.items.length).toBeGreaterThan(0);
		expect(altar.theme).toBe('tradicional');
	});

	it('persiste y recupera el altar por defecto', async () => {
		const altar = await getOrCreateDefaultAltar(testDb);
		expect(altar.id).toBe(DEFAULT_ALTAR_ID);

		altar.title = 'Altar de la Familia';
		await saveAltar(altar, testDb);

		const updated = await testDb.altars.get(DEFAULT_ALTAR_ID);
		expect(updated?.title).toBe('Altar de la Familia');
	});

	it('guarda, lista y elimina fotografías con metadatos', async () => {
		const photo: PhotoRecord = {
			id: 'foto-1',
			name: 'Abuela Rosa',
			relation: 'Abuela',
			years: '1935 - 2018',
			dedication: 'Siempre en nuestro corazón',
			dataUrl:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
			createdAt: Date.now()
		};

		await savePhoto(photo, testDb);

		const photos = await getAllPhotos(testDb);
		expect(photos.length).toBe(1);
		expect(photos[0].name).toBe('Abuela Rosa');

		await deletePhoto('foto-1', testDb);
		const empty = await getAllPhotos(testDb);
		expect(empty.length).toBe(0);
	});
});
