// import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BookedSlot } from '../bookedSlots/bookedSlots.entity';

@Entity('user')
// @ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  // @Field(() => Int)
  id: number;

  @Column()
  // @Field()
  firstName: string;

  @Column()
  // @Field()
  lastName: string;

  @Column()
  // @Field()
  email: string;

  @ManyToOne(() => BookedSlot, (bookedSlot) => bookedSlot.users)
  @JoinColumn({ name: 'bookedSlot' })
  // @Field(() => BookedSlot)
  bookedSlot: BookedSlot;
}
