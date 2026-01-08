import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = "";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is approximately in view (top third of screen)
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = "#" + sectionId;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-8 ${isScrolled || mobileMenuOpen ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
        {/* Minimalist Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-3 group z-50"
        >
          {/* Solid Black Square Logo */}
          <div className="w-9 h-9 bg-black rounded-md flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white font-bold font-mono text-sm tracking-tighter">WA</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base leading-tight text-gray-900 tracking-tight group-hover:text-black">
              Aoyun's Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm transition-all duration-300 py-1 relative group cursor-pointer ${activeSection === link.href
                ? 'text-gray-900 font-bold'
                : 'text-gray-500 font-medium hover:text-gray-900'
                }`}
            >
              {link.name}
              {/* Active State Underline */}
              <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-black transition-transform duration-300 origin-left ${activeSection === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                }`} />
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 p-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-8 md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-2xl font-semibold relative ${activeSection === link.href ? 'text-black' : 'text-gray-500'}`}
              >
                {link.name}
                {activeSection === link.href && (
                  <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-black" />
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};