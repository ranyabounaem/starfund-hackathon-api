import { Module } from '@nestjs/common';
import { AvailableSlotsResolver } from './availableSlots.resolver';
import { AvailableSlotsService } from './availableSlots.service';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [ServicesModule],
  providers: [AvailableSlotsService, AvailableSlotsResolver],
})
export class AvailableSlotsModule {}
