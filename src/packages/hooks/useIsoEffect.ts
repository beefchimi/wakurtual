import {useEffect, useLayoutEffect} from 'react';
import {supportDom} from '../utilities/index.js';

export const useIsoEffect = supportDom() ? useLayoutEffect : useEffect;
