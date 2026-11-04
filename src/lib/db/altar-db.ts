import Dexie, { type Table } from 'dexie';
import type { AltarRecord, PhotoRecord } from '../types/altar';

export class AltarDatabase extends Dexie {
	altars!: Table<AltarRecord, string>;
	photos!: Table<PhotoRecord, string>;

	constructor(databaseName = 'CempasuchilDB') {
		super(databaseName);
		this.version(1).stores({
			altars: 'id, updatedAt, levelCount',
			photos: 'id, name, createdAt'
		});
	}
}

export const db = new AltarDatabase();

export const DEFAULT_ALTAR_ID = 'mi-altar-principal';

export function createInitialAltar(id = DEFAULT_ALTAR_ID): AltarRecord {
	const now = Date.now();
	return {
		id,
		title: 'Mi Altar de Muertos',
		dedicationTo: 'En memoria de nuestros seres queridos',
		levelCount: 3,
		theme: 'tradicional',
		hasPetalsTrail: true,
		tapetePattern: 'cempasuchil-sol',
		items: [
			// Elementos iniciales esenciales
			{
				id: 'item-vela-1',
				type: 'veladora',
				levelIndex: 1,
				slotIndex: 0
			},
			{
				id: 'item-copal-1',
				type: 'copal',
				levelIndex: 1,
				slotIndex: 2
			},
			{
				id: 'item-agua-1',
				type: 'agua',
				levelIndex: 2,
				slotIndex: 0
			},
			{
				id: 'item-pan-1',
				type: 'pan_de_muerto',
				levelIndex: 2,
				slotIndex: 1
			},
			{
				id: 'item-sal-1',
				type: 'sal',
				levelIndex: 2,
				slotIndex: 2
			},
			{
				id: 'item-calaverita-1',
				type: 'calaverita_azucar',
				levelIndex: 3,
				slotIndex: 0
			},
			{
				id: 'item-cempasuchil-1',
				type: 'cempasuchil',
				levelIndex: 3,
				slotIndex: 1
			},
			{
				id: 'item-calaverita-2',
				type: 'calaverita_barro',
				levelIndex: 3,
				slotIndex: 2
			}
		],
		createdAt: now,
		updatedAt: now
	};
}

export async function getOrCreateDefaultAltar(database = db): Promise<AltarRecord> {
	const existing = await database.altars.get(DEFAULT_ALTAR_ID);
	if (existing) {
		return existing;
	}
	const initial = createInitialAltar();
	await database.altars.put(initial);
	return initial;
}

export async function saveAltar(altar: AltarRecord, database = db): Promise<void> {
	const updated = {
		...altar,
		updatedAt: Date.now()
	};
	await database.altars.put(updated);
}

export async function getAltar(id: string, database = db): Promise<AltarRecord | undefined> {
	return database.altars.get(id);
}

export async function savePhoto(photo: PhotoRecord, database = db): Promise<void> {
	await database.photos.put(photo);
}

export async function getPhoto(id: string, database = db): Promise<PhotoRecord | undefined> {
	return database.photos.get(id);
}

export async function getAllPhotos(database = db): Promise<PhotoRecord[]> {
	return database.photos.orderBy('createdAt').reverse().toArray();
}

export async function deletePhoto(id: string, database = db): Promise<void> {
	await database.photos.delete(id);
}
