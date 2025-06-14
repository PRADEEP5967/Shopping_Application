
import { Toaster } from '@/components/ui/sonner';
import ErrorBoundary from '@/components/ErrorBoundary';
import AppRoutes from '@/routes/AppRoutes';
import { AppProviders } from '@/providers/AppProviders';

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <div className="App">
          <AppRoutes />
          <Toaster />
        </div>
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
