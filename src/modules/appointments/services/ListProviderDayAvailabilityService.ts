import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appoitmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
     month,
      year,
       day
       }: IRequest): Promise<IResponse> {
    const appointments = await this.appoitmentsRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month,
      day,
    })

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment =>
        getHours(appointment.date) === hour,
        );

      return {
        hour,
        available: !hasAppointmentInHour,
      }
    })

     return availability;
  }
}

export default ListProviderDayAvailabilityService;
