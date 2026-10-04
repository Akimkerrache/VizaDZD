import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("VisaDZD application error", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="fatal-error" role="alert">
        <span className="fatal-error-icon">
          <AlertTriangle size={22} />
        </span>
        <p className="eyebrow">VISADZD · GLOBAL INTELLIGENCE</p>
        <h1>Une erreur inattendue est survenue.</h1>
        <p>Rechargez l’application pour reprendre votre exploration.</p>
        <button
          className="button-primary"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={16} /> Recharger l’application
        </button>
      </main>
    );
  }
}
