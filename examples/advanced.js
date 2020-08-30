import axios from "axios";
import UserAgent from "user-agents";
import HttpsProxyAgent from "https-proxy-agent";
import reqque from "../dist/reqque.esm";

const getProxyList = async () => {
  const response = await axios.get(
    "https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=500&ssl=yes"
  );

  const proxyList = response.data.split("\r\n").slice(0, -1);

  if (proxyList.length === 0) {
    throw new Error("There is no available proxy, please try again later");
  }

  return proxyList;
};

(async () => {
  const requests = [
    {
      method: "POST",
      code: 200,
      sleep: 100,
    },
    {
      method: "GET",
      code: 400,
      sleep: 290,
    },
    {
      method: "POST",
      code: 201,
      sleep: 35,
    },
    {
      method: "DELETE",
      code: 500,
      sleep: 700,
    },
    {
      method: "PATCH",
      code: 200,
      sleep: 350,
    },
    {
      method: "GET",
      code: 200,
      sleep: 450,
    },
    {
      method: "POST",
      code: 404,
      sleep: 85,
    },
  ];

  const proxyList = await getProxyList();

  const requestTemplate = async ({ method, code, sleep }) => {
    const randomProxyIndex = Math.floor(Math.random() * proxyList.length);
    const randomProxy = proxyList[randomProxyIndex];
    const httpsAgent = new HttpsProxyAgent(`http://${randomProxy}`);
    const userAgent = new UserAgent();

    try {
      const response = await axios({
        url: `http://httpstat.us/${code}`,
        query: { sleep },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": userAgent.toString(),
        },
        method,
        httpsAgent,
      });

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
        limit: 2000,
        random: true,
      },
    },
  };

  const results = await reqque(requests, requestTemplate, config);

  console.log(results); //eslint-disable-line
  /*
  {
    "successful": [
      {
        "request": {
          "method": "POST",
          "code": 200,
          "sleep": 100
        },
        "tryCount": 1,
        "response": {
          "code": 200,
          "description": "OK"
        },
        "status": "successful"
      },
      {
        "request": {
          "method": "POST",
          "code": 201,
          "sleep": 35
        },
        "tryCount": 1,
        "response": {
          "code": 201,
          "description": "Created"
        },
        "status": "successful"
      },
      {
        "request": {
          "method": "PATCH",
          "code": 200,
          "sleep": 350
        },
        "tryCount": 1,
        "response": {
          "code": 200,
          "description": "OK"
        },
        "status": "successful"
      },
      {
        "request": {
          "method": "GET",
          "code": 200,
          "sleep": 450
        },
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
        "request": {
          "method": "GET",
          "code": 400,
          "sleep": 290
        },
        "tryCount": 3,
        "response": {
          "code": 400,
          "description": "Bad Request"
        },
        "status": "failed"
      },
      {
        "request": {
          "method": "DELETE",
          "code": 500,
          "sleep": 700
        },
        "tryCount": 3,
        "response": {
          "code": 500,
          "description": "Internal Server Error"
        },
        "status": "failed"
      },
      {
        "request": {
          "method": "POST",
          "code": 404,
          "sleep": 85
        },
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
