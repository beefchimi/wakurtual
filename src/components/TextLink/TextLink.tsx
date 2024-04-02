import {clx} from 'beeftools';
import {CommonAction, type CommonActionProps} from '../../primitives/index.js';

// @ts-expect-error no types
import styles from './TextLink.module.css';

export interface TextLinkProps
  extends Pick<CommonActionProps, 'url' | 'external' | 'pressed'> {
  label: string;
}

export function TextLink({label, ...commonProps}: TextLinkProps) {
  return (
    <CommonAction
      className={clx('link-basic', styles.TextLink)}
      {...commonProps}
    >
      {label}
    </CommonAction>
  );
}
