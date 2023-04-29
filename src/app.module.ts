import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from './modules/services/services.module';
import { ServiceDaysModule } from './modules/service_days/serviceDays.module';
import { BreaksModule } from './modules/breaks/breaks.module';
import { AvailableSlotsModule } from './modules/available_slots/availableSlots.module';
import { BookedSlotsModule } from './modules/booked_slots/bookedSlots.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ServicesModule,
    ServiceDaysModule,
    BreaksModule,
    BookedSlotsModule,
    AvailableSlotsModule,
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'starfund_hackathon',
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
