import { useState, useEffect } from 'react';

const HABITS = [
  { id: 'h1', name: '3 pages', color: 'var(--color-red)' },
  { id: 'h2', name: 'Posture', color: 'var(--color-orange)' },
  { id: 'h3', name: 'Tiktok', color: 'var(--color-yellow)' },
  { id: 'h4', name: 'Typing', color: 'var(--color-green)' },
  { id: 'h5', name: 'Coding', color: 'var(--color-blue)' },
  { id: 'h6', name: 'Reading', color: 'var(--color-indigo)' },
  { id: 'h7', name: 'Journal', color: 'var(--color-violet)' },
];

const WEEKS = 3;
const DAYS_PER_WEEK = 7;
const TOTAL_DAYS = WEEKS * DAYS_PER_WEEK;

export const useHabitData = () => {
  const [habitData, setHabitData] = useState(() => {
    const saved = localStorage.getItem('habit-tracker-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate length. If config changed (e.g. weeks changed), reset or adjust.
      // For simplicity, if any habit's data length differs from TOTAL_DAYS, reset.
      const isValid = Object.values(parsed).every(d => d.length === TOTAL_DAYS);
      if (isValid) return parsed;
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
