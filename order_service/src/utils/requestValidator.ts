import Ajv, { Schema } from "ajv";

const ajv = new Ajv();

export const ValidateRequest = <T>(schema: Schema, input: unknown) => {
  let validate = ajv.compile<T>(schema);

  if (validate(input)) {
    return false;
  }

  const errors = validate.errors?.map((error) => ({
    target: error.instancePath,
    message: error.message,
  }));

  return errors;
};
