import type { APIRoute } from 'astro';
export const prerender = false

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ message: 'API is working!' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export const POST: APIRoute = async ({ request }) => {
  console.log("hi");
  return new Response(
    JSON.stringify({ message: 'POST received!' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}