import { verifyCookie, descifrarCookie } from "./jwt";


export function obtenerCookie(sesion: any){
//if (!sesion) return Astro.redirect('/login')
if(sesion!=null){
    console.log("SESION!")
  console.log(sesion)
  console.log("SESION PUNTO VALUE")
  console.log(sesion.value)
   const user = verifyCookie(sesion.value)
   console.log("USER!")
   console.log(user)

   return(user);



}
else{
    console.log("COOKIE ES NULL!!!")
    return null;
}

}
