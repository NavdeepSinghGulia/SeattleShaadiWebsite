'use client';

import React, { useEffect, useState } from 'react';
import { usePerformanceMonitor, useMemoryMonitor, useNetworkStatus } from '@/hooks/use-performance';

interface PerformanceData {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
  memory?: {
    usedJSHeapSize?: number;
    totalJSHeapSize?: number;
    jsHeapSizeLimit?: number;
  };
  network?: {
    online: boolean;
    effectiveType: string;
    downlink?: number;
  };
  pageLoadTime?: number;
  domContentLoaded?: number;
  resourceCount?: number;
}

// Performance monitoring component
export const PerformanceMonitor: React.FC = () => {
  const performanceMetrics = usePerformanceMonitor();
  const memoryInfo = useMemoryMonitor();
  const networkStatus = useNetworkStatus();
  const [performanceData, setPerformanceData] = useState<PerformanceData>({});

  useEffect(() => {
    // Collect initial performance data
    const collectPerformanceData = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const resources = performance.getEntriesByType('resource');

      const data: PerformanceData = {
        ...performanceMetrics,
        memory: memoryInfo,
        network: networkStatus,
        pageLoadTime: navigation ? navigation.loadEventEnd - navigation.navigationStart : undefined,
        domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.navigationStart : undefined,
        resourceCount: resources.length,
      };

      setPerformanceData(data);
    };

    // Collect data after page load
    if (document.readyState === 'complete') {
      collectPerformanceData();
    } else {
      window.addEventListener('load', collectPerformanceData);
      return () => window.removeEventListener('load', collectPerformanceData);
    }
  }, [performanceMetrics, memoryInfo, networkStatus]);

  // Send performance data to analytics (in production)
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && performanceData.lcp) {
      // Send to analytics service
      sendPerformanceData(performanceData);
    }
  }, [performanceData]);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-sm">
      <h3 className="font-bold mb-2">Performance Monitor</h3>
      
      <div className="space-y-1">
        {performanceData.fcp && (
          <div className={`${performanceData.fcp > 2500 ? 'text-red-400' : performanceData.fcp > 1800 ? 'text-yellow-400' : 'text-green-400'}`}>
            FCP: {Math.round(performanceData.fcp)}ms
          </div>
        )}
        
        {performanceData.lcp && (
          <div className={`${performanceData.lcp > 4000 ? 'text-red-400' : performanceData.lcp > 2500 ? 'text-yellow-400' : 'text-green-400'}`}>
            LCP: {Math.round(performanceData.lcp)}ms
          </div>
        )}
        
        {performanceData.fid && (
          <div className={`${performanceData.fid > 300 ? 'text-red-400' : performanceData.fid > 100 ? 'text-yellow-400' : 'text-green-400'}`}>
            FID: {Math.round(performanceData.fid)}ms
          </div>
        )}
        
        {performanceData.cls !== undefined && (
          <div className={`${performanceData.cls > 0.25 ? 'text-red-400' : performanceData.cls > 0.1 ? 'text-yellow-400' : 'text-green-400'}`}>
            CLS: {performanceData.cls.toFixed(3)}
          </div>
        )}
        
        {performanceData.ttfb && (
          <div className={`${performanceData.ttfb > 800 ? 'text-red-400' : performanceData.ttfb > 600 ? 'text-yellow-400' : 'text-green-400'}`}>
            TTFB: {Math.round(performanceData.ttfb)}ms
          </div>
        )}
        
        {performanceData.pageLoadTime && (
          <div>
            Load: {Math.round(performanceData.pageLoadTime)}ms
          </div>
        )}
        
        {performanceData.memory?.usedJSHeapSize && (
          <div>
            Memory: {Math.round(performanceData.memory.usedJSHeapSize / 1024 / 1024)}MB
          </div>
        )}
        
        <div className={`${!performanceData.network?.online ? 'text-red-400' : 'text-green-400'}`}>
          Network: {performanceData.network?.online ? 'Online' : 'Offline'} ({performanceData.network?.effectiveType})
        </div>
        
        {performanceData.resourceCount && (
          <div>
            Resources: {performanceData.resourceCount}
          </div>
        )}
      </div>
    </div>
  );
};

// Performance alert component
interface PerformanceAlertProps {
  threshold?: {
    lcp?: number;
    fcp?: number;
    cls?: number;
    fid?: number;
  };
  onAlert?: (metric: string, value: number, threshold: number) => void;
}

