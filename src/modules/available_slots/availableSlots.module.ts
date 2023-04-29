import { Module } from '@nestjs/common';
import { AvailableSlotsResolver } from './availableSlots.resolver';
import { AvailableSlotsService } from './availableSlots.service';
import { ServicesModule } from '../services/services.module';
import { ServiceDaysModule } from '../service_days/serviceDays.module';
import { BreaksModule } from '../breaks/breaks.module';
import { BookedSlotsModule } from '../booked_slots/bookedSlots.module';

@Module({
  imports: [ServicesModule, ServiceDaysModule, BreaksModule, BookedSlotsModule],
  providers: [AvailableSlotsService, AvailableSlotsResolver],
})
export class AvailableSlotsModule {}
