// import { InputType, Field, Int } from '@nestjs/graphql';
import { Break } from 'src/modules/breaks/breaks.entity';
import { ServiceDay } from 'src/modules/serviceDays/serviceDays.entity';

// @InputType()
export class CreateServiceInput {
  //   @Field()
  name: string;

  //   @Field(() => Break, { nullable: true })
  breaks: Break[];

  //   @Field(() => ServiceDay)
  serviceDays: ServiceDay[];

  //   @Field(() => Int)
  slotDuration: number;

  //   @Field(() => Int)
  breakBetweenSlots: number;

  //   @Field(() => Int)
  allowedBookingInterval: number;

  //   @Field(() => Int)
  maxClientsPerSlot: number;
}
