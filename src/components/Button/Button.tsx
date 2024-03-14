import {forwardRef, type ForwardedRef} from 'react';

import {cx} from '../../packages/utilities/index.js';
import {CommonAction, type CommonActionProps} from '../../primitives/index.js';
import {SimpleSpinner} from '../SimpleSpinner/index.js';

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
  ref: ForwardedRef<HTMLButtonElement>
) {
  const loadingMarkup = loading ? (
    <div className={cx('position-cover', styles.LoadingWrapper)}>
      <SimpleSpinner />
    </div>
  ) : null;

  return (
    <CommonAction
      ref={ref}
      className={cx('button-basic', styles.Button, {[styles.loading]: loading})}
      {...buttonProps}
    >
      <span className={cx('text-box-trim', styles.Label)}>{label}</span>
      {loadingMarkup}
    </CommonAction>
  );
}

export const Button = forwardRef(ButtonComponent);
