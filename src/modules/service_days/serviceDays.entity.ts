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
export class ServiceDay extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.serviceDays)
  @JoinColumn({ name: 'service' })
  service: Service;

  @Column({ type: 'enum', enum: Day })
  weekDay: number;

  @Column()
  startTime: string;

  @Column()
  endTime: string;
}
