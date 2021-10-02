import { kafka, TOPIC } from "./commons";
import faker from "faker";
import chalk from "chalk";

(async () => {
  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: TOPIC,
    messages: [
      {
        value: JSON.stringify({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          action: faker.git.commitMessage(),
        }),
      },
    ],
  });
  console.log(chalk.yellow`Message sent successfully`);

  await producer.disconnect();
})();
