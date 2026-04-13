import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
import { conectar } from '@libs/database/adapter';
export const prerender = false

const prisma = await conectar()


export const POST: APIRoute = async function({ request }){
  try {
    let {productID, collectionID} = await request.json();
  
    const result = await prisma.collectionProducts.create({
      data: {productID, collectionID}
    });
    
    console.log("Product added to collection", result);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Product added to collection',
        data: result 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error: any) {
    console.error("Error adding product to collection: ", error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error adding product to collection',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}