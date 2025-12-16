import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  priority?: boolean;
  showSkeleton?: boolean;
  containerClassName?: string;
}

const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ 
    src, 
    alt, 
    fallback = '/placeholder.svg',
    aspectRatio = 'auto',
    priority = false,
    showSkeleton = true,
    className,
    containerClassName,
    ...props 
  }, ref) => {
    const [isLoading, setIsLoading] = useState(!priority);
    const [error, setError] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
      if (priority) {
        setIsInView(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '100px',
          threshold: 0.01
        }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, [priority]);

    const handleLoad = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setError(true);
      setIsLoading(false);
    };

    const aspectRatioClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/4]',
      auto: ''
    };

    return (
      <div 
        ref={containerRef}
        className={cn(
          'relative overflow-hidden',
          aspectRatioClasses[aspectRatio],
          containerClassName
        )}
      >
        {/* Skeleton loader */}
        {isLoading && showSkeleton && (
          <Skeleton 
            className={cn(
              'absolute inset-0 w-full h-full',
              aspectRatioClasses[aspectRatio]
            )} 
          />
        )}

        {/* Image */}
        {isInView && (
          <img
            ref={ref || imgRef}
            src={error ? fallback : src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100',
              className
            )}
            {...props}
          />
        )}

        {/* Placeholder while waiting for intersection */}
        {!isInView && (
          <div 
            className={cn(
              'w-full h-full bg-muted animate-pulse',
              aspectRatioClasses[aspectRatio]
            )} 
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export { OptimizedImage };

// Image with hover zoom effect
interface ZoomImageProps extends OptimizedImageProps {
  zoomScale?: number;
}

const ZoomImage = React.forwardRef<HTMLImageElement, ZoomImageProps>(
  ({ zoomScale = 1.1, className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('overflow-hidden group', containerClassName)}>
        <OptimizedImage
          ref={ref}
          className={cn(
            'transition-transform duration-500 group-hover:scale-110',
            className
          )}
          containerClassName="w-full h-full"
          {...props}
        />
      </div>
    );
  }
);

ZoomImage.displayName = 'ZoomImage';

export { ZoomImage };

// Responsive image with srcset support
interface ResponsiveImageProps extends Omit<OptimizedImageProps, 'srcSet'> {
  imageSrcSet?: {
    src: string;
    width: number;
  }[];
  sizes?: string;
}

const ResponsiveImage = React.forwardRef<HTMLImageElement, ResponsiveImageProps>(
  ({ imageSrcSet, sizes = '100vw', ...props }, ref) => {
    const srcSetString = imageSrcSet?.map(item => `${item.src} ${item.width}w`).join(', ');

    return (
      <OptimizedImage
        ref={ref}
        srcSet={srcSetString}
        sizes={sizes}
        {...props}
      />
    );
  }
);

ResponsiveImage.displayName = 'ResponsiveImage';

export { ResponsiveImage };
