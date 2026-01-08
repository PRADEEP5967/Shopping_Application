
import { useState, useEffect, useCallback } from 'react';

export interface WidgetConfig {
  id: string;
  type: string;
  title: string;
  visible: boolean;
  expanded: boolean;
  order: number;
}

const DEFAULT_WIDGETS: WidgetConfig[] = [
  { id: 'metrics', type: 'metrics', title: 'Key Metrics', visible: true, expanded: false, order: 0 },
  { id: 'revenue-chart', type: 'revenue-chart', title: 'Revenue & Orders Trend', visible: true, expanded: false, order: 1 },
  { id: 'category-pie', type: 'category-pie', title: 'Sales by Category', visible: true, expanded: false, order: 2 },
  { id: 'performance-goals', type: 'performance-goals', title: 'Performance Goals', visible: true, expanded: false, order: 3 },
  { id: 'hourly-traffic', type: 'hourly-traffic', title: 'Hourly Traffic', visible: true, expanded: false, order: 4 },
  { id: 'top-products', type: 'top-products', title: 'Top Products', visible: true, expanded: false, order: 5 },
  { id: 'recent-transactions', type: 'recent-transactions', title: 'Recent Transactions', visible: true, expanded: false, order: 6 },
  { id: 'geographic', type: 'geographic', title: 'Geographic Performance', visible: true, expanded: false, order: 7 },
];

const STORAGE_KEY = 'admin-dashboard-layout';

export const useDashboardLayout = () => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to handle new widgets
        const mergedWidgets = DEFAULT_WIDGETS.map(defaultWidget => {
          const savedWidget = parsed.find((w: WidgetConfig) => w.id === defaultWidget.id);
          return savedWidget ? { ...defaultWidget, ...savedWidget } : defaultWidget;
        });
        return mergedWidgets.sort((a, b) => a.order - b.order);
      }
    } catch (e) {
      console.error('Error loading dashboard layout:', e);
    }
    return DEFAULT_WIDGETS;
  });

  const [isEditMode, setIsEditMode] = useState(false);

  // Save to localStorage whenever widgets change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
    } catch (e) {
      console.error('Error saving dashboard layout:', e);
    }
  }, [widgets]);

  const reorderWidgets = useCallback((activeId: string, overId: string) => {
    setWidgets(prev => {
      const oldIndex = prev.findIndex(w => w.id === activeId);
      const newIndex = prev.findIndex(w => w.id === overId);
      
      if (oldIndex === -1 || newIndex === -1) return prev;
      
      const newWidgets = [...prev];
      const [removed] = newWidgets.splice(oldIndex, 1);
      newWidgets.splice(newIndex, 0, removed);
      
      // Update order values
      return newWidgets.map((w, index) => ({ ...w, order: index }));
    });
  }, []);

  const toggleWidgetVisibility = useCallback((widgetId: string) => {
    setWidgets(prev => 
      prev.map(w => w.id === widgetId ? { ...w, visible: !w.visible } : w)
    );
  }, []);

  const toggleWidgetExpanded = useCallback((widgetId: string) => {
    setWidgets(prev => 
      prev.map(w => w.id === widgetId ? { ...w, expanded: !w.expanded } : w)
    );
  }, []);

  const resetLayout = useCallback(() => {
    setWidgets(DEFAULT_WIDGETS);
  }, []);

  const getVisibleWidgets = useCallback(() => {
    return widgets.filter(w => w.visible).sort((a, b) => a.order - b.order);
  }, [widgets]);

  return {
    widgets,
    isEditMode,
    setIsEditMode,
    reorderWidgets,
    toggleWidgetVisibility,
    toggleWidgetExpanded,
    resetLayout,
    getVisibleWidgets,
  };
};
