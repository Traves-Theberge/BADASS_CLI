import Ajv, { Schema } from 'ajv';

// Initialize Ajv
const ajv = new Ajv({ allErrors: true }); // allErrors: true to get all validation errors

/**
 * Validates data against a given JSON schema.
 *
 * @param schema The JSON schema object.
 * @param data The data to validate.
 * @returns True if the data is valid according to the schema, false otherwise.
 *          Logs validation errors to the console if validation fails.
 */
export function validate(schema: Schema, data: any): boolean {
  try {
    const validateFunction = ajv.compile(schema);
    const valid = validateFunction(data);

    if (!valid) {
      console.error("Validation errors:", validateFunction.errors);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error compiling schema or during validation:", error);
    return false;
  }
}

// Example usage (optional, can be removed or kept for testing)
/*
import acmSchema from './schemas/acm.schema.json';

const validData = {
  tool: "exampleTool",
  args: { param1: "value1" },
  seed: 12345
};

const invalidDataMissingSeed = {
  tool: "anotherTool",
  args: {}
  // seed is missing
};

const invalidDataWrongType = {
  tool: "yetAnotherTool",
  args: { key: "value" },
  seed: { complex: "object" } // seed should be string or number
};

console.log("Validating validData:", validate(acmSchema, validData)); // Expected: true
console.log("Validating invalidDataMissingSeed:", validate(acmSchema, invalidDataMissingSeed)); // Expected: false
console.log("Validating invalidDataWrongType:", validate(acmSchema, invalidDataWrongType)); // Expected: false
*/
