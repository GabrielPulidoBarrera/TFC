import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
import { firmarCookie } from '../../libs/auth/jwt';
export const prerender = false
const isDEV = import.meta.env.DEV

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "dwes",      
  password: "dwes",  
  database: "dwes",  
})
const prisma = new PrismaClient({ adapter })

export const POST: APIRoute = async function({ cookies, request }){
      let {name, password} = await request.json();

  const result = await prisma.users.findFirst({
    where: {
      name: name,
      password: password
    }
  })

  if(result!=null){
    

      cookies.set(
        'sesion',
        firmarCookie(String(result.id)),
        {
          httpOnly:true,
          sameSite: 'strict',
          secure: isDEV ? false : true,
          maxAge: 60 * 60 * 24 * 7, // 1 semana
          path: "/",
        }
      )


    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Data read successfully',
        data: result 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
  else{
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Invalid request body or database error'
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}