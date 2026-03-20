import { SQLCategory } from '@/types/sql-topics';
import { sqlTutorialBasics } from './sql-tutorial-basics';
import { sqlTutorialLogic } from './sql-tutorial-logic';
import { sqlTutorialAggregates } from './sql-tutorial-aggregates';
import { sqlTutorialJoins } from './sql-tutorial-joins';
import { sqlTutorialAdvanced } from './sql-tutorial-advanced';
import { sqlDatabaseTopics, sqlDatabaseTopics2 } from './sql-database-topics';
import { sqlReferenceTopics } from './sql-reference-topics';

export const sqlCategories: SQLCategory[] = [
  {
    id: 'sql-tutorial',
    name: 'SQL Tutorial',
    description: 'Learn SQL from basics to advanced queries',
    icon: '📚',
    color: 'from-blue-500 to-cyan-500',
    topics: [
      ...sqlTutorialBasics,
      ...sqlTutorialLogic,
      ...sqlTutorialAggregates,
      ...sqlTutorialJoins,
      ...sqlTutorialAdvanced,
    ],
  },
  {
    id: 'sql-database',
    name: 'SQL Database',
    description: 'Database management, tables, and constraints',
    icon: '🗄️',
    color: 'from-purple-500 to-pink-500',
    topics: [
      ...sqlDatabaseTopics,
      ...sqlDatabaseTopics2,
    ],
  },
  {
    id: 'sql-references',
    name: 'SQL References',
    description: 'Quick reference for SQL data types and keywords',
    icon: '📖',
    color: 'from-emerald-500 to-teal-500',
    topics: sqlReferenceTopics,
  },
];

export const getAllTopics = () => {
  return sqlCategories.flatMap(cat => cat.topics);
};

export const getTopicBySlug = (slug: string) => {
  return getAllTopics().find(t => t.slug === slug);
};

export const getCategoryByTopicSlug = (slug: string) => {
  return sqlCategories.find(cat => cat.topics.some(t => t.slug === slug));
};

export const getTotalExercises = () => {
  return getAllTopics().reduce((sum, t) => sum + t.exercises.length, 0);
};
