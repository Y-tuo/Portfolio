import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface MicrosoftFolderProps {
  project: Project;
}

export const MicrosoftFolder: React.FC<MicrosoftFolderProps> = ({ project }) => {
  return (
    <div className="group relative w-full aspect-[4/3] perspective-[1000px] cursor-pointer">
      {/* 
        Container for the visual folder 
        group-hover triggers the animations
      */}
      <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.02]">
        
        {/* === BACK PLATE (Glass) === */}
        <div className={`absolute inset-0 rounded-3xl shadow-lg border border-white/40 bg-white/30 backdrop-blur-md z-0`}>
          {/* Tab */}
          <div className="absolute -top-4 left-0 w-1/3 h-8 rounded-t-2xl bg-white/30 backdrop-blur-md border-t border-l border-r border-white/40" />
        </div>

        {/* === CONTENT === */}
        {/* 
            Adjustments:
            - Rotation changed to positive 3deg for right tilt.
            - Added 'transform-gpu' and 'will-change-transform' to prevent rounded corners turning to square on hover in some browsers.
            - Added 'rounded-2xl' to inner elements as well.
        */}
        <div className="absolute inset-x-4 bottom-6 -top-2 z-10 group-hover:-translate-y-10 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
            
            {/* Main Image File */}
            <div className="absolute inset-0 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 transform transform-gpu origin-bottom-left rotate-[3deg] group-hover:rotate-0 transition-all duration-700">
                <div className="w-full h-full relative rounded-2xl overflow-hidden">
                    <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity rounded-2xl"
                    />
                    {/* Overlay for text readability when closed */}
                    <div className="absolute inset-0 bg-black/5 pointer-events-none rounded-2xl" />
                    
                    {/* Action Icon that appears on hover */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg scale-75 group-hover:scale-100">
                        <ArrowUpRight className="w-6 h-6 text-gray-900" />
                    </div>
                </div>
            </div>
        </div>

        {/* === FRONT PLATE (Glass) === */}
        {/* This covers the bottom part and tilts open. High Z-index ensures it stays on top of content */}
        <div className={`absolute inset-x-0 bottom-0 h-[80%] rounded-b-3xl rounded-t-lg z-30 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] 
          border-t border-white/50 border-x border-b border-white/20
          bg-gradient-to-br from-white/60 to-white/10 backdrop-blur-xl
          origin-bottom 
          transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] 
          group-hover:rotate-x-[15deg]
          flex flex-col justify-end p-6
        `}>
          {/* Decorative sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none rounded-b-3xl" />
          
          {/* Label Area */}
          <div className="relative z-40 transform transition-transform duration-500 group-hover:translate-z-[30px] group-hover:translate-y-[-5px]">
            <div className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white mb-2 ${project.color} bg-opacity-80 backdrop-blur-sm`}>
                {project.category}
            </div>
            <h3 className="text-gray-900 text-xl font-bold tracking-tight drop-shadow-sm line-clamp-1">{project.title}</h3>
            <p className="text-gray-600 text-sm font-medium mt-1">View Case Study</p>
          </div>
        </div>
      </div>
    </div>
  );
};