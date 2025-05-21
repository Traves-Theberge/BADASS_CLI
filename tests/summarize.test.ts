import { execSync, ExecSyncOptionsWithStringEncoding } from 'child_process';
import path from 'path';

const SCRIPT_PATH = path.resolve(__dirname, '../src/tools/summarize.ts');
const TS_NODE_PATH = path.resolve(__dirname, '../node_modules/.bin/ts-node');

const execOptions: ExecSyncOptionsWithStringEncoding = {
  encoding: 'utf-8',
  stdio: 'pipe',
};

function runSummarizeScript(text: string, seed: string | number): { output: string, wordCount: number, charCount: number, hash: string } {
  const command = `${TS_NODE_PATH} ${SCRIPT_PATH} "${text}" "${seed}"`;
  const output = execSync(command, execOptions);

  const wordCountMatch = output.match(/Word count: (\d+)/);
  const charCountMatch = output.match(/Character count: (\d+)/);
  const hashMatch = output.match(/Deterministic Hash \(SHA-256\): ([a-f0-9]+)/);

  return {
    output,
    wordCount: wordCountMatch ? parseInt(wordCountMatch[1], 10) : -1,
    charCount: charCountMatch ? parseInt(charCountMatch[1], 10) : -1,
    hash: hashMatch ? hashMatch[1] : '',
  };
}

describe('summarize tool', () => {
  it('should produce the same hash for the same text and seed', () => {
    const text = "Hello world";
    const seed = "testSeed123";
    const result1 = runSummarizeScript(text, seed);
    const result2 = runSummarizeScript(text, seed);
    expect(result1.hash).toBe(result2.hash);
    expect(result1.hash.length).toBe(64); // SHA-256 produces a 64-character hex string
  });

  it('should produce different hashes for different texts with the same seed', () => {
    const text1 = "Hello world";
    const text2 = "Hello there";
    const seed = "testSeed123";
    const result1 = runSummarizeScript(text1, seed);
    const result2 = runSummarizeScript(text2, seed);
    expect(result1.hash).not.toBe(result2.hash);
  });

  it('should produce different hashes for the same text with different seeds', () => {
    const text = "Hello world";
    const seed1 = "testSeed123";
    const seed2 = "anotherSeed456";
    const result1 = runSummarizeScript(text, seed1);
    const result2 = runSummarizeScript(text, seed2);
    expect(result1.hash).not.toBe(result2.hash);
  });

  it('should correctly count words and characters', () => {
    const text = "This is a test."; // 4 words, 15 characters
    const seed = "countTest";
    const result = runSummarizeScript(text, seed);
    expect(result.wordCount).toBe(4);
    expect(result.charCount).toBe(15);
  });

  it('should correctly count words and characters for text with multiple spaces', () => {
    const text = "Hello    world  "; // 2 words, 18 characters (includes trailing spaces for char count)
    const seed = "spaceTest";
    const result = runSummarizeScript(text, seed);
    expect(result.wordCount).toBe(2); // split(/\s+/) handles multiple spaces between words
    expect(result.charCount).toBe(18);
  });

  it('should handle empty string input', () => {
    const text = ""; // 0 words, 0 characters
    const seed = "emptyTest";
    const result = runSummarizeScript(text, seed);
    expect(result.wordCount).toBe(0);
    expect(result.charCount).toBe(0);
    expect(result.hash.length).toBe(64); // Still should produce a hash
  });

  it('should handle numerical seed', () => {
    const text = "Test with numerical seed";
    const seed = 42;
    const result1 = runSummarizeScript(text, seed);
    const result2 = runSummarizeScript(text, String(seed)); // Compare with string version of seed
    // The script converts seed to string in `text:${text},seed:${seed}`
    // So, numerical 42 and string "42" should produce the same hash.
    expect(result1.hash).toBe(result2.hash);
    expect(result1.wordCount).toBe(4);
    expect(result1.charCount).toBe(24);
  });
});
