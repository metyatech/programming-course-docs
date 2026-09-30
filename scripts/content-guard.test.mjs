import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
);
const contentDir = path.join(repoRoot, 'content');
const verifierPath = path.join(
    repoRoot,
    'scripts',
    'verify-exercise-structure.mjs'
);

const runVerifier = () =>
    spawnSync(process.execPath, [verifierPath], {
        cwd: repoRoot,
        encoding: 'utf8',
    });

const outputOf = (result) => `${result.stdout}\n${result.stderr}`;

test('exercise structure verifier enforces only the unsupported title prop', () => {
    const fixtureDir = mkdtempSync(
        path.join(contentDir, '.exercise-structure-test-')
    );
    const fixturePath = path.join(fixtureDir, 'fixture.mdx');

    try {
        const fixtures = [
            ['without heading', '<Exercise>\n</Exercise>\n', 0],
            [
                'informative heading',
                '### Try a CSS rule\n\n<Exercise>\n</Exercise>\n',
                0,
            ],
            [
                'numbered heading',
                '### Exercise 2\n\n<Exercise>\n</Exercise>\n',
                0,
            ],
            [
                'unnumbered heading',
                '### Practice\n\n<Exercise>\n</Exercise>\n',
                0,
            ],
            [
                'unsupported title prop',
                '### Practice\n\n<Exercise title="Unsupported">\n</Exercise>\n',
                1,
            ],
            [
                'unrelated data-title prop',
                '<Exercise data-title="Metadata">\n</Exercise>\n',
                0,
            ],
            [
                'fenced example',
                '```mdx\n<Exercise title="Example">\n</Exercise>\n```\n',
                0,
            ],
            [
                'evidence wrapper without heading',
                '<Evidence targets="unit" demonstrates="application">\n<Exercise>\n</Exercise>\n</Evidence>\n',
                0,
            ],
            [
                'evidence wrapper after heading',
                '### Practice\n\n<Evidence targets="unit" demonstrates="application">\n<Exercise>\n</Exercise>\n</Evidence>\n',
                0,
            ],
        ];

        for (const [name, fixture, expectedStatus] of fixtures) {
            writeFileSync(fixturePath, fixture, 'utf8');
            const result = runVerifier();
            assert.equal(
                result.status,
                expectedStatus,
                `${name}: ${outputOf(result)}`
            );
            if (name === 'unsupported title prop') {
                assert.match(
                    outputOf(result),
                    /does not support a title prop/u
                );
            }
        }
    } finally {
        rmSync(fixtureDir, {
            recursive: true,
            force: true,
        });
    }
});

test('pre-commit runs the lightweight content guard after lint-staged', () => {
    const hook = readFileSync(
        path.join(repoRoot, '.husky', 'pre-commit'),
        'utf8'
    );
    const commands = hook
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    assert.deepEqual(commands, ['npx lint-staged', 'npm run verify:content']);

    const packageJson = JSON.parse(
        readFileSync(path.join(repoRoot, 'package.json'), 'utf8')
    );

    assert.equal(
        packageJson.scripts['verify:content'],
        'node scripts/verify-code-block-indentation.mjs && node scripts/verify-exercise-structure.mjs'
    );
});
