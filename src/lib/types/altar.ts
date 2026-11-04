export type AltarLevelCount = 2 | 3 | 7;

export type OfrendaType =
	| 'cempasuchil'
	| 'pan_de_muerto'
	| 'calaverita_azucar'
	| 'calaverita_barro'
	| 'veladora'
	| 'papel_picado'
	| 'sal'
	| 'agua'
	| 'copal'
	| 'fruta'
	| 'cruz_cal'
	| 'foto';

export interface OfrendaDefinition {
	type: OfrendaType;
	name: string;
	description: string;
	meaning: string;
	defaultLevel?: number;
	iconSvg?: string;
}

export interface SlotItem {
	id: string;
	type: OfrendaType;
	levelIndex: number; // 1 to levelCount
	slotIndex: number; // position index on that tier
	photoId?: string;
	variant?: string;
	scale?: number;
	notes?: string;
}

export interface PhotoRecord {
	id: string;
	name: string;
	relation?: string;
	years?: string;
	dedication?: string;
	dataUrl: string;
	createdAt: number;
}

export interface AltarRecord {
	id: string;
	title: string;
	dedicationTo: string;
	levelCount: AltarLevelCount;
	theme: 'tradicional' | 'noche' | 'cempasuchil';
	hasPetalsTrail: boolean;
	tapetePattern?: string;
	items: SlotItem[];
	createdAt: number;
	updatedAt: number;
}
