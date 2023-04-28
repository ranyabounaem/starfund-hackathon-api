import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookedSlot } from './bookedSlots.entity';

@Injectable()
export class BookedSlotsService {
  constructor(
    @InjectRepository(BookedSlot)
    private bookedSlotsRepository: Repository<BookedSlot>,
  ) {}

  async createBookedSlot(input: CreateBookedSlotInput): Promise<Service> {
    let service = this.bookedSlotsRepository.create(input);
    service = await service.save();
    return service;
  }
}
