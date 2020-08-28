# reqque

[<img src="https://img.shields.io/github/package-json/v/furkankose/reqque" alt="Package Version" />](https://github.com/furkankose/reqque/releases/latest) [<img src="https://codecov.io/gh/furkankose/reqque/branch/master/graph/badge.svg?token=CGGJT5NCB0" alt="Codecov Report" />](http://codecov.io/gh/furkankose/reqque?branch=master) [<img src="https://img.shields.io/github/license/furkankose/reqque" alt="MIT Licence" />](LICENSE)

Promise based JavaScript library that enables you to make numerous HTTP requests without bumping into the rate limits

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Config](#config)
- [Result Schema](#result-schema)
- [Resources](#resources)
- [License](#license)

## Features

- Make parallel/concurrent HTTP requests by splitting your requests into batches
- Make sequential HTTP requests
- Put some delay between requests
- Retry failed requests again until reaching the specified retry limits

## Installation

Using npm:

```bash
$ npm install reqque
```

Using yarn:

```bash
$ yarn add reqque
```

## Usage

**reqque(requests, requestTemplate, config)**

reqque has a very simple usage. You just need to pass **3 arguments** to start the machine;

1. **requests** _(required)_: The list of request items that will be passed to requestTemplate
2. **requestTemplate** _(required)_: The template that takes request item as parameter and makes the HTTP call by using the passed request item
3. **config** _(optional)_: custom reqque config

## Examples

There are two different examples that are prepared to guide you on how to use reqque; these are [basic.js](/examples/basic.js) and [advanced.js](/examples/advanced.js).

In both examples, Axios is used to make HTTP requests easily configurable. You can replace Axios with any HTTP client that you prefer.

PS: You can access the executable example files under the examples folder.

### Basic

Basic usage of reqque

[/example/basic.js](/examples/basic.js)

```js
import axios from "axios";
import reqque from "reqque";

(async () => {
  const requests = [
    "https://httpstat.us/200?sleep=100",
    /*
    "...",
    "...",
    */
  ];

  const requestTemplate = async (url) => axios.get(url);

  const config = {
    maxRetries: 2,
    batch: {
      size: {
        limit: 5,
      },
    },
    delay: {
      duration: {
        limit: 1000,
      },
    },
  };

  const results = await reqque(requests, requestTemplate, config);
})();
```

### Advanced

This example shows you to how you can disguise your requests while making HTTP calls with reqque.

[/example/advanced.js](/examples/advanced.js)

```js
import axios from "axios";
import UserAgent from "user-agents";
import HttpsProxyAgent from "https-proxy-agent";
import reqque from "reqque";

(async () => {
  const requests = [
    {
      method: "GET",
      code: 200,
      sleep: 100,
    },
    /*
    {...},
    {...},
    */
  ];

  const proxyList = [
    "110.164.253.85:8080",
    /*
   "...",
   "...",
    */
  ];

  const requestTemplate = async ({ method, code, sleep }) => {
    const randomProxyIndex = Math.floor(Math.random() * proxyList.length);
    const randomProxy = proxyList[randomProxyIndex];
    const httpsAgent = new HttpsProxyAgent(`http://${randomProxy}`);
    const userAgent = new UserAgent();

    return axios({
      url: `http://httpstat.us/${code}`,
      query: { sleep },
      headers: {
        "User-Agent": userAgent,
      },
      method,
      httpsAgent,
    });
  };

  const config = {
    maxRetries: 5,
    batch: {
      size: {
        limit: 5,
      },
    },
  };

  const results = await reqque(requests, requestTemplate, config);
})();
```

## Config

These are the available options of reqque config. All of them are optional. It will use the default options unless you specify custom values

```js
{
    // `maxRetries` defines the maximum number of retries.
    // If set to 0, the failed requests won't be retried.
    maxRetries: 5, // default

    // `batch` defines the options of batch request feature.
    batch: {
        // `active` indicates whether or not the batch request feature is active
        // If set to true, the requests will be splitted into batches and the requests in those batches will be made concurrently
        // If set to false, the requests will be made sequentially one by one
        active: true, // default

        // `size` defines the size options of batch request feature.
        size: {
            // `limit` defines the number of requests that are placed in each batch
            limit: 20, // default

            // `random` indicates whether or not the batch size is random
            // If set to true, a random batch size that is generated between 0 and limit value will be used in each iteration
            // If set to false, a fixed batch size will be used in each iteration
            random: false // default
        }
    },

    // `delay` defines the options of delay feature.
    delay: {
        // `active` indicates whether or not the delay feature is active
        // If set to true, it will be put some delay between each iterations
        // If set to false, it won't be put any delay between iterations
        active: true, // default

        // `duration` defines the duration options of delay feature.
        duration: {
            // `limit` defines the amount of delays that are put between each iterations
            limit: 20, // default

            // `random` indicates whether or not the delay duration is random
            // If set to true, a random delay duration that is generated between 0 and limit value will be used in each iteration
            // If set to false, a fixed delay duration will be used in each iteration
            random: false // default
        }
    }
}
```

## Result Schema

The result for a reqque request contains the following information.

```js
{
    // request item that was passed to request template
    request: {},

    // response body that was provided by the server
    response: {},

    // status of the request
    status: "successful",

    // the total number of request attempts
    tryCount: 1
}
```

After all requests are completed, reqque splits the final results into two categories (successful and failed), and return the categorized results.

```js
{
  // `successful` contains the successfull reqque results
  successful: [
    {
        request: {},
        response: {},
        status: "successful",
        tryCount: 1,
    },
    /*
    {...},
    {...}
    */
  ],

  // `failed` contains the failed reqque results
  failed: [
    {
        request: {},
        response: {},
        status: "failed",
        tryCount: 5,
    },
    /*
    {...},
    {...}
    */
  ]
}
```

## Resources

- [Changelog](CHANGELOG.md)
- [Contribution Guide](CONTRIBUTING.md)

## License

[MIT](LICENSE)
