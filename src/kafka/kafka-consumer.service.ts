import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, logLevel } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka: Kafka;
  private consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'api-notificacao-consumer',
      brokers: ['kafka:9092'],
      logLevel: logLevel.ERROR, // opcional: defina o nível de log conforme necessário
    });

    this.consumer = this.kafka.consumer({ 
        groupId: 'group-api-notificacao-consumer' });
  }

  async onModuleInit() {
    await this.consumer.connect();
  }

  async subscribe(topic: string, callback: (message: string) => void): Promise<void> {
    await this.consumer.subscribe({ topic });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const value = message.value.toString();
        callback(value);
      },
    });
  }
}
