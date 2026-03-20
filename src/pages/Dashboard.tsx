import React from 'react';
import { Link } from 'react-router-dom';
import { sqlCategories, getAllTopics } from '@/data';
import { useProgress } from '@/hooks/useProgress';
import { useTheme } from '@/hooks/useTheme';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  MoonStar,
  SunMoon,
  BookOpen,
  Database,
  BookMarked,
  Terminal,
  Trophy,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Zap,
} from 'lucide-react';
import { TopicIcon } from '@/components/sql/TopicIcon';

const categoryIcons: Record<string, React.ReactNode> = {
  'sql-tutorial': <BookOpen className="h-4 w-4 text-white" />,
  'sql-database': <Database className="h-4 w-4 text-white" />,
  'sql-references': <BookMarked className="h-4 w-4 text-white" />,
};

export const Dashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { getTopicProgress, getTotalProgress } = useProgress();
  const allTopics = getAllTopics();
  const topicsMeta = allTopics.map(t => ({ id: t.id, exerciseCount: t.exercises.length }));
  const totalProgress = getTotalProgress(topicsMeta);
  const completedTopics = allTopics.filter(t => getTopicProgress(t.id, t.exercises.length) === 100).length;
  const totalExercises = allTopics.reduce((s, t) => s + t.exercises.length, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                SQL Learning Hub
              </h1>
              <p className="text-muted-foreground text-sm">Master SQL from basics to advanced 🚀</p>
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={toggleTheme} className="h-10 w-10 p-0 rounded-xl">
          {theme === 'dark' ? <MoonStar className="h-4 w-4" /> : <SunMoon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Topics', value: allTopics.length, icon: BookOpen, color: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/20' },
          { label: 'Exercises', value: totalExercises, icon: Zap, color: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/20' },
          { label: 'Completed', value: completedTopics, icon: Trophy, color: 'from-green-500 to-emerald-500', shadow: 'shadow-green-500/20' },
          { label: 'Progress', value: `${totalProgress}%`, icon: Sparkles, color: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/20' },
        ].map(stat => (
          <Card key={stat.label} className="p-4 bg-card/50 backdrop-blur border-border/30 hover:border-border/50 transition-all hover:scale-[1.02]">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg ${stat.shadow}`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Overall Progress */}
      <Card className="p-6 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border-blue-500/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-foreground">Overall Progress</h3>
          </div>
          <span className="text-sm font-mono text-blue-500">{totalProgress}%</span>
        </div>
        <Progress value={totalProgress} className="h-3 bg-blue-500/10" />
        <p className="text-xs text-muted-foreground mt-2">
          {completedTopics} of {allTopics.length} topics completed • {totalExercises} total exercises
        </p>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/sql-editor">
          <Card className="p-5 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/10 hover:border-green-500/30 transition-all group cursor-pointer hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:shadow-green-500/40 transition-shadow">
                <Terminal className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">SQL Editor</h3>
                <p className="text-xs text-muted-foreground">Write and execute SQL queries directly</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
            </div>
          </Card>
        </Link>
        <Link to={`/topic/${allTopics[0]?.slug}`}>
          <Card className="p-5 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/10 hover:border-blue-500/30 transition-all group cursor-pointer hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Start Learning</h3>
                <p className="text-xs text-muted-foreground">Begin with SQL Introduction</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
          </Card>
        </Link>
      </div>

      {/* Categories */}
      {sqlCategories.map(category => (
        <section key={category.id} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center shadow-md`}>
              {categoryIcons[category.id] || <BookOpen className="h-4 w-4 text-white" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{category.name}</h2>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </div>
            <span className="ml-auto text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">{category.topics.length} topics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {category.topics.map(topic => {
              const progress = getTopicProgress(topic.id, topic.exercises.length);
              return (
                <Link key={topic.id} to={`/topic/${topic.slug}`}>
                  <Card className="p-4 bg-card/50 backdrop-blur border-border/30 hover:border-border/60 transition-all group cursor-pointer hover:scale-[1.01] hover:shadow-lg h-full">
                    <div className="flex items-start gap-4">
                      <TopicIcon topicId={topic.id} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {topic.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{topic.description}</p>
                        <div className="flex items-center gap-2 mt-2.5">
                          <Progress value={progress} className="h-1.5 flex-1 bg-muted/30" />
                          <span className="text-[10px] text-muted-foreground font-mono">{progress}%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Dashboard;
