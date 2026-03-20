import { SQLTopic } from '@/types/sql-topics';

export const sqlTutorialLogic: SQLTopic[] = [
  {
    id: 'sql-and', slug: 'sql-and', title: 'SQL AND', category: 'SQL Tutorial', icon: 'AND',
    description: 'Combine multiple conditions that must all be true.',
    theory: `# SQL AND Operator\n\nThe AND operator is used to filter records based on **more than one condition**. All conditions must be TRUE.\n\n## Syntax\n\`\`\`sql\nSELECT * FROM table WHERE condition1 AND condition2;\n\`\`\`\n\n## Key Points\n- ALL conditions must be true for a row to be included\n- You can combine multiple AND operators\n- Often combined with OR and NOT operators`,
    syntaxExample: `-- Two conditions\nSELECT * FROM employees\nWHERE department = 'Engineering' AND salary > 80000;\n\n-- Three conditions\nSELECT * FROM products\nWHERE category = 'Electronics' AND price < 100 AND stock > 50;`,
    exercises: [
      { id: 'and-1', title: 'High-Paid Engineers', description: 'Find Engineers with salary > 85000.', initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE department = 'Engineering' AND salary > 85000;", hint: 'Combine department and salary conditions with AND.', setupSQL: '' },
      { id: 'and-2', title: 'Affordable Electronics', description: 'Find electronics products with price under 100.', initialQuery: '', expectedAnswer: "SELECT * FROM products WHERE category = 'Electronics' AND price < 100;", hint: "Use category = 'Electronics' AND price < 100", setupSQL: '' },
      { id: 'and-3', title: 'USA Customers Named Michael', description: 'Find customers from USA with first_name Michael.', initialQuery: '', expectedAnswer: "SELECT * FROM customers WHERE country = 'USA' AND first_name = 'Michael';", hint: 'Filter by both country and first_name.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-or', slug: 'sql-or', title: 'SQL OR', category: 'SQL Tutorial', icon: 'OR',
    description: 'Combine conditions where at least one must be true.',
    theory: `# SQL OR Operator\n\nThe OR operator displays a record if **ANY** of the conditions is TRUE.\n\n## Syntax\n\`\`\`sql\nSELECT * FROM table WHERE condition1 OR condition2;\n\`\`\`\n\n## Key Points\n- At least ONE condition must be true\n- Can combine with AND using parentheses\n- Useful when you want rows matching multiple criteria`,
    syntaxExample: `SELECT * FROM employees\nWHERE department = 'Engineering' OR department = 'Marketing';\n\nSELECT * FROM products\nWHERE price < 30 OR stock > 200;`,
    exercises: [
      { id: 'or-1', title: 'Two Departments', description: 'Find employees in Engineering OR Sales.', initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE department = 'Engineering' OR department = 'Sales';", hint: 'Use OR between two department conditions.', setupSQL: '' },
      { id: 'or-2', title: 'Cheap or High Stock', description: 'Find products with price < 30 OR stock > 150.', initialQuery: '', expectedAnswer: 'SELECT * FROM products WHERE price < 30 OR stock > 150;', hint: 'Combine two conditions with OR.', setupSQL: '' },
      { id: 'or-3', title: 'Multiple Countries', description: 'Find customers from USA or UK.', initialQuery: '', expectedAnswer: "SELECT * FROM customers WHERE country = 'USA' OR country = 'UK';", hint: "Use OR for country = 'USA' OR country = 'UK'.", setupSQL: '' },
    ],
  },
  {
    id: 'sql-not', slug: 'sql-not', title: 'SQL NOT', category: 'SQL Tutorial', icon: 'NOT',
    description: 'Negate a condition to filter records.',
    theory: `# SQL NOT Operator\n\nThe NOT operator is used to **negate** a condition. It displays records where the condition is NOT true.\n\n## Syntax\n\`\`\`sql\nSELECT * FROM table WHERE NOT condition;\n\`\`\`\n\n## Common Uses\n- NOT BETWEEN, NOT LIKE, NOT IN\n- Combine with other operators to exclude certain records`,
    syntaxExample: `-- Not in Engineering\nSELECT * FROM employees WHERE NOT department = 'Engineering';\n\n-- Not expensive products\nSELECT * FROM products WHERE NOT price > 100;\n\n-- NOT IN\nSELECT * FROM customers WHERE country NOT IN ('USA', 'UK');`,
    exercises: [
      { id: 'not-1', title: 'Not Engineering', description: 'Find all employees NOT in the Engineering department.', initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE NOT department = 'Engineering';", hint: "Use NOT before the condition.", setupSQL: '' },
      { id: 'not-2', title: 'Not Expensive', description: 'Find products that are NOT priced over 100.', initialQuery: '', expectedAnswer: 'SELECT * FROM products WHERE NOT price > 100;', hint: 'Use NOT before price > 100.', setupSQL: '' },
      { id: 'not-3', title: 'Not From USA', description: 'List customers NOT from the USA.', initialQuery: '', expectedAnswer: "SELECT * FROM customers WHERE NOT country = 'USA';", hint: "Use NOT country = 'USA'.", setupSQL: '' },
    ],
  },
  {
    id: 'sql-insert-into', slug: 'sql-insert-into', title: 'SQL INSERT INTO', category: 'SQL Tutorial', icon: 'INS',
    description: 'Insert new records into a table.',
    theory: `# SQL INSERT INTO\n\nThe INSERT INTO statement adds new records to a table.\n\n## Syntax\n\`\`\`sql\n-- Specify columns\nINSERT INTO table (col1, col2) VALUES (val1, val2);\n\n-- All columns (order must match)\nINSERT INTO table VALUES (val1, val2, ...);\n\`\`\`\n\n## Key Points\n- String values must be in **single quotes**\n- Numeric values do NOT need quotes\n- You can insert multiple rows at once`,
    syntaxExample: `-- Insert with columns specified\nINSERT INTO departments (name, location, budget)\nVALUES ('Research', 'Building E', 250000);\n\n-- Verify the insert\nSELECT * FROM departments;`,
    exercises: [
      { id: 'insert-1', title: 'Add Department', description: "Insert a new department: name='IT', location='Building F', budget=450000.", initialQuery: '', expectedAnswer: "INSERT INTO departments (name, location, budget) VALUES ('IT', 'Building F', 450000);", hint: 'Use INSERT INTO departments (columns) VALUES (values);', setupSQL: '' },
      { id: 'insert-2', title: 'Add Product', description: "Insert a product: name='Keyboard Light', category='Accessories', price=24.99, stock=100, supplier_id=2.", initialQuery: '', expectedAnswer: "INSERT INTO products (name, category, price, stock, supplier_id) VALUES ('Keyboard Light', 'Accessories', 24.99, 100, 2);", hint: 'Specify all columns and their values.', setupSQL: '' },
      { id: 'insert-3', title: 'Add Customer', description: "Insert a customer: first_name='Sarah', last_name='Connor', email='sarah@example.com', city='LA', country='USA', created_at='2024-01-01'.", initialQuery: '', expectedAnswer: "INSERT INTO customers (first_name, last_name, email, city, country, created_at) VALUES ('Sarah', 'Connor', 'sarah@example.com', 'LA', 'USA', '2024-01-01');", hint: 'List all columns and provide values in order.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-null-values', slug: 'sql-null-values', title: 'SQL NULL Values', category: 'SQL Tutorial', icon: 'NUL',
    description: 'Handle NULL values in SQL queries.',
    theory: `# SQL NULL Values\n\nA NULL value represents **missing or unknown** data. You cannot compare NULL using = or !=.\n\n## Syntax\n\`\`\`sql\nSELECT * FROM table WHERE column IS NULL;\nSELECT * FROM table WHERE column IS NOT NULL;\n\`\`\`\n\n## Key Points\n- NULL is **not** zero or empty string\n- Use IS NULL / IS NOT NULL to test\n- NULL in calculations returns NULL`,
    syntaxExample: `-- Find employees without a manager\nSELECT * FROM employees WHERE manager_id IS NULL;\n\n-- Find employees with a manager\nSELECT * FROM employees WHERE manager_id IS NOT NULL;`,
    exercises: [
      { id: 'null-1', title: 'No Manager', description: 'Find employees who do not have a manager (manager_id IS NULL).', initialQuery: '', expectedAnswer: 'SELECT * FROM employees WHERE manager_id IS NULL;', hint: 'Use IS NULL on manager_id.', setupSQL: '' },
      { id: 'null-2', title: 'Has Manager', description: 'Find employees who have a manager assigned.', initialQuery: '', expectedAnswer: 'SELECT * FROM employees WHERE manager_id IS NOT NULL;', hint: 'Use IS NOT NULL.', setupSQL: '' },
      { id: 'null-3', title: 'All Non-Null Emails', description: 'Select first_name and email from customers where email is not null.', initialQuery: '', expectedAnswer: 'SELECT first_name, email FROM customers WHERE email IS NOT NULL;', hint: 'Use IS NOT NULL on email column.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-update', slug: 'sql-update', title: 'SQL UPDATE', category: 'SQL Tutorial', icon: 'UPD',
    description: 'Modify existing records in a table.',
    theory: `# SQL UPDATE\n\nThe UPDATE statement modifies existing records in a table.\n\n## Syntax\n\`\`\`sql\nUPDATE table SET col1 = val1, col2 = val2 WHERE condition;\n\`\`\`\n\n## ⚠️ Warning\nAlways use a WHERE clause! Without it, ALL records will be updated.\n\n## Key Points\n- Can update one or many columns at once\n- WHERE clause is critical\n- You can use expressions (SET salary = salary * 1.1)`,
    syntaxExample: `-- Update one record\nUPDATE employees SET salary = 95000 WHERE id = 1;\n\n-- Update multiple columns\nUPDATE products SET price = 39.99, stock = 180 WHERE name = 'Wireless Mouse';`,
    exercises: [
      { id: 'update-1', title: 'Raise Salary', description: "Update employee with id=1 to have salary=90000.", initialQuery: '', expectedAnswer: 'UPDATE employees SET salary = 90000 WHERE id = 1;', hint: 'UPDATE table SET column = value WHERE condition;', setupSQL: '' },
      { id: 'update-2', title: 'Update Stock', description: "Set the stock of 'Laptop Pro' to 60.", initialQuery: '', expectedAnswer: "UPDATE products SET stock = 60 WHERE name = 'Laptop Pro';", hint: "Use WHERE name = 'Laptop Pro'.", setupSQL: '' },
      { id: 'update-3', title: 'Update Order Status', description: "Change order with id=5 status to 'shipped'.", initialQuery: '', expectedAnswer: "UPDATE orders SET status = 'shipped' WHERE id = 5;", hint: "UPDATE orders SET status = 'shipped' WHERE id = 5;", setupSQL: '' },
    ],
  },
  {
    id: 'sql-delete', slug: 'sql-delete', title: 'SQL DELETE', category: 'SQL Tutorial', icon: 'DEL',
    description: 'Delete records from a table.',
    theory: `# SQL DELETE\n\nThe DELETE statement removes records from a table.\n\n## Syntax\n\`\`\`sql\nDELETE FROM table WHERE condition;\n\`\`\`\n\n## ⚠️ Warning\nWithout WHERE, ALL records will be deleted!\n\n## Key Points\n- Always use WHERE to specify which rows\n- DELETE FROM table; deletes ALL rows\n- Does not remove the table structure`,
    syntaxExample: `-- Delete specific record\nDELETE FROM employees WHERE id = 15;\n\n-- Delete by condition\nDELETE FROM products WHERE stock = 0;`,
    exercises: [
      { id: 'delete-1', title: 'Delete by ID', description: 'Delete the employee with id = 15.', initialQuery: '', expectedAnswer: 'DELETE FROM employees WHERE id = 15;', hint: 'DELETE FROM employees WHERE id = 15;', setupSQL: '' },
      { id: 'delete-2', title: 'Delete Cheap Products', description: 'Delete all products with price less than 15.', initialQuery: '', expectedAnswer: 'DELETE FROM products WHERE price < 15;', hint: 'Use WHERE price < 15.', setupSQL: '' },
      { id: 'delete-3', title: 'Delete Pending Orders', description: "Delete all orders with status 'pending'.", initialQuery: '', expectedAnswer: "DELETE FROM orders WHERE status = 'pending';", hint: "WHERE status = 'pending'", setupSQL: '' },
    ],
  },
  {
    id: 'sql-select-top', slug: 'sql-select-top', title: 'SQL SELECT TOP / LIMIT', category: 'SQL Tutorial', icon: 'TOP',
    description: 'Limit the number of records returned.',
    theory: `# SQL SELECT TOP / LIMIT\n\nUsed to specify the number of records to return.\n\n## Syntax (varies by database)\n\`\`\`sql\n-- MySQL / SQLite\nSELECT * FROM table LIMIT number;\n\n-- SQL Server\nSELECT TOP number * FROM table;\n\`\`\`\n\n## Key Points\n- Useful for large tables\n- Used with ORDER BY for "top N" queries\n- SQLite uses LIMIT`,
    syntaxExample: `-- Get first 5 employees\nSELECT * FROM employees LIMIT 5;\n\n-- Top 3 highest salaries\nSELECT * FROM employees ORDER BY salary DESC LIMIT 3;`,
    exercises: [
      { id: 'top-1', title: 'First 5 Employees', description: 'Select the first 5 employees.', initialQuery: '', expectedAnswer: 'SELECT * FROM employees LIMIT 5;', hint: 'Use LIMIT 5 at the end.', setupSQL: '' },
      { id: 'top-2', title: 'Top 3 Expensive', description: 'Show the 3 most expensive products.', initialQuery: '', expectedAnswer: 'SELECT * FROM products ORDER BY price DESC LIMIT 3;', hint: 'ORDER BY price DESC then LIMIT 3.', setupSQL: '' },
      { id: 'top-3', title: 'Latest Orders', description: 'Show the 5 most recent orders by order_date.', initialQuery: '', expectedAnswer: 'SELECT * FROM orders ORDER BY order_date DESC LIMIT 5;', hint: 'ORDER BY order_date DESC LIMIT 5.', setupSQL: '' },
    ],
  },
];
