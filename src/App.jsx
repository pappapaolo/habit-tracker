import React from 'react';
import HabitRow from './components/HabitRow';
import { useHabitData } from './hooks/useHabitData';

function App() {
  const { habits, habitData, toggleHabit } = useHabitData();

  return (
    <div className="app-container">
      <header>
        <h1>My 12-Week Habits</h1>
      </header>
      <main>
        {habits.map(habit => (
          <HabitRow
            key={habit.id}
            habit={habit}
            data={habitData[habit.id]}
            onToggle={toggleHabit}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
