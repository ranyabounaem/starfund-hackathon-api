import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookedSlot } from './bookedSlots.entity';
import { BookedSlotsService } from './bookedSlots.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookedSlot])],
  providers: [BookedSlotsService],
})
export class BookedSlotsModule {}
