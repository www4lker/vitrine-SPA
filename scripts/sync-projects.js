import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CORPUS_DIR = path.join(__dirname, '../CORPUS');
const PUBLIC_PROJECTS_DIR = path.join(__dirname, '../projects');
// Output to root of spa-showcase (parent of scripts)
const OUTPUT_JSON = path.join(__dirname, '../projects.json');

// Ensure public/projects exists
if (!fs.existsSync(PUBLIC_PROJECTS_DIR)) {
    fs.mkdirSync(PUBLIC_PROJECTS_DIR, { recursive: true });
}

// Helper to copy directory recursively
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Helper to extract title from index.html
function getTitleFromHtml(htmlPath) {
    try {
        const content = fs.readFileSync(htmlPath, 'utf-8');
        const match = content.match(/<title>(.*?)<\/title>/i);
        return match ? match[1] : null;
    } catch (e) {
        return null;
    }
}

// Helper to find entry HTML file recursively
function findIndexHtml(dir, relativePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let fallbackHtml = null;

    // First check files in current dir
    for (const entry of entries) {
        if (!entry.isDirectory() && entry.name.toLowerCase().endsWith('.html')) {
            const fullPath = path.join(relativePath, entry.name).replace(/\\/g, '/');
            if (entry.name.toLowerCase() === 'index.html') {
                return fullPath; // Priority to index.html
            }
            if (!fallbackHtml) {
                fallbackHtml = fullPath; // Keep first HTML as fallback
            }
        }
    }

    // If we found a fallback in this dir but no index.html, return it
    // (Optional: depending on if we want to search deeper first. 
    // Let's search deeper for index.html first, then return fallback if nothing found deep)

    // Then check subdirectories
    for (const entry of entries) {
        if (entry.isDirectory()) {
            const found = findIndexHtml(
                path.join(dir, entry.name),
                path.join(relativePath, entry.name)
            );
            if (found) {
                // If the found file is index.html, return it immediately
                if (found.toLowerCase().endsWith('index.html')) return found;
                // If it's just an HTML file, keep it as a better fallback? 
                // For simplicity, let's just return it if we don't have a fallback yet
                if (!fallbackHtml) fallbackHtml = found;
            }
        }
    }

    return fallbackHtml;
}

function getEmojiForProject(title, tags) {
    const text = (title + ' ' + tags.join(' ')).toLowerCase();
    if (text.match(/brain|cognitive|psychology|mind|cerebro|neuro/)) return '🧠';
    if (text.match(/book|library|reading|litera|livro/)) return '📚';
    if (text.match(/music|rock|song|band/)) return '🎸';
    if (text.match(/bicycle|bike|mobility|transport/)) return '🚴';
    if (text.match(/health|nootropic|medicine|drug|supplement/)) return '💊';
    if (text.match(/ai|artificial|intelligence|gpt|llm|future|tech|ia/)) return '🤖';
    if (text.match(/writ|note|doc|text|essay|escrever|escrita/)) return '📝';
    if (text.match(/meditat|breath|wellness|calm|respir/)) return '🧘';
    if (text.match(/game|play|fun|jogo/)) return '🎮';
    if (text.match(/science|research|lab|experiment|pesquisa/)) return '🔬';
    if (text.match(/data|info|graph|chart|analy|analise|dados/)) return '📊';
    if (text.match(/git|tool|code|program|dev/)) return '⚙️';
    return '🧪'; // Default
}

function syncAndScan() {
    console.log('🔄 Syncing projects from CORPUS...');

    // 1. Clean public/projects
    if (fs.existsSync(PUBLIC_PROJECTS_DIR)) {
        fs.rmSync(PUBLIC_PROJECTS_DIR, { recursive: true, force: true });
        fs.mkdirSync(PUBLIC_PROJECTS_DIR);
    }

    if (!fs.existsSync(CORPUS_DIR)) {
        console.warn(`⚠️ CORPUS directory not found at ${CORPUS_DIR}`);
        return;
    }

    const projects = [];
    const entries = fs.readdirSync(CORPUS_DIR, { withFileTypes: true });

    for (const entry of entries) {
        if (entry.isDirectory()) {
            const folderName = entry.name;
            const srcPath = path.join(CORPUS_DIR, folderName);
            const destPath = path.join(PUBLIC_PROJECTS_DIR, folderName);

            // Copy everything first
            console.log(`   Copying ${folderName}...`);
            copyDir(srcPath, destPath);

            // Find index.html
            const entryFile = findIndexHtml(destPath);

            if (entryFile) {
                const fullPath = path.join(destPath, entryFile);
                const title = getTitleFromHtml(fullPath) || folderName;
                const projectTags = ['Experimento'];

                // Extract description if possible (simple regex)
                let description = '';
                try {
                    const content = fs.readFileSync(fullPath, 'utf-8');
                    const metaDesc = content.match(/<meta name="description" content="(.*?)">/i);
                    if (metaDesc) description = metaDesc[1];
                } catch (e) { }

                // Semantic Analysis
                const concepts = analyzeContent(title + ' ' + description + ' ' + projectTags.join(' '));

                projects.push({
                    id: folderName,
                    title: title,
                    description: description || `Experimento: ${title}`,
                    folderName: folderName,
                    entryFile: entryFile,
                    tags: concepts, // Use semantic concepts as tags
                    emoji: getEmojiForProject(title, concepts), // Update emoji based on concepts
                    concepts: concepts,
                    date: new Date().toISOString().split('T')[0]
                });
            } else {
                console.log(`   ⚠️ No index.html found in ${folderName}, skipping from list.`);
            }
        }
    }

    // Write projects.json
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(projects, null, 2));
    console.log(`✅ Synced ${projects.length} projects to projects.json`);
}

function analyzeContent(text) {
    const content = text.toLowerCase();
    const concepts = new Set();

    const taxonomy = {
        'NotebookLM & Prompts': ['notebooklm', 'prompt', 'rag', 'flashcard', 'resumo', 'estudo', 'fichamento'],
        'Neurociência & Psicologia': ['cérebro', 'brain', 'neuro', 'dopamina', 'ansiedade', 'emoção', 'psicologia', 'cognitivo', 'mente', 'mental', 'terapia', 'comportamento'],
        'Inteligência Artificial': ['ia', 'ai', 'gpt', 'llm', 'neural', 'inteligência', 'artificial', 'model', 'bot', 'chat'],
        'Humanidades Digitais': ['livro', 'leitura', 'escrita', 'história', 'cultura', 'arte', 'filosofia', 'texto', 'narrativa', 'biblioteca'],
        'Metodologia & Ferramentas': ['git', 'código', 'dev', 'ferramenta', 'obsidian', 'zettelkasten', 'nota', 'organização', 'produtividade', 'análise'],
        'Sociedade & Futuro': ['futuro', 'trabalho', 'cidade', 'política', 'brasil', 'mundo', 'tendência', 'social', 'comunidade', 'educação']
    };

    for (const [category, keywords] of Object.entries(taxonomy)) {
        if (keywords.some(keyword => content.includes(keyword))) {
            concepts.add(category);
        }
    }

    // Default concept if none found
    if (concepts.size === 0) {
        concepts.add('Outros Experimentos');
    }

    return Array.from(concepts);
}

syncAndScan();
