import { useState, useEffect } from 'react';

export const useVisitCounter = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        const fetchVisits = async () => {
            setLoading(true);
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Simulate a number, or use localStorage for persistence if desired.
                // For now, let's return a simulated cumulative number + random increment.
                const simulatedCount = 1234 + Math.floor(Math.random() * 100);
                setCount(simulatedCount);
            } catch (error) {
                console.error("Failed to fetch visit count", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVisits();
    }, []);

    return { count, loading };
};
