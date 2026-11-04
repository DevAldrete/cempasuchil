# Plan: Altar de Muertos Local-First

## Objective
Crear una aplicación web local-first y gratuita para diseñar altares de muertos tradicionales mexicanos interactivos con preservación en Dexie.js, fotos personalizadas y exportación en imagen.

## Architecture & Simplicity Check
- **Data Model:** Estructura plana de datos (DOP) para altar, niveles y elementos (`AltarRecord`, `TierItem`, `PhotoRecord`).
- **Storage:** Dexie.js (IndexedDB) para persistencia sin servidores ni cuentas. Fotos comprimidas en cliente (Web API Canvas).
- **Assets & Visuals:** Componentes SVG artesanales para ofrendas (pan, calaveritas, cempasúchil, velas) y optimización de assets culturales existentes.
- **Dependencies:** `dexie` para almacenamiento robusto en navegador; exportación nativa a canvas/PNG sin sobrecarga.

## Execution Graph
- [x] ISS-001: Configuración de tipos y base de datos local con Dexie.js (no dependencies)
- [x] ISS-002: Sección cultural y narrativa interactiva del Día de Muertos (no dependencies)
- [x] ISS-003: Catálogo y componentes visuales SVG de ofrendas tradicionales (depends on ISS-001)
- [x] ISS-004: Editor y estructura de altar por niveles configurables (depends on ISS-001, ISS-003)
- [x] ISS-005: Gestor de portaretratos y compresión local de fotos (depends on ISS-001, ISS-004)
- [ ] ISS-006: Vista conmemorativa y exportador a imagen PNG / JSON (depends on ISS-004, ISS-005)

## Verification
- Ejecutar pruebas unitarias (`pnpm test:unit`), linter (`pnpm lint`) y chequeo de tipos (`pnpm check`).
- Verificar creación de altar (2, 3 y 7 niveles), adición de ofrendas, subida de foto con límite de tamaño y exportación funcional a PNG de alta resolución.
