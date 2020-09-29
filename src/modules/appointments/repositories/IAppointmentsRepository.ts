import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppoinmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
