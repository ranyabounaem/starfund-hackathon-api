import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Service } from '../services/services.entity';
import { User } from '../users/users.entity';

@Entity('bookedSlot')
@ObjectType()
export class BookedSlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  //   @Field(() => Int)
  id: number;

  @ManyToOne(() => Service, (service) => service.bookedSlots)
  @JoinColumn({ name: 'service' })
  //   @Field(() => Service)
  service: Service;

  @Column()
  //   @Field()
  date: string;

  @OneToMany(() => User, (user) => user.bookedSlot, {
    cascade: true,
  })
  //   @Field(() => [User])
  users: User[];
}
