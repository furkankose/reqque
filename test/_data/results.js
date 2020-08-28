const results = {
  successful: [
    {
      request: { id: 1 },
      response: {
        id: 1,
        firstName: "Bennie",
        lastName: "Dickinson",
        email: "Bennie26@yahoo.com",
      },
      status: "successful",
      tryCount: 1,
    },
    {
      request: { id: 2 },
      response: {
        id: 2,
        firstName: "Johan",
        lastName: "Lang",
        email: "Johan_Lang15@gmail.com",
      },
      status: "successful",
      tryCount: 1,
    },
    {
      request: { id: 4 },
      response: {
        id: 4,
        firstName: "Olin",
        lastName: "Reichel",
        email: "Olin_Reichel46@yahoo.com",
      },
      status: "successful",
      tryCount: 1,
    },
    {
      request: { id: 6 },
      response: {
        id: 6,
        firstName: "Amos",
        lastName: "Kassulke",
        email: "Amos61@yahoo.com",
      },
      status: "successful",
      tryCount: 1,
    },
    {
      request: { id: 8 },
      response: {
        id: 8,
        firstName: "Rasheed",
        lastName: "Rodriguez",
        email: "Rasheed_Rodriguez@hotmail.com",
      },
      status: "successful",
      tryCount: 1,
    },
    {
      request: { id: 9 },
      response: {
        id: 9,
        firstName: "Nico",
        lastName: "Hermiston",
        email: "Nico10@gmail.com",
      },
      status: "successful",
      tryCount: 1,
    },
  ],
  failed: [
    {
      request: { id: 3 },
      response: {
        message: "The user with id '3' couldn't be found",
        status: "NotFound",
        statusCode: 404,
      },
      status: "failed",
      tryCount: 11,
    },
    {
      request: { id: 5 },
      response: {
        message: "The user with id '5' couldn't be found",
        status: "NotFound",
        statusCode: 404,
      },
      status: "failed",
      tryCount: 11,
    },
    {
      request: { id: 7 },
      response: {
        message: "The user with id '7' couldn't be found",
        status: "NotFound",
        statusCode: 404,
      },
      status: "failed",
      tryCount: 11,
    },
    {
      request: { id: 10 },
      response: {
        message: "The user with id '10' couldn't be found",
        status: "NotFound",
        statusCode: 404,
      },
      status: "failed",
      tryCount: 11,
    },
  ],
};

export default results;
