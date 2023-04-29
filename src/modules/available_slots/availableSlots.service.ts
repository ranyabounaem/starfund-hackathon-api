import { Injectable } from '@nestjs/common';
import { AvailableSlot } from './availableSlots.entity';
import { ServicesService } from '../services/services.service';
import { isSameDay } from 'date-fns';
import { Service } from '../services/services.entity';
import { ServiceDay } from '../service_days/serviceDays.entity';
import { Slot } from 'src/common/dtos/slot.dto';
import { BookedSlot } from '../booked_slots/bookedSlots.entity';
import { Break } from '../breaks/breaks.entity';
import { BookSlotInput } from './dtos/book-slot.input';
import { differenceInDays } from 'date-fns';
import { ServiceDaysService } from '../service_days/serviceDays.service';
import { BreaksService } from '../breaks/breaks.service';
import { BookedSlotsService } from '../booked_slots/bookedSlots.service';

@Injectable()
export class AvailableSlotsService {
  constructor(
    private readonly breaksService: BreaksService,
    private readonly bookedSlotsService: BookedSlotsService,
    private readonly servicesService: ServicesService,
    private readonly serviceDaysService: ServiceDaysService,
  ) {}
  async findAllAvailableSlots(date: string): Promise<AvailableSlot[]> {
    // Input date from string to Date
    const inputDate: Date = new Date(date);
    // Day enum (example: 0 for 'Monday' - 1 for 'Tuesday' ...)
    const day = inputDate.getDay();
    // Initialize empty available slots array
    const availableSlots: AvailableSlot[] = [];
    // Fetch all services
    const services = await this.servicesService.getAllServices();
    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      for (let j = 0; j < service.publicHolidays.length; j++) {
        const publicHoliday = service.publicHolidays[i];
        // Service public holiday from string to Date
        const publicHolidayAsDate = new Date(publicHoliday);
        // 1. Check if service's public holiday is not same day as input date
        if (!isSameDay(publicHolidayAsDate, inputDate)) {
          // Fetch service days with same service id
          const serviceDays =
            await this.serviceDaysService.getServiceDaysByServiceId(service.id);
          // Loop on each service day
          for (let k = 0; k < serviceDays.length; k++) {
            const serviceDay = serviceDays[k];
            // 2. Check if inputDate's day is one of service's days
            if (serviceDay.weekDay === day) {
              // 3. Check possible slots during the week day if
              // they overlap with breaks or booked slots
              (
                await this.getServiceAvailableSlots(
                  inputDate,
                  service,
                  serviceDay,
                )
              ).forEach((serviceAvailableSlot) => {
                availableSlots.push(serviceAvailableSlot);
              });
            }
          }
        }
      }
    }

