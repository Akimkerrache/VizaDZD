import AppRouter from "./router";
import AppProviders from "./providers";
import ErrorBoundary from "../components/common/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  );
}
