import { Title } from '@/components/demo/Title';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { MoonStar, SunMoon } from 'lucide-react';


const devData = [
    {
        name: 'Basic SQL Concepts',
        description: 'Learn the foundational concepts of SQL, including database types and SQL syntax.',
        route: '/basic-sql-concepts'
    },
    {
        name: 'Data Manipulation Language (DML)',
        description: 'Master the use of SELECT, INSERT, UPDATE, and DELETE statements to manipulate data in databases.',
        route: '/data-manipulation-language'
    },
    {
        name: 'Data Definition Language (DDL)',
        description: 'Understand how to create, modify, and delete database structures using DDL commands.',
        route: '/data-definition-language'
    },
    {
        name: 'Database Design',
        description: 'Explore normalization and ER modeling to design efficient and effective database schemas.',
        route: '/database-design'
    },
    {
        name: 'Advanced SQL Queries',
        description: 'Learn to write complex queries using joins, subqueries, and set operations.',
        route: '/advanced-sql-queries'
    },
    {
        name: 'Aggregation and Grouping',
        description: 'Utilize aggregate functions and GROUP BY clauses to summarize data effectively.',
        route: '/aggregation-grouping'
    },
    {
        name: 'Indexes and Performance Tuning',
        description: 'Understand how to use indexes for performance optimization and query tuning techniques.',
        route: '/indexes-performance-tuning'
    },
    {
        name: 'Transactions and Concurrency Control',
        description: 'Learn about ACID properties and how to manage transactions and concurrency in databases.',
        route: '/transactions-concurrency-control'
    },
    {
        name: 'Stored Procedures and Functions',
        description: 'Master the creation and use of stored procedures and user-defined functions in SQL.',
        route: '/stored-procedures-functions'
    },
    {
        name: 'Triggers and Events',
        description: 'Understand how to implement triggers and schedule events for automatic database actions.',
        route: '/triggers-events'
    },
    {
        name: 'Security and Permissions',
        description: 'Learn best practices for securing databases and managing user permissions effectively.',
        route: '/security-permissions'
    },
    {
        name: 'Backup and Recovery',
        description: 'Explore strategies for backing up and restoring databases to ensure data integrity.',
        route: '/backup-recovery'
    },
    {
        name: 'Working with NoSQL and New SQL Technologies',
        description: 'Understand the differences between SQL and NoSQL databases and explore new SQL approaches.',
        route: '/nosql-new-sql'
    },
    {
        name: 'Big Data and SQL',
        description: 'Learn how SQL is used in big data technologies and frameworks for data analysis.',
        route: '/big-data-sql'
    },
    {
        name: 'Real-World Application and Projects',
        description: 'Apply your SQL knowledge by building real-world projects and contributing to open-source initiatives.',
        route: '/real-world-applications'
    }
];



export const Home = () => {
    const { theme, toggleTheme } = useTheme();

    const renderCards = (data) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-auto">
            {data.map((item) => (
                <div key={item.route} className="bg-card p-5 border rounded-lg shadow-md w-full">
                    <h3 className="text-lg font-bold text-card-foreground">{item.name}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                    <Link to={item.route} className="mt-2 inline-block">
                        <Button>View Details</Button>
                    </Link>
                </div>
            ))}
        </div>
    );

    return (
        <div className="container h-full py-10">
            <div className="flex py-5 mb-10 justify-between items-center">
                <Title name="SQL Developers" />
                <Button variant="outline" onClick={toggleTheme} className="h-10">
                    {theme === 'dark' ? <MoonStar /> : <SunMoon />}
                </Button>
            </div>

            <section className="mb-10">
                <h2 className="text-2xl font-bold py-10">SQL Topics </h2>
                {renderCards(devData)}
            </section>


        </div>
    );
};

export default Home;