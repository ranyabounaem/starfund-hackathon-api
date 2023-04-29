import { Resolver } from '@nestjs/graphql';
import { AvailableSlot } from './availableSlots.entity';
import { Args, Query, Mutation } from '@nestjs/graphql';

import { AvailableSlotsService } from './availableSlots.service';
import { BookSlotInput } from './dtos/book-slot.input';

@Resolver(() => AvailableSlot)
export class AvailableSlotsResolver {
  constructor(private readonly availableSlotsService: AvailableSlotsService) {}
  @Query(() => [AvailableSlot], { name: 'availableSlots', nullable: true })
  async findAvailableSlots(
    @Args({
      name: 'date',
    })
    date: string,
  ): Promise<AvailableSlot[]> {
    return await this.availableSlotsService.findAllAvailableSlots(date);
  }

  @Mutation(() => String, { name: 'bookAvailableSlot' })
  async bookAvailableSlot(
    @Args('input')
    input: BookSlotInput,
  ): Promise<string> {
    return await this.availableSlotsService.bookSlot(input);
  }
}
