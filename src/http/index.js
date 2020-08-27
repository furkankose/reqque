import { Status } from "../enums";

const makeRequest = async (
  { request, tryCount = 0 },
  requestTemplate,
  retryLimits
) => {
  const result = {
    request,
    tryCount: tryCount + 1,
  };

  try {
    result.response = await requestTemplate(request);
    result.status = Status.SUCCESSFUL;
  } catch (error) {
    const isRetryLimitReached = retryLimits <= tryCount;

    result.response = { ...error };
    result.status = isRetryLimitReached ? Status.FAILED : Status.PENDING;
  }

  return result;
};

export { makeRequest };
