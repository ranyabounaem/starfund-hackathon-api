import { createConnection } from 'typeorm';
import { Service } from '../modules/services/services.entity';
import { addDays } from 'date-fns';
import { User } from '../modules/users/users.entity';
import { BookedSlot } from '../modules/booked_slots/bookedSlots.entity';
import { ServiceDay } from '../modules/service_days/serviceDays.entity';
import { Break } from '../modules/breaks/breaks.entity';

const serviceDays = [
  {
    weekDay: 1,
    startTime: '08:00',
    endTime: '20:00',
  },
  {
    weekDay: 2,
    startTime: '08:00',
    endTime: '20:00',
  },
  {
    weekDay: 3,
    startTime: '08:00',
    endTime: '20:00',
  },
  {
    weekDay: 4,
    startTime: '08:00',
    endTime: '20:00',
  },
  {
    weekDay: 5,
    startTime: '08:00',
    endTime: '20:00',
  },
  {
    weekDay: 6,
    startTime: '10:00',
    endTime: '22:00',
  },
];

const breaks = [
  {
    name: 'Lunch Break',
    startTime: '12:00',
    endTime: '13:00',
  },
  {
    name: 'Cleaning Break',
    startTime: '15:00',
    endTime: '16:00',
  },
];

const now = new Date();
const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); //3 days in milliseconds
const utcString = threeDaysLater.toISOString();

const service = {
  name: 'Men Haircut',
  allowedBookingInterval: 7,
  serviceDays: serviceDays,
  breaks: breaks,
  maxClientsPerSlot: 3,
  slotDurationInMinutes: 10,
  slotBreakDurationInMinutes: 5,
  publicHolidays: [utcString],
};
async function seed() {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'starfund_hackathon',
    synchronize: true,
    entities: [Service, BookedSlot, ServiceDay, User, Break],
  });
  const serviceRepository = connection.getRepository(Service);

  try {
    await serviceRepository.save(service);
    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await connection.close();
  }
}

seed();
