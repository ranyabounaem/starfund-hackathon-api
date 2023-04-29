import { Resolver } from '@nestjs/graphql';
import { AvailableSlot } from './availableSlots.entity';
import { Args, Query } from '@nestjs/graphql';

import { AvailableSlotsService } from './availableSlots.service';

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
}
