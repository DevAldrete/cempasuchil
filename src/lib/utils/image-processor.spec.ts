import { describe, it, expect } from 'vitest';
import {
	validateImageFile,
	calculateFittedDimensions,
	MAX_RAW_FILE_SIZE_BYTES
} from './image-processor';

describe('Image Processor (Local-First Compression & Validation)', () => {
	it('valida formatos permitidos y rechaza formatos no admitidos', () => {
		const validFile = new File(['dummy content'], 'foto.jpg', { type: 'image/jpeg' });
		expect(validateImageFile(validFile).valid).toBe(true);

		const pngFile = new File(['dummy content'], 'foto.png', { type: 'image/png' });
		expect(validateImageFile(pngFile).valid).toBe(true);

		const invalidFile = new File(['dummy content'], 'doc.pdf', { type: 'application/pdf' });
		const invalidResult = validateImageFile(invalidFile);
		expect(invalidResult.valid).toBe(false);
		expect(invalidResult.error).toContain('Formato no compatible');
	});

	it('rechaza archivos que exceden el tamaño máximo', () => {
		const hugeContent = new ArrayBuffer(MAX_RAW_FILE_SIZE_BYTES + 1024);
		const hugeFile = new File([hugeContent], 'huge.jpg', { type: 'image/jpeg' });
		const result = validateImageFile(hugeFile);
		expect(result.valid).toBe(false);
		expect(result.error).toContain('excede el límite');
	});

	it('calcula dimensiones ajustadas manteniendo la relación de aspecto', () => {
		// Imagen horizontal más grande que 1024
		const landscape = calculateFittedDimensions(2000, 1000, 1000);
		expect(landscape.width).toBe(1000);
		expect(landscape.height).toBe(500);

		// Imagen vertical más grande que 1024
		const portrait = calculateFittedDimensions(800, 1600, 1000);
		expect(portrait.width).toBe(500);
		expect(portrait.height).toBe(1000);

		// Imagen pequeña que no requiere reducción
		const small = calculateFittedDimensions(400, 300, 1000);
		expect(small.width).toBe(400);
		expect(small.height).toBe(300);
	});
});
