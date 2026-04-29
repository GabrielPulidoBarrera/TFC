import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
import { conectar } from '@libs/database/adapter';
import { descifrarCookie } from '@libs/auth/jwt';
export const prerender = false

const prisma = await conectar()


export const POST: APIRoute = async function({ request }){
  try {
    let {id, name, cookie, visibility} = await request.json();
    cookie = descifrarCookie(cookie);
    console.log(name)

    console.log("ID!!!"+ id)

    let data: any = {} 


      if (name !== undefined) {
      data.name = name;
    }
    
          if (visibility !== undefined) {
      data.visibility = visibility;
    }



    const result = await prisma.product.update({
      where: {
        id: Number(id),
        userID: Number(cookie),
      },
      data
    });
    
    console.log("DATA "+data)
    console.log("Product edited:", result);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Product edited successfully',
        data: result 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error: any) {
    console.error("Error editing product: ", error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error editing collection',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}