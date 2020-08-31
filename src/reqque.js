import { init } from "./config";
import { makeRequest } from "./http";
import { initRequestObject, wait } from "./utils";
import { Status } from "./enums";

const reqque = async (requests, requestTemplate, customConfig) => {
  const config = init(customConfig);
  const requestQueue = requests.map(initRequestObject);
  const results = Array(requestQueue.length);

  while (requestQueue.length > 0) {
    const isBatchActive = config.batch.active;
    const batchSize = config.batch.size.value;
    const requestCount = isBatchActive ? batchSize : 1;
    const batch = requestQueue.splice(0, requestCount);

    const batchRequests = batch.map(({ index, tryCount }) => {
      const request = requests[index];

      return makeRequest(
        { request, tryCount },
        requestTemplate,
        config.maxRetries
      );
    });

    const batchResults = await Promise.all(batchRequests);

    batch.forEach(({ index, tryCount }, i) => {
      const result = batchResults[i];

      if (result.status === Status.PENDING) {
        requestQueue.push({ index, tryCount: tryCount + 1 });
      }

      results[index] = result;
    });

    if (config.delay.active) {
      await wait(config.delay.duration.value);
    }
  }

  return results;
};

export default reqque;
