import React from 'react';
import { SQLEditor } from '@/components/sql/SQLEditor';
import { Card } from '@/components/ui/card';
import { Terminal, Database, Info } from 'lucide-react';

export const SQLEditorPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
          <Terminal className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">SQL Editor</h1>
          <p className="text-sm text-muted-foreground">Write and execute SQL queries in your browser</p>
        </div>
      </div>

      {/* Info Banner */}
      <Card className="p-4 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border-blue-500/10">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm text-muted-foreground">
            <p><strong className="text-foreground">How to use:</strong></p>
            <ul className="list-disc list-inside space-y-0.5 text-xs">
              <li>Click <strong>"Load Sample Data"</strong> to create sample tables (employees, products, orders, etc.)</li>
              <li>Write your SQL query in the editor below</li>
              <li>Press <strong>Ctrl+Enter</strong> or click <strong>"Run Query"</strong> to execute</li>
              <li>You can CREATE TABLE, INSERT, UPDATE, DELETE – full SQL support!</li>
              <li>Click <strong>"Reset DB"</strong> to start fresh with an empty database</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Available Tables Reference */}
      <Card className="p-4 bg-card/50 border-border/30">
        <div className="flex items-center gap-2 mb-3">
          <Database className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Available Tables (after loading sample data)</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {[
            { name: 'employees', desc: '15 records' },
            { name: 'departments', desc: '5 records' },
            { name: 'products', desc: '10 records' },
            { name: 'customers', desc: '8 records' },
            { name: 'orders', desc: '10 records' },
            { name: 'order_items', desc: '17 records' },
            { name: 'suppliers', desc: '5 records' },
          ].map(table => (
            <div key={table.name} className="px-3 py-2 bg-muted/30 rounded-lg border border-border/20">
              <div className="text-xs font-mono font-semibold text-foreground">{table.name}</div>
              <div className="text-[10px] text-muted-foreground">{table.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* SQL Editor */}
      <SQLEditor
        initialQuery="-- Start by loading sample data using the button above!\n-- Then try: SELECT * FROM employees;\n"
        showSampleDataButton={true}
        height="300px"
      />
    </div>
  );
};

export default SQLEditorPage;
