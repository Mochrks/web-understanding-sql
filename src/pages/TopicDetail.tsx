import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTopicBySlug, getCategoryByTopicSlug, getAllTopics } from '@/data';
import { useProgress } from '@/hooks/useProgress';
import { SQLEditor } from '@/components/sql/SQLEditor';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  Code2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Eye,
  Sparkles,
  Lightbulb,
  GraduationCap,
} from 'lucide-react';
import { TopicIcon } from '@/components/sql/TopicIcon';

// Simple markdown-like renderer
const TheoryRenderer: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let inCodeBlock = false;
  let codeContent = '';
  let inTable = false;
  let tableRows: string[][] = [];

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted/50">
                {tableRows[0].map((cell, ci) => (
                  <th key={ci} className="px-3 py-2 text-left font-semibold border border-border/30">{cell.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(2).map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-muted/20' : ''}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-1.5 border border-border/20 text-muted-foreground">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${i}`} className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto my-3 border border-slate-700">
            <code>{codeContent.trim()}</code>
          </pre>
        );
        codeContent = '';
        inCodeBlock = false;
      } else {
        flushTable();
        inCodeBlock = true;
      }
      i++;
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      i++;
      continue;
    }

    // Table detection
    if (line.includes('|') && line.trim().startsWith('|')) {
      const cells = line.split('|').filter(c => c.trim() !== '');
      if (cells.length > 0) {
        if (!inTable) inTable = true;
        tableRows.push(cells);
        i++;
        continue;
      }
    } else if (inTable) {
      flushTable();
    }

    // Headers
    if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="text-2xl font-bold text-foreground mt-6 mb-3">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-xl font-semibold text-foreground mt-5 mb-2">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-lg font-semibold text-foreground mt-4 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith('- ')) {
      // Parse inline formatting
      const text = line.slice(2);
      elements.push(
        <li key={i} className="ml-4 text-muted-foreground text-sm list-disc" dangerouslySetInnerHTML={{
          __html: text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
            .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-muted rounded text-xs font-mono text-blue-500 dark:text-blue-400">$1</code>')
        }} />
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{
          __html: line
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
            .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-muted rounded text-xs font-mono text-blue-500 dark:text-blue-400">$1</code>')
        }} />
      );
    }
    i++;
  }

  flushTable();

  return <div className="space-y-0.5">{elements}</div>;
};

