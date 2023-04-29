import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { BookedSlot } from '../booked_slots/bookedSlots.entity';
import { Break } from '../breaks/breaks.entity';
import { ServiceDay } from '../service_days/serviceDays.entity';

@Entity('service')
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => BookedSlot, (bookedSlot) => bookedSlot.service, {
    nullable: true,
  })
  bookedSlots: BookedSlot[];

  @OneToMany(() => Break, (breakInstance) => breakInstance.service, {
    cascade: true,
    nullable: true,
  })
  breaks: Break[];

  @OneToMany(() => ServiceDay, (serviceDay) => serviceDay.service, {
    cascade: true,
  })
  serviceDays: ServiceDay[];

  @Column()
  slotDurationInMinutes: number;

  @Column()
  slotBreakDurationInMinutes: number;

  @Column()
  allowedBookingInterval: number;

  @Column()
  maxClientsPerSlot: number;

  @Column('text', { array: true })
  publicHolidays: string[];
}
