import {Component, type ReactNode, type FunctionComponent} from 'react';

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

  // TODO: Should this really be `async/await`?
  async render() {
    if ('error' in this.state) {
      return await this.props.fallback(this.state.error);
    }

    return await this.props.children;
  }
}

export const ErrorBoundarySingleton =
  ErrorBoundary as unknown as FunctionComponent<ErrorBoundaryProps>;
