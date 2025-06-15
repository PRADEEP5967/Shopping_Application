
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Eye, Heart } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
  likes?: number;
  views?: number;
}

interface ProjectCardProps {
  project: Project;
  onLike?: (title: string) => void;
  onView?: (title: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onLike, onView }) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in">
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {project.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-white">
            Featured
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <Button 
              size="sm" 
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black flex-1"
              onClick={() => onView?.(project.title)}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black"
            >
              <Github className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Project Stats */}
        <div className="absolute top-3 right-3 flex gap-2">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-white text-xs">
            <Eye className="h-3 w-3" />
            {project.views || 0}
          </div>
          <button 
            onClick={() => onLike?.(project.title)}
            className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-white text-xs hover:bg-red-500/50 transition-colors"
          >
            <Heart className="h-3 w-3" />
            {project.likes || 0}
          </button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-bold text-xl mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <Badge key={techIndex} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
