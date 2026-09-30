import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const contentDir = path.join(repoRoot, 'content');

const exerciseOpeningTagPattern = /<Exercise(?=[\s/>]|$)/g;
const titlePropPattern = /(?:^|\s)title\s*=/;

const findOpeningTagEnd = (content, startIndex) => {
    let quote = null;
    let braceDepth = 0;

    for (let index = startIndex; index < content.length; index += 1) {
        const character = content[index];
        if (quote !== null) {
            if (character === '\\') {
                index += 1;
                continue;
            }
            if (character === quote) quote = null;
            continue;
        }

        if (character === '"' || character === "'" || character === '`') {
            quote = character;
            continue;
        }
        if (character === '{') {
            braceDepth += 1;
            continue;
        }
        if (character === '}') {
            if (braceDepth > 0) braceDepth -= 1;
            continue;
        }
        if (character === '<' && braceDepth === 0) return -1;
        if (character === '>' && braceDepth === 0) return index;
    }

    return -1;
};

const maskQuotedAndBraced = (openingTag) => {
    let masked = '';
    let quote = null;
    let braceDepth = 0;

    for (let index = 0; index < openingTag.length; index += 1) {
        const character = openingTag[index];
        if (quote !== null) {
            if (character === '\\') {
                masked += '  ';
                index += 1;
                continue;
            }
            if (character === quote) quote = null;
            masked += ' ';
            continue;
        }

        if (character === '"' || character === "'" || character === '`') {
            quote = character;
            masked += ' ';
            continue;
        }
        if (character === '{') {
            braceDepth += 1;
            masked += ' ';
            continue;
        }
        if (character === '}') {
            if (braceDepth > 0) braceDepth -= 1;
            masked += ' ';
            continue;
        }
        masked += braceDepth > 0 ? ' ' : character;
    }

    return masked;
};

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

const getLineStartOffsets = (content, lines) => {
    const offsets = [];
    let offset = 0;

    for (const line of lines) {
        offsets.push(offset);
        offset += line.length;
        if (content[offset] === '\r') offset += 1;
        if (content[offset] === '\n') offset += 1;
    }

    return offsets;
};

const toRepoRelativePath = (filePath) =>
    path.relative(repoRoot, filePath).replaceAll(path.sep, '/');

const violations = [];
let exerciseCount = 0;

for (const filePath of listMdxFiles(contentDir)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    const fencedLines = getFencedLines(lines);
    const lineStartOffsets = getLineStartOffsets(content, lines);
    const relativePath = toRepoRelativePath(filePath);

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
        if (fencedLines[lineIndex]) continue;

        for (const match of lines[lineIndex].matchAll(
            exerciseOpeningTagPattern
        )) {
            const lineNumber = lineIndex + 1;
            const startIndex = lineStartOffsets[lineIndex] + match.index;
            const endIndex = findOpeningTagEnd(
                content,
                startIndex + match[0].length
            );
            exerciseCount += 1;

            if (endIndex === -1) {
                violations.push(
                    `${relativePath}:${lineNumber} Unterminated <Exercise> opening tag.`
                );
                continue;
            }

            const openingTag = content.slice(startIndex, endIndex + 1);
            if (titlePropPattern.test(maskQuotedAndBraced(openingTag))) {
                violations.push(
                    `${relativePath}:${lineNumber} <Exercise> does not support a title prop.`
                );
            }
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
