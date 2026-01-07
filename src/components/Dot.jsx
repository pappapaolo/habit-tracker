import React, { useCallback } from 'react';
import confetti from 'canvas-confetti';

const Dot = ({ filled, color, onClick }) => {
    const handleClick = useCallback((e) => {
        if (!filled) {
            // Trigger confetti from the element's position
            const rect = e.target.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 30,
                spread: 50,
                origin: { x, y },
                colors: [getComputedStyle(document.documentElement).getPropertyValue(color.replace('var(', '').replace(')', '')).trim() || '#ffffff'],
                disableForReducedMotion: true,
                zIndex: 1000,
            });
        }
        onClick();
    }, [filled, color, onClick]);

    return (
        <button
            className={`dot ${filled ? 'filled' : ''}`}
            onClick={handleClick}
            style={{
                '--dot-color': color,
            }}
            aria-label={filled ? "Mark as undo" : "Mark as done"}
        />
    );
};

export default Dot;
