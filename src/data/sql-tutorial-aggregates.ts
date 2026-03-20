import { SQLTopic } from '@/types/sql-topics';

export const sqlTutorialAggregates: SQLTopic[] = [
  {
    id: 'sql-aggregate-functions', slug: 'sql-aggregate-functions', title: 'SQL Aggregate Functions', category: 'SQL Tutorial', icon: 'AGG',
    description: 'Overview of SQL aggregate functions for summarizing data.',
    theory: `# SQL Aggregate Functions\n\nAggregate functions perform calculations on a set of values and return a single value.\n\n## Common Aggregate Functions\n| Function | Description |\n|----------|------------|\n| MIN() | Returns the smallest value |\n| MAX() | Returns the largest value |\n| COUNT() | Returns the number of rows |\n| SUM() | Returns the total sum |\n| AVG() | Returns the average value |\n\n## Key Points\n- Aggregate functions ignore NULL values (except COUNT(*))\n- Often used with GROUP BY\n- Can be used in SELECT and HAVING clauses`,
    syntaxExample: `SELECT COUNT(*) AS total, AVG(salary) AS avg_salary,\n  MIN(salary) AS min_salary, MAX(salary) AS max_salary,\n  SUM(salary) AS total_salary\nFROM employees;`,
    exercises: [
      { id: 'agg-1', title: 'All Aggregates', description: 'Get the count, average salary, min salary, max salary from employees.', initialQuery: '', expectedAnswer: 'SELECT COUNT(*) AS total, AVG(salary) AS avg_salary, MIN(salary) AS min_salary, MAX(salary) AS max_salary FROM employees;', hint: 'Use COUNT, AVG, MIN, MAX together.', setupSQL: '' },
      { id: 'agg-2', title: 'Product Stats', description: 'Get the average price and total stock from products.', initialQuery: '', expectedAnswer: 'SELECT AVG(price) AS avg_price, SUM(stock) AS total_stock FROM products;', hint: 'Use AVG(price) and SUM(stock).', setupSQL: '' },
      { id: 'agg-3', title: 'Order Summary', description: 'Count total orders and sum the total_amount from orders.', initialQuery: '', expectedAnswer: 'SELECT COUNT(*) AS total_orders, SUM(total_amount) AS revenue FROM orders;', hint: 'Use COUNT(*) and SUM(total_amount).', setupSQL: '' },
    ],
  },
  {
    id: 'sql-min', slug: 'sql-min', title: 'SQL MIN()', category: 'SQL Tutorial', icon: 'MIN',
    description: 'Find the minimum value in a column.',
    theory: `# SQL MIN() Function\n\nThe MIN() function returns the **smallest value** of the selected column.\n\n## Syntax\n\`\`\`sql\nSELECT MIN(column_name) FROM table_name WHERE condition;\n\`\`\``,
    syntaxExample: `SELECT MIN(salary) AS lowest_salary FROM employees;\nSELECT MIN(price) AS cheapest FROM products;`,
    exercises: [
      { id: 'min-1', title: 'Lowest Salary', description: 'Find the lowest salary in the employees table.', initialQuery: '', expectedAnswer: 'SELECT MIN(salary) AS lowest_salary FROM employees;', hint: 'Use MIN(salary).', setupSQL: '' },
      { id: 'min-2', title: 'Cheapest Product', description: 'Find the cheapest product price.', initialQuery: '', expectedAnswer: 'SELECT MIN(price) AS cheapest_price FROM products;', hint: 'Use MIN(price).', setupSQL: '' },
      { id: 'min-3', title: 'Smallest Order', description: 'Find the smallest order total_amount.', initialQuery: '', expectedAnswer: 'SELECT MIN(total_amount) AS min_order FROM orders;', hint: 'Use MIN(total_amount).', setupSQL: '' },
    ],
  },
  {
    id: 'sql-max', slug: 'sql-max', title: 'SQL MAX()', category: 'SQL Tutorial', icon: 'MAX',
    description: 'Find the maximum value in a column.',
    theory: `# SQL MAX() Function\n\nThe MAX() function returns the **largest value** of the selected column.\n\n## Syntax\n\`\`\`sql\nSELECT MAX(column_name) FROM table_name WHERE condition;\n\`\`\``,
    syntaxExample: `SELECT MAX(salary) AS highest_salary FROM employees;\nSELECT MAX(price) AS most_expensive FROM products;`,
    exercises: [
      { id: 'max-1', title: 'Highest Salary', description: 'Find the highest salary.', initialQuery: '', expectedAnswer: 'SELECT MAX(salary) AS highest_salary FROM employees;', hint: 'Use MAX(salary).', setupSQL: '' },
      { id: 'max-2', title: 'Most Expensive', description: 'Find the most expensive product price.', initialQuery: '', expectedAnswer: 'SELECT MAX(price) AS most_expensive FROM products;', hint: 'Use MAX(price).', setupSQL: '' },
      { id: 'max-3', title: 'Largest Order', description: 'Find the largest order amount.', initialQuery: '', expectedAnswer: 'SELECT MAX(total_amount) AS max_order FROM orders;', hint: 'Use MAX(total_amount).', setupSQL: '' },
    ],
  },
  {
    id: 'sql-count', slug: 'sql-count', title: 'SQL COUNT()', category: 'SQL Tutorial', icon: 'CNT',
    description: 'Count the number of rows.',
    theory: `# SQL COUNT() Function\n\nCOUNT() returns the number of rows that match a specified criterion.\n\n## Syntax\n\`\`\`sql\nSELECT COUNT(column_name) FROM table_name WHERE condition;\nSELECT COUNT(*) FROM table_name; -- counts all rows\nSELECT COUNT(DISTINCT column) FROM table_name; -- counts unique\n\`\`\``,
    syntaxExample: `SELECT COUNT(*) FROM employees;\nSELECT COUNT(*) FROM employees WHERE department = 'Engineering';\nSELECT COUNT(DISTINCT department) FROM employees;`,
    exercises: [
      { id: 'count-1', title: 'Total Employees', description: 'Count total number of employees.', initialQuery: '', expectedAnswer: 'SELECT COUNT(*) FROM employees;', hint: 'Use COUNT(*).', setupSQL: '' },
      { id: 'count-2', title: 'Marketing Count', description: "Count employees in Marketing department.", initialQuery: '', expectedAnswer: "SELECT COUNT(*) FROM employees WHERE department = 'Marketing';", hint: 'Add WHERE clause.', setupSQL: '' },
      { id: 'count-3', title: 'Unique Categories', description: 'Count unique product categories.', initialQuery: '', expectedAnswer: 'SELECT COUNT(DISTINCT category) FROM products;', hint: 'Use COUNT(DISTINCT category).', setupSQL: '' },
    ],
  },
  {
    id: 'sql-sum', slug: 'sql-sum', title: 'SQL SUM()', category: 'SQL Tutorial', icon: 'SUM',
    description: 'Calculate the total sum of a numeric column.',
    theory: `# SQL SUM() Function\n\nSUM() returns the **total sum** of a numeric column.\n\n## Syntax\n\`\`\`sql\nSELECT SUM(column_name) FROM table_name WHERE condition;\n\`\`\``,
    syntaxExample: `SELECT SUM(salary) AS total_payroll FROM employees;\nSELECT SUM(total_amount) AS total_revenue FROM orders WHERE status = 'completed';`,
    exercises: [
      { id: 'sum-1', title: 'Total Payroll', description: 'Calculate total salary of all employees.', initialQuery: '', expectedAnswer: 'SELECT SUM(salary) AS total_payroll FROM employees;', hint: 'Use SUM(salary).', setupSQL: '' },
      { id: 'sum-2', title: 'Total Revenue', description: 'Calculate total revenue from completed orders.', initialQuery: '', expectedAnswer: "SELECT SUM(total_amount) AS total_revenue FROM orders WHERE status = 'completed';", hint: "Add WHERE status = 'completed'.", setupSQL: '' },
      { id: 'sum-3', title: 'Total Stock', description: 'Calculate total stock of all products.', initialQuery: '', expectedAnswer: 'SELECT SUM(stock) AS total_stock FROM products;', hint: 'Use SUM(stock).', setupSQL: '' },
    ],
  },
  {
    id: 'sql-avg', slug: 'sql-avg', title: 'SQL AVG()', category: 'SQL Tutorial', icon: 'AVG',
    description: 'Calculate the average value of a numeric column.',
    theory: `# SQL AVG() Function\n\nAVG() returns the **average value** of a numeric column. NULL values are ignored.\n\n## Syntax\n\`\`\`sql\nSELECT AVG(column_name) FROM table_name WHERE condition;\n\`\`\``,
    syntaxExample: `SELECT AVG(salary) AS avg_salary FROM employees;\nSELECT AVG(price) AS avg_price FROM products WHERE category = 'Electronics';`,
    exercises: [
      { id: 'avg-1', title: 'Average Salary', description: 'Find the average salary of all employees.', initialQuery: '', expectedAnswer: 'SELECT AVG(salary) AS avg_salary FROM employees;', hint: 'Use AVG(salary).', setupSQL: '' },
      { id: 'avg-2', title: 'Avg Electronics Price', description: 'Find average price of Electronics products.', initialQuery: '', expectedAnswer: "SELECT AVG(price) AS avg_price FROM products WHERE category = 'Electronics';", hint: "Filter by category = 'Electronics'.", setupSQL: '' },
      { id: 'avg-3', title: 'Avg Order Amount', description: 'Find the average order total_amount.', initialQuery: '', expectedAnswer: 'SELECT AVG(total_amount) AS avg_order FROM orders;', hint: 'Use AVG(total_amount).', setupSQL: '' },
    ],
  },
  {
    id: 'sql-like', slug: 'sql-like', title: 'SQL LIKE', category: 'SQL Tutorial', icon: 'LIK',
    description: 'Search for patterns in a column.',
    theory: `# SQL LIKE Operator\n\nLIKE is used with WHERE to search for a specified pattern.\n\n## Wildcards\n| Wildcard | Description |\n|----------|------------|\n| % | Zero, one, or multiple characters |\n| _ | A single character |\n\n## Examples\n- 'a%' — starts with "a"\n- '%a' — ends with "a"\n- '%or%' — contains "or"\n- '_r%' — "r" in second position`,
    syntaxExample: `SELECT * FROM employees WHERE first_name LIKE 'J%';\nSELECT * FROM customers WHERE email LIKE '%example.com';`,
    exercises: [
      { id: 'like-1', title: 'Names Starting with J', description: 'Find employees whose first_name starts with J.', initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE first_name LIKE 'J%';", hint: "Use LIKE 'J%'.", setupSQL: '' },
      { id: 'like-2', title: 'Email Domain', description: "Find customers whose email ends with 'example.com'.", initialQuery: '', expectedAnswer: "SELECT * FROM customers WHERE email LIKE '%example.com';", hint: "Use LIKE '%example.com'.", setupSQL: '' },
      { id: 'like-3', title: 'Contains "an"', description: "Find employees whose first_name contains 'an'.", initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE first_name LIKE '%an%';", hint: "Use LIKE '%an%'.", setupSQL: '' },
    ],
  },
  {
    id: 'sql-wildcards', slug: 'sql-wildcards', title: 'SQL Wildcards', category: 'SQL Tutorial', icon: 'W%',
    description: 'Use wildcard characters with LIKE operator.',
    theory: `# SQL Wildcards\n\nWildcard characters are used with the LIKE operator to substitute characters in a string.\n\n## Wildcards\n| Symbol | Description |\n|--------|------------|\n| % | Represents zero or more characters |\n| _ | Represents a single character |\n\n## Examples\n- 'B_%' — starts with B, at least 2 chars\n- '___' — exactly 3 characters\n- '%son' — ends with "son"`,
    syntaxExample: `-- Second char is 'o'\nSELECT * FROM employees WHERE first_name LIKE '_o%';\n\n-- Starts with 'A' and at least 3 chars\nSELECT * FROM employees WHERE first_name LIKE 'A__%';`,
    exercises: [
      { id: 'wild-1', title: 'Second Letter O', description: "Find employees with 'o' as second letter in first_name.", initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE first_name LIKE '_o%';", hint: "Use LIKE '_o%'.", setupSQL: '' },
      { id: 'wild-2', title: 'Ends with son', description: 'Find employees with last_name ending in "son".', initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE last_name LIKE '%son';", hint: "Use LIKE '%son'.", setupSQL: '' },
      { id: 'wild-3', title: 'Five Letter Names', description: "Find employees with first_name exactly 5 characters long.", initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE first_name LIKE '_____';", hint: 'Use five underscores: _____', setupSQL: '' },
    ],
  },
  {
    id: 'sql-in', slug: 'sql-in', title: 'SQL IN', category: 'SQL Tutorial', icon: 'IN',
    description: 'Specify multiple values in a WHERE clause.',
    theory: `# SQL IN Operator\n\nThe IN operator lets you specify **multiple values** in a WHERE clause. It's shorthand for multiple OR conditions.\n\n## Syntax\n\`\`\`sql\nSELECT * FROM table WHERE column IN (value1, value2, ...);\n\`\`\``,
    syntaxExample: `SELECT * FROM employees\nWHERE department IN ('Engineering', 'Marketing', 'Sales');\n\nSELECT * FROM customers WHERE country IN ('USA', 'UK', 'Japan');`,
    exercises: [
      { id: 'in-1', title: 'Selected Departments', description: "Find employees in Engineering, Marketing, or Sales.", initialQuery: '', expectedAnswer: "SELECT * FROM employees WHERE department IN ('Engineering', 'Marketing', 'Sales');", hint: "Use IN ('Engineering', 'Marketing', 'Sales').", setupSQL: '' },
      { id: 'in-2', title: 'Selected Countries', description: 'Find customers from USA, UK, or Japan.', initialQuery: '', expectedAnswer: "SELECT * FROM customers WHERE country IN ('USA', 'UK', 'Japan');", hint: 'List countries in IN(...).', setupSQL: '' },
      { id: 'in-3', title: 'Specific Products', description: "Find products with category in 'Electronics' or 'Office'.", initialQuery: '', expectedAnswer: "SELECT * FROM products WHERE category IN ('Electronics', 'Office');", hint: "Use IN ('Electronics', 'Office').", setupSQL: '' },
    ],
  },
  {
    id: 'sql-between', slug: 'sql-between', title: 'SQL BETWEEN', category: 'SQL Tutorial', icon: 'BTW',
    description: 'Select values within a range.',
    theory: `# SQL BETWEEN Operator\n\nBETWEEN selects values within a given range. The values can be numbers, text, or dates. It is **inclusive** (includes both boundary values).\n\n## Syntax\n\`\`\`sql\nSELECT * FROM table WHERE column BETWEEN value1 AND value2;\n\`\`\``,
    syntaxExample: `SELECT * FROM employees WHERE salary BETWEEN 70000 AND 90000;\nSELECT * FROM products WHERE price BETWEEN 20 AND 100;`,
    exercises: [
      { id: 'between-1', title: 'Salary Range', description: 'Find employees with salary between 70000 and 90000.', initialQuery: '', expectedAnswer: 'SELECT * FROM employees WHERE salary BETWEEN 70000 AND 90000;', hint: 'Use BETWEEN 70000 AND 90000.', setupSQL: '' },
      { id: 'between-2', title: 'Price Range', description: 'Find products with price between 25 and 100.', initialQuery: '', expectedAnswer: 'SELECT * FROM products WHERE price BETWEEN 25 AND 100;', hint: 'Use BETWEEN 25 AND 100.', setupSQL: '' },
      { id: 'between-3', title: 'Date Range Orders', description: "Find orders between '2024-02-01' and '2024-03-31'.", initialQuery: '', expectedAnswer: "SELECT * FROM orders WHERE order_date BETWEEN '2024-02-01' AND '2024-03-31';", hint: 'Use BETWEEN with date strings.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-aliases', slug: 'sql-aliases', title: 'SQL Aliases', category: 'SQL Tutorial', icon: 'AS',
    description: 'Give a table or column a temporary name.',
    theory: `# SQL Aliases\n\nAliases give a table or column a **temporary name** using the AS keyword. They make column headings more readable.\n\n## Syntax\n\`\`\`sql\n-- Column Alias\nSELECT column AS alias_name FROM table;\n\n-- Table Alias\nSELECT t.column FROM table AS t;\n\`\`\``,
    syntaxExample: `SELECT first_name AS name, salary AS pay FROM employees;\nSELECT e.first_name, e.department\nFROM employees AS e WHERE e.salary > 80000;`,
    exercises: [
      { id: 'alias-1', title: 'Column Alias', description: 'Select first_name as "Name" and salary as "Pay" from employees.', initialQuery: '', expectedAnswer: 'SELECT first_name AS Name, salary AS Pay FROM employees;', hint: 'Use AS for column aliases.', setupSQL: '' },
      { id: 'alias-2', title: 'Table Alias', description: 'Using table alias "e" for employees, select first_name and department.', initialQuery: '', expectedAnswer: 'SELECT e.first_name, e.department FROM employees AS e;', hint: 'Use FROM employees AS e.', setupSQL: '' },
      { id: 'alias-3', title: 'Computed Alias', description: 'Select name, price, and price * 1.1 as "price_with_tax" from products.', initialQuery: '', expectedAnswer: 'SELECT name, price, price * 1.1 AS price_with_tax FROM products;', hint: 'Use an expression with AS.', setupSQL: '' },
    ],
  },
];
