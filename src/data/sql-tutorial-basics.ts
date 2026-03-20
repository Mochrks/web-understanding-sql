import { SQLTopic } from '@/types/sql-topics';

export const sqlTutorialBasics: SQLTopic[] = [
  {
    id: 'sql-intro', slug: 'sql-intro', title: 'SQL Introduction', category: 'SQL Tutorial', icon: 'SQL',
    description: 'Learn what SQL is and why it is important for managing databases.',
    theory: `# SQL Introduction

**SQL (Structured Query Language)** is the standard language for managing and manipulating relational databases.

## What is SQL?
- SQL stands for **Structured Query Language**
- It lets you **access and manipulate databases**
- SQL became a standard of ANSI in 1986 and ISO in 1987

## What Can SQL Do?
- Execute queries against a database
- Retrieve, insert, update, and delete data
- Create new databases and tables
- Set permissions on tables, procedures, and views

## RDBMS
SQL is based on Relational Database Management Systems (RDBMS). Data is stored in **tables** (collections of related data entries with columns and rows).

| id | name    | age | city      |
|----|---------|-----|-----------|
| 1  | Alice   | 25  | New York  |
| 2  | Bob     | 30  | London    |

A **table** is a collection of related data organized in rows and columns.`,
    syntaxExample: `-- SQL is used to interact with databases
-- Example: Retrieve all data from a table
SELECT * FROM customers;

-- Example: Count records
SELECT COUNT(*) FROM employees;`,
    exercises: [
      { id: 'intro-1', title: 'Select All Data', description: 'Write a query to select all columns from the "employees" table.', initialQuery: '-- Write your query here\n', expectedAnswer: 'SELECT * FROM employees;', hint: 'Use SELECT * FROM table_name;', setupSQL: '' },
      { id: 'intro-2', title: 'Count Employees', description: 'Write a query to count the total number of employees.', initialQuery: '-- Count all employees\n', expectedAnswer: 'SELECT COUNT(*) FROM employees;', hint: 'Use the COUNT(*) function.', setupSQL: '' },
      { id: 'intro-3', title: 'View Departments', description: 'Write a query to see all departments.', initialQuery: '-- Show all departments\n', expectedAnswer: 'SELECT * FROM departments;', hint: 'Use SELECT * FROM departments;', setupSQL: '' },
    ],
  },
  {
    id: 'sql-syntax', slug: 'sql-syntax', title: 'SQL Syntax', category: 'SQL Tutorial', icon: 'SYN',
    description: 'Understand the basic syntax rules of SQL statements.',
    theory: `# SQL Syntax

## SQL Statements
Most actions on a database are done with SQL statements. SQL keywords are **NOT case sensitive** (SELECT = select), but convention is UPPERCASE.

## Important Rules
- SQL statements end with a **semicolon (;)**
- SQL is **NOT case sensitive** for keywords
- Table and column names may be case-sensitive depending on the RDBMS

## Most Important SQL Commands
| Command | Description |
|---------|-------------|
| SELECT | Extracts data |
| UPDATE | Updates data |
| DELETE | Deletes data |
| INSERT INTO | Inserts new data |
| CREATE DATABASE | Creates a database |
| CREATE TABLE | Creates a table |
| ALTER TABLE | Modifies a table |
| DROP TABLE | Deletes a table |`,
    syntaxExample: `-- SQL is NOT case sensitive
SELECT * FROM employees;
select * from employees;

-- Multiple columns
SELECT first_name, last_name, salary FROM employees;

-- End statements with semicolon
SELECT * FROM departments;
SELECT * FROM products;`,
    exercises: [
      { id: 'syntax-1', title: 'Basic SELECT', description: 'Write a SQL statement to select the "first_name" and "last_name" columns from "employees" table.', initialQuery: '-- Select first_name and last_name\n', expectedAnswer: 'SELECT first_name, last_name FROM employees;', hint: 'SELECT column1, column2 FROM table;', setupSQL: '' },
      { id: 'syntax-2', title: 'Select Three Columns', description: 'Select first_name, department, and salary from employees.', initialQuery: '-- Select three columns\n', expectedAnswer: 'SELECT first_name, department, salary FROM employees;', hint: 'Separate column names with commas.', setupSQL: '' },
      { id: 'syntax-3', title: 'All Products', description: 'Write a statement to show all columns from the products table.', initialQuery: '-- Show all products\n', expectedAnswer: 'SELECT * FROM products;', hint: 'Use the asterisk (*) to select all columns.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-select', slug: 'sql-select', title: 'SQL SELECT', category: 'SQL Tutorial', icon: 'SEL',
    description: 'Learn how to use SELECT to retrieve data from a database.',
    theory: `# SQL SELECT Statement

The SELECT statement is used to select data from a database. The result is stored in a result table called the **result-set**.

## Syntax
\`\`\`sql
SELECT column1, column2 FROM table_name;
-- or select all columns:
SELECT * FROM table_name;
\`\`\`

## Key Points
- Use **SELECT** to specify which columns to retrieve
- Use **\*** to select all columns
- The result is called a **result-set**
- You can select one or more columns by separating them with commas`,
    syntaxExample: `-- Select specific columns
SELECT first_name, email FROM employees;

-- Select all columns
SELECT * FROM customers;

-- Select with expression
SELECT first_name, salary, salary * 12 FROM employees;`,
    exercises: [
      { id: 'select-1', title: 'Select Email', description: 'Select the email column from the customers table.', initialQuery: '-- Get customer emails\n', expectedAnswer: 'SELECT email FROM customers;', hint: 'SELECT column_name FROM table_name;', setupSQL: '' },
      { id: 'select-2', title: 'Product Details', description: 'Select name and price from the products table.', initialQuery: '-- Get product names and prices\n', expectedAnswer: 'SELECT name, price FROM products;', hint: 'Select two columns separated by a comma.', setupSQL: '' },
      { id: 'select-3', title: 'Employee Info', description: 'Select first_name, last_name, department, and salary from employees.', initialQuery: '-- Get employee details\n', expectedAnswer: 'SELECT first_name, last_name, department, salary FROM employees;', hint: 'List all four columns separated by commas.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-select-distinct', slug: 'sql-select-distinct', title: 'SQL SELECT DISTINCT', category: 'SQL Tutorial', icon: 'DST',
    description: 'Learn to return only distinct (unique) values.',
    theory: `# SQL SELECT DISTINCT

The SELECT DISTINCT statement returns only **unique/different** values, eliminating duplicates from the result.

## Syntax
\`\`\`sql
SELECT DISTINCT column1, column2 FROM table_name;
\`\`\`

## Key Points
- Removes **duplicate** rows from results
- Can be applied to one or multiple columns
- Useful for finding unique values in a column
- COUNT(DISTINCT column) counts unique values`,
    syntaxExample: `-- Get unique departments
SELECT DISTINCT department FROM employees;

-- Count unique departments
SELECT COUNT(DISTINCT department) FROM employees;

-- Unique cities from customers
SELECT DISTINCT city FROM customers;`,
    exercises: [
      { id: 'distinct-1', title: 'Unique Departments', description: 'Select all unique department names from the employees table.', initialQuery: '-- Find unique departments\n', expectedAnswer: 'SELECT DISTINCT department FROM employees;', hint: 'Use SELECT DISTINCT column FROM table;', setupSQL: '' },
      { id: 'distinct-2', title: 'Unique Countries', description: 'Find all unique countries from the customers table.', initialQuery: '-- Find unique countries\n', expectedAnswer: 'SELECT DISTINCT country FROM customers;', hint: 'Use DISTINCT on the country column.', setupSQL: '' },
      { id: 'distinct-3', title: 'Count Unique Cities', description: 'Count how many unique cities exist in the customers table.', initialQuery: '-- Count unique cities\n', expectedAnswer: 'SELECT COUNT(DISTINCT city) FROM customers;', hint: 'Combine COUNT() with DISTINCT.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-where', slug: 'sql-where', title: 'SQL WHERE', category: 'SQL Tutorial', icon: 'WHR',
    description: 'Filter records using the WHERE clause.',
    theory: `# SQL WHERE Clause

The WHERE clause filters records based on specified conditions. It extracts only rows that meet the criteria.

## Syntax
\`\`\`sql
SELECT column1 FROM table_name WHERE condition;
\`\`\`

## Operators in WHERE
| Operator | Description |
|----------|-------------|
| = | Equal |
| > | Greater than |
| < | Less than |
| >= | Greater than or equal |
| <= | Less than or equal |
| <> or != | Not equal |
| BETWEEN | Between a range |
| LIKE | Search for a pattern |
| IN | Match any value in a list |`,
    syntaxExample: `-- Filter by department
SELECT * FROM employees WHERE department = 'Engineering';

-- Filter by salary
SELECT first_name, salary FROM employees WHERE salary > 80000;

-- Text filter
SELECT * FROM customers WHERE country = 'USA';`,
    exercises: [
      { id: 'where-1', title: 'Engineering Team', description: 'Select all employees in the Engineering department.', initialQuery: '-- Find Engineering employees\n', expectedAnswer: "SELECT * FROM employees WHERE department = 'Engineering';", hint: "Use WHERE department = 'Engineering'", setupSQL: '' },
      { id: 'where-2', title: 'High Salary', description: 'Find employees with salary greater than 80000.', initialQuery: '-- Find high earners\n', expectedAnswer: 'SELECT * FROM employees WHERE salary > 80000;', hint: 'Use the > operator with WHERE.', setupSQL: '' },
      { id: 'where-3', title: 'USA Customers', description: 'Select all customers from the USA.', initialQuery: '-- Find USA customers\n', expectedAnswer: "SELECT * FROM customers WHERE country = 'USA';", hint: "Filter where country = 'USA'", setupSQL: '' },
    ],
  },
  {
    id: 'sql-order-by', slug: 'sql-order-by', title: 'SQL ORDER BY', category: 'SQL Tutorial', icon: 'ORD',
    description: 'Sort the result set in ascending or descending order.',
    theory: `# SQL ORDER BY

The ORDER BY keyword sorts the result-set in ascending (ASC) or descending (DESC) order. By default it sorts **ascending**.

## Syntax
\`\`\`sql
SELECT columns FROM table_name ORDER BY column1 ASC|DESC;
\`\`\`

## Key Points
- Default is **ASC** (ascending)
- Use **DESC** for descending order
- Can sort by multiple columns
- Can sort by column position (e.g., ORDER BY 1)`,
    syntaxExample: `-- Sort by salary ascending
SELECT first_name, salary FROM employees ORDER BY salary;

-- Sort descending
SELECT first_name, salary FROM employees ORDER BY salary DESC;

-- Sort by multiple columns
SELECT * FROM employees ORDER BY department, salary DESC;`,
    exercises: [
      { id: 'orderby-1', title: 'Sort by Name', description: 'Select all employees sorted by first_name alphabetically.', initialQuery: '-- Sort employees by name\n', expectedAnswer: 'SELECT * FROM employees ORDER BY first_name;', hint: 'ORDER BY first_name (ASC is default).', setupSQL: '' },
      { id: 'orderby-2', title: 'Highest Salary First', description: 'Show employee names and salaries, highest salary first.', initialQuery: '-- Show highest salaries first\n', expectedAnswer: 'SELECT first_name, last_name, salary FROM employees ORDER BY salary DESC;', hint: 'Use ORDER BY salary DESC.', setupSQL: '' },
      { id: 'orderby-3', title: 'Products by Price', description: 'List product names and prices from cheapest to most expensive.', initialQuery: '-- Sort products by price\n', expectedAnswer: 'SELECT name, price FROM products ORDER BY price ASC;', hint: 'Use ORDER BY price ASC.', setupSQL: '' },
    ],
  },
];
