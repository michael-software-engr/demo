import api from './middlewares/api';
import { updateAddress } from './modules/stocks/middleware';

export default [
  api,
  updateAddress
];
