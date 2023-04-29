import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookedSlot } from './bookedSlots.entity';
import { CreateBookedSlotInput } from './dtos/create-bookedSlot.input';

@Injectable()
export class BookedSlotsService {
  constructor(
    @InjectRepository(BookedSlot)
    private bookedSlotsRepository: Repository<BookedSlot>,
  ) {}

  async createBookedSlot(input: CreateBookedSlotInput): Promise<BookedSlot> {
    let bookedSlot = this.bookedSlotsRepository.create(input);
    bookedSlot = await bookedSlot.save();
    return bookedSlot;
  }

  async getAllBookedSlotsByServiceId(serviceId: number): Promise<BookedSlot[]> {
    return this.bookedSlotsRepository
      .createQueryBuilder('bookedSlot')
      .where('bookedSlot.service = :serviceId', { serviceId: serviceId })
      .getMany();
  }
}
