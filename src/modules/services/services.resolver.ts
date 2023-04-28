import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Service } from './services.entity';
import { CreateServiceInput } from './dtos/create-service.input';
import { ServicesService } from './services.service';

@Resolver(() => Service)
export class ServicesResolver {
  constructor(private servicesService: ServicesService) {}
}
