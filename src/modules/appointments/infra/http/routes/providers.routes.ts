import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRoter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRoter.use(ensureAuthenticated);

providersRoter.get('/', providersController.index);
providersRoter.get('/:provider_id/month-availability', providerMonthAvailabilityController.index);
providersRoter.get('/:provider_id/day-availability', providerDayAvailabilityController.index);

export default providersRoter;
