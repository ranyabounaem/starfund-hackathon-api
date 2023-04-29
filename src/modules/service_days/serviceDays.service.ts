import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceDay } from './serviceDays.entity';

@Injectable()
export class ServiceDaysService {
  constructor(
    @InjectRepository(ServiceDay)
    private serviceDaysRepository: Repository<ServiceDay>,
  ) {}
}
