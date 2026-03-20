import { useState, useEffect, useCallback, useRef } from 'react';
import initSqlJs, { Database } from 'sql.js';

export interface QueryResult {
  columns: string[];
  values: (string | number | null | Uint8Array)[][];
}

export interface SQLEngineState {
  db: Database | null;
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
  results: QueryResult[];
  message: string;
  executeSQL: (sql: string) => void;
  resetDatabase: () => void;
  loadSampleData: () => void;
}

const SAMPLE_DATA_SQL = `
-- Create sample tables
CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  department TEXT,
  salary REAL,
  hire_date TEXT,
  manager_id INTEGER
);

CREATE TABLE IF NOT EXISTS departments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  location TEXT,
  budget REAL
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT,
  price REAL,
  stock INTEGER DEFAULT 0,
  supplier_id INTEGER
);

CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  city TEXT,
  country TEXT,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER,
  order_date TEXT,
  total_amount REAL,
  status TEXT DEFAULT 'pending',
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  unit_price REAL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  contact_name TEXT,
  phone TEXT,
  city TEXT,
  country TEXT
);

-- Insert sample data
INSERT INTO departments (name, location, budget) VALUES
  ('Engineering', 'Building A', 500000),
  ('Marketing', 'Building B', 300000),
  ('Sales', 'Building C', 400000),
  ('HR', 'Building A', 200000),
  ('Finance', 'Building D', 350000);

INSERT INTO employees (first_name, last_name, email, department, salary, hire_date, manager_id) VALUES
  ('John', 'Smith', 'john.smith@company.com', 'Engineering', 85000, '2020-01-15', NULL),
  ('Jane', 'Doe', 'jane.doe@company.com', 'Engineering', 92000, '2019-03-20', 1),
  ('Bob', 'Johnson', 'bob.johnson@company.com', 'Marketing', 65000, '2021-06-10', NULL),
  ('Alice', 'Williams', 'alice.williams@company.com', 'Sales', 70000, '2020-09-05', NULL),
  ('Charlie', 'Brown', 'charlie.brown@company.com', 'Engineering', 78000, '2022-02-14', 1),
  ('Diana', 'Miller', 'diana.miller@company.com', 'HR', 60000, '2018-11-30', NULL),
  ('Eve', 'Davis', 'eve.davis@company.com', 'Marketing', 72000, '2021-04-22', 3),
  ('Frank', 'Wilson', 'frank.wilson@company.com', 'Sales', 68000, '2023-01-08', 4),
  ('Grace', 'Taylor', 'grace.taylor@company.com', 'Finance', 88000, '2019-07-12', NULL),
  ('Henry', 'Anderson', 'henry.anderson@company.com', 'Engineering', 95000, '2018-05-01', 1),
  ('Ivy', 'Thomas', 'ivy.thomas@company.com', 'Marketing', 62000, '2023-03-15', 3),
  ('Jack', 'Jackson', 'jack.jackson@company.com', 'Sales', 75000, '2020-12-01', 4),
  ('Karen', 'White', 'karen.white@company.com', 'HR', 58000, '2022-08-20', 6),
  ('Leo', 'Harris', 'leo.harris@company.com', 'Finance', 82000, '2021-02-28', 9),
  ('Mia', 'Martin', 'mia.martin@company.com', 'Engineering', 90000, '2019-10-10', 1);

INSERT INTO suppliers (name, contact_name, phone, city, country) VALUES
  ('Tech Supplies Co', 'Tom Brown', '555-0101', 'New York', 'USA'),
  ('Global Parts Inc', 'Sarah Lee', '555-0102', 'London', 'UK'),
  ('Asia Components', 'Wei Zhang', '555-0103', 'Tokyo', 'Japan'),
  ('Euro Materials', 'Hans Mueller', '555-0104', 'Berlin', 'Germany'),
  ('Local Goods', 'Maria Garcia', '555-0105', 'Madrid', 'Spain');

INSERT INTO products (name, category, price, stock, supplier_id) VALUES
  ('Laptop Pro', 'Electronics', 1299.99, 50, 1),
  ('Wireless Mouse', 'Electronics', 29.99, 200, 1),
  ('USB-C Hub', 'Accessories', 49.99, 150, 2),
  ('Mechanical Keyboard', 'Electronics', 89.99, 100, 3),
  ('Monitor 27"', 'Electronics', 399.99, 30, 1),
  ('Desk Lamp', 'Office', 34.99, 75, 4),
  ('Ergonomic Chair', 'Furniture', 599.99, 20, 5),
  ('Webcam HD', 'Electronics', 79.99, 80, 2),
  ('Notebook Pack', 'Office', 12.99, 300, 4),
  ('Standing Desk', 'Furniture', 749.99, 15, 5);

INSERT INTO customers (first_name, last_name, email, city, country, created_at) VALUES
  ('Michael', 'Scott', 'michael@example.com', 'New York', 'USA', '2023-01-10'),
  ('Dwight', 'Schrute', 'dwight@example.com', 'Scranton', 'USA', '2023-02-15'),
  ('Jim', 'Halpert', 'jim@example.com', 'Philadelphia', 'USA', '2023-03-20'),
  ('Pam', 'Beesly', 'pam@example.com', 'Scranton', 'USA', '2023-04-25'),
  ('Ryan', 'Howard', 'ryan@example.com', 'New York', 'USA', '2023-05-30'),
  ('Angela', 'Martin', 'angela@example.com', 'London', 'UK', '2023-06-05'),
  ('Oscar', 'Martinez', 'oscar@example.com', 'Madrid', 'Spain', '2023-07-10'),
  ('Kevin', 'Malone', 'kevin@example.com', 'Tokyo', 'Japan', '2023-08-15');

INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES
  (1, '2024-01-15', 1349.98, 'completed'),
  (2, '2024-01-20', 89.98, 'completed'),
  (3, '2024-02-10', 599.99, 'shipped'),
  (1, '2024-02-28', 129.98, 'completed'),
  (4, '2024-03-05', 449.98, 'pending'),
  (5, '2024-03-10', 1299.99, 'shipped'),
  (6, '2024-03-15', 79.98, 'completed'),
  (2, '2024-03-20', 749.99, 'pending'),
  (7, '2024-04-01', 34.99, 'completed'),
  (8, '2024-04-10', 169.98, 'shipped');

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
  (1, 1, 1, 1299.99),
  (1, 3, 1, 49.99),
  (2, 2, 1, 29.99),
  (2, 4, 1, 59.99),
  (3, 7, 1, 599.99),
  (4, 2, 1, 29.99),
  (4, 8, 1, 79.99),
  (4, 9, 1, 12.99),
  (5, 5, 1, 399.99),
  (5, 3, 1, 49.99),
  (6, 1, 1, 1299.99),
  (7, 2, 1, 29.99),
  (7, 3, 1, 49.99),
  (8, 10, 1, 749.99),
  (9, 6, 1, 34.99),
  (10, 4, 1, 89.99),
  (10, 8, 1, 79.99);

-- Additional tables for specific exercises
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER,
  grade REAL,
  enrolled TEXT DEFAULT 'true'
);

CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  credits INTEGER DEFAULT 3
);

CREATE TABLE IF NOT EXISTS enrollments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER,
  course_id INTEGER,
  grade REAL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  user_id INTEGER,
  content TEXT
);

CREATE TABLE IF NOT EXISTS users_fk (
  id INTEGER PRIMARY KEY,
  name TEXT
);

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS books (
  isbn TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT
);

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  priority INTEGER DEFAULT 3
);

CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT, price REAL);
CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);

-- Pre-seed some exercise data
INSERT INTO students (name, age, grade) VALUES ('Alice Smith', 20, 3.8), ('Bob Jones', 22, 3.2), ('Charlie Black', 21, 3.5);
INSERT INTO courses (title, credits) VALUES ('CS101', 4), ('MATH202', 3), ('PHY303', 4);
INSERT INTO users_fk (id, name) VALUES (1, 'Alice'), (2, 'Bob');
INSERT INTO posts (title, user_id, content) VALUES ('Hello World', 1, 'My first post'), ('SQL is Fun', 1, 'Learning joins');
INSERT INTO members (name, email) VALUES ('Alice', 'alice@test.com'), ('Bob', 'bob@test.com');
INSERT INTO tasks (title, status) VALUES ('Buy groceries', 'pending'), ('Clean room', 'completed');
INSERT INTO items (name, price) VALUES ('Pencil', 0.5), ('Notebook', 2.5);
`;

