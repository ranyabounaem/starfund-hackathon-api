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
export class BookedSlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.bookedSlots)
  @JoinColumn({ name: 'service' })
  service: Service;

  @Column()
  date: string;

  @OneToMany(() => User, (user) => user.bookedSlot, {
    cascade: true,
  })
  users: User[];
}