export const PerformanceAlert: React.FC<PerformanceAlertProps> = ({
  threshold = {
    lcp: 4000,
    fcp: 2500,
    cls: 0.25,
    fid: 300,
  },
  onAlert,
}) => {
  const performanceMetrics = usePerformanceMonitor();
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const newAlerts: string[] = [];

    // Check LCP
    if (performanceMetrics.lcp && threshold.lcp && performanceMetrics.lcp > threshold.lcp) {
      const alert = `LCP is ${Math.round(performanceMetrics.lcp)}ms (threshold: ${threshold.lcp}ms)`;
      newAlerts.push(alert);
      onAlert?.('lcp', performanceMetrics.lcp, threshold.lcp);
    }

    // Check FCP
    if (performanceMetrics.fcp && threshold.fcp && performanceMetrics.fcp > threshold.fcp) {
      const alert = `FCP is ${Math.round(performanceMetrics.fcp)}ms (threshold: ${threshold.fcp}ms)`;
      newAlerts.push(alert);
      onAlert?.('fcp', performanceMetrics.fcp, threshold.fcp);
    }

    // Check CLS
    if (performanceMetrics.cls !== undefined && threshold.cls && performanceMetrics.cls > threshold.cls) {
      const alert = `CLS is ${performanceMetrics.cls.toFixed(3)} (threshold: ${threshold.cls})`;
      newAlerts.push(alert);
      onAlert?.('cls', performanceMetrics.cls, threshold.cls);
    }

    // Check FID
    if (performanceMetrics.fid && threshold.fid && performanceMetrics.fid > threshold.fid) {
      const alert = `FID is ${Math.round(performanceMetrics.fid)}ms (threshold: ${threshold.fid}ms)`;
      newAlerts.push(alert);
      onAlert?.('fid', performanceMetrics.fid, threshold.fid);
    }

    setAlerts(newAlerts);
  }, [performanceMetrics, threshold, onAlert]);

  if (process.env.NODE_ENV !== 'development' || alerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold mb-2">⚠️ Performance Alerts</h3>
      <ul className="text-sm space-y-1">
        {alerts.map((alert, index) => (
          <li key={index}>• {alert}</li>
        ))}
      </ul>
    </div>
  );
};

// Resource loading monitor
export const ResourceMonitor: React.FC = () => {
  const [resources, setResources] = useState<PerformanceResourceTiming[]>([]);
  const [slowResources, setSlowResources] = useState<PerformanceResourceTiming[]>([]);

  useEffect(() => {
    const updateResources = () => {
      const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      setResources(resourceEntries);

      // Find slow resources (>1s load time)
      const slow = resourceEntries.filter(resource => 
        resource.duration > 1000 && 
        !resource.name.includes('analytics') &&
        !resource.name.includes('gtag')
      );
      setSlowResources(slow);
    };

    // Update on page load
    if (document.readyState === 'complete') {
      updateResources();
    } else {
      window.addEventListener('load', updateResources);
    }

    // Update periodically
    const interval = setInterval(updateResources, 5000);

    return () => {
      window.removeEventListener('load', updateResources);
      clearInterval(interval);
    };
  }, []);

  if (process.env.NODE_ENV !== 'development' || slowResources.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 bg-orange-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-md">
      <h3 className="font-bold mb-2">🐌 Slow Resources</h3>
      <div className="text-xs space-y-1 max-h-40 overflow-y-auto">
        {slowResources.map((resource, index) => (
          <div key={index} className="border-b border-orange-400 pb-1">
            <div className="font-mono truncate">
              {resource.name.split('/').pop()}
            </div>
            <div className="text-orange-200">
              {Math.round(resource.duration)}ms • {Math.round(resource.transferSize / 1024)}KB
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Bundle size analyzer (development only)
export const BundleAnalyzer: React.FC = () => {
  const [bundleInfo, setBundleInfo] = useState<{
    totalSize: number;
    gzippedSize: number;
    chunks: Array<{ name: string; size: number }>;
  } | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    // This would typically be populated by webpack-bundle-analyzer data
    // For now, we'll estimate based on resource sizes
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const jsResources = resources.filter(r => r.name.endsWith('.js'));
    
    const totalSize = jsResources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0);
    
    setBundleInfo({
      totalSize,
      gzippedSize: totalSize * 0.3, // Rough estimate
      chunks: jsResources.map(resource => ({
        name: resource.name.split('/').pop() || 'unknown',
        size: resource.transferSize || 0,
      })).sort((a, b) => b.size - a.size).slice(0, 5),
    });
  }, []);

  if (process.env.NODE_ENV !== 'development' || !bundleInfo) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold mb-2">📦 Bundle Info</h3>
      <div className="text-xs space-y-1">
        <div>Total: {Math.round(bundleInfo.totalSize / 1024)}KB</div>
        <div>Gzipped: ~{Math.round(bundleInfo.gzippedSize / 1024)}KB</div>
        <div className="mt-2">
          <div className="font-semibold">Largest chunks:</div>
          {bundleInfo.chunks.map((chunk, index) => (
            <div key={index} className="truncate">
              {chunk.name}: {Math.round(chunk.size / 1024)}KB
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Send performance data to analytics
const sendPerformanceData = (data: PerformanceData) => {
  // In production, send to your analytics service
  if (typeof window !== 'undefined' && (window as any).gtag) {
    // Send to Google Analytics
    (window as any).gtag('event', 'performance_metrics', {
      custom_map: {
        metric1: 'lcp',
        metric2: 'fcp',
        metric3: 'cls',
        metric4: 'fid',
      },
      lcp: data.lcp,
      fcp: data.fcp,
      cls: data.cls,
      fid: data.fid,
    });
  }

  // You could also send to other services like:
  // - Sentry for performance monitoring
  // - DataDog for application monitoring
  // - Custom analytics endpoint
  
  console.log('Performance data:', data);
};

// Web Vitals reporter
export const reportWebVitals = (metric: any) => {
  // Send to analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
};

export default PerformanceMonitor;

