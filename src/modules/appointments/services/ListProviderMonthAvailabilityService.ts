import { injectable, inject } from 'tsyringe';

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
    )

    console.log(appointments)


    return [{ day: 1, available: false}]
  }
}

export default ListProviderAvailabilityService;
