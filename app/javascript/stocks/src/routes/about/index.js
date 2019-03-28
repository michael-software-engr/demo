
import { escapeRegExp } from '../../lib/index';

import { getPropertyUtil } from '../lib';

export const title = 'About';

const prefix = 'about';
const prefixRegExpEscaped = escapeRegExp(prefix);

export const getRouteName = name => `about-${name}`;
export const getRouteProperty = name => getPropertyUtil(name, { prefix, prefixRegExpEscaped });
export const getRoutePrefix = () => getRouteProperty('prefix');
export const getRoutePrefixREEsc = () => getRouteProperty('prefixRegExpEscaped');
