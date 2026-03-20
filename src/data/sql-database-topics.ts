import { SQLTopic } from '@/types/sql-topics';

export const sqlDatabaseTopics: SQLTopic[] = [
  {
    id: 'sql-create-db', slug: 'sql-create-db', title: 'SQL CREATE DATABASE', category: 'SQL Database', icon: 'C.DB',
    description: 'Learn to create a new database.',
    theory: `# SQL CREATE DATABASE\n\nThe CREATE DATABASE statement creates a new database.\n\n## Note\nSQLite doesn't use CREATE DATABASE — each .db file IS a database.\n\n## Syntax (MySQL/SQL Server)\n\`\`\`sql\nCREATE DATABASE database_name;\n\`\`\`\n\nIn this app, we use SQLite in-browser so the database is automatically created.`,
    syntaxExample: `-- In our app, the database is already created\n-- Let's verify by listing tables\nSELECT name FROM sqlite_master WHERE type='table';`,
    exercises: [
      { id: 'createdb-1', title: 'List Tables', description: "List all tables using sqlite_master.", initialQuery: '', expectedAnswer: "SELECT name FROM sqlite_master WHERE type='table';", hint: "Query sqlite_master WHERE type='table'.", setupSQL: '' },
      { id: 'createdb-2', title: 'Table Info', description: "Get the count of tables in the database.", initialQuery: '', expectedAnswer: "SELECT COUNT(*) AS table_count FROM sqlite_master WHERE type='table';", hint: 'COUNT from sqlite_master.', setupSQL: '' },
      { id: 'createdb-3', title: 'Schema Info', description: 'Show the SQL used to create the employees table.', initialQuery: '', expectedAnswer: "SELECT sql FROM sqlite_master WHERE name='employees';", hint: "Select sql column from sqlite_master.", setupSQL: '' },
    ],
  },
  {
    id: 'sql-drop-db', slug: 'sql-drop-db', title: 'SQL DROP DATABASE', category: 'SQL Database', icon: 'D.DB',
    description: 'Learn to delete a database.',
    theory: `# SQL DROP DATABASE\n\nDROP DATABASE deletes an existing database. **CAUTION: This cannot be undone!**\n\n## Syntax\n\`\`\`sql\nDROP DATABASE database_name;\n\`\`\`\n\n## Note\nSQLite doesn't support DROP DATABASE. To reset, use the "Reset Database" button in the SQL Editor.\n\nIn practice, you would delete the .db file.`,
    syntaxExample: `-- SQLite: We can drop tables instead\nCREATE TABLE temp_test (id INTEGER, name TEXT);\nDROP TABLE temp_test;\n\n-- Verify it's gone\nSELECT name FROM sqlite_master WHERE type='table' AND name='temp_test';`,
    exercises: [
      { id: 'dropdb-1', title: 'Create & Drop Table', description: 'Create a table "test" with id and name, then drop it.', initialQuery: '', expectedAnswer: "CREATE TABLE test (id INTEGER, name TEXT);\nDROP TABLE test;", hint: 'CREATE TABLE then DROP TABLE.', setupSQL: '' },
      { id: 'dropdb-2', title: 'Drop If Exists', description: 'Drop table "nonexistent" only if it exists.', initialQuery: '', expectedAnswer: 'DROP TABLE IF EXISTS nonexistent;', hint: 'Use DROP TABLE IF EXISTS.', setupSQL: '' },
      { id: 'dropdb-3', title: 'Verify Drop', description: 'Create table "temp", drop it, then verify it is gone.', initialQuery: '', expectedAnswer: "CREATE TABLE temp (id INTEGER);\nDROP TABLE temp;\nSELECT COUNT(*) FROM sqlite_master WHERE name='temp';", hint: 'Check sqlite_master after dropping.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-backup-db', slug: 'sql-backup-db', title: 'SQL Backup Database', category: 'SQL Database', icon: 'BAK',
    description: 'Learn about database backup strategies.',
    theory: `# SQL Backup Database\n\nBacking up databases is essential for data protection.\n\n## SQL Server\n\`\`\`sql\nBACKUP DATABASE dbname TO DISK = 'filepath';\n\`\`\`\n\n## MySQL\n\`\`\`bash\nmysqldump -u user -p database > backup.sql\n\`\`\`\n\n## SQLite\nSQLite databases can be backed up by simply copying the .db file.\n\n## Best Practices\n- Schedule regular backups\n- Store backups in multiple locations\n- Test restoration procedures`,
    syntaxExample: `-- In SQLite, we can create a backup table\nCREATE TABLE employees_backup AS SELECT * FROM employees;\nSELECT COUNT(*) FROM employees_backup;`,
    exercises: [
      { id: 'backup-1', title: 'Backup Table', description: 'Create a backup of the employees table as employees_backup.', initialQuery: '', expectedAnswer: 'CREATE TABLE employees_backup AS SELECT * FROM employees;', hint: 'CREATE TABLE ... AS SELECT.', setupSQL: '' },
      { id: 'backup-2', title: 'Verify Backup', description: 'Count records in employees vs employees_backup to verify they match.', initialQuery: '', expectedAnswer: 'SELECT (SELECT COUNT(*) FROM employees) AS original, (SELECT COUNT(*) FROM employees_backup) AS backup;', hint: 'Use subqueries to compare counts.', setupSQL: 'CREATE TABLE IF NOT EXISTS employees_backup AS SELECT * FROM employees;' },
      { id: 'backup-3', title: 'Partial Backup', description: "Backup only Engineering employees to 'eng_backup'.", initialQuery: '', expectedAnswer: "CREATE TABLE eng_backup AS SELECT * FROM employees WHERE department = 'Engineering';", hint: 'Add WHERE clause to filter data.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-create-table', slug: 'sql-create-table', title: 'SQL CREATE TABLE', category: 'SQL Database', icon: 'C.TB',
    description: 'Create new tables in a database.',
    theory: `# SQL CREATE TABLE\n\nCREATE TABLE creates a new table in the database.\n\n## Syntax\n\`\`\`sql\nCREATE TABLE table_name (\n  column1 datatype constraint,\n  column2 datatype constraint\n);\n\`\`\`\n\n## Common Data Types (SQLite)\n| Type | Description |\n|------|------------|\n| INTEGER | Whole numbers |\n| TEXT | Text strings |\n| REAL | Decimal numbers |\n| BLOB | Binary data |`,
    syntaxExample: `CREATE TABLE students (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  name TEXT NOT NULL,\n  age INTEGER,\n  grade REAL,\n  enrolled TEXT DEFAULT 'true'\n);`,
    exercises: [
      { id: 'createtbl-1', title: 'Create Students', description: 'Create a table "students" with id (INTEGER PK AUTO), name (TEXT), age (INTEGER), grade (REAL).', initialQuery: '', expectedAnswer: 'CREATE TABLE students (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  name TEXT NOT NULL,\n  age INTEGER,\n  grade REAL\n);', hint: 'Define each column with its type.', setupSQL: '' },
      { id: 'createtbl-2', title: 'Create Courses', description: 'Create table "courses" with id, title (TEXT NOT NULL), credits (INTEGER DEFAULT 3).', initialQuery: '', expectedAnswer: 'CREATE TABLE courses (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  title TEXT NOT NULL,\n  credits INTEGER DEFAULT 3\n);', hint: 'Use DEFAULT for credits.', setupSQL: '' },
      { id: 'createtbl-3', title: 'Create with FK', description: 'Create "enrollments" table with student_id and course_id as foreign keys.', initialQuery: '', expectedAnswer: 'CREATE TABLE enrollments (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  student_id INTEGER,\n  course_id INTEGER,\n  grade REAL,\n  FOREIGN KEY (student_id) REFERENCES students(id),\n  FOREIGN KEY (course_id) REFERENCES courses(id)\n);', hint: 'Use FOREIGN KEY REFERENCES.', setupSQL: 'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, grade REAL);\nCREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, credits INTEGER);' },
    ],
  },
  {
    id: 'sql-drop-table', slug: 'sql-drop-table', title: 'SQL DROP TABLE', category: 'SQL Database', icon: 'D.TB',
    description: 'Delete a table from the database.',
    theory: `# SQL DROP TABLE\n\nDROP TABLE deletes a table and all its data permanently.\n\n## Syntax\n\`\`\`sql\nDROP TABLE table_name;\nDROP TABLE IF EXISTS table_name;\n\`\`\`\n\n## ⚠️ Warning\n- ALL data in the table will be lost\n- The table structure is removed\n- Use IF EXISTS to avoid errors`,
    syntaxExample: `CREATE TABLE temp_data (id INTEGER, value TEXT);\nINSERT INTO temp_data VALUES (1, 'test');\nDROP TABLE temp_data;`,
    exercises: [
      { id: 'droptbl-1', title: 'Drop Table', description: 'Create table "temp" then drop it.', initialQuery: '', expectedAnswer: 'CREATE TABLE temp (id INTEGER);\nDROP TABLE temp;', hint: 'CREATE then DROP.', setupSQL: '' },
      { id: 'droptbl-2', title: 'Drop If Exists', description: 'Safely drop table "maybe_exists" using IF EXISTS.', initialQuery: '', expectedAnswer: 'DROP TABLE IF EXISTS maybe_exists;', hint: 'Use IF EXISTS.', setupSQL: '' },
      { id: 'droptbl-3', title: 'Create Drop Verify', description: 'Create "temp_test", insert a row, drop it, verify with sqlite_master.', initialQuery: '', expectedAnswer: "CREATE TABLE temp_test (id INTEGER, name TEXT);\nINSERT INTO temp_test VALUES (1, 'hello');\nDROP TABLE temp_test;\nSELECT COUNT(*) FROM sqlite_master WHERE name='temp_test';", hint: 'After dropping, query sqlite_master.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-alter-table', slug: 'sql-alter-table', title: 'SQL ALTER TABLE', category: 'SQL Database', icon: 'ALT',
    description: 'Modify an existing table structure.',
    theory: `# SQL ALTER TABLE\n\nALTER TABLE modifies an existing table (add/drop/rename columns).\n\n## Syntax\n\`\`\`sql\n-- Add column\nALTER TABLE table ADD column datatype;\n\n-- Rename column (SQLite 3.25+)\nALTER TABLE table RENAME COLUMN old TO new;\n\n-- Rename table\nALTER TABLE old_name RENAME TO new_name;\n\`\`\`\n\n## SQLite Limitations\n- Cannot DROP COLUMN\n- Cannot ALTER COLUMN type`,
    syntaxExample: `-- Add a column\nCREATE TABLE test_alter (id INTEGER, name TEXT);\nALTER TABLE test_alter ADD COLUMN email TEXT;\n\n-- Rename table\nALTER TABLE test_alter RENAME TO test_modified;`,
    exercises: [
      { id: 'alter-1', title: 'Add Column', description: "Create table 'people' (id, name), then add 'email' column.", initialQuery: '', expectedAnswer: "CREATE TABLE people (id INTEGER, name TEXT);\nALTER TABLE people ADD COLUMN email TEXT;", hint: 'ALTER TABLE ... ADD COLUMN.', setupSQL: '' },
      { id: 'alter-2', title: 'Rename Table', description: "Rename 'people' to 'persons'.", initialQuery: '', expectedAnswer: 'ALTER TABLE people RENAME TO persons;', hint: 'ALTER TABLE ... RENAME TO.', setupSQL: 'CREATE TABLE IF NOT EXISTS people (id INTEGER, name TEXT, email TEXT);' },
      { id: 'alter-3', title: 'Add Multiple', description: "Create table 'items', add 'description' then 'quantity' columns.", initialQuery: '', expectedAnswer: "CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT);\nALTER TABLE items ADD COLUMN description TEXT;\nALTER TABLE items ADD COLUMN quantity INTEGER DEFAULT 0;", hint: 'Two ALTER TABLE ADD COLUMN statements.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-constraints', slug: 'sql-constraints', title: 'SQL Constraints', category: 'SQL Database', icon: 'CST',
    description: 'Rules that limit the type of data in a table.',
    theory: `# SQL Constraints\n\nConstraints are rules enforced on data columns.\n\n## Common Constraints\n| Constraint | Description |\n|-----------|------------|\n| NOT NULL | Cannot be NULL |\n| UNIQUE | All values must be different |\n| PRIMARY KEY | Uniquely identifies each row |\n| FOREIGN KEY | Links to another table |\n| CHECK | Ensures condition is met |\n| DEFAULT | Sets a default value |\n| INDEX | Speeds up data retrieval |`,
    syntaxExample: `CREATE TABLE users (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  username TEXT NOT NULL UNIQUE,\n  email TEXT NOT NULL UNIQUE,\n  age INTEGER CHECK(age >= 18),\n  role TEXT DEFAULT 'user'\n);`,
    exercises: [
      { id: 'const-1', title: 'NOT NULL & UNIQUE', description: "Create table 'accounts' with username (NOT NULL UNIQUE) and email (NOT NULL UNIQUE).", initialQuery: '', expectedAnswer: "CREATE TABLE accounts (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  username TEXT NOT NULL UNIQUE,\n  email TEXT NOT NULL UNIQUE\n);", hint: 'Add NOT NULL UNIQUE after column type.', setupSQL: '' },
      { id: 'const-2', title: 'CHECK Constraint', description: "Create table 'adults' with name and age, where age must be >= 18.", initialQuery: '', expectedAnswer: "CREATE TABLE adults (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  name TEXT NOT NULL,\n  age INTEGER CHECK(age >= 18)\n);", hint: 'Use CHECK(age >= 18).', setupSQL: '' },
      { id: 'const-3', title: 'Multiple Constraints', description: "Create table 'products_v2' with name (NOT NULL), price (CHECK > 0), stock (DEFAULT 0).", initialQuery: '', expectedAnswer: "CREATE TABLE products_v2 (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  name TEXT NOT NULL,\n  price REAL CHECK(price > 0),\n  stock INTEGER DEFAULT 0\n);", hint: 'Combine NOT NULL, CHECK, DEFAULT.', setupSQL: '' },
    ],
  },
];

export const sqlDatabaseTopics2: SQLTopic[] = [
  {
    id: 'sql-not-null', slug: 'sql-not-null', title: 'SQL NOT NULL', category: 'SQL Database', icon: 'N.NL',
    description: 'Ensure a column cannot have NULL values.',
    theory: `# SQL NOT NULL\n\nNOT NULL ensures a column always has a value.\n\n## Syntax\n\`\`\`sql\nCREATE TABLE table (\n  column datatype NOT NULL\n);\n\`\`\``,
    syntaxExample: `CREATE TABLE contacts (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  phone TEXT NOT NULL\n);`,
    exercises: [
      { id: 'notnull-1', title: 'Required Fields', description: "Create 'contacts' with name and phone as NOT NULL.", initialQuery: '', expectedAnswer: "CREATE TABLE contacts (id INTEGER PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL);", hint: 'Add NOT NULL after column type.', setupSQL: '' },
      { id: 'notnull-2', title: 'Test NOT NULL', description: "Try inserting into contacts with NULL name (will fail).", initialQuery: '', expectedAnswer: "INSERT INTO contacts (id, name, phone) VALUES (1, 'John', '555-0001');", hint: 'Insert valid data with all required fields.', setupSQL: 'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL);' },
      { id: 'notnull-3', title: 'Multiple NOT NULL', description: "Create 'addresses' with street, city, country ALL NOT NULL.", initialQuery: '', expectedAnswer: "CREATE TABLE addresses (id INTEGER PRIMARY KEY, street TEXT NOT NULL, city TEXT NOT NULL, country TEXT NOT NULL);", hint: 'All three columns should be NOT NULL.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-unique', slug: 'sql-unique', title: 'SQL UNIQUE', category: 'SQL Database', icon: 'UNQ',
    description: 'Ensure all values in a column are different.',
    theory: `# SQL UNIQUE Constraint\n\nUNIQUE ensures that all values in a column are different.\n\n## Syntax\n\`\`\`sql\nCREATE TABLE table (\n  column datatype UNIQUE\n);\n\`\`\``,
    syntaxExample: `CREATE TABLE users_demo (\n  id INTEGER PRIMARY KEY,\n  email TEXT UNIQUE,\n  username TEXT UNIQUE\n);`,
    exercises: [
      { id: 'unique-1', title: 'Unique Email', description: "Create 'members' table with unique email.", initialQuery: '', expectedAnswer: "CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE);", hint: 'Add UNIQUE after TEXT.', setupSQL: '' },
      { id: 'unique-2', title: 'Test Uniqueness', description: "Insert two members, then try to see them.", initialQuery: '', expectedAnswer: "INSERT INTO members VALUES (1, 'Alice', 'alice@test.com');\nINSERT INTO members VALUES (2, 'Bob', 'bob@test.com');\nSELECT * FROM members;", hint: 'Insert with different emails.', setupSQL: 'CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE);' },
      { id: 'unique-3', title: 'Named Constraint', description: "Create table with a named UNIQUE constraint on email.", initialQuery: '', expectedAnswer: "CREATE TABLE profiles (id INTEGER PRIMARY KEY, email TEXT, CONSTRAINT unique_email UNIQUE (email));", hint: 'Use CONSTRAINT name UNIQUE (column).', setupSQL: '' },
    ],
  },
  {
    id: 'sql-primary-key', slug: 'sql-primary-key', title: 'SQL Primary Key', category: 'SQL Database', icon: 'PK',
    description: 'Uniquely identify each record in a table.',
    theory: `# SQL PRIMARY KEY\n\nPRIMARY KEY uniquely identifies each record. It combines UNIQUE and NOT NULL.\n\n## Rules\n- Only ONE primary key per table\n- Can be a single column or composite\n- Must be unique and not null`,
    syntaxExample: `-- Single PK\nCREATE TABLE books (\n  isbn TEXT PRIMARY KEY,\n  title TEXT NOT NULL\n);\n\n-- Composite PK\nCREATE TABLE enrollments_demo (\n  student_id INTEGER,\n  course_id INTEGER,\n  PRIMARY KEY (student_id, course_id)\n);`,
    exercises: [
      { id: 'pk-1', title: 'Simple PK', description: 'Create table "books" with isbn as PRIMARY KEY.', initialQuery: '', expectedAnswer: "CREATE TABLE books (isbn TEXT PRIMARY KEY, title TEXT NOT NULL, author TEXT);", hint: 'Add PRIMARY KEY after column type.', setupSQL: '' },
      { id: 'pk-2', title: 'Auto Increment PK', description: 'Create table with INTEGER PRIMARY KEY AUTOINCREMENT.', initialQuery: '', expectedAnswer: "CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL, created_at TEXT);", hint: 'Use INTEGER PRIMARY KEY AUTOINCREMENT.', setupSQL: '' },
      { id: 'pk-3', title: 'Composite PK', description: 'Create "course_students" with composite PK (student_id, course_id).', initialQuery: '', expectedAnswer: "CREATE TABLE course_students (student_id INTEGER, course_id INTEGER, grade REAL, PRIMARY KEY (student_id, course_id));", hint: 'PRIMARY KEY (col1, col2) at end.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-foreign-key', slug: 'sql-foreign-key', title: 'SQL Foreign Key', category: 'SQL Database', icon: 'FK',
    description: 'Link two tables together.',
    theory: `# SQL FOREIGN KEY\n\nA FOREIGN KEY links two tables. It references the PRIMARY KEY of another table.\n\n## Syntax\n\`\`\`sql\nCREATE TABLE child (\n  id INTEGER PRIMARY KEY,\n  parent_id INTEGER,\n  FOREIGN KEY (parent_id) REFERENCES parent(id)\n);\n\`\`\``,
    syntaxExample: `CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT NOT NULL);\nCREATE TABLE articles (\n  id INTEGER PRIMARY KEY,\n  title TEXT,\n  author_id INTEGER,\n  FOREIGN KEY (author_id) REFERENCES authors(id)\n);`,
    exercises: [
      { id: 'fk-1', title: 'Create FK', description: "Create 'posts' table with user_id referencing a users table.", initialQuery: '', expectedAnswer: "CREATE TABLE users_fk (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users_fk(id));", hint: 'FOREIGN KEY (column) REFERENCES table(column).', setupSQL: '' },
      { id: 'fk-2', title: 'FK with Data', description: 'Insert data into both tables respecting FK relationship.', initialQuery: '', expectedAnswer: "INSERT INTO users_fk VALUES (1, 'Alice');\nINSERT INTO posts VALUES (1, 'Hello World', 1);\nSELECT p.title, u.name FROM posts p JOIN users_fk u ON p.user_id = u.id;", hint: 'Insert parent first, then child.', setupSQL: "CREATE TABLE IF NOT EXISTS users_fk (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, title TEXT, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users_fk(id));" },
      { id: 'fk-3', title: 'Multiple FKs', description: 'Create table "reviews" with FK to both users and products.', initialQuery: '', expectedAnswer: "CREATE TABLE reviews (id INTEGER PRIMARY KEY, user_id INTEGER, product_id INTEGER, rating INTEGER, FOREIGN KEY (user_id) REFERENCES customers(id), FOREIGN KEY (product_id) REFERENCES products(id));", hint: 'Add two FOREIGN KEY clauses.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-check', slug: 'sql-check', title: 'SQL CHECK', category: 'SQL Database', icon: 'CHK',
    description: 'Ensure values satisfy a specific condition.',
    theory: `# SQL CHECK Constraint\n\nCHECK ensures that values in a column satisfy a condition.\n\n## Syntax\n\`\`\`sql\nCREATE TABLE table (\n  column datatype CHECK(condition)\n);\n\`\`\``,
    syntaxExample: `CREATE TABLE ages (id INTEGER PRIMARY KEY, name TEXT, age INTEGER CHECK(age >= 0 AND age <= 150));`,
    exercises: [
      { id: 'check-1', title: 'Positive Price', description: "Create table 'items_check' with price CHECK > 0.", initialQuery: '', expectedAnswer: "CREATE TABLE items_check (id INTEGER PRIMARY KEY, name TEXT, price REAL CHECK(price > 0));", hint: 'CHECK(price > 0).', setupSQL: '' },
      { id: 'check-2', title: 'Age Range', description: "Create table with age between 0 and 150.", initialQuery: '', expectedAnswer: "CREATE TABLE people_check (id INTEGER PRIMARY KEY, name TEXT, age INTEGER CHECK(age >= 0 AND age <= 150));", hint: 'CHECK(age >= 0 AND age <= 150).', setupSQL: '' },
      { id: 'check-3', title: 'Rating Check', description: "Create 'ratings' table where rating must be 1-5.", initialQuery: '', expectedAnswer: "CREATE TABLE ratings (id INTEGER PRIMARY KEY, score INTEGER CHECK(score >= 1 AND score <= 5), comment TEXT);", hint: 'CHECK(score >= 1 AND score <= 5).', setupSQL: '' },
    ],
  },
  {
    id: 'sql-default', slug: 'sql-default', title: 'SQL DEFAULT', category: 'SQL Database', icon: 'DEF',
    description: 'Set a default value for a column.',
    theory: `# SQL DEFAULT Constraint\n\nDEFAULT sets a default value when no value is specified.\n\n## Syntax\n\`\`\`sql\nCREATE TABLE table (\n  column datatype DEFAULT value\n);\n\`\`\``,
    syntaxExample: `CREATE TABLE tasks (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  title TEXT NOT NULL,\n  status TEXT DEFAULT 'pending',\n  priority INTEGER DEFAULT 3\n);`,
    exercises: [
      { id: 'default-1', title: 'Default Status', description: "Create 'tasks' with status defaulting to 'pending'.", initialQuery: '', expectedAnswer: "CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, status TEXT DEFAULT 'pending');", hint: "DEFAULT 'pending'.", setupSQL: '' },
      { id: 'default-2', title: 'Test Default', description: 'Insert a task without specifying status, then select it.', initialQuery: '', expectedAnswer: "INSERT INTO tasks (title) VALUES ('Buy groceries');\nSELECT * FROM tasks;", hint: 'Omit the status column in INSERT.', setupSQL: "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, status TEXT DEFAULT 'pending');" },
      { id: 'default-3', title: 'Multiple Defaults', description: "Create table with multiple default values.", initialQuery: '', expectedAnswer: "CREATE TABLE settings (id INTEGER PRIMARY KEY, theme TEXT DEFAULT 'light', font_size INTEGER DEFAULT 14, notifications INTEGER DEFAULT 1);", hint: 'Add DEFAULT to multiple columns.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-index', slug: 'sql-index', title: 'SQL INDEX', category: 'SQL Database', icon: 'IDX',
    description: 'Speed up data retrieval with indexes.',
    theory: `# SQL INDEX\n\nIndexes speed up data retrieval. They're like a book's index.\n\n## Syntax\n\`\`\`sql\nCREATE INDEX idx_name ON table (column);\nCREATE UNIQUE INDEX idx_name ON table (column);\nDROP INDEX idx_name;\n\`\`\`\n\n## Key Points\n- Speeds up SELECT queries\n- Slows down INSERT/UPDATE\n- Use on frequently searched columns`,
    syntaxExample: `CREATE INDEX idx_emp_dept ON employees (department);\nCREATE INDEX idx_prod_cat ON products (category);`,
    exercises: [
      { id: 'index-1', title: 'Create Index', description: 'Create an index on employees.department.', initialQuery: '', expectedAnswer: 'CREATE INDEX idx_emp_dept ON employees (department);', hint: 'CREATE INDEX name ON table (column).', setupSQL: '' },
      { id: 'index-2', title: 'Composite Index', description: 'Create an index on employees (department, salary).', initialQuery: '', expectedAnswer: 'CREATE INDEX idx_dept_salary ON employees (department, salary);', hint: 'List multiple columns in parentheses.', setupSQL: '' },
      { id: 'index-3', title: 'List Indexes', description: 'List all indexes in the database.', initialQuery: '', expectedAnswer: "SELECT name, tbl_name FROM sqlite_master WHERE type='index';", hint: "Query sqlite_master WHERE type='index'.", setupSQL: '' },
    ],
  },
  {
    id: 'sql-autoincrement', slug: 'sql-autoincrement', title: 'SQL Auto Increment', category: 'SQL Database', icon: 'A.I',
    description: 'Automatically generate unique IDs.',
    theory: `# SQL Auto Increment\n\nAuto-increment generates a unique number automatically for new records.\n\n## SQLite\n\`\`\`sql\ncolumn INTEGER PRIMARY KEY AUTOINCREMENT\n\`\`\`\n\n## Key Points\n- SQLite: Use INTEGER PRIMARY KEY AUTOINCREMENT\n- MySQL: Use AUTO_INCREMENT\n- PostgreSQL: Use SERIAL`,
    syntaxExample: `CREATE TABLE logs (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  message TEXT,\n  created_at TEXT DEFAULT CURRENT_TIMESTAMP\n);\nINSERT INTO logs (message) VALUES ('First log');\nINSERT INTO logs (message) VALUES ('Second log');\nSELECT * FROM logs;`,
    exercises: [
      { id: 'auto-1', title: 'Auto ID', description: "Create 'notes' table with auto-incrementing id.", initialQuery: '', expectedAnswer: "CREATE TABLE notes (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL);\nINSERT INTO notes (content) VALUES ('Note 1');\nINSERT INTO notes (content) VALUES ('Note 2');\nSELECT * FROM notes;", hint: 'Use AUTOINCREMENT.', setupSQL: '' },
      { id: 'auto-2', title: 'Check Sequence', description: 'Insert 3 records and verify the auto IDs.', initialQuery: '', expectedAnswer: "CREATE TABLE auto_test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);\nINSERT INTO auto_test (name) VALUES ('a');\nINSERT INTO auto_test (name) VALUES ('b');\nINSERT INTO auto_test (name) VALUES ('c');\nSELECT * FROM auto_test;", hint: 'Insert without specifying id.', setupSQL: '' },
      { id: 'auto-3', title: 'With Timestamp', description: "Create table with auto ID and default timestamp.", initialQuery: '', expectedAnswer: "CREATE TABLE events (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);\nINSERT INTO events (name) VALUES ('Login');\nSELECT * FROM events;", hint: 'DEFAULT CURRENT_TIMESTAMP.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-dates', slug: 'sql-dates', title: 'SQL Dates', category: 'SQL Database', icon: 'DAT',
    description: 'Work with date and time in SQL.',
    theory: `# SQL Dates\n\nSQLite stores dates as TEXT in ISO format.\n\n## SQLite Date Functions\n| Function | Description |\n|----------|------------|\n| date() | Returns date |\n| time() | Returns time |\n| datetime() | Returns datetime |\n| julianday() | Returns Julian day |\n| strftime() | Formatted date |`,
    syntaxExample: `SELECT date('now');\nSELECT datetime('now');\nSELECT date('now', '-7 days');\nSELECT strftime('%Y', hire_date) AS year FROM employees;`,
    exercises: [
      { id: 'dates-1', title: 'Current Date', description: 'Get the current date and time.', initialQuery: '', expectedAnswer: "SELECT date('now') AS today, datetime('now') AS now;", hint: "Use date('now') and datetime('now').", setupSQL: '' },
      { id: 'dates-2', title: 'Date Arithmetic', description: "Get the date 30 days ago.", initialQuery: '', expectedAnswer: "SELECT date('now', '-30 days') AS thirty_days_ago;", hint: "Use date('now', '-30 days').", setupSQL: '' },
      { id: 'dates-3', title: 'Extract Year', description: 'Get the hire year of each employee.', initialQuery: '', expectedAnswer: "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;", hint: "Use strftime('%Y', column).", setupSQL: '' },
    ],
  },
  {
    id: 'sql-views', slug: 'sql-views', title: 'SQL Views', category: 'SQL Database', icon: 'VW',
    description: 'Create virtual tables based on SELECT statements.',
    theory: `# SQL Views\n\nA view is a **virtual table** based on a SELECT query.\n\n## Syntax\n\`\`\`sql\nCREATE VIEW view_name AS SELECT query;\nDROP VIEW view_name;\n\`\`\`\n\n## Key Points\n- Acts like a table but stores no data\n- Simplifies complex queries\n- Provides security by restricting access`,
    syntaxExample: `CREATE VIEW employee_summary AS\nSELECT department, COUNT(*) AS count, AVG(salary) AS avg_salary\nFROM employees GROUP BY department;\n\nSELECT * FROM employee_summary;`,
    exercises: [
      { id: 'views-1', title: 'Create View', description: 'Create view "dept_stats" showing department count and avg salary.', initialQuery: '', expectedAnswer: "CREATE VIEW dept_stats AS SELECT department, COUNT(*) AS count, AVG(salary) AS avg_salary FROM employees GROUP BY department;\nSELECT * FROM dept_stats;", hint: 'CREATE VIEW ... AS SELECT.', setupSQL: '' },
      { id: 'views-2', title: 'Product Summary View', description: 'Create view showing category product count and avg price.', initialQuery: '', expectedAnswer: "CREATE VIEW product_stats AS SELECT category, COUNT(*) AS count, AVG(price) AS avg_price FROM products GROUP BY category;\nSELECT * FROM product_stats;", hint: 'GROUP BY category.', setupSQL: '' },
      { id: 'views-3', title: 'Drop View', description: "Create then drop a view named 'temp_view'.", initialQuery: '', expectedAnswer: "CREATE VIEW temp_view AS SELECT * FROM employees WHERE salary > 80000;\nSELECT * FROM temp_view;\nDROP VIEW temp_view;", hint: 'CREATE VIEW, SELECT from it, then DROP VIEW.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-injection', slug: 'sql-injection', title: 'SQL Injection', category: 'SQL Database', icon: 'SEC',
    description: 'Understand and prevent SQL injection attacks.',
    theory: `# SQL Injection\n\nSQL injection is a security vulnerability where attackers insert malicious SQL code.\n\n## Example of Vulnerable Code\n\`\`\`\n-- BAD: String concatenation\nquery = "SELECT * FROM users WHERE name='" + userName + "'"\n\n-- If userName = "' OR '1'='1"\n-- Becomes: SELECT * FROM users WHERE name='' OR '1'='1'\n\`\`\`\n\n## Prevention\n1. **Parameterized queries** (prepared statements)\n2. **Input validation**\n3. **ORM/Query builders**\n4. **Least privilege principle**`,
    syntaxExample: `-- Safe: Using parameterized queries\n-- In code: db.query("SELECT * FROM users WHERE id = ?", [userId])\n\n-- Example of what injection looks like\nSELECT * FROM employees WHERE first_name = 'John';\n-- vs dangerous unvalidated input:\n-- SELECT * FROM employees WHERE first_name = '' OR '1'='1';`,
    exercises: [
      { id: 'inject-1', title: 'Normal Query', description: "Write a safe query to find employee with first_name 'John'.", initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE first_name = 'John';", hint: 'Use proper single quotes.', setupSQL: '' },
      { id: 'inject-2', title: 'See Injection Effect', description: "See what happens with the injection: WHERE first_name = '' OR '1'='1'", initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE first_name = '' OR '1'='1';", hint: "This returns ALL rows because '1'='1' is always true.", setupSQL: '' },
      { id: 'inject-3', title: 'Safe Pattern', description: 'Write a query that safely selects by id (not vulnerable to injection).', initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE id = 1;", hint: 'Use numeric comparison, not string concat.', setupSQL: '' },
    ],
  },
];
