export const MAX_RAW_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
export const MAX_IMAGE_DIMENSION = 1024;
export const COMPRESSION_QUALITY = 0.85;

export const ALLOWED_MIME_TYPES = [
	'image/jpeg',
	'image/png',
	'image/webp',
	'image/avif',
	'image/gif'
];

export function validateImageFile(file: File): { valid: boolean; error?: string } {
	if (!ALLOWED_MIME_TYPES.includes(file.type)) {
		return {
			valid: false,
			error: 'Formato no compatible. Por favor sube una imagen JPG, PNG, WEBP o GIF.'
		};
	}

	if (file.size > MAX_RAW_FILE_SIZE_BYTES) {
		return {
			valid: false,
			error: `La imagen excede el límite de 10 MB (${(file.size / (1024 * 1024)).toFixed(1)} MB). Elige una foto más ligera.`
		};
	}

	return { valid: true };
}

export function calculateFittedDimensions(
	width: number,
	height: number,
	maxDimension = MAX_IMAGE_DIMENSION
): { width: number; height: number } {
	if (width <= maxDimension && height <= maxDimension) {
		return { width, height };
	}

	if (width > height) {
		const newHeight = Math.round((height * maxDimension) / width);
		return { width: maxDimension, height: newHeight };
	} else {
		const newWidth = Math.round((width * maxDimension) / height);
		return { width: newWidth, height: maxDimension };
	}
}

export function compressImageFile(
	file: File,
	maxDimension = MAX_IMAGE_DIMENSION,
	quality = COMPRESSION_QUALITY
): Promise<string> {
	return new Promise((resolve, reject) => {
		const validation = validateImageFile(file);
		if (!validation.valid) {
			reject(new Error(validation.error));
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			const img = new Image();
			img.onload = () => {
				const { width, height } = calculateFittedDimensions(img.width, img.height, maxDimension);

				const canvas = document.createElement('canvas');
				canvas.width = width;
				canvas.height = height;

				const ctx = canvas.getContext('2d');
				if (!ctx) {
					reject(new Error('No se pudo inicializar el lienzo para procesar la imagen'));
					return;
				}

				// Fondo blanco si hay transparencias
				ctx.fillStyle = '#FFFFFF';
				ctx.fillRect(0, 0, width, height);

				ctx.drawImage(img, 0, 0, width, height);

				const dataUrl = canvas.toDataURL('image/jpeg', quality);
				resolve(dataUrl);
			};
			img.onerror = () => reject(new Error('Error al decodificar la imagen'));
			img.src = reader.result as string;
		};
		reader.onerror = () => reject(new Error('Error al leer el archivo en el dispositivo'));
		reader.readAsDataURL(file);
	});
}
