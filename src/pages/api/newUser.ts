import type { APIRoute } from 'astro';
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'
import { conectar } from '@libs/database/adapter';
export const prerender = false

const prisma = await conectar()


export const POST: APIRoute = async function({ request }){


  console.log('DATABASE_URL full:', process.env.DATABASE_URL);
  console.log('URL length:', process.env.DATABASE_URL?.length);

  try {
    let {name, password, email} = await request.json();

    console.log("Nombre: "+name)
    console.log("password: "+password)
    console.log("email: "+email)
    //Validacion de errores.
    //Reivso que el email sea valido
    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email) == false) {
    throw new Error('Invalid email')

    }
    //Este regex se asegura de que no tenga carateres especiales.
    let usuarioRegex = /^[A-Za-z0-9]*$/;
    if (usuarioRegex.test(name) == false) {
    throw new Error('Illegal characters on username')
    }
    //Revisa la longitud del usuario.
    if (name.length<8){
    throw new Error('Invalid username length')

    }

    //No realizo validacion de contraseña, ya que la contraseña que recibo ya esta encriptada y no se podria validar mediante regex, ademas se supone que no debo de ser capaz de desencriptar la contraseña.

    console.log(name)
  
    const result = await prisma.users.create({
      data: {name, password, email}
    });
    
    console.log("User created:", result);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'User created successfully',
        data: result
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error: any) {
    console.error("Error creating User: ", error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Error creating user',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}