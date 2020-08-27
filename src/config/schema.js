const MaxRetries = {
  type: "integer",
  minimum: 0,
  default: 5,
};

const Batch = {
  type: "object",
  properties: {
    active: {
      type: "boolean",
      default: true,
    },
    size: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          minimum: 1,
          default: 20,
        },
        random: {
          type: "boolean",
          default: false,
        },
      },
      default: {},
      additionalProperties: false,
    },
  },
  default: {},
  additionalProperties: false,
};

const Delay = {
  type: "object",
  properties: {
    active: {
      type: "boolean",
      default: true,
    },
    duration: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          minimum: 1,
          default: 300,
        },
        random: {
          type: "boolean",
          default: false,
        },
      },
      default: {},
      additionalProperties: false,
    },
  },
  default: {},
  additionalProperties: false,
};

const Config = {
  type: "object",
  properties: {
    maxRetries: MaxRetries,
    batch: Batch,
    delay: Delay,
  },
  additionalProperties: false,
};

export default Config;
