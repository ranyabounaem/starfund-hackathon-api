// import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BookedSlot } from '../booked_slots/bookedSlots.entity';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @ManyToOne(() => BookedSlot, (bookedSlot) => bookedSlot.users)
  @JoinColumn({ name: 'bookedSlot' })
  bookedSlot: BookedSlot;
}
