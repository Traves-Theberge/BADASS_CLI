/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'], // Look for tests in the tests directory
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // ts-jest configuration options
        tsconfig: 'tsconfig.json', // ensure it uses our tsconfig
      },
    ],
  },
  // Optional: Setup files to run before each test file
  // setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],

  // Optional: Code coverage configuration
  // collectCoverage: true,
  // coverageDirectory: "coverage",
  // coverageReporters: ["json", "lcov", "text", "clover"],
  // collectCoverageFrom: [
  //   "src/**/*.ts",
  //   "!src/server.ts", // Example: Exclude server startup file from coverage
  //   "!src/tools/**" // Example: Exclude tools if they are tested via execSync
  // ],
  testTimeout: 10000, // Increase timeout for tests involving child processes
};
