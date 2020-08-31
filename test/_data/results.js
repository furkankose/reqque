const results = [
  {
    request: {
      id: 1,
    },
    tryCount: 1,
    response: {
      id: 1,
      firstName: "Bennie",
      lastName: "Dickinson",
      email: "Bennie26@yahoo.com",
    },
    status: "successful",
  },
  {
    request: {
      id: 2,
    },
    tryCount: 1,
    response: {
      id: 2,
      firstName: "Johan",
      lastName: "Lang",
      email: "Johan_Lang15@gmail.com",
    },
    status: "successful",
  },
  {
    request: {
      id: 3,
    },
    tryCount: 11,
    response: {
      message: "The user with id '3' couldn't be found",
      status: "NotFound",
      statusCode: 404,
    },
    status: "failed",
  },
  {
    request: {
      id: 4,
    },
    tryCount: 1,
    response: {
      id: 4,
      firstName: "Olin",
      lastName: "Reichel",
      email: "Olin_Reichel46@yahoo.com",
    },
    status: "successful",
  },
  {
    request: {
      id: 5,
    },
    tryCount: 11,
    response: {
      message: "The user with id '5' couldn't be found",
      status: "NotFound",
      statusCode: 404,
    },
    status: "failed",
  },
  {
    request: {
      id: 6,
    },
    tryCount: 1,
    response: {
      id: 6,
      firstName: "Amos",
      lastName: "Kassulke",
      email: "Amos61@yahoo.com",
    },
    status: "successful",
  },
  {
    request: {
      id: 7,
    },
    tryCount: 11,
    response: {
      message: "The user with id '7' couldn't be found",
      status: "NotFound",
      statusCode: 404,
    },
    status: "failed",
  },
  {
    request: {
      id: 8,
    },
    tryCount: 1,
    response: {
      id: 8,
      firstName: "Rasheed",
      lastName: "Rodriguez",
      email: "Rasheed_Rodriguez@hotmail.com",
    },
    status: "successful",
  },
  {
    request: {
      id: 9,
    },
    tryCount: 1,
    response: {
      id: 9,
      firstName: "Nico",
      lastName: "Hermiston",
      email: "Nico10@gmail.com",
    },
    status: "successful",
  },
  {
    request: {
      id: 10,
    },
    tryCount: 11,
    response: {
      message: "The user with id '10' couldn't be found",
      status: "NotFound",
      statusCode: 404,
    },
    status: "failed",
  },
];

export default results;
