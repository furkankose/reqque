import { makeRequest } from "../../src/http";

import requestTemplate from "../_data/requestTemplate";
import expectedResults from "../_data/results";
import { Status } from "../../src/enums";

describe("Http", () => {
  describe("makeRequest", () => {
    let request;
    let tryCount;
    let retryLimit;

    beforeEach(() => {
      request = { id: 3 };
      tryCount = 5;
      retryLimit = 10;
    });

    it("should return successful result", async () => {
      request.id = 1;

      const result = await makeRequest(
        { request },
        requestTemplate,
        retryLimit
      );

      expect(result).toEqual(expectedResults.successful[0]);
    });

    it("should return result with status pending", async () => {
      const result = await makeRequest(
        { request, tryCount },
        requestTemplate,
        retryLimit
      );

      expect(result).toEqual({
        ...expectedResults.failed[0],
        status: Status.PENDING,
        tryCount: tryCount + 1,
      });
      expect(result.status).toEqual(Status.PENDING);
    });

    it("should return result with status failed", async () => {
      tryCount = 10;

      const result = await makeRequest(
        { request, tryCount },
        requestTemplate,
        retryLimit
      );

      expect(result).toEqual(expectedResults.failed[0]);
      expect(result.status).toEqual(Status.FAILED);
    });

    it("should return result with status failed", async () => {
      tryCount = 12;

      const result = await makeRequest(
        { request, tryCount },
        requestTemplate,
        retryLimit
      );

      expect(result.status).toEqual(Status.FAILED);
    });
  });
});
