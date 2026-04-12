import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

const JWT_TOKEN = import.meta.env.JWT_TOKEN
if (!JWT_TOKEN) throw new Error('No se encuentra el ENV JWT_TOKEN')

export const firmarCookie = (galletita: string) => {
    return jwt.sign(galletita, JWT_TOKEN)

}

export const descifrarCookie = (galletita: string) => {
    return jwt.decode(galletita)
}

export const verifyCookie = (galletita: string) => {
    return jwt.verify(galletita, JWT_TOKEN)
}

