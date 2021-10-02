import faker from "faker";

export const generateRandomMessage = () => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  action: faker.git.commitMessage(),
});
