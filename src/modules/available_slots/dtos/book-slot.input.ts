import { Field, InputType, Int } from '@nestjs/graphql';
import { User } from 'src/modules/users/users.entity';

@InputType()
export class BookSlotInput {
  @Field()
  date: string;
  @Field(() => Int)
  serviceId: number;
  @Field(() => [User])
  users: User[];
}
