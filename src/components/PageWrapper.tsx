import React, { Suspense, lazy, ComponentType } from 'react';
import PageErrorBoundary from '@/components/PageErrorBoundary';
import PageLoader from '@/components/PageLoader';

interface PageWrapperProps {
  children: React.ReactNode;
  pageName?: string;
  loadingMessage?: string;
}

/**
 * PageWrapper - Wraps page components with error boundary and loading states
 */
export const PageWrapper: React.FC<PageWrapperProps> = ({ 
  children, 
  pageName,
  loadingMessage 
}) => {
  return (
    <PageErrorBoundary pageName={pageName}>
      <Suspense fallback={<PageLoader message={loadingMessage || `Loading ${pageName || 'page'}...`} />}>
        {children}
      </Suspense>
    </PageErrorBoundary>
  );
};

/**
 * withPageWrapper - HOC to wrap a component with PageWrapper
 */
export function withPageWrapper<P extends object>(
  Component: ComponentType<P>,
  pageName?: string,
  loadingMessage?: string
) {
  const WrappedComponent: React.FC<P> = (props) => (
    <PageWrapper pageName={pageName} loadingMessage={loadingMessage}>
      <Component {...props} />
    </PageWrapper>
  );
  
  WrappedComponent.displayName = `withPageWrapper(${Component.displayName || Component.name || 'Component'})`;
  
  return WrappedComponent;
}

/**
 * lazyWithWrapper - Creates a lazy loaded component with error boundary and loading
 */
export function lazyWithWrapper(
  importFn: () => Promise<{ default: ComponentType<any> }>,
  pageName?: string,
  loadingMessage?: string
) {
  const LazyComponent = lazy(importFn);
  
  return function WrappedLazyComponent(props: any) {
    return (
      <PageErrorBoundary pageName={pageName}>
        <Suspense fallback={<PageLoader message={loadingMessage || `Loading ${pageName || 'page'}...`} />}>
          <LazyComponent {...props} />
        </Suspense>
      </PageErrorBoundary>
    );
  };
}

export default PageWrapper;
