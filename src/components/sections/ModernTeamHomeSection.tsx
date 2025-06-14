
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const githubImgUrl = "https://github.com/pradeepsahani.png";

export const ModernTeamHomeSection = () => {
  const roles = [
    { title: "CEO & Founder", role: "Chief Executive Officer" },
    { title: "Chief Technology Officer", role: "Technology & Engineering" },
    { title: "Head of Operations", role: "Business Operations" },
    { title: "Customer Experience Director", role: "Customer Experience" },
  ];
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white animate-fade-in">
            Meet Our Leadership
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 animate-fade-in">
            The vision and direction behind all our progress
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map(({ title, role }, idx) => (
            <Card key={title} className="group hover:shadow-2xl rounded-2xl transition-all duration-300 border-0 animate-fade-in">
              <CardContent className="flex flex-col items-center p-6">
                <img
                  src={githubImgUrl}
                  alt="Pradeep Sahani"
                  className="w-24 h-24 rounded-full object-cover shadow-lg mb-5 ring-2 ring-primary animate-scale-in"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Pradeep Sahani</h3>
                  <p className="text-primary font-medium mb-2">{title}</p>
                  <Badge variant="outline" className="text-xs">{role}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
