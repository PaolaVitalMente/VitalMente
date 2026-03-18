import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const MODELS_DIR = join(process.cwd(), 'public', 'models');

const MODELS = [
  {
    name: 'tiny_face_detector_model',
    files: ['weights_manifest.json', 'weights.bin']
  },
  {
    name: 'face_landmark_68_model',
    files: ['weights_manifest.json', 'weights.bin']
  },
  {
    name: 'face_recognition_model',
    files: ['weights_manifest.json', 'weights.bin']
  },
  {
    name: 'face_expression_model',
    files: ['weights_manifest.json', 'weights.bin']
  },
  {
    name: 'age_gender_model',
    files: ['weights_manifest.json', 'weights.bin']
  }
];

const BASE_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

async function downloadFile(url, filepath) {
  console.log(`[v0] Descargando: ${url}`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(filepath, buffer);
    console.log(`[v0] ✓ Guardado: ${filepath}`);
    return true;
  } catch (error) {
    console.error(`[v0] ✗ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  if (!existsSync(MODELS_DIR)) {
    await mkdir(MODELS_DIR, { recursive: true });
    console.log(`[v0] Carpeta creada: ${MODELS_DIR}\n`);
  }

  let successful = 0;
  let failed = 0;

  for (const model of MODELS) {
    for (const file of model.files) {
      const filename = `${model.name}-${file}`;
      const filepath = join(MODELS_DIR, filename);
      
      if (existsSync(filepath)) {
        console.log(`[v0] ~ Ya existe: ${filename}`);
        continue;
      }
      
      const url = `${BASE_URL}/${filename}`;
      const result = await downloadFile(url, filepath);
      if (result) {
        successful++;
      } else {
        failed++;
      }
    }
  }

  console.log(`\n[v0] =====================`);
  console.log(`[v0] Éxito: ${successful} archivos`);
  if (failed > 0) {
    console.log(`[v0] Errores: ${failed} archivos`);
  }
  console.log(`[v0] =====================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('[v0] Error fatal:', error);
  process.exit(1);
});
