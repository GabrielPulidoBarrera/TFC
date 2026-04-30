import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
import { conectar } from '@libs/database/adapter';
export const prerender = false

const prisma = await conectar()


export const POST: APIRoute = async function({ request }){
  try {
    let {id, name, columns, cookie} = await request.json();


    console.log(name)

    console.log("COOKIE!!!"+ id)

    //Leo la informacion recibido y lo meto dentro de un objeto data, que luego sera añadido a la query para realizar la modificacion.
    let data: any = {} 


      if (name !== undefined) {
      data.name = name;
    }
    
      if (columns !== undefined) {
      data.columns = columns;
    }



    const result = await prisma.collection.update({
      where: {
        id: id,
        userID: cookie,
      },
      data
    });
    
    console.log("Collection edited:", result);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Collection editing successfully',
        data: result 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error: any) {
    console.error("Error editing collection: ", error);
    
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