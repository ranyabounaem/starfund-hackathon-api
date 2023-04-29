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

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @ManyToOne(() => BookedSlot, (bookedSlot) => bookedSlot.users)
  @JoinColumn({ name: 'bookedSlot' })
  bookedSlot: BookedSlot;
}
