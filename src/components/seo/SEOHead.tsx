import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  price?: number;
  currency?: string;
  availability?: 'in stock' | 'out of stock';
  structuredData?: object;
}

const SEOHead = ({
  title = 'Pradeep Sahani Mart',
  description = 'Discover amazing products at unbeatable prices. Shop electronics, fashion, home goods and more.',
  keywords = 'ecommerce, shopping, electronics, fashion, deals',
  image = '/lovable-uploads/ed6f414d-1f2f-430f-93d3-758d4fd9738f.png',
  url = window.location.href,
  type = 'website',
  price,
  currency = 'USD',
  availability,
  structuredData
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title.includes('Pradeep Sahani Mart') 
      ? title 
      : `${title} | Pradeep Sahani Mart`;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic SEO
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Pradeep Sahani Mart', true);

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Product specific meta (for product pages)
    if (type === 'product' && price !== undefined) {
      updateMetaTag('product:price:amount', price.toString(), true);
      updateMetaTag('product:price:currency', currency, true);
      if (availability) {
        updateMetaTag('product:availability', availability, true);
      }
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Structured Data (JSON-LD)
    const existingScript = document.querySelector('script[data-seo="structured-data"]');
    if (existingScript) {
      existingScript.remove();
    }

    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'structured-data');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      const structuredDataScript = document.querySelector('script[data-seo="structured-data"]');
      if (structuredDataScript) {
        structuredDataScript.remove();
      }
    };
  }, [title, description, keywords, image, url, type, price, currency, availability, structuredData]);

  return null;
};

export default SEOHead;

// Pre-built structured data generators
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  brand: product.brand ? {
    '@type': 'Brand',
    name: product.brand
  } : undefined,
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: product.currency || 'USD',
    availability: product.inStock 
      ? 'https://schema.org/InStock' 
      : 'https://schema.org/OutOfStock'
  },
  aggregateRating: product.rating ? {
    '@type': 'AggregateRating',
    ratingValue: product.rating,
    reviewCount: product.reviewCount || 1
  } : undefined
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pradeep Sahani Mart',
  url: window.location.origin,
  logo: `${window.location.origin}/lovable-uploads/ed6f414d-1f2f-430f-93d3-758d4fd9738f.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-800-SHOP',
    contactType: 'customer service'
  }
});
