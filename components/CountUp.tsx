import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
    end: number;
    suffix?: string;
    msPerIncrement?: number; // milliseconds per number increment
    maxDuration?: number; // maximum duration in ms
    minDuration?: number; // minimum duration in ms
    duration?: number; // explicit fixed duration in ms
}

export const CountUp: React.FC<CountUpProps> = ({ end, suffix = '', msPerIncrement = 50, maxDuration = 5000, minDuration = 1000, duration }) => {
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

        // Calculate duration: explicit duration OR calculated (at least minDuration, at most maxDuration)
        let totalDuration = duration;
        if (!totalDuration) {
            const calculatedDuration = end * msPerIncrement;
            totalDuration = Math.max(Math.min(calculatedDuration, maxDuration), minDuration);
        }
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / totalDuration, 1);

            // Determine easing based on magnitude
            // "3 digits or less uses ordinary (cubic), >3 digits (interpreted as >=100 here since 100 is 3 digits) uses quintic"
            // Wait, "3位数以下" = < 3 digits. So 100 (3 digits) is >= 3 digits.
            // User: "超过3位数之后才会是... 3位数以下...".Strictly > 999 vs < 100.
            // However, 100 is the only big number. Let's assume >= 100 gets the special treatment for now.
            const useQuintic = end >= 100;

            const eased = useQuintic
                ? 1 - Math.pow(1 - progress, 5) // Quintic for large numbers
                : 1 - Math.pow(1 - progress, 3); // Cubic for small numbers

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
