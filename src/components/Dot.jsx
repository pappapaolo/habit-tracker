import React, { useCallback, useState } from 'react';
import confetti from 'canvas-confetti';

const Dot = ({ filled, color, animation, onClick }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = useCallback((e) => {
        if (!filled) {
            setIsAnimating(true);
            // Reset animation class after it plays
            setTimeout(() => setIsAnimating(false), 600);

            // Animation specific logic that needs js (like confetti)
            if (animation === 'explode') {
                const rect = e.target.getBoundingClientRect();
                const x = (rect.left + rect.width / 2) / window.innerWidth;
                const y = (rect.top + rect.height / 2) / window.innerHeight;
                const colorHex = getComputedStyle(document.documentElement).getPropertyValue(color.replace('var(', '').replace(')', '')).trim() || '#ffffff';

                confetti({
                    particleCount: 40,
                    spread: 60,
                    origin: { x, y },
                    colors: [colorHex],
                    disableForReducedMotion: true,
                    zIndex: 1000,
                    ticks: 200,
                    gravity: 1.2,
                    scalar: 0.8,
                    drift: 0,
                });
            }
        }
        onClick();
    }, [filled, color, animation, onClick]);

    return (
        <button
            className={`dot ${filled ? 'filled' : ''} ${isAnimating ? `anim-${animation}` : ''}`}
            onClick={handleClick}
            style={{
                '--dot-color': color,
            }}
            aria-label={filled ? "Mark as undo" : "Mark as done"}
        />
    );
};

export default Dot;
