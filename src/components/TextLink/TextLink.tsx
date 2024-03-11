import {cx} from '../../packages/utilities/index.js';
import {
  CommonAction,
  type CommonActionBaseProps,
  type CommonActionLinkProps,
} from '../../primitives/index.js';

// @ts-expect-error no types
import styles from './TextLink.module.css';

export interface TextLinkProps {
  label: string;
  url?: CommonActionLinkProps['url'];
  external?: CommonActionLinkProps['external'];
  pressed?: CommonActionBaseProps['pressed'];
}

export function TextLink({
  label,
  url,
  external = false,
  pressed = false,
}: TextLinkProps) {
  return (
    <CommonAction
      className={cx('link-basic', styles.TextLink)}
      url={url}
      external={external}
      pressed={pressed}
    >
      {label}
    </CommonAction>
  );
}
