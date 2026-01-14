// Vercel Edge Function for visit counting
// Uses Vercel KV for persistent storage

export const config = { runtime: 'edge' };

const { KV_REST_API_URL, KV_REST_API_TOKEN } = process.env;
const DEFAULT_COUNT = 88;

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
};

async function kvRequest(action) {
    if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
        return action === 'incr' ? DEFAULT_COUNT + 1 : DEFAULT_COUNT;
    }

    try {
        const response = await fetch(`${KV_REST_API_URL}/${action}/visit_count`, {
            method: action === 'incr' ? 'POST' : 'GET',
            headers: { Authorization: `Bearer ${KV_REST_API_TOKEN}` },
        });
        const { result } = await response.json();
        return result ? parseInt(result, 10) : 0;
    } catch (error) {
        console.error(`KV ${action} failed:`, error);
        return 0;
    }
}

export default async function handler(request) {
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers });
    }

    try {
        const action = request.method === 'POST' ? 'incr' : 'get';
        const count = await kvRequest(action);
        return new Response(JSON.stringify({ count, success: true }), { status: 200, headers });
    } catch {
        return new Response(JSON.stringify({ error: 'Server error', count: 0 }), { status: 500, headers });
    }
}
