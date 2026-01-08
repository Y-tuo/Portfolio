import React from 'react';

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  englishTitle?: string;
  subtitle?: string;
  invertHeader?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, className = "", children, title, englishTitle, subtitle, invertHeader = false }) => {
  return (
    <section id={id} className={`py-20 md:py-32 px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {(title || englishTitle) && (
          <div className="mb-16">
             <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-3">
                {title && (
                    <h2 className={`text-3xl md:text-4xl font-bold tracking-tight leading-none ${invertHeader ? 'text-white' : 'text-gray-900'}`}>
                        {title}
                    </h2>
                )}
                
                {/* Separator Slash */}
                {(title && englishTitle) && (
                    <span className={`hidden md:block text-2xl md:text-3xl font-light mx-1 ${invertHeader ? 'text-gray-600' : 'text-gray-300'}`}>/</span>
                )}

                {englishTitle && (
                    <span className={`text-sm font-mono tracking-wider uppercase mb-1.5 font-medium ${invertHeader ? 'text-gray-400' : 'text-gray-500'}`}>
                        {englishTitle}
                    </span>
                )}
             </div>
             {subtitle && <p className={`mt-4 text-lg max-w-2xl ${invertHeader ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};