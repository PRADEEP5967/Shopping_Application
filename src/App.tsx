
import { Toaster } from '@/components/ui/sonner';
import ErrorBoundary from '@/components/ErrorBoundary';
import AppRoutes from '@/routes/AppRoutes';
import { AppProviders } from '@/providers/AppProviders';
import ChatbotAssistant from '@/components/ChatbotAssistant';

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <div className="App">
          <AppRoutes />
          <ChatbotAssistant />
          <Toaster />
        </div>
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
