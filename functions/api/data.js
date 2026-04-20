export async function onRequest({ request, env }) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Partner',
  };

  if (request.method === 'OPTIONS') return new Response(null, { headers: cors });

  const pin     = (request.headers.get('Authorization') || '').replace('Bearer ', '').trim();
  const partner = (request.headers.get('X-Partner') || 'unknown').toLowerCase();

  if (pin !== env.SHARED_PIN) {
    return new Response(JSON.stringify({ error: 'Invalid PIN' }), {
      status: 401,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const validPartners = ['naif', 'hassan', 'mojahid'];
  const partnerName   = validPartners.includes(partner) ? partner : 'unknown';

  if (request.method === 'GET') {
    const data = await env.DASHBOARD_KV.get('dashboard_data', 'json');
    return new Response(JSON.stringify({ partner: partnerName, data: data || null }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  if (request.method === 'POST') {
    await env.DASHBOARD_KV.put('dashboard_data', JSON.stringify(await request.json()));
    return new Response(JSON.stringify({ ok: true, partner: partnerName }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  return new Response('Method not allowed', { status: 405, headers: cors });
}
