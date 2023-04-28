import { InputType, Field, Int } from '@nestjs/graphql';

// @InputType()
export class CreateUserInput {
  //   @Field()
  firstName: string;

  //   @Field()
  lastName: string;

  //   @Field()
  email: string;
}
