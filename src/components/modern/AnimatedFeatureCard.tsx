
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

const AnimatedFeatureCard: React.FC<AnimatedFeatureCardProps> = ({ icon: Icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.13 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <Card className="group  hover:shadow-xl transition-all duration-300 p-6 rounded-xl bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/10 border-0">
        <CardContent className="flex flex-col items-center text-center gap-4 p-0">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2 group-hover:scale-110 transition-transform">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnimatedFeatureCard;
