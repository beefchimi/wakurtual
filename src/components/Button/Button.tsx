import classNames from 'classnames';

import {
  CommonAction,
  type CommonActionBaseProps,
  type CommonActionButtonProps,
} from '../../primitives/index.js';

// @ts-expect-error no types
import styles from './Button.module.css';

export interface ButtonProps {
  label: string;
  ariaLabel?: CommonActionButtonProps['ariaLabel'];
  disabled?: CommonActionBaseProps['disabled'];
  pressed?: CommonActionBaseProps['pressed'];
  onClick?: CommonActionButtonProps['onClick'];
}

export function Button({
  label,
  disabled = false,
  pressed = false,
  onClick,
}: ButtonProps) {
  return (
    <CommonAction
      className={classNames('button-basic', styles.Button)}
      disabled={disabled}
      pressed={pressed}
      onClick={onClick}
    >
      <span className={classNames('text-box-trim', styles.Label)}>{label}</span>
    </CommonAction>
  );
}
