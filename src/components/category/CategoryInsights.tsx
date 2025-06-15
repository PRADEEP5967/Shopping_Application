
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Star, Clock } from 'lucide-react';

interface CategoryInsightsProps {
  categoryName: string;
  productCount: number;
  averageRating: number;
  trendy?: boolean;
}

const CategoryInsights: React.FC<CategoryInsightsProps> = ({
  categoryName,
  productCount,
  averageRating,
  trendy = false,
}) => {
  const insights = [
    {
      icon: TrendingUp,
      label: 'Trending Category',
      value: trendy ? 'Hot' : 'Stable',
      color: trendy ? 'text-orange-600' : 'text-blue-600',
    },
    {
      icon: Users,
      label: 'Products Available',
      value: `${productCount}+`,
      color: 'text-green-600',
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: `${averageRating.toFixed(1)}★`,
      color: 'text-yellow-600',
    },
    {
      icon: Clock,
      label: 'Updated',
      value: 'Recently',
      color: 'text-purple-600',
    },
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <span>Category Insights</span>
          {trendy && (
            <Badge className="bg-orange-100 text-orange-800">
              Trending
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mb-2 ${insight.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-medium text-gray-900">{insight.value}</div>
                <div className="text-xs text-gray-500">{insight.label}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryInsights;
