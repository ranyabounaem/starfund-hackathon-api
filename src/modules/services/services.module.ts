import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './services.entity';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServicesService, ServicesResolver],
})
export class ServicesModule {}
