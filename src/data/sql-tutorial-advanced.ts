import { SQLTopic } from '@/types/sql-topics';

export const sqlTutorialAdvanced: SQLTopic[] = [
  {
    id: 'sql-union', slug: 'sql-union', title: 'SQL UNION', category: 'SQL Tutorial', icon: 'UNI',
    description: 'Combine result sets of two SELECT statements (no duplicates).',
    theory: `# SQL UNION\n\nUNION combines the result set of two or more SELECT statements. It removes **duplicate** rows.\n\n## Rules\n- Each SELECT must have the same number of columns\n- Columns must have similar data types\n- Columns in each SELECT must be in the same order\n\n## Syntax\n\`\`\`sql\nSELECT cols FROM table1 UNION SELECT cols FROM table2;\n\`\`\``,
    syntaxExample: `SELECT first_name, last_name FROM employees\nUNION\nSELECT first_name, last_name FROM customers;`,
    exercises: [
      { id: 'union-1', title: 'All Names', description: 'Union first_name from employees and customers.', initialQuery: '', expectedAnswer: 'SELECT first_name FROM employees UNION SELECT first_name FROM customers;', hint: 'UNION two SELECT statements.', setupSQL: '' },
      { id: 'union-2', title: 'All Cities', description: 'Get unique cities from both suppliers and customers.', initialQuery: '', expectedAnswer: 'SELECT city FROM suppliers UNION SELECT city FROM customers;', hint: 'UNION cities from both tables.', setupSQL: '' },
      { id: 'union-3', title: 'Employee & Customer Emails', description: 'Combine emails from employees and customers.', initialQuery: '', expectedAnswer: 'SELECT email FROM employees UNION SELECT email FROM customers;', hint: 'UNION email columns from both tables.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-union-all', slug: 'sql-union-all', title: 'SQL UNION ALL', category: 'SQL Tutorial', icon: 'U+A',
    description: 'Combine result sets including duplicates.',
    theory: `# SQL UNION ALL\n\nUNION ALL is like UNION but it **keeps duplicate** rows.\n\n## Syntax\n\`\`\`sql\nSELECT cols FROM table1 UNION ALL SELECT cols FROM table2;\n\`\`\`\n\n## Difference from UNION\n- UNION removes duplicates (slower)\n- UNION ALL keeps duplicates (faster)`,
    syntaxExample: `SELECT first_name FROM employees\nUNION ALL\nSELECT first_name FROM customers;`,
    exercises: [
      { id: 'unionall-1', title: 'All Names with Duplicates', description: 'UNION ALL first_name from employees and customers.', initialQuery: '', expectedAnswer: 'SELECT first_name FROM employees UNION ALL SELECT first_name FROM customers;', hint: 'Use UNION ALL.', setupSQL: '' },
      { id: 'unionall-2', title: 'All Cities Duplicated', description: 'Get all cities from suppliers and customers including duplicates.', initialQuery: '', expectedAnswer: 'SELECT city FROM suppliers UNION ALL SELECT city FROM customers;', hint: 'UNION ALL cities.', setupSQL: '' },
      { id: 'unionall-3', title: 'Combined Countries', description: 'List all countries from suppliers and customers with duplicates.', initialQuery: '', expectedAnswer: 'SELECT country FROM suppliers UNION ALL SELECT country FROM customers;', hint: 'UNION ALL country columns.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-group-by', slug: 'sql-group-by', title: 'SQL GROUP BY', category: 'SQL Tutorial', icon: 'GRP',
    description: 'Group rows that have the same values into summary rows.',
    theory: `# SQL GROUP BY\n\nGROUP BY groups rows with the same values into summary rows. It is often used with aggregate functions.\n\n## Syntax\n\`\`\`sql\nSELECT column, AGG_FUNC(column) FROM table\nGROUP BY column;\n\`\`\`\n\n## Key Points\n- Used with COUNT, SUM, AVG, MIN, MAX\n- Every non-aggregated column in SELECT must be in GROUP BY\n- Groups rows before applying aggregate functions`,
    syntaxExample: `SELECT department, COUNT(*) AS count, AVG(salary) AS avg_salary\nFROM employees GROUP BY department;\n\nSELECT category, SUM(stock) FROM products GROUP BY category;`,
    exercises: [
      { id: 'groupby-1', title: 'Employees per Dept', description: 'Count employees in each department.', initialQuery: '', expectedAnswer: 'SELECT department, COUNT(*) AS count FROM employees GROUP BY department;', hint: 'GROUP BY department with COUNT(*).', setupSQL: '' },
      { id: 'groupby-2', title: 'Avg Salary by Dept', description: 'Find average salary for each department.', initialQuery: '', expectedAnswer: 'SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department;', hint: 'Use AVG(salary) with GROUP BY department.', setupSQL: '' },
      { id: 'groupby-3', title: 'Products per Category', description: 'Count products and total stock per category.', initialQuery: '', expectedAnswer: 'SELECT category, COUNT(*) AS product_count, SUM(stock) AS total_stock FROM products GROUP BY category;', hint: 'GROUP BY category.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-having', slug: 'sql-having', title: 'SQL HAVING', category: 'SQL Tutorial', icon: 'HAV',
    description: 'Filter groups after GROUP BY (like WHERE for groups).',
    theory: `# SQL HAVING\n\nHAVING filters groups created by GROUP BY. It's like WHERE but **for aggregate functions**.\n\n## Syntax\n\`\`\`sql\nSELECT column, AGG(column) FROM table\nGROUP BY column HAVING condition;\n\`\`\`\n\n## WHERE vs HAVING\n- WHERE filters individual rows BEFORE grouping\n- HAVING filters groups AFTER grouping`,
    syntaxExample: `SELECT department, COUNT(*) AS count\nFROM employees GROUP BY department\nHAVING COUNT(*) > 2;\n\nSELECT department, AVG(salary)\nFROM employees GROUP BY department\nHAVING AVG(salary) > 75000;`,
    exercises: [
      { id: 'having-1', title: 'Large Departments', description: 'Find departments with more than 2 employees.', initialQuery: '', expectedAnswer: 'SELECT department, COUNT(*) AS count FROM employees GROUP BY department HAVING COUNT(*) > 2;', hint: 'Use HAVING COUNT(*) > 2.', setupSQL: '' },
      { id: 'having-2', title: 'High Avg Salary', description: 'Find departments with average salary > 75000.', initialQuery: '', expectedAnswer: 'SELECT department, AVG(salary) AS avg_salary FROM employees GROUP BY department HAVING AVG(salary) > 75000;', hint: 'HAVING AVG(salary) > 75000.', setupSQL: '' },
      { id: 'having-3', title: 'Popular Categories', description: 'Find product categories with total stock > 100.', initialQuery: '', expectedAnswer: 'SELECT category, SUM(stock) AS total_stock FROM products GROUP BY category HAVING SUM(stock) > 100;', hint: 'HAVING SUM(stock) > 100.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-exists', slug: 'sql-exists', title: 'SQL EXISTS', category: 'SQL Tutorial', icon: 'EXT',
    description: 'Test for the existence of any record in a subquery.',
    theory: `# SQL EXISTS\n\nEXISTS tests whether a subquery returns any rows. It returns TRUE if the subquery returns at least one record.\n\n## Syntax\n\`\`\`sql\nSELECT columns FROM table\nWHERE EXISTS (SELECT 1 FROM other_table WHERE condition);\n\`\`\``,
    syntaxExample: `-- Customers who have orders\nSELECT * FROM customers c\nWHERE EXISTS (SELECT 1 FROM orders WHERE customer_id = c.id);`,
    exercises: [
      { id: 'exists-1', title: 'Customers with Orders', description: 'Find customers who have placed at least one order.', initialQuery: '', expectedAnswer: 'SELECT * FROM customers c WHERE EXISTS (SELECT 1 FROM orders WHERE customer_id = c.id);', hint: 'Use EXISTS with a subquery on orders.', setupSQL: '' },
      { id: 'exists-2', title: 'Products Sold', description: 'Find products that appear in order_items.', initialQuery: '', expectedAnswer: 'SELECT * FROM products p WHERE EXISTS (SELECT 1 FROM order_items WHERE product_id = p.id);', hint: 'EXISTS subquery on order_items.', setupSQL: '' },
      { id: 'exists-3', title: 'Depts with Employees', description: 'Find departments that have at least one employee.', initialQuery: '', expectedAnswer: "SELECT * FROM departments d WHERE EXISTS (SELECT 1 FROM employees WHERE department = d.name);", hint: 'Use EXISTS on employees.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-any', slug: 'sql-any', title: 'SQL ANY', category: 'SQL Tutorial', icon: 'ANY',
    description: 'Compare a value to ANY value in a subquery.',
    theory: `# SQL ANY\n\nANY compares a value to each value returned by a subquery. Returns TRUE if the condition is true for ANY of the values.\n\n## Note\nSQLite does NOT support ANY directly. Simulate with IN or EXISTS.\n\n## Simulated Syntax\n\`\`\`sql\n-- Instead of: WHERE salary > ANY (subquery)\n-- Use:\nWHERE salary > (SELECT MIN(val) FROM subquery);\n\`\`\``,
    syntaxExample: `-- Find employees earning more than any Marketing employee\nSELECT * FROM employees\nWHERE salary > (SELECT MIN(salary) FROM employees WHERE department = 'Marketing');`,
    exercises: [
      { id: 'any-1', title: 'Above Min Marketing', description: 'Find employees earning more than the lowest Marketing salary.', initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE salary > (SELECT MIN(salary) FROM employees WHERE department = 'Marketing');", hint: 'Compare with MIN of Marketing salaries.', setupSQL: '' },
      { id: 'any-2', title: 'Cheaper Than Some Electronics', description: 'Find products cheaper than the most expensive Electronics product.', initialQuery: '', expectedAnswer: "SELECT * FROM products WHERE price < (SELECT MAX(price) FROM products WHERE category = 'Electronics');", hint: 'Compare with MAX price of Electronics.', setupSQL: '' },
      { id: 'any-3', title: 'Orders Above Min', description: 'Find orders with total_amount greater than the smallest order.', initialQuery: '', expectedAnswer: 'SELECT * FROM orders WHERE total_amount > (SELECT MIN(total_amount) FROM orders);', hint: 'Compare with MIN(total_amount).', setupSQL: '' },
    ],
  },
  {
    id: 'sql-all', slug: 'sql-all', title: 'SQL ALL', category: 'SQL Tutorial', icon: 'ALL',
    description: 'Compare a value to ALL values in a subquery.',
    theory: `# SQL ALL\n\nALL compares a value to every value in a subquery result. Returns TRUE only if the condition is true for ALL values.\n\n## Note\nSQLite does NOT support ALL directly. Simulate with MAX/MIN.\n\n## Simulated Syntax\n\`\`\`sql\n-- Instead of: WHERE salary > ALL (subquery)\n-- Use:\nWHERE salary > (SELECT MAX(val) FROM subquery);\n\`\`\``,
    syntaxExample: `-- Earn more than ALL Marketing employees\nSELECT * FROM employees\nWHERE salary > (SELECT MAX(salary) FROM employees WHERE department = 'Marketing');`,
    exercises: [
      { id: 'all-1', title: 'Above All Marketing', description: 'Find employees earning more than ALL Marketing employees.', initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE salary > (SELECT MAX(salary) FROM employees WHERE department = 'Marketing');", hint: 'Compare with MAX of Marketing salaries.', setupSQL: '' },
      { id: 'all-2', title: 'More Expensive Than All Office', description: 'Find products more expensive than all Office products.', initialQuery: '', expectedAnswer: "SELECT * FROM products WHERE price > (SELECT MAX(price) FROM products WHERE category = 'Office');", hint: 'Compare with MAX price of Office.', setupSQL: '' },
      { id: 'all-3', title: 'Biggest Orders', description: 'Find orders where total_amount is greater than all completed orders.', initialQuery: '', expectedAnswer: "SELECT * FROM orders WHERE total_amount > (SELECT MAX(total_amount) FROM orders WHERE status = 'completed');", hint: 'Compare with MAX of completed order amounts.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-select-into', slug: 'sql-select-into', title: 'SQL SELECT INTO', category: 'SQL Tutorial', icon: 'S>T',
    description: 'Copy data from one table into a new table.',
    theory: `# SQL SELECT INTO\n\nSELECT INTO copies data from one table into a new table.\n\n## Note\nSQLite uses CREATE TABLE ... AS SELECT instead.\n\n## Syntax (SQLite)\n\`\`\`sql\nCREATE TABLE new_table AS\nSELECT columns FROM existing_table WHERE condition;\n\`\`\``,
    syntaxExample: `-- Copy engineering employees to new table\nCREATE TABLE engineers AS\nSELECT * FROM employees WHERE department = 'Engineering';`,
    exercises: [
      { id: 'selectinto-1', title: 'Copy Engineers', description: "Create a table 'engineers' with all Engineering employees.", initialQuery: '', expectedAnswer: "CREATE TABLE engineers AS SELECT * FROM employees WHERE department = 'Engineering';", hint: 'CREATE TABLE ... AS SELECT ... WHERE.', setupSQL: '' },
      { id: 'selectinto-2', title: 'Expensive Products', description: "Create table 'premium_products' with products priced over 100.", initialQuery: '', expectedAnswer: 'CREATE TABLE premium_products AS SELECT * FROM products WHERE price > 100;', hint: 'CREATE TABLE ... AS SELECT ... WHERE price > 100.', setupSQL: '' },
      { id: 'selectinto-3', title: 'Completed Orders Backup', description: "Create table 'completed_orders' from completed orders.", initialQuery: '', expectedAnswer: "CREATE TABLE completed_orders AS SELECT * FROM orders WHERE status = 'completed';", hint: 'CREATE TABLE ... AS SELECT ... WHERE status = completed.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-insert-into-select', slug: 'sql-insert-into-select', title: 'SQL INSERT INTO SELECT', category: 'SQL Tutorial', icon: 'I>S',
    description: 'Copy data from one table and insert it into another.',
    theory: `# SQL INSERT INTO SELECT\n\nINSERT INTO SELECT copies data from one table and inserts it into an existing table.\n\n## Syntax\n\`\`\`sql\nINSERT INTO table2 (columns)\nSELECT columns FROM table1 WHERE condition;\n\`\`\`\n\n## Key Points\n- Target table must already exist\n- Column data types must be compatible\n- Does NOT create a new table`,
    syntaxExample: `-- Copy supplier cities to a locations table\nCREATE TABLE locations (city TEXT, country TEXT);\nINSERT INTO locations (city, country)\nSELECT city, country FROM suppliers;`,
    exercises: [
      { id: 'insertselect-1', title: 'Copy Supplier Locations', description: "Create 'locations' table and insert city, country from suppliers.", initialQuery: '', expectedAnswer: "CREATE TABLE locations (city TEXT, country TEXT);\nINSERT INTO locations (city, country) SELECT city, country FROM suppliers;", hint: 'CREATE TABLE first, then INSERT INTO SELECT.', setupSQL: '' },
      { id: 'insertselect-2', title: 'Copy Customer Locations', description: "Then insert city, country from customers into the same locations table.", initialQuery: '', expectedAnswer: 'INSERT INTO locations (city, country) SELECT city, country FROM customers;', hint: 'INSERT INTO locations SELECT from customers.', setupSQL: "CREATE TABLE IF NOT EXISTS locations (city TEXT, country TEXT);" },
      { id: 'insertselect-3', title: 'Copy High Earners', description: "Create 'top_earners' and insert employees with salary > 85000.", initialQuery: '', expectedAnswer: "CREATE TABLE top_earners AS SELECT * FROM employees WHERE salary > 85000;\nSELECT * FROM top_earners;", hint: 'Use CREATE TABLE AS SELECT for simplicity.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-case', slug: 'sql-case', title: 'SQL CASE', category: 'SQL Tutorial', icon: 'CAS',
    description: 'Add conditional logic to SQL queries.',
    theory: `# SQL CASE Expression\n\nCASE is SQL's way of handling IF-THEN-ELSE logic.\n\n## Syntax\n\`\`\`sql\nCASE\n  WHEN condition1 THEN result1\n  WHEN condition2 THEN result2\n  ELSE default_result\nEND\n\`\`\`\n\n## Key Points\n- Works like IF-ELSE in programming\n- Can be used in SELECT, WHERE, ORDER BY\n- ELSE is optional (returns NULL if omitted)`,
    syntaxExample: `SELECT first_name, salary,\n  CASE\n    WHEN salary > 90000 THEN 'Senior'\n    WHEN salary > 70000 THEN 'Mid'\n    ELSE 'Junior'\n  END AS level\nFROM employees;`,
    exercises: [
      { id: 'case-1', title: 'Salary Level', description: 'Categorize employees: >90000="Senior", >70000="Mid", else "Junior".', initialQuery: '', expectedAnswer: "SELECT first_name, salary, CASE WHEN salary > 90000 THEN 'Senior' WHEN salary > 70000 THEN 'Mid' ELSE 'Junior' END AS level FROM employees;", hint: 'Use CASE WHEN ... THEN ... END.', setupSQL: '' },
      { id: 'case-2', title: 'Price Category', description: "Categorize products: price>500='Expensive', >50='Moderate', else 'Cheap'.", initialQuery: '', expectedAnswer: "SELECT name, price, CASE WHEN price > 500 THEN 'Expensive' WHEN price > 50 THEN 'Moderate' ELSE 'Cheap' END AS price_category FROM products;", hint: 'Use CASE for price thresholds.', setupSQL: '' },
      { id: 'case-3', title: 'Order Status Label', description: "Create readable labels: completed='Done', shipped='In Transit', else 'Processing'.", initialQuery: '', expectedAnswer: "SELECT id, status, CASE WHEN status = 'completed' THEN 'Done' WHEN status = 'shipped' THEN 'In Transit' ELSE 'Processing' END AS label FROM orders;", hint: 'Match exact status values in CASE.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-null-functions', slug: 'sql-null-functions', title: 'SQL NULL Functions', category: 'SQL Tutorial', icon: 'NLF',
    description: 'Handle NULL values with COALESCE and IFNULL.',
    theory: `# SQL NULL Functions\n\nFunctions to handle NULL values in different databases:\n\n## Common Functions\n| Function | Database | Description |\n|----------|----------|------------|\n| COALESCE() | All | Returns first non-NULL value |\n| IFNULL() | MySQL/SQLite | Returns alt if NULL |\n| ISNULL() | SQL Server | Returns alt if NULL |\n| NVL() | Oracle | Returns alt if NULL |\n\n## Syntax (SQLite)\n\`\`\`sql\nSELECT COALESCE(column, 'default') FROM table;\nSELECT IFNULL(column, 'default') FROM table;\n\`\`\``,
    syntaxExample: `SELECT first_name, COALESCE(manager_id, 0) AS manager\nFROM employees;\n\nSELECT first_name, IFNULL(manager_id, 'No Manager') FROM employees;`,
    exercises: [
      { id: 'nullfn-1', title: 'COALESCE Manager', description: 'Show first_name and manager_id, replacing NULL with 0 using COALESCE.', initialQuery: '', expectedAnswer: 'SELECT first_name, COALESCE(manager_id, 0) AS manager FROM employees;', hint: 'COALESCE(manager_id, 0).', setupSQL: '' },
      { id: 'nullfn-2', title: 'IFNULL Example', description: "Use IFNULL to replace NULL manager_id with 'None'.", initialQuery: '', expectedAnswer: "SELECT first_name, IFNULL(manager_id, 'None') AS manager FROM employees;", hint: "IFNULL(manager_id, 'None').", setupSQL: '' },
      { id: 'nullfn-3', title: 'Default Value', description: 'Show product name and COALESCE supplier_id with 0.', initialQuery: '', expectedAnswer: 'SELECT name, COALESCE(supplier_id, 0) AS supplier FROM products;', hint: 'COALESCE(supplier_id, 0).', setupSQL: '' },
    ],
  },
  {
    id: 'sql-stored-procedures', slug: 'sql-stored-procedures', title: 'SQL Stored Procedures', category: 'SQL Tutorial', icon: 'SP',
    description: 'Learn about stored procedures (prepared SQL code).',
    theory: `# SQL Stored Procedures\n\nA stored procedure is **prepared SQL code** that you save and can reuse.\n\n## Note\nSQLite does NOT support stored procedures natively. This is a concept mainly for MySQL, SQL Server, PostgreSQL.\n\n## Concept\n\`\`\`sql\n-- MySQL Syntax\nCREATE PROCEDURE procedure_name\nAS\n  sql_statement\nGO;\n\n-- Execute it\nEXEC procedure_name;\n\`\`\`\n\n## In SQLite - Use Views Instead\n\`\`\`sql\nCREATE VIEW high_earners AS\nSELECT * FROM employees WHERE salary > 80000;\n\`\`\``,
    syntaxExample: `-- SQLite doesn't have procedures, but we can use views\nCREATE VIEW engineering_team AS\nSELECT * FROM employees WHERE department = 'Engineering';\n\nSELECT * FROM engineering_team;`,
    exercises: [
      { id: 'proc-1', title: 'Create View', description: "Create a view 'high_earners' for employees with salary > 80000.", initialQuery: '', expectedAnswer: 'CREATE VIEW high_earners AS SELECT * FROM employees WHERE salary > 80000;', hint: 'CREATE VIEW ... AS SELECT ...', setupSQL: '' },
      { id: 'proc-2', title: 'Use View', description: 'Select all records from the high_earners view.', initialQuery: '', expectedAnswer: 'SELECT * FROM high_earners;', hint: 'Query the view like a table.', setupSQL: 'CREATE VIEW IF NOT EXISTS high_earners AS SELECT * FROM employees WHERE salary > 80000;' },
      { id: 'proc-3', title: 'Create Product View', description: "Create view 'expensive_products' for products with price > 200.", initialQuery: '', expectedAnswer: 'CREATE VIEW expensive_products AS SELECT * FROM products WHERE price > 200;', hint: 'CREATE VIEW ... AS SELECT ... WHERE price > 200.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-comments', slug: 'sql-comments', title: 'SQL Comments', category: 'SQL Tutorial', icon: '--',
    description: 'Add comments to SQL code for documentation.',
    theory: `# SQL Comments\n\nComments are used to explain SQL code. They are ignored by the database.\n\n## Single-Line Comments\n\`\`\`sql\n-- This is a single-line comment\nSELECT * FROM employees; -- inline comment\n\`\`\`\n\n## Multi-Line Comments\n\`\`\`sql\n/* This is a\n   multi-line comment */\nSELECT * FROM employees;\n\`\`\``,
    syntaxExample: `-- Get all employees\nSELECT * FROM employees;\n\n/* This query finds\n   the average salary\n   per department */\nSELECT department, AVG(salary) FROM employees GROUP BY department;`,
    exercises: [
      { id: 'comments-1', title: 'Add Comment', description: 'Write a commented query: add a single-line comment before SELECT * FROM employees.', initialQuery: '', expectedAnswer: '-- Retrieve all employees\nSELECT * FROM employees;', hint: 'Use -- for single-line comment.', setupSQL: '' },
      { id: 'comments-2', title: 'Inline Comment', description: 'Write SELECT * FROM products with an inline comment.', initialQuery: '', expectedAnswer: 'SELECT * FROM products; -- Get all products', hint: 'Add -- comment after the statement.', setupSQL: '' },
      { id: 'comments-3', title: 'Multi-line Comment', description: 'Write a multi-line comment before selecting from departments.', initialQuery: '', expectedAnswer: '/* Get all departments\n   and their details */\nSELECT * FROM departments;', hint: 'Use /* ... */ for multi-line.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-operators', slug: 'sql-operators', title: 'SQL Operators', category: 'SQL Tutorial', icon: 'OPR',
    description: 'Learn all SQL operators for conditions and calculations.',
    theory: `# SQL Operators\n\n## Arithmetic Operators\n| Op | Description |\n|----|------------|\n| + | Add |\n| - | Subtract |\n| * | Multiply |\n| / | Divide |\n| % | Modulo |\n\n## Comparison Operators\n| Op | Description |\n|----|------------|\n| = | Equal to |\n| <> | Not equal |\n| > | Greater than |\n| < | Less than |\n| >= | Greater or equal |\n| <= | Less or equal |\n\n## Logical Operators\nAND, OR, NOT, IN, BETWEEN, LIKE, IS NULL, EXISTS`,
    syntaxExample: `-- Arithmetic\nSELECT name, price, price * 0.9 AS discounted FROM products;\n\n-- Comparison\nSELECT * FROM employees WHERE salary >= 80000;\n\n-- Modulo\nSELECT * FROM employees WHERE id % 2 = 0;`,
    exercises: [
      { id: 'ops-1', title: 'Discount Price', description: 'Show product name, price, and 10% discounted price (price * 0.9).', initialQuery: '', expectedAnswer: 'SELECT name, price, price * 0.9 AS discounted_price FROM products;', hint: 'Use price * 0.9.', setupSQL: '' },
      { id: 'ops-2', title: 'Annual Salary', description: 'Show first_name and annual salary (salary * 12).', initialQuery: '', expectedAnswer: 'SELECT first_name, salary * 12 AS annual_salary FROM employees;', hint: 'Multiply salary by 12.', setupSQL: '' },
      { id: 'ops-3', title: 'Even IDs', description: 'Find employees with even IDs using modulo.', initialQuery: '', expectedAnswer: 'SELECT * FROM employees WHERE id % 2 = 0;', hint: 'Use id % 2 = 0.', setupSQL: '' },
    ],
  },
];
