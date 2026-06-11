import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-dvh flex items-center justify-center bg-void">
          <div className="text-center px-6 max-w-md">
            <h1 className="font-display text-5xl text-text-primary">Something went wrong</h1>
            <p className="mt-4 text-text-secondary">We encountered an unexpected error. Please try reloading the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-8 min-h-11 px-6 bg-gold text-void text-sm font-semibold uppercase tracking-wider rounded-sm"
            >
              Reload page
            </button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
