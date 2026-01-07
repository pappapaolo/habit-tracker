import { useState, useEffect } from 'react';

const HABITS = [
  { id: 'h1', name: '3 pages per day', color: 'var(--color-red)' },
  { id: 'h2', name: 'Posture workout', color: 'var(--color-orange)' },
  { id: 'h3', name: 'Posting tiktoks', color: 'var(--color-yellow)' },
  { id: 'h4', name: 'Typing practice', color: 'var(--color-green)' },
  { id: 'h5', name: 'Coding mini project', color: 'var(--color-blue)' },
  { id: 'h6', name: 'Reading', color: 'var(--color-indigo)' },
  { id: 'h7', name: 'Journaling', color: 'var(--color-violet)' },
];

const WEEKS = 12;
const DAYS_PER_WEEK = 7;
const TOTAL_DAYS = WEEKS * DAYS_PER_WEEK;

export const useHabitData = () => {
  const [habitData, setHabitData] = useState(() => {
    const saved = localStorage.getItem('habit-tracker-data');
    if (saved) {
      return JSON.parse(saved);
    }
    // Initialize empty data
    const initialData = {};
    HABITS.forEach(habit => {
      initialData[habit.id] = new Array(TOTAL_DAYS).fill(false);
    });
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem('habit-tracker-data', JSON.stringify(habitData));
  }, [habitData]);

  const toggleHabit = (habitId, dayIndex) => {
    setHabitData(prev => {
      const newData = { ...prev };
      newData[habitId] = [...newData[habitId]];
      newData[habitId][dayIndex] = !newData[habitId][dayIndex];
      return newData;
    });
  };

  return { habits: HABITS, habitData, toggleHabit, totalDays: TOTAL_DAYS };
};
