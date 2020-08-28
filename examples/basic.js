import axios from "axios";
import reqque from "../dist/reqque.esm.js"; // eslint-disable-line import/extensions

(async () => {
  const requests = [
    "https://httpstat.us/200?sleep=100",
    "https://httpstat.us/400?sleep=290",
    "https://httpstat.us/201?sleep=35",
    "https://httpstat.us/500?sleep=700",
    "https://httpstat.us/200?sleep=350",
    "https://httpstat.us/200?sleep=450",
    "https://httpstat.us/404?sleep=85",
  ];

  const requestTemplate = async (url) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (e) {
      return Promise.reject(e.response.data);
    }
  };

  const config = {
    maxRetries: 2,
    batch: {
      size: {
        limit: 2,
      },
    },
    delay: {
      duration: {
        limit: 1000,
      },
    },
  };

  const results = await reqque(requests, requestTemplate, config);

  console.log(results); //eslint-disable-line
  /*
  {
    "successful": [
      {
        "request": "https://httpstat.us/200?sleep=100",
        "tryCount": 1,
        "response": {
          "code": 200,
          "description": "OK"
        },
        "status": "successful"
      },
      {
        "request": "https://httpstat.us/201?sleep=35",
        "tryCount": 1,
        "response": {
          "code": 201,
          "description": "Created"
        },
        "status": "successful"
      },
      {
        "request": "https://httpstat.us/200?sleep=350",
        "tryCount": 1,
        "response": {
          "code": 200,
          "description": "OK"
        },
        "status": "successful"
      },
      {
        "request": "https://httpstat.us/200?sleep=450",
        "tryCount": 1,
        "response": {
          "code": 200,
          "description": "OK"
        },
        "status": "successful"
      }
    ],
    "failed": [
      {
        "request": "https://httpstat.us/400?sleep=290",
        "tryCount": 3,
        "response": {
          "code": 400,
          "description": "Bad Request"
        },
        "status": "failed"
      },
      {
        "request": "https://httpstat.us/500?sleep=700",
        "tryCount": 3,
        "response": {
          "code": 500,
          "description": "Internal Server Error"
        },
        "status": "failed"
      },
      {
        "request": "https://httpstat.us/404?sleep=85",
        "tryCount": 3,
        "response": {
          "code": 404,
          "description": "Not Found"
        },
        "status": "failed"
      }
    ]
  }
  */
})();
