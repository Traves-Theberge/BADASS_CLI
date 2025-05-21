import * as crypto from 'crypto';

/**
 * Performs a simple deterministic operation (word and character count)
 * and calculates a SHA-256 hash based on the input text and a seed.
 *
 * @param text The input string.
 * @param seed A string or number used for hashing.
 */
function summarizeAndHash(text: string, seed: string | number): void {
  // b. Perform a simple deterministic operation
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = text.length;

  // c. Create a combined string from the input text and seed
  const textToHash = `text:${text},seed:${seed}`;

  // d. Calculate the SHA-256 hash
  const hash = crypto.createHash('sha256').update(textToHash).digest('hex');

  // e. Print the result
  console.log(`Word count: ${wordCount}, Character count: ${charCount}`);
  console.log(`Deterministic Hash (SHA-256): ${hash}`);
}

// Main execution
// f. Ensure the script can be run using ts-node src/tools/summarize.ts "some input text" "a_seed_value"
if (process.argv.length < 4) {
  console.error("Usage: ts-node src/tools/summarize.ts \"<text>\" \"<seed>\"");
  process.exit(1);
}

const inputText: string = process.argv[2];
const inputSeed: string | number = process.argv[3];

// Validate seed type if necessary, for now, we'll assume it's passed as a string
// and can be used directly. If it needed to be a number, more parsing would be required.

summarizeAndHash(inputText, inputSeed);

// Example of how to run:
// ts-node src/tools/summarize.ts "Hello world, this is a test." "mySecretSeed123"
// ts-node src/tools/summarize.ts "Another example for hashing." 42
