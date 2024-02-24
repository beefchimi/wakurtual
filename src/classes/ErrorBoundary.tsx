import {Component} from 'react';
import type {ReactNode, FunctionComponent} from 'react';

export interface ErrorBoundaryProps {
  fallback: (error: unknown) => ReactNode;
  children: ReactNode;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  {error?: unknown}
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: unknown) {
    return {error};
  }

  render() {
    if ('error' in this.state) {
      return this.props.fallback(this.state.error);
    }

    return this.props.children;
  }
}

export const ErrorBoundarySingleton =
  ErrorBoundary as unknown as FunctionComponent<ErrorBoundaryProps>;
