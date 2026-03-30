/**
 * restore-corpus.js
 *
 * Reconstrói a pasta CORPUS/ a partir dos arquivos já publicados em projects/.
 * Use este script ao configurar uma nova máquina, após `git clone`.
 *
 * Fluxo normal do projeto:
 *   CORPUS/ → (sync-projects.js) → projects/ → git commit → GitHub
 *
 * Fluxo de restauração (este script):
 *   projects/ → restore-corpus.js → CORPUS/
 *
 * Uso:
 *   node scripts/restore-corpus.js
 *   node scripts/restore-corpus.js --force   (sobrescreve projetos existentes no CORPUS)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CORPUS_DIR = path.join(__dirname, '../CORPUS');
const PROJECTS_DIR = path.join(__dirname, '../projects');
const FORCE = process.argv.includes('--force');

// ─── Helpers ────────────────────────────────────────────────────────────────

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log('');
console.log('🔁 Restaurando CORPUS/ a partir de projects/...');
console.log('');

if (!fs.existsSync(PROJECTS_DIR)) {
    console.error('❌ Pasta projects/ não encontrada. Certifique-se de estar na raiz do projeto.');
    process.exit(1);
}

// Garante que CORPUS/ existe (mesmo que vazia)
if (!fs.existsSync(CORPUS_DIR)) {
    fs.mkdirSync(CORPUS_DIR, { recursive: true });
    console.log('📁 Pasta CORPUS/ criada.');
}

const entries = fs.readdirSync(PROJECTS_DIR, { withFileTypes: true });
const projectDirs = entries.filter(e => e.isDirectory());

if (projectDirs.length === 0) {
    console.warn('⚠️  Nenhuma pasta encontrada em projects/. Nada foi restaurado.');
    process.exit(0);
}

let restored = 0;
let skipped = 0;

for (const entry of projectDirs) {
    const src = path.join(PROJECTS_DIR, entry.name);
    const dest = path.join(CORPUS_DIR, entry.name);

    if (fs.existsSync(dest) && !FORCE) {
        console.log(`   ⏭  Pulando ${entry.name} (já existe no CORPUS — use --force para sobrescrever)`);
        skipped++;
        continue;
    }

    console.log(`   ✅ Restaurando ${entry.name}...`);
    copyDir(src, dest);
    restored++;
}

console.log('');
console.log(`✨ Concluído: ${restored} projeto(s) restaurado(s), ${skipped} pulado(s).`);

if (skipped > 0) {
    console.log('');
    console.log('💡 Dica: rode com --force para sobrescrever projetos existentes:');
    console.log('   node scripts/restore-corpus.js --force');
}

console.log('');
console.log('➡️  Próximo passo: edite os projetos em CORPUS/ e rode o sync:');
console.log('   node scripts/sync-projects.js');
console.log('');
