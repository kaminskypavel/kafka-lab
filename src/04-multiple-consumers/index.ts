import chalk from "chalk";
import path from "path";

import { kafka } from "../kafka";
import { generateRandomMessage } from "../commons";
import faker from "faker";

const TOPIC = path.parse(__dirname).base;

const producer = kafka.producer();
const consumer1 = kafka.consumer({ groupId: "test-group" });
const consumer2 = kafka.consumer({ groupId: "test-group" });

(async () => {
  console.log(1);
  await producer.connect();
  await consumer1.connect();
  await consumer2.connect();

  await consumer1.subscribe({ topic: TOPIC, fromBeginning: true });
  await consumer2.subscribe({ topic: TOPIC, fromBeginning: true });

  await consumer1.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(chalk.green`Consumer1:`);
      console.log(chalk.green(message.value.toString()));
    },
  });

  await consumer1.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(chalk.blue`Consumer2:`);
      console.log(chalk.blue(message.value.toString()));
      message
    },
  });

  setInterval(async () => {
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
    console.log(chalk.yellow`Producer: message sent successfully`);
  }, 200);
})();
