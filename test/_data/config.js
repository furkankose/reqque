const config = {
  batch: {
    size: {
      limit: 20,
      random: false,
    },
    active: true,
  },
  delay: {
    duration: {
      limit: 300,
      random: false,
    },
    active: true,
  },
  maxRetries: 5,
};

export default config;
