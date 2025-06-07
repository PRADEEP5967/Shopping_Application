
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, Github } from 'lucide-react';

export const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/placeholder.svg',
      bio: 'Visionary leader with 15+ years in tech innovation.',
      skills: ['Strategy', 'Leadership', 'Innovation'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/placeholder.svg',
      bio: 'Full-stack architect passionate about scalable solutions.',
      skills: ['React', 'Node.js', 'Cloud'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: '/placeholder.svg',
      bio: 'Creative designer focused on user-centered experiences.',
      skills: ['UI/UX', 'Figma', 'Branding'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      image: '/placeholder.svg',
      bio: 'Performance-driven developer with expertise in modern frameworks.',
      skills: ['TypeScript', 'Next.js', 'GraphQL'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Amazing Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Passionate professionals dedicated to delivering exceptional results and pushing the boundaries of innovation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                
                <div className="flex flex-wrap gap-1">
                  {member.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
