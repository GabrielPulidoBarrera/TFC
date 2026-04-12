import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
    // Borramos la cookie de sesion
    await cookies.delete('sesion', {
        path: '/'
    });

    return new Response(JSON.stringify({ok:false}))
}