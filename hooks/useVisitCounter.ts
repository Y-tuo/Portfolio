import { useState, useEffect } from 'react';

const STORAGE_KEYS = {
    visitCount: 'portfolio_visit_count',
    sessionVisited: 'portfolio_session_visited',
};

const API_URL = '/api/visit';
const DEFAULT_COUNT = 88;

interface CounterState {
    count: number;
    loading: boolean;
    error: string | null;
}

// 辅助函数：从 localStorage 获取计数
const getLocalCount = (): number => {
    const stored = localStorage.getItem(STORAGE_KEYS.visitCount);
    const count = stored ? parseInt(stored, 10) : DEFAULT_COUNT;
    return isNaN(count) || count < 0 ? DEFAULT_COUNT : count;
};

// 辅助函数：保存计数到 localStorage
const saveLocalCount = (count: number): void => {
    localStorage.setItem(STORAGE_KEYS.visitCount, count.toString());
};

/**
 * 访问计数器 Hook
 * - 每个浏览器会话只计数一次
 * - 优先使用服务端 API，失败时回退到本地存储
 */
export function useVisitCounter(): CounterState {
    const [state, setState] = useState<CounterState>({
        count: 0,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const updateCount = async () => {
            const isNewSession = !sessionStorage.getItem(STORAGE_KEYS.sessionVisited);
            const method = isNewSession ? 'POST' : 'GET';

            try {
                const response = await fetch(API_URL, {
                    method,
                    headers: isNewSession ? { 'Content-Type': 'application/json' } : undefined,
                });

                if (response.ok) {
                    const { count } = await response.json();
                    if (isNewSession) {
                        sessionStorage.setItem(STORAGE_KEYS.sessionVisited, 'true');
                    }
                    saveLocalCount(count);
                    setState({ count, loading: false, error: null });
                    return;
                }
            } catch (error) {
                console.warn('API failed, using local storage:', error);
            }

            // API 失败时使用本地计数
            let count = getLocalCount();
            if (isNewSession) {
                count += 1;
                saveLocalCount(count);
                sessionStorage.setItem(STORAGE_KEYS.sessionVisited, 'true');
            }
            setState({ count, loading: false, error: null });
        };

        updateCount();
    }, []);

    return state;
}
