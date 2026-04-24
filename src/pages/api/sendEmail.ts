import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
import { conectar } from '@libs/database/adapter';
export const prerender = false

const prisma = await conectar()


export const POST: APIRoute = async function({ request }){
  try {
    let {email} = await request.json();


    //let columnas = {columna: "nombre", precio: 20, fecha: "hoy"}
    //let parseado = await JSON.stringify(columnas);

    let responseEmail = await fetch("https://n8n.gabrielpulido.xyz/webhook-test/bf8ea997-b6a2-4a20-9166-511843e8599b", { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email }),
  });
  console.info(responseEmail);
    
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'email sent successfully',
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error: any) {
    console.error("Error creating product:", error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create product',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}