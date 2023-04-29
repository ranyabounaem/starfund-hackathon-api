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
export class Break extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Service, (service) => service.breaks)
  @JoinColumn({ name: 'service' })
  service: Service;

  @Column()
  startTime: string;

  @Column()
  endTime: string;
}
