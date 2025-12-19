import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  pageName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class PageErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('PageErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleGoBack = () => {
    window.history.back();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
          <Card className="max-w-lg w-full bg-card border-border shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle className="text-xl text-foreground">
                Something went wrong
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {this.props.pageName 
                  ? `We encountered an error loading ${this.props.pageName}.`
                  : "We encountered an unexpected error on this page."
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.error && (
                <details className="p-3 bg-muted/50 rounded-lg border border-border">
                  <summary className="cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors">
                    View error details
                  </summary>
                  <pre className="mt-2 text-xs text-muted-foreground overflow-auto max-h-32 whitespace-pre-wrap">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={this.handleRetry} 
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={this.handleGoBack}
                  className="flex-1 border-border text-foreground hover:bg-muted"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go back
                </Button>
              </div>
              
              <div className="pt-2 border-t border-border">
                <Link to="/">
                  <Button 
                    variant="ghost" 
                    className="w-full text-muted-foreground hover:text-foreground"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Return to home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PageErrorBoundary;
