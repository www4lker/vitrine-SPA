import React from 'react';
import { Project } from '../types';
import { Link } from 'react-router-dom'; // Using react-router-dom, but context will be HashRouter

interface ProjectCardProps {
  project: Project;
  onEditClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEditClick }) => {
  // We simulate a thumbnail by using a placeholder service or a standard icon
  const thumbnail = `https://picsum.photos/seed/${project.id}/400/250`;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:shadow-xl hover:border-slate-500 transition-all duration-300 group flex flex-col h-full">
      <div className="relative overflow-hidden h-48 bg-slate-900">
        <img 
          src={thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-black/60 backdrop-blur-sm text-xs font-mono px-2 py-1 rounded text-slate-300">
            {project.date}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-4 flex-1 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
           <button 
            onClick={(e) => {
              e.preventDefault();
              onEditClick(project);
            }}
            className="text-xs text-slate-500 hover:text-blue-400 flex items-center gap-1"
          >
            ✏️ Edit Text
          </button>

          <Link 
            to={`/view/${project.id}`}
            className="bg-white text-slate-900 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            View Experiment &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};