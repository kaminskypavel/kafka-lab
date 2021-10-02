import chalk from "chalk";
import { kafka, TOPIC } from "./../kafka";

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
