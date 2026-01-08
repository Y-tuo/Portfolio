import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
    end: number;
    suffix?: string;
    msPerIncrement?: number; // milliseconds per number increment
    maxDuration?: number; // maximum duration in ms
}

export const CountUp: React.FC<CountUpProps> = ({ end, suffix = '', msPerIncrement = 50, maxDuration = 5000 }) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        // Cap duration at maxDuration
        const totalDuration = Math.min(end * msPerIncrement, maxDuration);
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / totalDuration, 1);

            // Ease-out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(eased * end);

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end); // Ensure we end exactly at the target
            }
        };

        requestAnimationFrame(animate);
    }, [hasStarted, end, msPerIncrement]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
};
