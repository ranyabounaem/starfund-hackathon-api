import { Break } from 'src/modules/breaks/breaks.entity';
import { ServiceDay } from 'src/modules/service_days/serviceDays.entity';

export class CreateBookedSlotInput {
  name: string;
  breaks: Break[];
  serviceDays: ServiceDay[];
  slotDuration: number;
  breakBetweenSlots: number;
  allowedBookingInterval: number;
  maxClientsPerSlot: number;
}
