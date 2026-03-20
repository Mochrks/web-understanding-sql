import { useState, useCallback, useEffect } from 'react';
import { CompletionStatus } from '@/types/sql-topics';

const STORAGE_KEY = 'sql-learning-progress';

export const useProgress = () => {
  const [progress, setProgress] = useState<CompletionStatus>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markTheoryRead = useCallback((topicId: string) => {
    setProgress(prev => ({
      ...prev,
      [topicId]: {
        ...prev[topicId],
        theoryRead: true,
        exercisesCompleted: prev[topicId]?.exercisesCompleted || [],
      },
    }));
  }, []);

  const markExerciseCompleted = useCallback((topicId: string, exerciseId: string) => {
    setProgress(prev => {
      const current = prev[topicId] || { theoryRead: false, exercisesCompleted: [] };
      if (current.exercisesCompleted.includes(exerciseId)) return prev;
      return {
        ...prev,
        [topicId]: {
          ...current,
          exercisesCompleted: [...current.exercisesCompleted, exerciseId],
        },
      };
    });
  }, []);

  const isTheoryRead = useCallback((topicId: string) => {
    return progress[topicId]?.theoryRead || false;
  }, [progress]);

  const isExerciseCompleted = useCallback((topicId: string, exerciseId: string) => {
    return progress[topicId]?.exercisesCompleted?.includes(exerciseId) || false;
  }, [progress]);

  const getTopicProgress = useCallback((topicId: string, totalExercises: number) => {
    const tp = progress[topicId];
    if (!tp) return 0;
    const theoryWeight = tp.theoryRead ? 1 : 0;
    const exerciseWeight = totalExercises > 0 ? tp.exercisesCompleted.length / totalExercises : 0;
    return Math.round(((theoryWeight * 0.3) + (exerciseWeight * 0.7)) * 100);
  }, [progress]);

  const getTotalProgress = useCallback((allTopicIds: { id: string; exerciseCount: number }[]) => {
    if (allTopicIds.length === 0) return 0;
    const totalProgress = allTopicIds.reduce((sum, t) => sum + getTopicProgress(t.id, t.exerciseCount), 0);
    return Math.round(totalProgress / allTopicIds.length);
  }, [getTopicProgress]);

  const resetProgress = useCallback(() => {
    setProgress({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    progress,
    markTheoryRead,
    markExerciseCompleted,
    isTheoryRead,
    isExerciseCompleted,
    getTopicProgress,
    getTotalProgress,
    resetProgress,
  };
};
