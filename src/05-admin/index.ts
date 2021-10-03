import chalk from "chalk";
import path from "path";

import { kafka } from "../kafka";
import { generateRandomMessage } from "./../commons";

const admin = kafka.admin();

(async () => {
  const topics = await admin.listTopics();
  const [firstTopic] = topics;

  const metaData = await admin.fetchTopicMetadata({ topics: [firstTopic] });

  const offset = await admin.fetchTopicOffsets(firstTopic);

  console.log(chalk.blue(`TOPICS: ${topics}`));
  console.log(chalk.blue(`META: ${JSON.stringify(metaData)}`));
  console.log(chalk.blue(`OFFSET: ${JSON.stringify(offset)}`));
})();
