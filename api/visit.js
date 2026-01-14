// api/visit.js
// Vercel Serverless Function for visit counting
// Uses Vercel KV for persistent storage

export const config = {
    runtime: 'edge',
};

// 使用 Vercel KV 需要设置环境变量:
// KV_REST_API_URL 和 KV_REST_API_TOKEN
// 可以在 Vercel Dashboard -> Storage -> KV 中创建

const KV_REST_API_URL = process.env.KV_REST_API_URL;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;

async function getCount() {
    if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
        // 如果没有配置 KV，返回模拟数据
        return 88;
    }

    try {
        const response = await fetch(`${KV_REST_API_URL}/get/visit_count`, {
            headers: {
                Authorization: `Bearer ${KV_REST_API_TOKEN}`,
            },
        });
        const data = await response.json();
        return data.result ? parseInt(data.result, 10) : 0;
    } catch (error) {
        console.error('Failed to get count from KV:', error);
        return 0;
    }
}

async function incrementCount() {
    if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
        // 如果没有配置 KV，返回模拟数据
        return 89;
    }

    try {
        const response = await fetch(`${KV_REST_API_URL}/incr/visit_count`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${KV_REST_API_TOKEN}`,
            },
        });
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Failed to increment count in KV:', error);
        return 0;
    }
}

export default async function handler(request) {
    // 设置 CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    // 处理 OPTIONS 预检请求
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers });
    }

    try {
        if (request.method === 'POST') {
            // 增加访问计数
            const count = await incrementCount();
            return new Response(JSON.stringify({ count, success: true }), {
                status: 200,
                headers,
            });
        } else {
            // 获取当前访问计数
            const count = await getCount();
            return new Response(JSON.stringify({ count, success: true }), {
                status: 200,
                headers,
            });
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Internal server error', count: 0 }),
            { status: 500, headers }
        );
    }
}
