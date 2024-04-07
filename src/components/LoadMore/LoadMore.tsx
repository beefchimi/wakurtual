'use client';

import {useInView} from 'react-intersection-observer';

import {Button, type ButtonProps} from '../Button';

export interface LoadMoreProps {
  disabled?: ButtonProps['disabled'];
  onLoad?: ButtonProps['onClick'];
}

export function LoadMore({disabled = false, onLoad}: LoadMoreProps) {
  const {ref} = useInView();

  // console.log('LoadMore > ref', ref);
  // console.log('LoadMore > entry?.intersectionRatio', entry?.intersectionRatio);

  /*
  const shouldBeSticky =
    assertNumber(entry?.intersectionRatio) && entry.intersectionRatio < 1;

  useIsoEffect(() => setSticky(shouldBeSticky), [shouldBeSticky]);
  */

  return (
    <Button ref={ref} label="Load more" disabled={disabled} onClick={onLoad} />
  );
}
