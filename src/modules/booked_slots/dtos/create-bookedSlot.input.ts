import { Service } from 'src/modules/services/services.entity';
import { User } from 'src/modules/users/users.entity';

export class CreateBookedSlotInput {
  service: Service;
  date: string;
  users: User[];
}