export const TopicDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const topic = getTopicBySlug(slug || '');
  const category = getCategoryByTopicSlug(slug || '');
  const allTopics = getAllTopics();
  const currentIndex = allTopics.findIndex(t => t.slug === slug);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const {
    markTheoryRead,
    markExerciseCompleted,
    isTheoryRead,
    isExerciseCompleted,
    getTopicProgress,
  } = useProgress();

  const [activeTab, setActiveTab] = useState('theory');
  const [activeExercise, setActiveExercise] = useState(0);

  useEffect(() => {
    setActiveTab('theory');
    setActiveExercise(0);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="text-6xl">🔍</div>
        <h2 className="text-xl font-semibold">Topic Not Found</h2>
        <p className="text-muted-foreground">The topic you're looking for doesn't exist.</p>
        <Link to="/"><Button>Back to Dashboard</Button></Link>
      </div>
    );
  }

  const progress = getTopicProgress(topic.id, topic.exercises.length);
  const theoryRead = isTheoryRead(topic.id);

  const handleMarkTheoryRead = () => {
    markTheoryRead(topic.id);
  };

  const handleExerciseSuccess = (exerciseId: string) => {
    markExerciseCompleted(topic.id, exerciseId);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Dashboard</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground/70">{category?.name}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{topic.title}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <TopicIcon topicId={topic.id} size="lg" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-[10px]">{category?.name}</Badge>
              {progress === 100 && (
                <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-[10px]">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold text-foreground">{topic.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <Card className="p-4 bg-card/50 border-border/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Topic Progress</span>
          <span className="text-sm font-mono text-muted-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            {theoryRead ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> : <Circle className="h-3.5 w-3.5" />}
            Theory ({theoryRead ? 'Read' : 'Unread'})
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5" />
            Exercises: {topic.exercises.filter(e => isExerciseCompleted(topic.id, e.id)).length}/{topic.exercises.length}
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 bg-muted/50">
          <TabsTrigger value="theory" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Theory
            {theoryRead && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
          </TabsTrigger>
          <TabsTrigger value="exercises" className="gap-2">
            <Code2 className="h-4 w-4" />
            Exercises ({topic.exercises.filter(e => isExerciseCompleted(topic.id, e.id)).length}/{topic.exercises.length})
          </TabsTrigger>
        </TabsList>

        {/* Theory Tab */}
        <TabsContent value="theory" className="mt-4 space-y-4">
          <Card className="p-6 bg-card/50 backdrop-blur border-border/30">
            <TheoryRenderer content={topic.theory} />
          </Card>

          {/* Syntax Example */}
          <Card className="p-5 bg-card/50 border-border/30">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <h3 className="font-semibold text-foreground">Syntax Example</h3>
            </div>
            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-700">
              <code>{topic.syntaxExample}</code>
            </pre>
          </Card>

          {/* Try it in Editor */}
          <Card className="p-5 bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-green-500/10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-green-500" />
              <h3 className="font-semibold text-foreground">Try It Yourself</h3>
            </div>
            <SQLEditor
              initialQuery={topic.syntaxExample}
              showSampleDataButton={true}
              height="150px"
            />
          </Card>

          {/* Mark as Read */}
          {!theoryRead && (
            <div className="flex justify-center">
              <Button
                onClick={handleMarkTheoryRead}
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/20"
              >
                <Eye className="h-4 w-4 mr-2" />
                Mark Theory as Read
              </Button>
            </div>
          )}

          {theoryRead && (
            <div className="flex justify-center">
              <Button
                onClick={() => setActiveTab('exercises')}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20"
              >
                <Code2 className="h-4 w-4 mr-2" />
                Continue to Exercises
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Exercises Tab */}
        <TabsContent value="exercises" className="mt-4 space-y-4">
          {/* Exercise Selection */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {topic.exercises.map((exercise, idx) => {
              const completed = isExerciseCompleted(topic.id, exercise.id);
              return (
                <Button
                  key={exercise.id}
                  variant={activeExercise === idx ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveExercise(idx)}
                  className={`flex-shrink-0 gap-1.5 ${
                    activeExercise === idx
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                      : completed
                      ? 'border-green-500/30 text-green-600 dark:text-green-400'
                      : ''
                  }`}
                >
                  {completed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                  Exercise {idx + 1}
                </Button>
              );
            })}
          </div>

          {/* Active Exercise */}
          {topic.exercises[activeExercise] && (
            <Card className="p-5 bg-card/50 border-border/30 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-[10px]">Exercise {activeExercise + 1}</Badge>
                    {isExerciseCompleted(topic.id, topic.exercises[activeExercise].id) && (
                      <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-[10px]">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{topic.exercises[activeExercise].title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{topic.exercises[activeExercise].description}</p>
                </div>
                <GraduationCap className="h-6 w-6 text-muted-foreground/30 flex-shrink-0" />
              </div>

              <SQLEditor
                initialQuery={topic.exercises[activeExercise].initialQuery}
                hint={topic.exercises[activeExercise].hint}
                setupSQL={topic.exercises[activeExercise].setupSQL}
                expectedAnswer={topic.exercises[activeExercise].expectedAnswer}
                onSuccess={() => handleExerciseSuccess(topic.exercises[activeExercise].id)}
                showSampleDataButton={true}
                height="160px"
              />

              {/* Show Answer if needed */}
              <details className="group">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  Show Expected Answer
                </summary>
                <pre className="mt-2 bg-slate-900 text-amber-400 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-700">
                  <code>{topic.exercises[activeExercise].expectedAnswer}</code>
                </pre>
              </details>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        {prevTopic ? (
          <Link to={`/topic/${prevTopic.slug}`}>
            <Button variant="outline" size="sm" className="gap-1.5">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{prevTopic.title}</span>
              <span className="sm:hidden">Previous</span>
            </Button>
          </Link>
        ) : <div />}

        {nextTopic ? (
          <Link to={`/topic/${nextTopic.slug}`}>
            <Button variant="outline" size="sm" className="gap-1.5">
              <span className="hidden sm:inline">{nextTopic.title}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-1.5">
              Back to Dashboard
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopicDetail;
