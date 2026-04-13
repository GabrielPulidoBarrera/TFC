import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()


let JWT_TOKEN = process.env.JWT_TOKEN;
if (!JWT_TOKEN) {
    JWT_TOKEN = import.meta.env.JWT_TOKEN;
}

export const firmarCookie = (galletita: string) => {
    return jwt.sign(galletita, JWT_TOKEN)

}

export const descifrarCookie = (galletita: string) => {
    return jwt.decode(galletita)
}

export const verifyCookie = (galletita: string) => {
    return jwt.verify(galletita, JWT_TOKEN)
}

