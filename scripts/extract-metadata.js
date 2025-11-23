import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECTS_JSON = path.join(__dirname, '../projects.json');
const PUBLIC_PROJECTS_DIR = path.join(__dirname, '../public/projects');

function extractMetadata() {
    if (!fs.existsSync(PROJECTS_JSON)) {
        console.error('projects.json not found');
        return;
    }

    const projects = JSON.parse(fs.readFileSync(PROJECTS_JSON, 'utf-8'));

    console.log('--- START METADATA ---');

    for (const project of projects) {
        const htmlPath = path.join(PUBLIC_PROJECTS_DIR, project.folderName, project.entryFile || 'index.html');

        let description = '';
        let h1 = '';
        let firstP = '';

        if (fs.existsSync(htmlPath)) {
            try {
                const content = fs.readFileSync(htmlPath, 'utf-8');

                // Simple regex extraction (robust enough for this task)
                const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
                description = descMatch ? descMatch[1] : '';

                const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
                h1 = h1Match ? h1Match[1].replace(/<[^>]*>/g, '') : ''; // Strip tags

                const pMatch = content.match(/<p[^>]*>(.*?)<\/p>/i);
                firstP = pMatch ? pMatch[1].replace(/<[^>]*>/g, '').substring(0, 200) : ''; // Strip tags & truncate
            } catch (e) {
                console.error(`Error reading ${project.id}: ${e.message}`);
            }
        }

        console.log(JSON.stringify({
            id: project.id,
            title: project.title,
            description: description || 'No description',
            h1: h1 || 'No H1',
            context: firstP || 'No content'
        }));
    }
    console.log('--- END METADATA ---');
}

extractMetadata();
