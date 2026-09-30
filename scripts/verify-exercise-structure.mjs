import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const contentDir = path.join(repoRoot, 'content');

const exerciseOpeningTagPattern = /<Exercise\b[\s\S]*?>/g;
const titlePropPattern = /(?:^|\s)title\s*=/;

const listMdxFiles = (dirPath) => {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const entryPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            files.push(...listMdxFiles(entryPath));
            continue;
        }

        if (entry.isFile() && entry.name.endsWith('.mdx')) {
            files.push(entryPath);
        }
    }

    return files;
};

const lineNumberAt = (content, index) =>
    content.slice(0, index).split('\n').length;

const getFencedLines = (lines) => {
    let inFence = false;
    return lines.map((line) => {
        const trimmed = line.trimStart();
        if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
            inFence = !inFence;
        }
        return inFence;
    });
};

const toRepoRelativePath = (filePath) =>
    path.relative(repoRoot, filePath).replaceAll(path.sep, '/');

const violations = [];
let exerciseCount = 0;

for (const filePath of listMdxFiles(contentDir)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    const fencedLines = getFencedLines(lines);
    const relativePath = toRepoRelativePath(filePath);

    for (const match of content.matchAll(exerciseOpeningTagPattern)) {
        const lineNumber = lineNumberAt(content, match.index);
        if (fencedLines[lineNumber - 1]) continue;

        exerciseCount += 1;
        const openingTag = match[0];

        if (titlePropPattern.test(openingTag)) {
            violations.push(
                `${relativePath}:${lineNumber} <Exercise> does not support a title prop.`
            );
        }
    }
}

if (violations.length > 0) {
    console.error('Exercise structure verification failed:');
    for (const violation of violations) {
        console.error(`- ${violation}`);
    }
    process.exitCode = 1;
} else {
    console.log(
        `Exercise structure verification passed (${exerciseCount} Exercise block${exerciseCount === 1 ? '' : 's'} checked).`
    );
}
