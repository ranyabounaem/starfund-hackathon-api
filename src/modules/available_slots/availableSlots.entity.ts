import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AvailableSlot {
  @Field()
  startTime: string;
  @Field()
  endTime: string;
  @Field()
  serviceId: number;
}
