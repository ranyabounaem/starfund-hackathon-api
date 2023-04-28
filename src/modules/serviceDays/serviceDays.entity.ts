import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Service } from '../services/services.entity';
import { Day } from 'src/common/enums/day.enum';

@Entity('serviceDay')
@ObjectType()
export class ServiceDay extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Service, (service) => service.serviceDays)
  @JoinColumn({ name: 'service' })
  @Field(() => Service)
  service: Service;

  @Column({ type: 'enum', enum: Day })
  @Field(() => Day)
  weekDay: number;

  @Column()
  time: string;

  @Column()
  duration: number;
}
