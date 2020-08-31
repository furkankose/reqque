import reqque from "../src/reqque";

import requests from "./_data/requests";
import requestTemplate from "./_data/requestTemplate";
import expectedResults from "./_data/results";

describe("reqque", () => {
  let config;
  const maxRetries = 10;
  const maxRequestCount = requests.length * (maxRetries + 1);
  const successfulRequestCount = 6;
  const redundantRequestCount = successfulRequestCount * maxRetries;
  const totalRequestCount = maxRequestCount - redundantRequestCount;

  beforeEach(() => {
    config = {
      batch: { size: { limit: 2 } },
      delay: { duration: { limit: 1000 } },
      maxRetries,
    };

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should make parallel requests", async () => {
    const reqquePromise = reqque(requests, requestTemplate, config);

    for (let i = 0; i < maxRequestCount; i += 1) {
      await new Promise(setImmediate);
      jest.advanceTimersByTime(config.delay.duration.limit);
    }

    const reqqueResults = await reqquePromise;

    expect(reqqueResults).toEqual(expectedResults);
    expect(setTimeout).toHaveBeenCalledTimes(
      totalRequestCount / config.batch.size.limit
    );
  });

  it("should make sequential requests", async () => {
    config.batch.active = false;

    const reqquePromise = reqque(requests, requestTemplate, config);

    for (let i = 0; i < maxRequestCount; i += 1) {
      await new Promise(setImmediate);
      jest.advanceTimersByTime(config.delay.duration.limit);
    }

    const reqqueResults = await reqquePromise;

    expect(reqqueResults).toEqual(expectedResults);
    expect(setTimeout).toHaveBeenCalledTimes(totalRequestCount);
  });

  it("should make requests without any delay", async () => {
    config.delay.active = false;

    const reqquePromise = reqque(requests, requestTemplate, config);

    for (let i = 0; i < maxRequestCount; i += 1) {
      await new Promise(setImmediate);
      jest.runAllTimers();
    }

    const reqqueResults = await reqquePromise;

    expect(reqqueResults).toEqual(expectedResults);
    expect(setTimeout).toHaveBeenCalledTimes(0);
  });
});
