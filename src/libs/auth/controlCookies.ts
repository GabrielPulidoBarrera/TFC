import { verifyCookie, descifrarCookie } from "./jwt";
import type { APIRoute } from "astro";


export function obtenerCookie(sesion: any){
//if (!sesion) return Astro.redirect('/login')
if(sesion!=null){
  // console.log(sesion)
   const user = verifyCookie(sesion.value)
    //console.log(user);
    return descifrarCookie(sesion.value);
}
else{
    console.log("COOKIE ES NULL!!!")
    return null;
}

}
