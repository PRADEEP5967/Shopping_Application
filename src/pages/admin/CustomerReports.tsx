
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { Users, Info } from "lucide-react";

const segmentsData = [
  { name: "Returning", value: 58, color: "#6366f1" },
  { name: "New", value: 34, color: "#82ca9d" },
  { name: "VIP", value: 8, color: "#ffc658" },
];

const countriesData = [
  { country: "USA", users: 120 },
  { country: "UK", users: 32 },
  { country: "Canada", users: 18 },
  { country: "Others", users: 11 },
];

const CustomerReports: React.FC = () => (
  <div className="space-y-8 animate-fade-in">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Customer Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-2xl font-bold">162</div>
            <p className="text-gray-600">Active Customers</p>
          </div>
          <div>
            <div className="text-2xl font-bold">24</div>
            <p className="text-gray-600">New This Week</p>
          </div>
          <div>
            <div className="text-2xl font-bold">4m 28s</div>
            <p className="text-gray-600">Avg. Session</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Customer Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={segmentsData}
                cx="50%"
                cy="50%"
                outerRadius={86}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {segmentsData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Top Countries</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {countriesData.map((c, idx) => (
              <li key={idx} className="flex justify-between">
                <span className="font-medium">{c.country}</span>
                <span className="text-primary">{c.users}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-500" />
          Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Returning customers have 3x higher LTV than new customers.</li>
          <li>VIP users have a cart value of over $7000.</li>
          <li>USA leads by active user count, steady weekly growth.</li>
        </ul>
      </CardContent>
    </Card>
  </div>
);

export default CustomerReports;
