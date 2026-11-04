import type { AltarRecord, PhotoRecord } from '../types/altar';

export interface AltarBackupBundle {
	version: number;
	exportedAt: number;
	altar: AltarRecord;
	photos: PhotoRecord[];
}

export function exportAltarToJson(altar: AltarRecord, photos: PhotoRecord[]): void {
	const bundle: AltarBackupBundle = {
		version: 1,
		exportedAt: Date.now(),
		altar,
		photos
	};

	const dataStr =
		'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(bundle, null, 2));
	const downloadAnchor = document.createElement('a');
	const safeName = (altar.title || 'altar-de-muertos')
		.toLowerCase()
		.replace(/[^a-z0-9]/g, '-')
		.replace(/-+/g, '-');
	downloadAnchor.setAttribute('href', dataStr);
	downloadAnchor.setAttribute('download', `${safeName}-${Date.now()}.json`);
	document.body.appendChild(downloadAnchor);
	downloadAnchor.click();
	downloadAnchor.remove();
}

export function validateAndParseAltarBackup(jsonStr: string): AltarBackupBundle {
	const parsed = JSON.parse(jsonStr) as AltarBackupBundle;
	if (
		!parsed.altar ||
		!parsed.altar.id ||
		!parsed.altar.levelCount ||
		!Array.isArray(parsed.altar.items)
	) {
		throw new Error('El archivo JSON no tiene una estructura válida de Altar de Muertos.');
	}
	if (!Array.isArray(parsed.photos)) {
		parsed.photos = [];
	}
	return parsed;
}

export async function exportElementToPng(
	element: HTMLElement,
	filename = 'mi-altar-de-muertos.png'
): Promise<void> {
	const rect = element.getBoundingClientRect();
	const width = Math.max(element.scrollWidth, Math.round(rect.width));
	const height = Math.max(element.scrollHeight, Math.round(rect.height));

	// Clonar elemento para inyectar estilos autónomos
	const clone = element.cloneNode(true) as HTMLElement;
	clone.style.width = `${width}px`;
	clone.style.height = `${height}px`;

	// Reemplazar inputs por textos estáticos legibles en la captura
	const inputs = clone.querySelectorAll<HTMLInputElement>('input');
	inputs.forEach((input) => {
		const span = document.createElement('span');
		span.textContent = input.value || input.placeholder;
		span.className = input.className;
		span.style.display = 'block';
		input.replaceWith(span);
	});

	// Ocultar botones de edición en la captura exportada
	const actionButtons = clone.querySelectorAll('button');
	actionButtons.forEach((btn) => {
		if (btn.textContent?.includes('✎') || btn.textContent?.includes('+')) {
			btn.style.display = 'none';
		}
	});

	const serializedHtml = new XMLSerializer().serializeToString(clone);

	// Envolver en SVG ForeignObject
	const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
		<foreignObject width="100%" height="100%">
			<div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;background:#0C0211;color:#FFF8E7;font-family:serif;">
				${serializedHtml}
			</div>
		</foreignObject>
	</svg>`;

	const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
	const url = URL.createObjectURL(blob);

	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			try {
				const canvas = document.createElement('canvas');
				// Renderizado en alta definición 2x
				const scale = 2;
				canvas.width = width * scale;
				canvas.height = height * scale;

				const ctx = canvas.getContext('2d');
				if (!ctx) {
					URL.revokeObjectURL(url);
					reject(new Error('No se pudo inicializar el lienzo de exportación'));
					return;
				}

				ctx.fillStyle = '#0C0211';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.scale(scale, scale);
				ctx.drawImage(img, 0, 0);

				URL.revokeObjectURL(url);

				const pngUrl = canvas.toDataURL('image/png');
				const a = document.createElement('a');
				a.href = pngUrl;
				a.download = filename;
				document.body.appendChild(a);
				a.click();
				a.remove();
				resolve();
			} catch (err) {
				URL.revokeObjectURL(url);
				reject(err);
			}
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			// Fallback: descargar directo como SVG
			const a = document.createElement('a');
			a.href = url;
			a.download = filename.replace('.png', '.svg');
			document.body.appendChild(a);
			a.click();
			a.remove();
			resolve();
		};
		img.src = url;
	});
}
