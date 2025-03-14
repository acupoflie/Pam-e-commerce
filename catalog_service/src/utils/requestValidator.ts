import Ajv, { Schema } from "ajv";

const ajv = new Ajv();

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
