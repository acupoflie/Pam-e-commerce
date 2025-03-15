import Ajv, { Schema } from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

export const ValidateRequest = <T>(input: unknown, schema: Schema) => {
  const validatedInput = ajv.compile<T>(schema);

  if (validatedInput(input)) {
    return false;
  }

  const errors = validatedInput.errors?.map((error) => ({
    field: error.instancePath,
    message: error.message,
  }));

  return errors;
};