export const useSQLEngine = (): SQLEngineState => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<QueryResult[]>([]);
  const [message, setMessage] = useState('');
  const dbRef = useRef<Database | null>(null);

  const initDB = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const SQL = await initSqlJs({
        locateFile: () => `/sql-wasm.wasm`
      });
      const db = new SQL.Database();
      dbRef.current = db;
      setIsReady(true);
      setMessage('Database initialized successfully!');
    } catch (err) {
      setError(`Failed to initialize SQL engine: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initDB();
    return () => {
      if (dbRef.current) {
        dbRef.current.close();
        dbRef.current = null;
      }
    };
  }, [initDB]);

  const executeSQL = useCallback((sql: string) => {
    if (!dbRef.current) {
      setError('Database not initialized');
      return;
    }

    try {
      setError(null);
      const stmts = sql.trim();
      if (!stmts) {
        setError('Please enter a SQL query');
        return;
      }

      const res = dbRef.current.exec(stmts);
      
      if (res.length > 0) {
        setResults(res.map(r => ({
          columns: r.columns,
          values: r.values
        })));
        const totalRows = res.reduce((sum, r) => sum + r.values.length, 0);
        setMessage(`Query executed successfully. ${totalRows} row(s) returned.`);
      } else {
        setResults([]);
        setMessage('Query executed successfully. No rows returned.');
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setError(errMsg);
      setResults([]);
      setMessage('');
    }
  }, []);

  const resetDatabase = useCallback(async () => {
    if (dbRef.current) {
      dbRef.current.close();
      dbRef.current = null;
    }
    setResults([]);
    setMessage('');
    setError(null);
    await initDB();
  }, [initDB]);

  const loadSampleData = useCallback(() => {
    if (!dbRef.current) {
      setError('Database not initialized');
      return;
    }
    try {
      setError(null);
      dbRef.current.exec(SAMPLE_DATA_SQL);
      setMessage('Database ready with tables: employees, departments, products, customers, orders, order_items, suppliers, students, courses, etc.');
      setResults([]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setError(`Failed to load sample data: ${errMsg}`);
    }
  }, []);

  return {
    db: dbRef.current,
    isReady,
    isLoading,
    error,
    results,
    message,
    executeSQL,
    resetDatabase,
    loadSampleData,
  };
};
