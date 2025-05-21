import { ESLint } from 'eslint';
import path from 'path';

async function lintFiles(targetPath: string): Promise<void> {
  // 1. Create an instance of ESLint with the configuration passed to the constructor.
  // Assumes .eslintrc.js is in the project root where this script will be run from.
  const eslint = new ESLint({
    // Optionally, override some options here if needed,
    // otherwise, it defaults to ESLint's standard configuration discovery.
    // cwd: process.cwd(), // Ensures ESLint looks for config from the current working directory
  });

  try {
    // 2. Lint files. This is an asynchronousESTL operation.
    console.log(`Linting path: ${targetPath}`);
    const results = await eslint.lintFiles([targetPath]);

    // 3. Format the results.
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = await formatter.format(results);

    // 4. Output it.
    if (resultText) {
      console.log(resultText);
    } else {
      console.log("No linting issues found.");
    }

    // 5. Determine if there were errors
    let hasErrors = false;
    results.forEach(result => {
      if (result.errorCount > 0) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      console.error("Linting completed with errors.");
      process.exit(1);
    } else {
      console.log("Linting completed successfully (no errors).");
      process.exit(0);
    }

  } catch (error) {
    console.error("Error during linting:", error);
    process.exit(1);
  }
}

// Main execution
if (process.argv.length < 3) {
  console.error("Usage: ts-node src/tools/lint-typescript.ts <fileOrDirectoryPath>");
  process.exit(1);
}

const targetPath = process.argv[2];
const absoluteTargetPath = path.resolve(targetPath); // Resolve to absolute path for clarity

lintFiles(absoluteTargetPath).catch(error => {
  console.error("Unhandled error in lintFiles:", error);
  process.exit(1);
});
