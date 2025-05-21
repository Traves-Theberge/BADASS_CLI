// This file contains deliberate linting errors for testing purposes.

// Example of an unused variable (should trigger @typescript-eslint/no-unused-vars)
const unusedVariable = "I am not used";

// Example of using 'any' type (should trigger @typescript-eslint/no-explicit-any if rule is enabled)
let data: any;
data = "some data";

function problematicFunction(param1) { // Missing type for param1
  const x = 10; // unused
  console.log(data);
  return param1;
}

// Missing return type
function anotherProblem() {
  const test = 1;
}

// Using var instead of let or const (if eslint:recommended is active)
var oldStyleVar = "old";

// Inconsistent spacing or formatting if specific prettier/eslint rules were set for that
// (though the default recommended set might not be very strict on this)

export default problematicFunction;
