const initRequestObject = (_, index) => {
  return {
    tryCount: 0,
    index,
  };
};

const wait = async (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export { initRequestObject, wait };
