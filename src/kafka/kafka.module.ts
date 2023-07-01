import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { KafkaConsumerService } from './kafka-consumer.service';
import { KafkaProducerService } from './kafka-producer.service';

@Module({
  providers: [KafkaConsumerService,KafkaProducerService],
  exports:[KafkaConsumerService,KafkaProducerService]
})
export class KafkaModule {}
