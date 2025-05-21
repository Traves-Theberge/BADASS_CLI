# Tool: lint-typescript

## Purpose

The `lint-typescript` tool analyzes your TypeScript code for potential errors, style issues, and adherence to configured linting rules. It helps maintain code quality and consistency across your project.

## How it Works (Current Implementation)

Currently, this tool is a script that uses ESLint and its TypeScript plugins (`@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`) to perform linting.

## Usage (via CLI script)

To run the `lint-typescript` tool on a specific file or directory, use the following command from the project root:

```bash
pnpm exec ts-node src/tools/lint-typescript.ts <path-to-file-or-directory>
```

**Example:**

To lint a file named `my-script.ts` in the `src` directory:
```bash
pnpm exec ts-node src/tools/lint-typescript.ts src/my-script.ts
```

To lint all files in the `src` directory:
```bash
pnpm exec ts-node src/tools/lint-typescript.ts src
```

## Output

The tool will print linting results to the console, including any errors or warnings found. It will exit with a non-zero code if errors are present.

## Future Integration

This tool will be integrated into the `axon dash` and can be called via the Axon interpreter, allowing for more seamless execution within Axon flows (e.g., `axon call lint-typescript --path src`).
