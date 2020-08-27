import { init } from "./config";
import { makeRequest } from "./http";
import { wait } from "./utils";
import { Status } from "./enums";

const reqque = async (requests, requestTemplate, customConfig) => {
  const config = init(customConfig);
  const requestQueue = requests.map((request) => ({ request }));
  const results = { successful: [], failed: [] };

  while (requestQueue.length > 0) {
    const isBatchActive = config.batch.active;
    const batchSize = config.batch.size.value;
    const requestCount = isBatchActive ? batchSize : 1;
    const batch = requestQueue.splice(0, requestCount);

    const batchRequests = batch.map((request) => {
      return makeRequest(request, requestTemplate, config.maxRetries);
    });

    const batchResults = await Promise.all(batchRequests);

    batchResults.forEach((batchResult) => {
      switch (batchResult.status) {
        case Status.PENDING:
          requestQueue.push(batchResult);
          break;
        case Status.FAILED:
          results.failed.push(batchResult);
          break;
        default:
          results.successful.push(batchResult);
      }
    });

    if (config.delay.active) {
      await wait(config.delay.duration.value);
    }
  }

  return results;
};

export default reqque;
