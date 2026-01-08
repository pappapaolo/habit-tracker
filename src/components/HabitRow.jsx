import React from 'react';
import Dot from './Dot';

const HabitRow = ({ habit, data, onToggle }) => {
    // Break data into 3 chunks of 28 days (4 weeks)
    // Total 84 days.
    const chunks = [];
    const chunkSize = 28;
    for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
    }

    return (
        <div className="habit-container">
            <div className="habit-header">
                <span className="habit-title" style={{ color: habit.color }}>
                    {habit.name}
                </span>
            </div>
            <div className="habit-grid-wrapper">
                {chunks.map((chunk, chunkIndex) => (
                    <div key={chunkIndex} className="habit-grid-row">
                        {chunk.map((filled, indexInChunk) => {
                            const globalIndex = chunkIndex * chunkSize + indexInChunk;
                            return (
                                <Dot
                                    key={globalIndex}
                                    filled={filled}
                                    color={habit.color}
                                    animation={habit.animation}
                                    onClick={() => onToggle(habit.id, globalIndex)}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HabitRow;
