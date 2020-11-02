import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRoter = Router();
const appointmentsController = new ProvidersController();

providersRoter.use(ensureAuthenticated);
providersRoter.get('/', appointmentsController.index);

export default providersRoter;
