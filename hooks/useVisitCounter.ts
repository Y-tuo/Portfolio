import { useState, useEffect } from 'react';

// 本地存储键
const STORAGE_KEYS = {
    visitCount: 'portfolio_visit_count',
    sessionVisited: 'portfolio_session_visited',
};

// API 端点（Vercel Serverless Function）
const API_URL = '/api/visit';

interface CounterState {
    count: number;
    loading: boolean;
    error: string | null;
}

/**
 * 访问计数器 Hook
 * 
 * 工作原理:
 * 1. 首次加载时，尝试从 API 获取全局访问计数
 * 2. 如果是本次会话的首次访问（使用 sessionStorage 判断），则增加计数
 * 3. 如果 API 不可用，回退到 localStorage 本地计数
 * 
 * 计数规则:
 * - 每个浏览器会话只计数一次（防止刷新重复计数）
 * - 使用服务端 API 实现全局统一计数
 */
export function useVisitCounter(): CounterState {
    const [state, setState] = useState<CounterState>({
        count: 0,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const updateVisitCount = async () => {
            try {
                // 检查是否是本次会话的首次访问
                const sessionVisited = sessionStorage.getItem(STORAGE_KEYS.sessionVisited);

                if (!sessionVisited) {
                    // 本次会话首次访问，增加计数
                    try {
                        const response = await fetch(API_URL, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                        });

                        if (response.ok) {
                            const data = await response.json();
                            sessionStorage.setItem(STORAGE_KEYS.sessionVisited, 'true');
                            localStorage.setItem(STORAGE_KEYS.visitCount, data.count.toString());

                            setState({
                                count: data.count,
                                loading: false,
                                error: null,
                            });
                            return;
                        }
                    } catch (apiError) {
                        console.warn('API call failed, falling back to local storage:', apiError);
                    }

                    // API 失败时回退到本地计数
                    const storedCount = localStorage.getItem(STORAGE_KEYS.visitCount);
                    let currentCount = storedCount ? parseInt(storedCount, 10) : 88; // 初始值设为 88
                    if (isNaN(currentCount) || currentCount < 0) currentCount = 88;

                    currentCount += 1;
                    localStorage.setItem(STORAGE_KEYS.visitCount, currentCount.toString());
                    sessionStorage.setItem(STORAGE_KEYS.sessionVisited, 'true');

                    setState({
                        count: currentCount,
                        loading: false,
                        error: null,
                    });
                } else {
                    // 已经访问过，只获取当前计数
                    try {
                        const response = await fetch(API_URL);
                        if (response.ok) {
                            const data = await response.json();
                            localStorage.setItem(STORAGE_KEYS.visitCount, data.count.toString());

                            setState({
                                count: data.count,
                                loading: false,
                                error: null,
                            });
                            return;
                        }
                    } catch (apiError) {
                        console.warn('API call failed, using cached count:', apiError);
                    }

                    // API 失败时使用缓存的计数
                    const storedCount = localStorage.getItem(STORAGE_KEYS.visitCount);
                    const currentCount = storedCount ? parseInt(storedCount, 10) : 88;

                    setState({
                        count: isNaN(currentCount) ? 88 : currentCount,
                        loading: false,
                        error: null,
                    });
                }
            } catch (error) {
                console.error('Failed to update visit counter:', error);
                // 完全失败时使用默认值
                const storedCount = localStorage.getItem(STORAGE_KEYS.visitCount);
                setState({
                    count: storedCount ? parseInt(storedCount, 10) : 88,
                    loading: false,
                    error: 'Failed to update visit count',
                });
            }
        };

        updateVisitCount();
    }, []);

    return state;
}
