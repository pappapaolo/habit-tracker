import React from 'react';
import Dot from './Dot';

const HabitRow = ({ habit, data, onToggle }) => {
    return (
        <div className="habit-row">
            <div className="habit-name" style={{ color: habit.color }}>
                {habit.name}
            </div>
            <div className="habit-grid">
                {data.map((filled, index) => (
                    <Dot
                        key={index}
                        filled={filled}
                        color={habit.color}
                        onClick={() => onToggle(habit.id, index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HabitRow;
