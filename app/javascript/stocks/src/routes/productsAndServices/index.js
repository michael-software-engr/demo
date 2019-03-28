
import { escapeRegExp } from '../../lib/index';

import { getPropertyUtil } from '../lib';

export const title = 'Products/Services';

const prefix = 'products-and-services';
const prefixRegExpEscaped = escapeRegExp(prefix);

export const getRouteName = name => `${prefix}-${name}`;
export const getRouteProperty = name => getPropertyUtil(name, { prefix, prefixRegExpEscaped });
export const getRoutePrefix = () => getRouteProperty('prefix');
export const getRoutePrefixREEsc = () => getRouteProperty('prefixRegExpEscaped');
