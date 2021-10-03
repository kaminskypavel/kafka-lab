import chalk from 'chalk';
import path from 'path';

import { kafka } from '../kafka';
import { generateRandomMessage } from './../commons';

const producer = kafka.producer();
const TOPIC = path.parse(__dirname).base;

const produceMessage = async (index:number) => {
  const message = JSON.stringify(generateRandomMessage(), null, 2);

  await producer.send({
    topic: "02-load-testing",
    messages: [
      {
        value: message,
      },
    ],
  });
  console.log(chalk.yellow`${index} Producer: message sent successfully \n${message}`);
};

(async () => {
  await producer.connect();

  await Promise.all(
    Array.from(Array(10000)).map((x, i) => {
      return produceMessage(i);
    })
  );

  await producer.disconnect();
})();
