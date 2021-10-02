import { kafka, TOPIC } from "../kafka";
import faker from "faker";
import chalk from "chalk";
import { generateRandomMessage } from "./../commons";

const producer = kafka.producer();

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
