
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ChartPie } from "lucide-react";

const insightsTrends = [
  { period: "Q1", profit: 22000 },
  { period: "Q2", profit: 25800 },
  { period: "Q3", profit: 19700 },
  { period: "Q4", profit: 28500 },
];

const sourceData = [
  { name: "Direct", value: 46, color: "#6366f1" },
  { name: "Social", value: 32, color: "#82ca9d" },
  { name: "Referral", value: 15, color: "#ffc658" },
  { name: "Ads", value: 7, color: "#ff7300" },
];

const Insights: React.FC = () => (
  <div className="space-y-8 animate-fade-in">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartPie className="w-5 h-5 text-primary" />
          Business Insights Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-gray-700 dark:text-gray-300">
          Key performance metrics and actionable trends for the business.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-1">Quarterly Profit</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={insightsTrends}>
                <XAxis dataKey="period" />
                <Tooltip />
                <Bar dataKey="profit" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-1">Traffic Sources</h4>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sourceData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Actionable Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Focusing on direct traffic can accelerate Q4 profit growth.</li>
          <li>Q2 showed the highest profit increase (+3,800$ over Q1).</li>
          <li>Referral and ad channels are below target—potential to optimize campaigns.</li>
        </ul>
      </CardContent>
    </Card>
  </div>
);

export default Insights;
