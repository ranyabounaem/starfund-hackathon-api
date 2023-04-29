<p align="center">
 <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Back-end API for time scheduling application using Nest.js + GraphQL + TypeORM + PostgreSQL
## Database:
![StarfundHackathonERD drawio](https://user-images.githubusercontent.com/47700580/235284144-b5732301-debc-44c0-aeec-cae69df09cb0.png)
### Seeding the database:
```ts-node src/seedings/seed.ts```
## Queries:
### ```availableSlots```
#### Inputs:
```date: String```
#### Returns:
```AvailableSlot[]```


## Mutations:
### ```bookSlot```
#### Inputs:
```BookSlotInput```
#### Returns:
```String```

## Seed:
Men Haircut
slots for the next 7 days, Sunday off.
from 08:00-20:00 Monday to Friday.
from 10:00-22:00 Saturday.
lunch break at 12:00-13:00.
cleaning break at 15:00-16:00.
max 3 clients per slot.
slots every 10 minutes.
5 minutes cleanup break between slots.
the third day starting from now is a public holiday.
Woman Haircut
slots for the next 7 days, Sunday off.
lunch break at 12:00-13:00.
from 08:00-20:00 Monday to Friday.
from 10:00-22:00 Saturday.
cleaning break at 15:00-16:00.
slots every 1 hour.
10 minutes cleanup break.
max 3 clients per slot.
the third day starting from now is a public holiday.

## Tests:
### Query:
```
query {
  availableSlots(date: "2023-05-01T06:24:38.549Z") {
    startTime
    endTime
    serviceId
  }
}
```
### Response:
```
{
  "data": {
    "availableSlots": [
      {
        "startTime": "08:00",
        "endTime": "08:10",
        "serviceId": 3
      },
      {
        "startTime": "08:15",
        "endTime": "08:25",
        "serviceId": 3
      },
      {
        "startTime": "08:30",
        "endTime": "08:40",
        "serviceId": 3
      },
      {
        "startTime": "08:45",
        "endTime": "08:55",
        "serviceId": 3
      },
      {
        "startTime": "09:00",
        "endTime": "09:10",
        "serviceId": 3
      },
      {
        "startTime": "09:15",
        "endTime": "09:25",
        "serviceId": 3
      },
      {
        "startTime": "09:30",
        "endTime": "09:40",
        "serviceId": 3
      },
      {
        "startTime": "09:45",
        "endTime": "09:55",
        "serviceId": 3
      },
      {
        "startTime": "10:00",
        "endTime": "10:10",
        "serviceId": 3
      },
      {
        "startTime": "10:15",
        "endTime": "10:25",
        "serviceId": 3
      },
      {
        "startTime": "10:30",
        "endTime": "10:40",
        "serviceId": 3
      },
      {
        "startTime": "10:45",
        "endTime": "10:55",
        "serviceId": 3
      },
      {
        "startTime": "11:00",
        "endTime": "11:10",
        "serviceId": 3
      },
      {
        "startTime": "11:15",
        "endTime": "11:25",
        "serviceId": 3
      },
      {
        "startTime": "11:30",
        "endTime": "11:40",
        "serviceId": 3
      },
      {
        "startTime": "11:45",
        "endTime": "11:55",
        "serviceId": 3
      },
      {
        "startTime": "13:00",
        "endTime": "13:10",
        "serviceId": 3
      },
      {
        "startTime": "13:15",
        "endTime": "13:25",
        "serviceId": 3
      },
      {
        "startTime": "13:30",
        "endTime": "13:40",
        "serviceId": 3
      },
      {
        "startTime": "13:45",
        "endTime": "13:55",
        "serviceId": 3
      },
      {
        "startTime": "14:00",
        "endTime": "14:10",
        "serviceId": 3
      },
      {
        "startTime": "14:15",
        "endTime": "14:25",
        "serviceId": 3
      },
      {
        "startTime": "14:30",
        "endTime": "14:40",
        "serviceId": 3
      },
      {
        "startTime": "14:45",
        "endTime": "14:55",
        "serviceId": 3
      },
      {
        "startTime": "16:00",
        "endTime": "16:10",
        "serviceId": 3
      },
      {
        "startTime": "16:15",
        "endTime": "16:25",
        "serviceId": 3
      },
      {
        "startTime": "16:30",
        "endTime": "16:40",
        "serviceId": 3
      },
      {
        "startTime": "16:45",
        "endTime": "16:55",
        "serviceId": 3
      },
      {
        "startTime": "17:00",
        "endTime": "17:10",
        "serviceId": 3
      },
      {
        "startTime": "17:15",
        "endTime": "17:25",
        "serviceId": 3
      },
      {
        "startTime": "17:30",
        "endTime": "17:40",
        "serviceId": 3
      },
      {
        "startTime": "17:45",
        "endTime": "17:55",
        "serviceId": 3
      },
      {
        "startTime": "18:00",
        "endTime": "18:10",
        "serviceId": 3
      },
      {
        "startTime": "18:15",
        "endTime": "18:25",
        "serviceId": 3
      },
      {
        "startTime": "18:30",
        "endTime": "18:40",
        "serviceId": 3
      },
      {
        "startTime": "18:45",
        "endTime": "18:55",
        "serviceId": 3
      },
      {
        "startTime": "19:00",
        "endTime": "19:10",
        "serviceId": 3
      },
      {
        "startTime": "19:15",
        "endTime": "19:25",
        "serviceId": 3
      },
      {
        "startTime": "19:30",
        "endTime": "19:40",
        "serviceId": 3
      },
      {
        "startTime": "19:45",
        "endTime": "19:55",
        "serviceId": 3
      }
    ]
  }
}
```
