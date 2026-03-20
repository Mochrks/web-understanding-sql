import { SQLTopic } from '@/types/sql-topics';

export const sqlReferenceTopics: SQLTopic[] = [
  {
    id: 'sql-data-types', slug: 'sql-data-types', title: 'SQL Data Types', category: 'SQL References', icon: 'TYP',
    description: 'Overview of SQL data types across databases.',
    theory: `# SQL Data Types\n\nDifferent databases support different data types.\n\n## SQLite Data Types\n| Type | Description |\n|------|------------|\n| NULL | No value |\n| INTEGER | Signed integer |\n| REAL | Floating point |\n| TEXT | Text string |\n| BLOB | Binary data |\n\n## MySQL Common Types\n- INT, VARCHAR, TEXT, DATE, DATETIME, FLOAT, DOUBLE, BOOLEAN\n\n## SQL Server Common Types\n- INT, NVARCHAR, TEXT, DATE, DATETIME, FLOAT, BIT`,
    syntaxExample: `-- SQLite is flexible with types\nCREATE TABLE type_demo (\n  id INTEGER,\n  name TEXT,\n  price REAL,\n  data BLOB\n);\nPRAGMA table_info(type_demo);`,
    exercises: [
      { id: 'types-1', title: 'Create All Types', description: 'Create table with INTEGER, TEXT, REAL columns.', initialQuery: '', expectedAnswer: "CREATE TABLE type_test (id INTEGER PRIMARY KEY, name TEXT, score REAL, active INTEGER);\nPRAGMA table_info(type_test);", hint: 'Use INTEGER, TEXT, REAL.', setupSQL: '' },
      { id: 'types-2', title: 'Check Table Info', description: 'Use PRAGMA to check employees table structure.', initialQuery: '', expectedAnswer: "PRAGMA table_info(employees);", hint: 'PRAGMA table_info(table_name).', setupSQL: '' },
      { id: 'types-3', title: 'Type Affinity', description: 'Insert different types into a TEXT column and verify.', initialQuery: '', expectedAnswer: "CREATE TABLE flex (val TEXT);\nINSERT INTO flex VALUES ('hello');\nINSERT INTO flex VALUES (42);\nINSERT INTO flex VALUES (3.14);\nSELECT val, typeof(val) FROM flex;", hint: 'Use typeof() to check types.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-keywords', slug: 'sql-keywords', title: 'SQL Keywords Reference', category: 'SQL References', icon: 'KEY',
    description: 'Quick reference for important SQL keywords.',
    theory: `# SQL Keywords Reference\n\n## DML (Data Manipulation)\n| Keyword | Purpose |\n|---------|--------|\n| SELECT | Retrieve data |\n| INSERT | Add data |\n| UPDATE | Modify data |\n| DELETE | Remove data |\n\n## DDL (Data Definition)\n| Keyword | Purpose |\n|---------|--------|\n| CREATE | Create objects |\n| ALTER | Modify objects |\n| DROP | Delete objects |\n\n## DCL (Data Control)\n| Keyword | Purpose |\n|---------|--------|\n| GRANT | Give permissions |\n| REVOKE | Remove permissions |\n\n## TCL (Transaction Control)\n| Keyword | Purpose |\n|---------|--------|\n| COMMIT | Save transaction |\n| ROLLBACK | Undo transaction |`,
    syntaxExample: `-- DML Examples\nSELECT * FROM employees;\nINSERT INTO departments VALUES (10, 'Legal', 'Building E', 250000);\nUPDATE employees SET salary = salary * 1.05 WHERE department = 'Engineering';\nDELETE FROM departments WHERE id = 10;`,
    exercises: [
      { id: 'kw-1', title: 'DML Commands', description: 'Insert a department, select all departments, then delete it.', initialQuery: '', expectedAnswer: "INSERT INTO departments (name, location, budget) VALUES ('Legal', 'Building E', 250000);\nSELECT * FROM departments;\nDELETE FROM departments WHERE name = 'Legal';", hint: 'INSERT, SELECT, DELETE in sequence.', setupSQL: '' },
      { id: 'kw-2', title: 'DDL Commands', description: 'Create a table, alter it, then drop it.', initialQuery: '', expectedAnswer: 'CREATE TABLE kw_test (id INTEGER PRIMARY KEY, name TEXT);\nALTER TABLE kw_test ADD COLUMN age INTEGER;\nDROP TABLE kw_test;', hint: 'CREATE, ALTER, DROP.', setupSQL: '' },
      { id: 'kw-3', title: 'Transaction', description: 'Use BEGIN, INSERT, COMMIT for a transaction.', initialQuery: '', expectedAnswer: "BEGIN TRANSACTION;\nINSERT INTO departments (name, location, budget) VALUES ('Temp', 'Bldg X', 100000);\nCOMMIT;\nSELECT * FROM departments WHERE name = 'Temp';", hint: 'BEGIN TRANSACTION, then COMMIT.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-quick-ref', slug: 'sql-quick-ref', title: 'SQL Quick Reference', category: 'SQL References', icon: 'REF',
    description: 'Quick reference card for common SQL operations.',
    theory: `# SQL Quick Reference\n\n## SELECT Queries\n\`\`\`sql\nSELECT * FROM table;\nSELECT col1, col2 FROM table WHERE condition;\nSELECT DISTINCT col FROM table;\nSELECT * FROM table ORDER BY col ASC|DESC;\nSELECT * FROM table LIMIT n;\n\`\`\`\n\n## Aggregation\n\`\`\`sql\nSELECT COUNT|SUM|AVG|MIN|MAX(col) FROM table;\nSELECT col, AGG(col) FROM table GROUP BY col HAVING condition;\n\`\`\`\n\n## Joins\n\`\`\`sql\nSELECT * FROM t1 INNER|LEFT|RIGHT JOIN t2 ON t1.col = t2.col;\n\`\`\`\n\n## Modification\n\`\`\`sql\nINSERT INTO table (cols) VALUES (vals);\nUPDATE table SET col=val WHERE condition;\nDELETE FROM table WHERE condition;\n\`\`\``,
    syntaxExample: `-- Complete quick reference example\nSELECT e.first_name, e.department, e.salary,\n  d.location, d.budget\nFROM employees e\nJOIN departments d ON e.department = d.name\nWHERE e.salary > 70000\nORDER BY e.salary DESC\nLIMIT 5;`,
    exercises: [
      { id: 'qref-1', title: 'Complex Query', description: 'Write a query combining JOIN, WHERE, ORDER BY, LIMIT.', initialQuery: '', expectedAnswer: "SELECT e.first_name, e.salary, d.location FROM employees e JOIN departments d ON e.department = d.name WHERE e.salary > 70000 ORDER BY e.salary DESC LIMIT 5;", hint: 'Combine SELECT, JOIN, WHERE, ORDER BY, LIMIT.', setupSQL: '' },
      { id: 'qref-2', title: 'Grouped Summary', description: 'Department summary: count, avg salary, filtered by HAVING.', initialQuery: '', expectedAnswer: 'SELECT department, COUNT(*) AS emp_count, AVG(salary) AS avg_sal FROM employees GROUP BY department HAVING COUNT(*) >= 2 ORDER BY avg_sal DESC;', hint: 'GROUP BY, HAVING, ORDER BY together.', setupSQL: '' },
      { id: 'qref-3', title: 'Subquery', description: 'Find employees earning above the average salary.', initialQuery: '', expectedAnswer: 'SELECT first_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC;', hint: 'Use subquery for AVG.', setupSQL: '' },
    ],
  },
];