    return availableSlots;
  }

  async bookSlot(input: BookSlotInput): Promise<string> {
    const service = await this.servicesService.getService(input.serviceId);
    const inputDate = new Date(input.date);
    if (
      differenceInDays(inputDate, Date.now()) > service.allowedBookingInterval
    ) {
      return `Cannot book more than ${service.allowedBookingInterval} days ahead`;
    }

    if (input.users.length > service.maxClientsPerSlot) {
      return `Cannot book for more than ${service.maxClientsPerSlot} clients`;
    }
    const day = inputDate.getDay();
    for (let i = 0; i < service.publicHolidays.length; i++) {
      const publicHoliday = service.publicHolidays[i];
      const publicHolidayAsDate = new Date(publicHoliday);
      // 1. Check if service's public holiday is nit same day as input date
      if (!isSameDay(publicHolidayAsDate, inputDate)) {
        service.serviceDays.forEach(async (serviceDay) => {
          // 2. Check if inputDate's day is one of service's days
          if (serviceDay.weekDay === day) {
            // 3. Check possible slots during the week day if
            // they overlap with breaks or booked slots
            (
              await this.getServiceAvailableSlots(
                inputDate,
                service,
                serviceDay,
              )
            ).forEach((serviceAvailableSlot) => {
              // Check if input time slot is matching one of the available slots
              if (serviceAvailableSlot.startTime === input.slotTime) {
                const bookedSlot = new BookedSlot();
                const bookedSlotDate = new Date(input.date);
                bookedSlotDate.setHours(
                  +serviceAvailableSlot.startTime.split(';')[0],
                );
                bookedSlotDate.setMinutes(
                  +serviceAvailableSlot.startTime.split(';')[1],
                );
                bookedSlot.date = bookedSlotDate.toUTCString();
                bookedSlot.users = input.users;
                this.servicesService.updateService(service.id, bookedSlot);
                return 'Successfully booked!';
              }
            });
          }
        });
      }
    }
    return 'Failed to book!';
  }

  async getServiceAvailableSlots(
    inputDate: Date,
    service: Service,
    serviceDay: ServiceDay,
  ): Promise<AvailableSlot[]> {
    const serviceAvailableSlots: AvailableSlot[] = [];
    // Generate initial possible time slot
    let tempSlot = new Slot();
    tempSlot.startTime = serviceDay.startTime;
    tempSlot.endTime = this.addMinutesToTime(
      tempSlot.startTime,
      service.slotDurationInMinutes,
    );

    while (
      this.slotIsInRange(tempSlot, serviceDay.startTime, serviceDay.endTime)
    ) {
      let checksPassed = true;
      if (
        this.checkSlotOverlapWithBookedSlots(
          inputDate,
          await this.bookedSlotsService.getAllBookedSlotsByServiceId(
            service.id,
          ),
          tempSlot,
        )
      ) {
        checksPassed = false;
      }
      const breaks = await this.breaksService.getAllBreaksByServiceId(
        service.id,
      );
      if (this.checkSlotOverlapWithBreaks(breaks, tempSlot)) {
        console.log('Check did not pass');
        checksPassed = false;
      }

      if (checksPassed) {
        const possibleAvailableSlot = new AvailableSlot();
        possibleAvailableSlot.startTime = tempSlot.startTime;
        possibleAvailableSlot.endTime = tempSlot.endTime;
        possibleAvailableSlot.serviceId = service.id;
        serviceAvailableSlots.push(possibleAvailableSlot);
      }

      tempSlot = this.getNextSlot(
        tempSlot,
        service.slotDurationInMinutes,
        service.slotBreakDurationInMinutes,
      );
    }
    return serviceAvailableSlots;
  }

  slotIsInRange(slot: Slot, startTime: string, endTime: string): boolean {
    const startDate = new Date(`1970-01-01T${startTime}:00Z`);
    const endDate = new Date(`1970-01-01T${endTime}:00Z`);
    const slotStartTime = new Date(`1970-01-01T${slot.startTime}:00Z`);
    const slotEndTime = new Date(`1970-01-01T${slot.endTime}:00Z`);

    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const slotStartTimestamp = slotStartTime.getTime();
    const slotEndTimestamp = slotEndTime.getTime();

    if (
      slotStartTimestamp >= startTimestamp &&
      slotEndTimestamp <= endTimestamp
    ) {
      return true;
    } else {
      return false;
    }
  }

  getNextSlot(
    currentSlot: Slot,
    slotDuration: number,
    slotBreakDuration: number,
  ): Slot {
    const nextSlot = new Slot();
    nextSlot.startTime = this.addMinutesToTime(
      currentSlot.endTime,
      slotBreakDuration,
    );
    nextSlot.endTime = this.addMinutesToTime(nextSlot.startTime, slotDuration);
    return nextSlot;
  }

  addMinutesToTime(time: string, minutesToAdd: number): string {
    const date = new Date(`1970-01-01T${time}:00Z`);
    date.setMinutes(date.getMinutes() + minutesToAdd);
    const updatedTime = date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'GMT',
    });
    return updatedTime;
  }

  checkSlotOverlapWithBookedSlots(
    inputDate: Date,
    bookedSlots: BookedSlot[],
    currentSlot: Slot,
  ) {
    bookedSlots.forEach((bookedSlot) => {
      const bookedSlotDate = new Date(bookedSlot.date);
      const bookedSlotStartTime = bookedSlotDate.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'GMT',
      });
      if (
        isSameDay(inputDate, bookedSlotDate) &&
        currentSlot.startTime === bookedSlotStartTime
      ) {
        return true;
      }
    });
    return false;
  }

  checkSlotOverlapWithBreaks(
    serviceBreaks: Break[],
    currentSlot: Slot,
  ): boolean {
    for (let i = 0; i < serviceBreaks.length; i++) {
      const serviceBreak = serviceBreaks[i];
      if (
        this.slotIsInRange(
          currentSlot,
          serviceBreak.startTime,
          serviceBreak.endTime,
        )
      ) {
        console.log('slots in range');
        return true;
      }
    }
    return false;
  }
}
