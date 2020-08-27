import AJV from "ajv";
import configSchema from "./schema";

const defineValueProperty = (object) => {
  Object.defineProperty(object, "value", {
    get() {
      if (object.random) {
        return Math.floor(Math.random() * object.limit) + 1;
      }

      return object.limit;
    },
    enumerable: true,
  });
};

const init = (customConfig) => {
  // clone custom config object to avoid side effect
  const config = JSON.parse(JSON.stringify(customConfig));

  const ajv = new AJV({
    coerceTypes: true,
    useDefaults: true,
    removeAdditional: true,
  });

  // validate schema and use default limits of not specified options
  const isConfigValid = ajv.validate(configSchema, config);

  if (!isConfigValid) {
    throw Error(ajv.errorsText());
  }

  defineValueProperty(config.batch.size);
  defineValueProperty(config.delay.duration);

  return config;
};

export { init };
