import { SQLTopic } from '@/types/sql-topics';

export const sqlTutorialJoins: SQLTopic[] = [
  {
    id: 'sql-joins', slug: 'sql-joins', title: 'SQL Joins', category: 'SQL Tutorial', icon: 'JOI',
    description: 'Combine rows from two or more tables based on related columns.',
    theory: `# SQL Joins\n\nA JOIN clause combines rows from two or more tables based on a related column between them.\n\n## Types of Joins\n| Type | Description |\n|------|------------|\n| INNER JOIN | Returns matching rows from both tables |\n| LEFT JOIN | Returns all rows from left table + matching from right |\n| RIGHT JOIN | Returns all rows from right table + matching from left |\n| FULL JOIN | Returns all rows when there is a match in either table |\n| SELF JOIN | Joins a table to itself |`,
    syntaxExample: `SELECT orders.id, customers.first_name, orders.total_amount\nFROM orders\nINNER JOIN customers ON orders.customer_id = customers.id;`,
    exercises: [
      { id: 'joins-1', title: 'Orders with Customers', description: 'Join orders with customers to show customer name and order amount.', initialQuery: '', expectedAnswer: 'SELECT c.first_name, c.last_name, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.id;', hint: 'JOIN orders and customers ON customer_id = customers.id', setupSQL: '' },
      { id: 'joins-2', title: 'Order Items Detail', description: 'Join order_items with products to show product name and quantity.', initialQuery: '', expectedAnswer: 'SELECT p.name, oi.quantity, oi.unit_price FROM order_items oi INNER JOIN products p ON oi.product_id = p.id;', hint: 'JOIN order_items with products ON product_id.', setupSQL: '' },
      { id: 'joins-3', title: 'Product Suppliers', description: 'Join products with suppliers to show product name and supplier name.', initialQuery: '', expectedAnswer: 'SELECT p.name AS product, s.name AS supplier FROM products p INNER JOIN suppliers s ON p.supplier_id = s.id;', hint: 'JOIN products with suppliers ON supplier_id.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-inner-join', slug: 'sql-inner-join', title: 'SQL INNER JOIN', category: 'SQL Tutorial', icon: 'INR',
    description: 'Return records with matching values in both tables.',
    theory: `# SQL INNER JOIN\n\nThe INNER JOIN selects records that have **matching values in both tables**.\n\n## Syntax\n\`\`\`sql\nSELECT columns FROM table1\nINNER JOIN table2 ON table1.column = table2.column;\n\`\`\`\n\n## Key Points\n- Only returns rows where the join condition is met in both tables\n- Most common type of join\n- Also called just "JOIN"`,
    syntaxExample: `SELECT e.first_name, e.salary, d.name AS dept_name\nFROM employees e\nINNER JOIN departments d ON e.department = d.name;`,
    exercises: [
      { id: 'inner-1', title: 'Employee Departments', description: 'INNER JOIN employees with departments to show employee name and department location.', initialQuery: '', expectedAnswer: "SELECT e.first_name, e.last_name, d.location FROM employees e INNER JOIN departments d ON e.department = d.name;", hint: 'JOIN ON e.department = d.name.', setupSQL: '' },
      { id: 'inner-2', title: 'Customer Orders', description: 'Show customer first_name and their order total_amount using INNER JOIN.', initialQuery: '', expectedAnswer: 'SELECT c.first_name, o.total_amount, o.order_date FROM customers c INNER JOIN orders o ON c.id = o.customer_id;', hint: 'JOIN customers with orders on id = customer_id.', setupSQL: '' },
      { id: 'inner-3', title: 'Order Products', description: 'Show order_id, product name, and quantity from order_items joined with products.', initialQuery: '', expectedAnswer: 'SELECT oi.order_id, p.name, oi.quantity FROM order_items oi INNER JOIN products p ON oi.product_id = p.id;', hint: 'JOIN order_items with products.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-left-join', slug: 'sql-left-join', title: 'SQL LEFT JOIN', category: 'SQL Tutorial', icon: 'LFT',
    description: 'Return all records from the left table and matched records from right.',
    theory: `# SQL LEFT JOIN\n\nThe LEFT JOIN returns **all records from the left table** and the matched records from the right table. NULL if no match.\n\n## Syntax\n\`\`\`sql\nSELECT columns FROM table1\nLEFT JOIN table2 ON table1.col = table2.col;\n\`\`\``,
    syntaxExample: `SELECT c.first_name, o.total_amount\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id;`,
    exercises: [
      { id: 'left-1', title: 'All Customers Orders', description: 'LEFT JOIN customers with orders to show ALL customers, even without orders.', initialQuery: '', expectedAnswer: 'SELECT c.first_name, c.last_name, o.total_amount FROM customers c LEFT JOIN orders o ON c.id = o.customer_id;', hint: 'Use LEFT JOIN to keep all customers.', setupSQL: '' },
      { id: 'left-2', title: 'All Products Suppliers', description: 'LEFT JOIN products with suppliers.', initialQuery: '', expectedAnswer: 'SELECT p.name AS product, s.name AS supplier FROM products p LEFT JOIN suppliers s ON p.supplier_id = s.id;', hint: 'LEFT JOIN products with suppliers.', setupSQL: '' },
      { id: 'left-3', title: 'Employees with Managers', description: 'LEFT JOIN employees with themselves to show employee and manager names.', initialQuery: '', expectedAnswer: 'SELECT e.first_name AS employee, m.first_name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;', hint: 'Self-join: employees e LEFT JOIN employees m ON e.manager_id = m.id.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-right-join', slug: 'sql-right-join', title: 'SQL RIGHT JOIN', category: 'SQL Tutorial', icon: 'RGT',
    description: 'Return all records from right table and matched from left.',
    theory: `# SQL RIGHT JOIN\n\nRIGHT JOIN returns **all records from the right table** and matched records from the left. NULL if no match.\n\n## Note\nSQLite does NOT support RIGHT JOIN natively. You can simulate it by swapping tables and using LEFT JOIN.\n\n## Syntax\n\`\`\`sql\nSELECT columns FROM table1\nRIGHT JOIN table2 ON table1.col = table2.col;\n-- In SQLite, swap and use LEFT JOIN:\nSELECT columns FROM table2\nLEFT JOIN table1 ON table1.col = table2.col;\n\`\`\``,
    syntaxExample: `-- Simulated RIGHT JOIN in SQLite\nSELECT s.name AS supplier, p.name AS product\nFROM suppliers s\nLEFT JOIN products p ON s.id = p.supplier_id;`,
    exercises: [
      { id: 'right-1', title: 'All Suppliers Products', description: 'Show all suppliers and their products (even suppliers with no products). Use LEFT JOIN with suppliers as left table.', initialQuery: '', expectedAnswer: 'SELECT s.name AS supplier, p.name AS product FROM suppliers s LEFT JOIN products p ON s.id = p.supplier_id;', hint: 'Swap the tables and use LEFT JOIN.', setupSQL: '' },
      { id: 'right-2', title: 'All Departments Employees', description: 'Show all departments and employees in them (use LEFT JOIN from departments).', initialQuery: '', expectedAnswer: 'SELECT d.name AS department, e.first_name FROM departments d LEFT JOIN employees e ON d.name = e.department;', hint: 'LEFT JOIN from departments to employees.', setupSQL: '' },
      { id: 'right-3', title: 'Orders with All Customers', description: 'Show all customers and their order count.', initialQuery: '', expectedAnswer: 'SELECT c.first_name, COUNT(o.id) AS order_count FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.first_name;', hint: 'LEFT JOIN and GROUP BY customer.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-full-join', slug: 'sql-full-join', title: 'SQL FULL JOIN', category: 'SQL Tutorial', icon: 'FUL',
    description: 'Return all records when match exists in either table.',
    theory: `# SQL FULL OUTER JOIN\n\nFULL OUTER JOIN returns **all records** from both tables, with NULLs where there is no match.\n\n## Note\nSQLite does not directly support FULL OUTER JOIN. Simulate with UNION of LEFT and RIGHT joins.\n\n## Simulated Syntax\n\`\`\`sql\nSELECT * FROM t1 LEFT JOIN t2 ON t1.id = t2.t1_id\nUNION\nSELECT * FROM t2 LEFT JOIN t1 ON t1.id = t2.t1_id;\n\`\`\``,
    syntaxExample: `-- Simulated FULL JOIN: all customers and all orders\nSELECT c.first_name, o.total_amount\nFROM customers c LEFT JOIN orders o ON c.id = o.customer_id\nUNION\nSELECT c.first_name, o.total_amount\nFROM orders o LEFT JOIN customers c ON c.id = o.customer_id;`,
    exercises: [
      { id: 'full-1', title: 'All Customers & Orders', description: 'Simulate a FULL JOIN between customers and orders using UNION.', initialQuery: '', expectedAnswer: "SELECT c.first_name, o.total_amount FROM customers c LEFT JOIN orders o ON c.id = o.customer_id UNION SELECT c.first_name, o.total_amount FROM orders o LEFT JOIN customers c ON c.id = o.customer_id;", hint: 'Use UNION with two LEFT JOINs.', setupSQL: '' },
      { id: 'full-2', title: 'Full Suppliers Products', description: 'Simulate FULL JOIN between suppliers and products.', initialQuery: '', expectedAnswer: "SELECT s.name AS supplier, p.name AS product FROM suppliers s LEFT JOIN products p ON s.id = p.supplier_id UNION SELECT s.name AS supplier, p.name AS product FROM products p LEFT JOIN suppliers s ON s.id = p.supplier_id;", hint: 'Union two LEFT JOINs with swapped tables.', setupSQL: '' },
      { id: 'full-3', title: 'Full Dept Employees', description: 'Simulate FULL JOIN between departments and employees.', initialQuery: '', expectedAnswer: "SELECT d.name AS dept, e.first_name FROM departments d LEFT JOIN employees e ON d.name = e.department UNION SELECT d.name AS dept, e.first_name FROM employees e LEFT JOIN departments d ON d.name = e.department;", hint: 'UNION of LEFT JOINs from both directions.', setupSQL: '' },
    ],
  },
  {
    id: 'sql-self-join', slug: 'sql-self-join', title: 'SQL Self Join', category: 'SQL Tutorial', icon: 'SLF',
    description: 'Join a table with itself.',
    theory: `# SQL Self Join\n\nA self join is a regular join, but the table is joined **with itself**. You must use table aliases.\n\n## Syntax\n\`\`\`sql\nSELECT a.col, b.col FROM table a, table b WHERE condition;\n-- Or:\nSELECT a.col, b.col FROM table a\nJOIN table b ON a.col = b.col;\n\`\`\`\n\n## Common Use\n- Employee-Manager relationships\n- Comparing rows within the same table`,
    syntaxExample: `-- Employee and their manager\nSELECT e.first_name AS employee, m.first_name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;`,
    exercises: [
      { id: 'self-1', title: 'Employee Manager', description: 'Show each employee name and their manager name using self join.', initialQuery: '', expectedAnswer: "SELECT e.first_name AS employee, m.first_name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id;", hint: 'Join employees with itself on manager_id.', setupSQL: '' },
      { id: 'self-2', title: 'Same Department Pairs', description: 'Find pairs of employees in the same department (different employees).', initialQuery: '', expectedAnswer: "SELECT a.first_name, b.first_name, a.department FROM employees a JOIN employees b ON a.department = b.department AND a.id < b.id;", hint: 'Self join where department matches and a.id < b.id.', setupSQL: '' },
      { id: 'self-3', title: 'Customers Same City', description: 'Find pairs of customers in the same city.', initialQuery: '', expectedAnswer: "SELECT a.first_name, b.first_name, a.city FROM customers a JOIN customers b ON a.city = b.city AND a.id < b.id;", hint: 'Self join on city with a.id < b.id.', setupSQL: '' },
    ],
  },
];
