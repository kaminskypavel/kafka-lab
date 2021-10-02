import chalk from "chalk";
import { kafka, TOPIC } from "./commons";

(async () => {
  const consumer = kafka.consumer({ groupId: "test-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(chalk.yellow`new message`);
      console.log(JSON.parse(message.value.toString()));
    },
  });
  
})();
