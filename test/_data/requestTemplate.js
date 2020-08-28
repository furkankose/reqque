import users from "./users";

const requestTemplate = async ({ id }) =>
  new Promise((resolve, reject) => {
    const user = users.find(({ id: userId }) => userId === id);

    if (!user) {
      const error = Error();

      error.message = `The user with id '${id}' couldn't be found`;
      error.status = "NotFound";
      error.statusCode = 404;

      reject(error);
    }

    return resolve(user);
  });

export default requestTemplate;
