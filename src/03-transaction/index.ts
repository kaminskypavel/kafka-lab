import chalk from "chalk";
import path from "path";

import { kafka } from "../kafka";
import { generateRandomMessage } from "./../commons";

const TOPIC = path.parse(__dirname).base;

const producer = kafka.producer({
  // maxInFlightRequests: 1,
  transactionalId: `producer-${TOPIC}`,
  idempotent: true,
});
const consumer = kafka.consumer({ groupId: "test-group" });

const produceCommitedTx = async () => {
  const message = JSON.stringify(generateRandomMessage(), null, 2);
  try {
    const transaction = await producer.transaction();

    await transaction.send({
      topic: TOPIC,
      messages: [
        {
          value: message,
        },
      ],
    });
    await transaction.commit();
    console.log(chalk.yellow`Producer: message sent successfully \n${message}`);
  } catch (e) {
    console.error(chalk.bgRed.white`couldnt commit TX`);
    console.error(e);
  }
};
const produceAbortedTx = async () => {
  const message = JSON.stringify(generateRandomMessage(), null, 2);
  try {
    const transaction = await producer.transaction();

    await transaction.send({
      topic: TOPIC,
      messages: [
        {
          value: message,
        },
      ],
    });
    await transaction.abort();
    console.log(chalk.yellow`Producer: message aborted! \n${message}`);
  } catch (e) {
    console.error(chalk.bgRed.white`couldnt commit TX`);
    console.error(e);
  }
};

(async () => {
  await producer.connect();
  await consumer.connect();

  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(chalk.green`Consumer:  message received`);
      console.log(chalk.green(message.value.toString()));
    },
  });

  await produceCommitedTx();
  await produceAbortedTx();
})();
