import { Injectable } from '@nestjs/common';
import { Kafka, logLevel } from 'kafkajs';

@Injectable()
export class KafkaProducerService {
  private kafka: Kafka;
  private producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'api-notificacao-producer',
      brokers: ['kafka:9092'],
      logLevel: logLevel.ERROR, // opcional: defina o nível de log conforme necessário
    });

    this.producer = this.kafka.producer();
  }

  async sendMessage(topic: string, message: string): Promise<void> {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
    await this.producer.disconnect();
  }
}
