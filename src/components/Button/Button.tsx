import {forwardRef, type ForwardedRef} from 'react';
import {clx} from 'beeftools';

import {CommonAction, type CommonActionProps} from '../../primitives';
import {SimpleSpinner} from '../SimpleSpinner';

// @ts-expect-error no types
import styles from './Button.module.css';

export interface ButtonProps
  extends Pick<
    CommonActionProps,
    'ariaLabel' | 'disabled' | 'pressed' | 'onClick'
  > {
  label: string | number;
  loading?: boolean;
}

function ButtonComponent(
  {label, loading = false, ...buttonProps}: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const loadingMarkup = loading ? (
    <div className={clx('position-cover', styles.LoadingWrapper)}>
      <SimpleSpinner />
    </div>
  ) : null;

  return (
    <CommonAction
      ref={ref}
      className={clx('button-basic', styles.Button, {
        [styles.loading]: loading,
      })}
      {...buttonProps}
    >
      <span className={clx('text-box-trim', styles.Label)}>{label}</span>
      {loadingMarkup}
    </CommonAction>
  );
}

export const Button = forwardRef(ButtonComponent);
