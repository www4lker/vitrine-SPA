import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import projectsData from './projects.json';
// import { PROJECTS } from './constants'; // Deprecated
const PROJECTS = projectsData as Project[];
import { Project } from './types';
import { ProjectCard } from './components/ProjectCard';
import { GeminiEditor } from './components/GeminiEditor';

// --- PAGE: HOME ---
const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('');

  const filteredProjects = useMemo(() => {
    if (!filter) return projects;
    return projects.filter(p =>
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [projects, filter]);

  const handleEditSave = (newText: string) => {
    if (editingProject) {
      setProjects(prev => prev.map(p =>
        p.id === editingProject.id ? { ...p, description: newText } : p
      ));
      setEditingProject(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* Header */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
            <h1 className="text-xl font-bold text-white tracking-tight">My Experiments <span className="text-slate-500 font-normal text-sm ml-2">v1.0</span></h1>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search experiments..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-full py-1.5 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Experimental Showcase</h2>
          <p className="text-slate-400">
            A collection of interactive summaries and Single Page Applications generated via AI.
            These are experimental prototypes exploring new ways to visualize complex information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onEditClick={setEditingProject}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p>No experiments found matching "{filter}".</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} My Experimental Portfolio. Hosted on Static Pages.</p>
        </div>
      </footer>

      {/* Modals */}
      {editingProject && (
        <GeminiEditor
          initialText={editingProject.description}
          onSave={handleEditSave}
          onClose={() => setEditingProject(null)}
        />
      )}
    </div>
  );
};

// --- PAGE: VIEWER (The critical part for user's SPAs) ---
const Viewer: React.FC = () => {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold text-red-400">Experiment Not Found</h2>
        <Link to="/" className="text-blue-400 hover:underline">Back to Home</Link>
      </div>
    );
  }

  // Construct path to the index.html inside the public folder
  // Projects are synced to public/projects/
  const iframeSrc = `/projects/${project.folderName}/${project.entryFile || 'index.html'}`;

  return (
    <div className="h-screen flex flex-col bg-slate-900 overflow-hidden">
      <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Portfolio
          </Link>
          <div className="h-4 w-px bg-slate-700 mx-2"></div>
          <h1 className="font-bold text-white text-sm truncate max-w-xs md:max-w-md">{project.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={iframeSrc}
            target="_blank"
            rel="noreferrer"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded border border-slate-700 transition-colors"
          >
            Open Fullscreen ↗
          </a>
        </div>
      </header>

      <div className="flex-1 bg-white relative">
        {/* 
          Using an iframe is the safest way to render separate HTML/CSS/JS projects 
          without style conflicts (CSS Bleeding) with the main React app.
        */}
        <iframe
          src={iframeSrc}
          title={project.title}
          className="w-full h-full border-0 block"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

// --- MAIN ROUTER ---
const App: React.FC = () => {
  // HashRouter is crucial for GitHub Pages or Netlify where you might not have full server-side routing control for sub-paths
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id" element={<Viewer />} />
      </Routes>
    </HashRouter>
  );
};

export default App;