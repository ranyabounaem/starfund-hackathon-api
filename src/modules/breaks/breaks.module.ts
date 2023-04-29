import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Break } from './breaks.entity';
import { BreaksService } from './breaks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Break])],
  providers: [BreaksService],
})
export class BreaksModule {}
