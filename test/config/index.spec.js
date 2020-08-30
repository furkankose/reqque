import { init } from "../../src/config";
import expectedConfig from "../_data/config";

describe("Config", () => {
  describe("init", () => {
    let config;

    beforeEach(() => {
      config = {
        batch: { size: {} },
        delay: { duration: {} },
      };
    });

    it("should return default reqque config", () => {
      expect(init()).toMatchObject(expectedConfig);
    });

    it("should return reqque config", () => {
      expect(init(config)).toMatchObject(expectedConfig);
    });

    it("should return reqque config with random batch size between 0 and 2", () => {
      const batchSizeLimit = 2;

      config.batch.size.limit = batchSizeLimit;
      config.batch.size.random = true;

      for (let i = 0; i < 50; i += 1) {
        const batchSizeValue = init(config).batch.size.value;

        expect(batchSizeValue).toBeGreaterThan(0);
        expect(batchSizeValue).toBeLessThanOrEqual(batchSizeLimit);
      }
    });

    it("should return reqque config with random delay duration between 0 and 2", () => {
      const delayDurationLimit = 2;

      config.delay.duration.limit = delayDurationLimit;
      config.delay.duration.random = true;

      for (let i = 0; i < 50; i += 1) {
        const delayDurationValue = init(config).delay.duration.value;

        expect(delayDurationValue).toBeGreaterThan(0);
        expect(delayDurationValue).toBeLessThanOrEqual(delayDurationLimit);
      }
    });

    it("should throw validation error if the schema validation fails", () => {
      config.delay.duration.random = "invalidRandomParameter";

      expect(() => {
        init(config);
      }).toThrow();
    });
  });
});
