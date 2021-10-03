import chalk from 'chalk';
import faker from 'faker';
import path from 'path';

import { kafka } from './../kafka';

const TOPIC = path.parse(__dirname).base;

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
  console.log(chalk.yellow`Producer: message sent successfully`);

  await producer.disconnect();
})();
