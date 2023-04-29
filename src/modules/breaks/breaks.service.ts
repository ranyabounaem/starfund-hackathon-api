import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Break } from './breaks.entity';

@Injectable()
export class BreaksService {
  constructor(
    @InjectRepository(Break)
    private breaksRepository: Repository<Break>,
  ) {}
  async getAllBreaksByServiceId(serviceId: number): Promise<Break[]> {
    return await this.breaksRepository
      .createQueryBuilder('break')
      .where('break.service = :serviceId', { serviceId: serviceId })
      .getMany();
  }
}
