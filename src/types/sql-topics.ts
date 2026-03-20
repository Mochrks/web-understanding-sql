export interface SQLExercise {
  id: string;
  title: string;
  description: string;
  initialQuery: string;
  expectedAnswer: string;
  hint: string;
  setupSQL?: string;
}

export interface SQLTopic {
  id: string;
  slug: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  theory: string;
  syntaxExample: string;
  exercises: SQLExercise[];
}

export interface SQLCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  topics: SQLTopic[];
}

export type CompletionStatus = {
  [topicId: string]: {
    theoryRead: boolean;
    exercisesCompleted: string[];
  };
};
