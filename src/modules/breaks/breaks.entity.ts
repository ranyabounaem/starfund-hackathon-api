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

@Entity('break')
@ObjectType()
export class Break extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => Service, (service) => service.breaks)
  @JoinColumn({ name: 'service' })
  @Field(() => Service)
  service: Service;

  @Column({ type: 'enum', enum: Day })
  @Field()
  weekDay: number;

  @Column()
  @Field()
  time: string;

  @Column()
  @Field(() => Int)
  duration: number;
}
