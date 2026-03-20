import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sqlCategories } from '@/data';
import { useProgress } from '@/hooks/useProgress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Home,
  Terminal,
  CheckCircle2,
  Circle,
  Menu,
  X,
  Github,
  Heart,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { getTopicProgress } = useProgress();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['sql-tutorial']);

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev =>
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-card/95 backdrop-blur-xl border-r border-border/50 shadow-2xl transition-all duration-300 ease-in-out flex flex-col ${
          isOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full lg:translate-x-0 lg:w-72'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <span className="text-white font-bold text-sm">SQL</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-none">SQL Learning</h1>
              <p className="text-[10px] text-muted-foreground mt-0.5">Interactive Tutorial</p>
            </div>
          </Link>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={onToggle}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="p-3 space-y-1">
          <Link to="/" onClick={() => isOpen && onToggle()}>
            <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/') ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}>
              <Home className="h-4 w-4" />
              Dashboard
            </div>
          </Link>
          <Link to="/sql-editor" onClick={() => isOpen && onToggle()}>
            <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/sql-editor') ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}>
              <Terminal className="h-4 w-4" />
              SQL Editor
            </div>
          </Link>
        </div>

        {/* Topic Categories */}
        <ScrollArea className="flex-1 px-3 pb-4">
          <div className="space-y-1 mt-2">
            {sqlCategories.map(category => {
              const isExpanded = expandedCategories.includes(category.id);
              return (
                <div key={category.id}>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-accent/50 transition-all"
                  >
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 text-left truncate">{category.name}</span>
                    <span className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">{category.topics.length}</span>
                    {isExpanded ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                  </button>

                  {isExpanded && (
                    <div className="ml-4 pl-3 border-l border-border/30 space-y-0.5 mt-0.5">
                      {category.topics.map(topic => {
                        const progress = getTopicProgress(topic.id, topic.exercises.length);
                        const topicPath = `/topic/${topic.slug}`;
                        const active = isActive(topicPath);

                        return (
                          <Link key={topic.id} to={topicPath} onClick={() => isOpen && onToggle()}>
                            <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-all ${
                              active
                                ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-muted-foreground hover:text-foreground hover:bg-accent/30'
                            }`}>
                              {progress === 100 ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                              ) : progress > 0 ? (
                                <div className="relative h-3.5 w-3.5 flex-shrink-0">
                                  <svg className="h-3.5 w-3.5 -rotate-90" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                                    <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2"
                                      strokeDasharray={`${(progress / 100) * 37.7} 37.7`}
                                      className="text-blue-500"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <Circle className="h-3.5 w-3.5 flex-shrink-0 opacity-40" />
                              )}
                              <span className="truncate">{topic.title}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border/50 space-y-2">
          <a
            href="https://github.com/mochrks"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            <span>@mochrks</span>
          </a>
          <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
            <span>© 2024</span>
            <Heart className="h-2.5 w-2.5 text-red-400" />
            <span>SQL Learning Hub</span>
          </div>
        </div>
      </aside>
    </>
  );
};

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">SQL</span>
          </div>
          <span className="text-sm font-semibold">SQL Learning</span>
        </div>
      </div>

      {/* Main content */}
      <main className="lg:ml-72 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
