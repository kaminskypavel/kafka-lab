import chalk from 'chalk';
import path from 'path';

import { kafka } from './../kafka';

const TOPIC = path.parse(__dirname).base;

(async () => {
  const consumer = kafka.consumer({ groupId: "test-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(chalk.green`Consumer:  message received`);

      console.log(chalk.green(message.value.toString()));
    },
  });
})();
