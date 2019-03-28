
import { escapeRegExp } from '../../lib/index';

import { getPropertyUtil } from '../lib';

const prefix = '';
const prefixRegExpEscaped = escapeRegExp(prefix);

export const getRouteName = name => `${prefix}-${name}`;
export const getRouteProperty = name => getPropertyUtil(name, { prefix, prefixRegExpEscaped });
export const getRoutePrefix = () => getRouteProperty('prefix');
export const getRoutePrefixREEsc = () => getRouteProperty('prefixRegExpEscaped');
