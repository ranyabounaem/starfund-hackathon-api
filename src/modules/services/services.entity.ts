// import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { BookedSlot } from '../bookedSlots/bookedSlots.entity';
import { Break } from '../breaks/breaks.entity';
import { ServiceDay } from '../serviceDays/serviceDays.entity';

@Entity('service')
// @ObjectType()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @Field()
  name: string;

  @OneToMany(() => BookedSlot, (bookedSlot) => bookedSlot.service)
  // @Field(() => [BookedSlot], { nullable: true })
  bookedSlots: BookedSlot[];

  @OneToMany(() => Break, (breakInstance) => breakInstance.service, {
    cascade: true,
    nullable: true,
  })
  // @Field(() => [Break])
  breaks: Break[];

  @OneToMany(() => ServiceDay, (serviceDay) => serviceDay.service, {
    cascade: true,
  })
  // @Field(() => [ServiceDay])
  serviceDays: ServiceDay[];

  @Column()
  // @Field(() => Int)
  slotDuration: number;

  @Column()
  // @Field(() => Int)
  breakBetweenSlots: number;

  @Column()
  // @Field(() => Int)
  allowedBookingInterval: number;

  @Column()
  // @Field(() => Int)
  maxClientsPerSlot: number;
}
