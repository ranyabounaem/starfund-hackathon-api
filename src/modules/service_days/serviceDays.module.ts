import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceDaysService } from './serviceDays.service';
import { ServiceDay } from './serviceDays.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceDay])],
  providers: [ServiceDaysService],
  exports: [ServiceDaysService],
})
export class ServiceDaysModule {}
