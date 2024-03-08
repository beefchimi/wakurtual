import {
  type ButtonHTMLAttributes,
  type FocusEventHandler,
  type ForwardedRef,
  forwardRef,
  type MouseEventHandler,
  type PointerEventHandler,
  type ReactNode,
} from 'react';
import {Link} from 'waku';

import {cx} from '../../packages/utilities/index.js';
// @ts-expect-error no types
import styles from './CommonAction.module.css';

type ButtonFocus = FocusEventHandler<HTMLButtonElement>;
type ButtonClick = MouseEventHandler<HTMLButtonElement>;
type ButtonPointer = PointerEventHandler<HTMLButtonElement>;

export type CommonActionButtonProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  ariaLabel?: string;
  onBlur?: ButtonFocus;
  onFocus?: ButtonFocus;
  onClick?: ButtonClick;
  onPointerEnter?: ButtonPointer;
  onPointerLeave?: ButtonPointer;
  onPointerDown?: ButtonPointer;
  onPointerUp?: ButtonPointer;
  // Denied link props.
  url?: never;
  external?: never;
};

export type CommonActionLinkProps = {
  // Consider supporting `LinkProps['to']`.
  url?: string;
  external?: boolean;
  // Denied button props.
  type?: never;
  ariaLabel?: never;
  onBlur?: never;
  onFocus?: never;
  onClick?: never;
  // TODO: We should allow pointer events on links.
  onPointerEnter?: never;
  onPointerLeave?: never;
  onPointerDown?: never;
  onPointerUp?: never;
};

export type CommonActionBaseProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  disabled?: boolean;
  pressed?: boolean;
  // Required to prevent `styled-components` from accepting.
  'aria-label'?: never;
  'aria-pressed'?: never;
};

// We don't really need to use conditional props...
// we can allow everything if we find usage to be confusing.
export type CommonActionProps = CommonActionBaseProps &
  (CommonActionButtonProps | CommonActionLinkProps);

function CommonActionComponent(
  {
    children,
    id,
    className = '',
    disabled = false,
    pressed = false,
    // Link props
    url,
    external = false,
    // Button props
    type = 'button',
    ariaLabel,
    onBlur,
    onFocus,
    onClick,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
  }: CommonActionProps,
  ref: ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
) {
  const isDisabled = disabled ? true : undefined;
  const isPressed = pressed ? true : undefined;

  if (url?.length) {
    const sharedLinkProps = {
      id,
      ref: ref as ForwardedRef<HTMLAnchorElement>,
      className: cx(styles.PrimitiveLink, className),
      'data-link-disabled': isDisabled,
      'data-link-pressed': isPressed,
    };

    if (external) {
      return (
        <a
          href={url}
          {...sharedLinkProps}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    } else {
      return (
        <Link to={url} {...sharedLinkProps}>
          {children}
        </Link>
      );
    }
  }

  // Used to provide a unique state on the <button /> that is
  // separate from `disabled` but otherwise non-interactive.
  const hasInteraction = Boolean(onBlur || onFocus || onClick || onPointerDown);

  return (
    <button
      ref={ref as ForwardedRef<HTMLButtonElement>}
      id={id}
      type={type}
      className={cx(styles.PrimitiveButton, className)}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-pressed={isPressed}
      onBlur={onBlur}
      onFocus={onFocus}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      data-button-static={hasInteraction ? undefined : true}
    >
      {children}
    </button>
  );
}

export const CommonAction = forwardRef(CommonActionComponent);
