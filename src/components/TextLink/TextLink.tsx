import {cx} from '../../packages/utilities/index.js';
import {
  CommonAction,
  type CommonActionLinkProps,
} from '../../primitives/index.js';

// @ts-expect-error no types
import styles from './TextLink.module.css';

export interface TextLinkProps {
  label: string;
  url?: CommonActionLinkProps['url'];
  external?: CommonActionLinkProps['external'];
}

export function TextLink({label, url, external = false}: TextLinkProps) {
  return (
    <CommonAction
      className={cx('text-box-trim', 'link-basic', styles.TextLink)}
      url={url}
      external={external}
    >
      {label}
    </CommonAction>
  );
}
