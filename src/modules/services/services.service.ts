import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './services.entity';
import { CreateServiceInput } from './dtos/create-service.input';
import { BookedSlot } from '../booked_slots/bookedSlots.entity';

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

  async getService(id: number): Promise<Service> {
    const service = await this.servicesRepository.findOneBy({
      id: id,
    });
    return service;
  }

  async updateService(
    serviceId: number,
    bookedSlot: BookedSlot,
  ): Promise<Service> {
    const service = await this.servicesRepository.findOneBy({ id: serviceId });
    service.bookedSlots.push(bookedSlot);
    service.save();
    return service;
  }
}
