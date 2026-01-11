// src/pages/api/nueva-familia.ts
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../generated/prisma/client'

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  connectionLimit: 5
})
const prisma = new PrismaClient({ adapter })

async function newFamily(request: Request){
    const { cod, name } = await request.json();

    try{
        await prisma.family.create({
            data: {cod, name}
        }) 
        console.log("todo bien!")
    }
    catch (error){
        console.error("error");
    }
}

export {newFamily};