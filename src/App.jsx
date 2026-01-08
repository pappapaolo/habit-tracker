import React, { useEffect, useRef } from 'react';
import Dot from './components/Dot';
import { useHabitData } from './hooks/useHabitData';

function App() {
  const { habits, habitData, toggleHabit, totalDays } = useHabitData();
  const gridRef = useRef(null);

  // Global Ripple Effect
  const triggerRipple = (x, y, color) => {
    const dots = document.querySelectorAll('.dot');
    const maxDist = Math.max(window.innerWidth, window.innerHeight);

    dots.forEach(dot => {
      const rect = dot.getBoundingClientRect();
      const dotX = rect.left + rect.width / 2;
      const dotY = rect.top + rect.height / 2;
      const dist = Math.sqrt(Math.pow(dotX - x, 2) + Math.pow(dotY - y, 2));

      // Delay based on distance (speed of wave)
      const delay = dist * 1.5; // ms per pixel

      // We use a custom animation on the element
      // Ideally we don't want to re-render React, just manipulate DOM styling
      if (dist < 800) { // Limit ripple radius for perf
        setTimeout(() => {
          dot.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.15)' },
            { transform: 'scale(1)' }
          ], {
            duration: 300,
            easing: 'ease-out'
          });
        }, delay);
      }
    });
  };

  // Create an array of Days, each containing the data for all 7 habits
  const days = Array.from({ length: totalDays }, (_, dayIndex) => {
    return habits.map(habit => ({
      habit,
      filled: habitData[habit.id] ? habitData[habit.id][dayIndex] : false,
      dayIndex
    }));
  });

  return (
    <div className="app-container">
      <header>
        <h1>MY 12-WEEK HABITS</h1>
      </header>
      <main className="rainbow-grid" ref={gridRef}>
        {days.map((dayHabits, dayIdx) => (
          <div key={dayIdx} className="day-group">
            {/* Optional: Add Week Number label every 7 days? 
                Or purely visual "Rainbow Row" */}
            {dayHabits.map(({ habit, filled, dayIndex }) => (
              <Dot
                key={`${habit.id}-${dayIndex}`}
                filled={filled}
                color={habit.color}
                animation={habit.animation}
                onClick={(e) => {
                  toggleHabit(habit.id, dayIndex);
                  // Get click coordinates for ripple
                  const rect = e.target.getBoundingClientRect();
                  triggerRipple(rect.left + rect.width / 2, rect.top + rect.height / 2, habit.color);
                }}
              />
            ))}
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
