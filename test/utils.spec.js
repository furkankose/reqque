import { wait } from "../src/utils";

jest.useFakeTimers();

describe("Utils", () => {
  describe("wait", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should wait 1500 milliseconds", async () => {
      const milliseconds = 1500;

      wait(milliseconds);

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(
        expect.any(Function),
        milliseconds
      );
    });
  });
});
