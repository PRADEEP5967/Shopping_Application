
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Gauge, Activity } from "lucide-react";

// Sample live chart data
const liveData = [
  { time: "10:00", users: 120, sales: 4500 },
  { time: "10:10", users: 132, sales: 4800 },
  { time: "10:20", users: 140, sales: 5000 },
  { time: "10:30", users: 150, sales: 4700 },
  { time: "10:40", users: 165, sales: 5200 },
  { time: "10:50", users: 160, sales: 5100 },
];

const RealTimeAnalysis: React.FC = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-primary" />
            Online Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">162</div>
          <p className="text-green-600 mt-1 text-xs">+8 new users in last 10 min</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Live Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">$5,200</div>
          <p className="text-green-600 mt-1 text-xs">+14% vs avg</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">3.8%</div>
          <p className="text-amber-600 mt-1 text-xs">Slightly above target</p>
        </CardContent>
      </Card>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Live User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={liveData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line dataKey="users" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Live Sales Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={liveData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default RealTimeAnalysis;
