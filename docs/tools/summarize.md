# Tool: summarize

## Purpose

The `summarize` tool is intended to provide concise summaries of text content. In its current S1 implementation, its primary function is to demonstrate deterministic hashing.

## How it Works (Current S1 Implementation)

The current version of the `summarize` tool performs the following actions:
1.  Accepts an input string (`text`) and a `seed` value.
2.  Performs a simple deterministic analysis: counts the number of words and characters in the input `text`.
3.  Calculates a SHA-256 hash by combining the input `text` and the `seed`. This ensures that for the same input and seed, the output hash is always identical, demonstrating deterministic behavior.

## Usage (via CLI script)

To run the `summarize` tool, use the following command from the project root, providing the text and seed as arguments:

```bash
pnpm exec ts-node src/tools/summarize.ts "<your-text-here>" "<your-seed-here>"
```

**Example:**

```bash
pnpm exec ts-node src/tools/summarize.ts "Hello world from Axon" "seed123"
```

## Output

The tool will print:
*   The word and character count of the input text.
*   The calculated SHA-256 hash.

**Example Output:**
```
Word count: 4, Character count: 19
Deterministic Hash (SHA-256): <some_sha256_hash_value>
```

## Future Integration

In future versions, the `summarize` tool will leverage Large Language Models (LLMs) to generate actual summaries of the provided text, while still maintaining deterministic outputs through controlled seeds and model parameters. It will be callable via the Axon interpreter (e.g., `axon call summarize --text "..." --seed 42`).
