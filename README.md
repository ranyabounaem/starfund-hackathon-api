<p align="center">
 <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Back-end API for time scheduling application using Nest.js + GraphQL + TypeORM + PostgreSQL
## Database:
![StarfundHackathonERD drawio](https://user-images.githubusercontent.com/47700580/235281465-2133c3bf-3059-4052-9b0c-2c1fbcfdb4cf.png)

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
