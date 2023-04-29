import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './services.entity';
import { CreateServiceInput } from './dtos/create-service.input';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  async createService(input: CreateServiceInput): Promise<Service> {
    let service = this.servicesRepository.create(input);
    service = await service.save();
    return service;
  }

  async getAllServices(): Promise<Service[]> {
    const services = await this.servicesRepository.find();
    return services;
  }
}
