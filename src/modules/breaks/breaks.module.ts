import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Break } from './breaks.entity';
import { BreaksService } from './breaks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Break])],
  providers: [BreaksService],
  exports: [BreaksService],
})
export class BreaksModule {}
