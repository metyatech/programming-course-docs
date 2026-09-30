import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
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

    assert.equal(
        packageJson.scripts['lint:md'],
        'markdownlint "**/*.md" --ignore AGENTS.md --ignore "node_modules/**" --ignore "agent-rules-private/**" && markdownlint "**/*.mdx" --config .markdownlint.mdx.json --ignore AGENTS.md --ignore "node_modules/**" --ignore "agent-rules-private/**"'
    );
    assert.equal(
        packageJson['lint-staged']['*.md'],
        'markdownlint --fix --ignore AGENTS.md --ignore node_modules/** --ignore agent-rules-private/**'
    );
    assert.equal(
        packageJson['lint-staged']['*.mdx'],
        'markdownlint --fix --config .markdownlint.mdx.json --ignore AGENTS.md --ignore node_modules/** --ignore agent-rules-private/**'
    );
    assert.match(packageJson.scripts.verify, /&& npm audit$/u);
});

test('Exercise structure verifier accepts multiline tags and checks only real title props', () => {
    const fixtureDir = mkdtempSync(
        path.join(contentDir, '.exercise-structure-test-')
    );
    const fixturePath = path.join(fixtureDir, 'fixture.mdx');

    try {
        const fixtures = [
            [
                'multiline supported props',
                '<Exercise\n  answerTitle="確認"\n  enableBlanks\n>\n</Exercise>\n',
                0,
            ],
            [
                'multiline unsupported title prop',
                '<Exercise\n  title="Unsupported"\n>\n</Exercise>\n',
                1,
            ],
            [
                'data-title is not title',
                '<Exercise data-title="metadata">\n</Exercise>\n',
                0,
            ],
            [
                'quoted title-like value',
                '<Exercise answerTitle="literal title= text">\n</Exercise>\n',
                0,
            ],
            [
                'braced title-like value',
                '<Exercise answerTitle={"title="}>\n</Exercise>\n',
                0,
            ],
            [
                'template greater-than before title prop',
                '<Exercise answerTitle={`a > b`}\n  title="Unsupported"\n>\n</Exercise>\n',
                1,
            ],
            [
                'quoted greater-than before title prop',
                '<Exercise answerTitle="a > b"\n  title="Unsupported"\n>\n</Exercise>\n',
                1,
            ],
            [
                'unterminated opening tag',
                '<Exercise\n  answerTitle="確認"\n',
                1,
            ],
            [
                'ExerciseFoo is not Exercise',
                '<ExerciseFoo title="ignored">\n</ExerciseFoo>\n',
                0,
            ],
            [
                'fenced multiline example',
                '```mdx\n<Exercise\n  title="example"\n>\n```\n',
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
            if (name.includes('unsupported title')) {
                assert.match(
                    outputOf(result),
                    /does not support a title prop/u
                );
            }
            if (name === 'unterminated opening tag') {
                assert.match(
                    outputOf(result),
                    /Unterminated <Exercise> opening tag/u
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

test('standard Markdown enforces heading order while MDX uses its explicit config', () => {
    const fixtureDir = mkdtempSync(
        path.join(os.tmpdir(), 'programming-course-markdownlint-config-')
    );
    const markdownPath = path.join(fixtureDir, 'fixture.md');
    const mdxPath = path.join(fixtureDir, 'fixture.mdx');
    const cliPath = path.join(
        repoRoot,
        'node_modules',
        'markdownlint-cli',
        'markdownlint.js'
    );
    const headingGap = '### 見出し3\n\n##### 見出し5\n';

    try {
        writeFileSync(markdownPath, headingGap, 'utf8');
        writeFileSync(mdxPath, headingGap, 'utf8');

        const standardMarkdown = spawnSync(
            process.execPath,
            [cliPath, '--config', '.markdownlint.json', markdownPath],
            { cwd: repoRoot, encoding: 'utf8' }
        );
        const configuredMdx = spawnSync(
            process.execPath,
            [cliPath, '--config', '.markdownlint.mdx.json', mdxPath],
            { cwd: repoRoot, encoding: 'utf8' }
        );

        assert.equal(
            standardMarkdown.status,
            1,
            `${standardMarkdown.stdout}\n${standardMarkdown.stderr}`
        );
        assert.match(
            `${standardMarkdown.stdout}\n${standardMarkdown.stderr}`,
            /MD001/u
        );
        assert.equal(
            configuredMdx.status,
            0,
            `${configuredMdx.stdout}\n${configuredMdx.stderr}`
        );
    } finally {
        rmSync(fixtureDir, { recursive: true, force: true });
    }
});
