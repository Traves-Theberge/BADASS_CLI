import { execSync, ExecSyncOptionsWithStringEncoding } from 'child_process';
import path from 'path';

const SCRIPT_PATH = path.resolve(__dirname, '../src/tools/lint-typescript.ts');
const FIXTURES_DIR = path.resolve(__dirname, 'fixtures');
const TS_NODE_PATH = path.resolve(__dirname, '../node_modules/.bin/ts-node'); // More robust path to ts-node

const execOptions: ExecSyncOptionsWithStringEncoding = {
  encoding: 'utf-8',
  stdio: 'pipe', // Capture stdout/stderr, but don't inherit
};

describe('lint-typescript tool', () => {
  it('should exit with code 0 for a file without linting errors', () => {
    const fixturePath = path.join(FIXTURES_DIR, 'sampleWithoutErrors.ts');
    let exitCode = 0;
    try {
      // Note: It's important that the .eslintrc.js is picked up correctly.
      // ts-node will execute the script, and ESLint within that script should find the config.
      execSync(`${TS_NODE_PATH} ${SCRIPT_PATH} ${fixturePath}`, execOptions);
    } catch (error: any) {
      exitCode = error.status || 1; // error.status contains the exit code
    }
    expect(exitCode).toBe(0);
  });

  it('should exit with code 1 for a file with linting errors', () => {
    const fixturePath = path.join(FIXTURES_DIR, 'sampleWithErrors.ts');
    let exitCode = 0;
    let output = '';
    try {
      execSync(`${TS_NODE_PATH} ${SCRIPT_PATH} ${fixturePath}`, execOptions);
    } catch (error: any) {
      exitCode = error.status;
      output = error.stdout + (error.stderr || ''); // Combine stdout and stderr for inspection
    }
    expect(exitCode).toBe(1);
    // Optionally, check for specific error messages in the output
    expect(output).toMatch(/@typescript-eslint\/no-unused-vars/);
    expect(output).toMatch(/unusedVariable/);
    expect(output).toMatch(/@typescript-eslint\/no-explicit-any/);
    // expect(output).toMatch(/Missing type for parameter 'param1'/); // This might depend on exact ESLint rule for missing param types
  });

  it('should produce output containing error details for a file with errors', () => {
    const fixturePath = path.join(FIXTURES_DIR, 'sampleWithErrors.ts');
    let output = '';
    try {
      execSync(`${TS_NODE_PATH} ${SCRIPT_PATH} ${fixturePath}`, execOptions);
    } catch (error: any) {
      output = error.stdout + (error.stderr || '');
    }
    expect(output).toContain(path.basename(fixturePath)); // Ensure the filename is in the output
    expect(output).toContain('Linting completed with errors.');
  });

  it('should produce output indicating no issues for a clean file', () => {
    const fixturePath = path.join(FIXTURES_DIR, 'sampleWithoutErrors.ts');
    let output = '';
    try {
      output = execSync(`${TS_NODE_PATH} ${SCRIPT_PATH} ${fixturePath}`, execOptions);
    } catch (error: any) {
      // Should not throw for a clean file
      output = error.stdout + (error.stderr || '');
      console.error("Error during linting clean file (unexpected):", output);
    }
    expect(output).toContain("No linting issues found.");
    expect(output).toContain("Linting completed successfully (no errors).");
  });
});
