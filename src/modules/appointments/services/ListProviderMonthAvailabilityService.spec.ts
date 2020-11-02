//import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository;
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    );
  });
  it('should be able to list the month availability from provider', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
   const appointment2 = await fakeAppointmentsRepository.create({
     provider_id: 'provider',
     date: new Date(2020, 4, 20, 15, 0, 0),
   });


  const appointments = await listProviderMonthAvailability.execute({
    provider_id: 'provider',
    day: 25,
    year: 2020,
    month: 5,
  })

  expect(appointments).toEqual(expect.arrayContaining([appointment1, appointment2]))

  });

});
