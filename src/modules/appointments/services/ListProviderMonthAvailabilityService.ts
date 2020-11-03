import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>

@injectable()
class ListProviderAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appoitmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ provider_id, month, year, day }: IRequest): Promise<IResponse> {
    const appointments = await this.appoitmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      }
    );

  const numberOfDaysInMonth = getDaysInMonth(new Date(year, month -1));

   const eachDayArray = Array.from(
     { length: numberOfDaysInMonth},
     (_, index) => index + 1,
   );

   const availability = eachDayArray.map(day => {
     const appointmentsInDay = appointments.filter(appointment => {
       return getDate(appointment.date) === day;
     })

     return {
       day,
       available: appointmentsInDay.length < 10,
     };
   })


     return availability
  }
}

export default ListProviderAvailabilityService;
