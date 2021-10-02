import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "kafka-lab-consumer",
    brokers: ["kafka:9092"],
});



export const TOPIC = "test-topic1";