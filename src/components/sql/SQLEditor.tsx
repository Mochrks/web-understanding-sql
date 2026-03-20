import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSQLEngine, QueryResult } from '@/hooks/useSQLEngine';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Play,
  RotateCcw,
  Database,
  Loader2,
  CheckCircle2,
  XCircle,
  Trash2,
  Table,
} from 'lucide-react';

interface SQLEditorProps {
  initialQuery?: string;
  onSuccess?: () => void;
  expectedAnswer?: string;
  hint?: string;
  setupSQL?: string;
  showSampleDataButton?: boolean;
  autoLoadSampleData?: boolean;
  height?: string;
}

const ResultTable: React.FC<{ result: QueryResult }> = ({ result }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          {result.columns.map((col, i) => (
            <th key={i} className="px-4 py-2.5 text-left font-semibold border border-border/50 text-foreground whitespace-nowrap">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {result.values.map((row, ri) => (
          <tr key={ri} className={`${ri % 2 === 0 ? 'bg-muted/20' : 'bg-background'} hover:bg-accent/50 transition-colors`}>
            {row.map((cell, ci) => (
              <td key={ci} className="px-4 py-2 border border-border/30 text-muted-foreground whitespace-nowrap">
                {cell === null ? <span className="italic text-muted-foreground/50">NULL</span> : String(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const SQLEditor: React.FC<SQLEditorProps> = ({
  initialQuery = '',
  onSuccess,
  hint,
  setupSQL,
  showSampleDataButton = true,
  autoLoadSampleData = true,
  height = '200px',
}) => {
  const { isReady, isLoading, error, results, message, executeSQL, resetDatabase, loadSampleData } = useSQLEngine();
  const [query, setQuery] = useState(initialQuery);
  const [showHint, setShowHint] = useState(false);
  const [sampleLoaded, setSampleLoaded] = useState(false);
  const autoLoadedRef = useRef(false);

  // Auto-load sample data when engine is ready
  useEffect(() => {
    if (isReady && autoLoadSampleData && !autoLoadedRef.current) {
      autoLoadedRef.current = true;
      loadSampleData();
      setSampleLoaded(true);
    }
  }, [isReady, autoLoadSampleData, loadSampleData]);

  const handleExecute = useCallback(() => {
    if (!query.trim()) return;
    // Auto-load sample data if not yet loaded
    if (!sampleLoaded) {
      loadSampleData();
      setSampleLoaded(true);
    }
    // Run any setup SQL for exercises
    if (setupSQL) {
      try { executeSQL(setupSQL); } catch { /* ignore setup errors */ }
    }
    executeSQL(query);
    if (onSuccess && !error) {
      onSuccess();
    }
  }, [query, setupSQL, sampleLoaded, executeSQL, onSuccess, error, loadSampleData]);

  const handleLoadSample = useCallback(() => {
    loadSampleData();
    setSampleLoaded(true);
  }, [loadSampleData]);

  const handleReset = useCallback(() => {
    resetDatabase();
    setSampleLoaded(false);
  }, [resetDatabase]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
    }
  }, [handleExecute]);

  if (isLoading) {
    return (
      <Card className="p-8 flex items-center justify-center gap-3 bg-card/50 backdrop-blur">
        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
        <span className="text-muted-foreground">Initializing SQL Engine...</span>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={handleExecute}
          disabled={!isReady || !query.trim()}
          size="sm"
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/20 transition-all"
        >
          <Play className="h-4 w-4 mr-1.5" />
          Run Query
        </Button>

        {showSampleDataButton && (
          <Button onClick={handleLoadSample} disabled={!isReady} size="sm" variant="secondary" className="shadow-sm">
            <Database className="h-4 w-4 mr-1.5" />
            Load Sample Data
          </Button>
        )}

        <Button onClick={handleReset} size="sm" variant="outline" className="shadow-sm">
          <RotateCcw className="h-4 w-4 mr-1.5" />
          Reset DB
        </Button>

        <Button onClick={() => setQuery('')} size="sm" variant="ghost">
          <Trash2 className="h-4 w-4 mr-1.5" />
          Clear
        </Button>

        {hint && (
          <Button onClick={() => setShowHint(!showHint)} size="sm" variant="ghost" className="ml-auto text-amber-500 hover:text-amber-400">
            💡 Hint
          </Button>
        )}
      </div>

      {/* Hint */}
      {showHint && hint && (
        <div className="px-4 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400 text-sm">
          💡 <strong>Hint:</strong> {hint}
        </div>
      )}

      {/* Editor */}
      <div className="relative rounded-lg overflow-hidden border border-border/50 shadow-lg">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-xs text-slate-400 ml-2 font-mono">SQL Editor</span>
          <span className="text-xs text-slate-500 ml-auto font-mono">Ctrl+Enter to run</span>
        </div>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-slate-900 text-green-400 font-mono text-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none placeholder-slate-600"
          style={{ minHeight: height }}
          placeholder="-- Write your SQL query here...&#10;-- Press Ctrl+Enter to execute"
          spellCheck={false}
        />
      </div>

      {/* Results */}
      {(message || error || results.length > 0) && (
        <Tabs defaultValue={results.length > 0 ? "results" : "message"} className="w-full">
          <TabsList className="w-full justify-start bg-muted/50">
            {results.length > 0 && (
              <TabsTrigger value="results" className="gap-1.5">
                <Table className="h-3.5 w-3.5" />
                Results ({results.reduce((s, r) => s + r.values.length, 0)} rows)
              </TabsTrigger>
            )}
            <TabsTrigger value="message" className="gap-1.5">
              {error ? <XCircle className="h-3.5 w-3.5 text-red-500" /> : <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
              Messages
            </TabsTrigger>
          </TabsList>

          {results.length > 0 && (
            <TabsContent value="results" className="mt-2">
              <Card className="overflow-hidden border-border/50">
                <ScrollArea className="max-h-[400px]">
                  {results.map((result, i) => (
                    <ResultTable key={i} result={result} />
                  ))}
                </ScrollArea>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="message" className="mt-2">
            <Card className={`p-4 ${error ? 'bg-red-500/5 border-red-500/20' : 'bg-green-500/5 border-green-500/20'}`}>
              <div className="flex items-start gap-2">
                {error ? (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                )}
                <pre className={`text-sm font-mono whitespace-pre-wrap ${error ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>
                  {error || message}
                </pre>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default SQLEditor;
