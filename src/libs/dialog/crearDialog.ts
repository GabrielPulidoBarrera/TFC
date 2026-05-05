

export function crearDialog(texto: string) {
  let dialog = document.createElement('dialog');
  let p = document.createElement('p');
  let button = document.createElement('button')
  button.textContent="Cerrar";
  p.textContent = texto;
  p.style.whiteSpace = 'pre-line';
  dialog.append(p);
  dialog.append(button);
  document.querySelector('body')?.append(dialog);
  button.classList.add("self-center", "px-8", "py-3", "font-semibold", "rounded", "dark:bg-violet-600", "dark:text-gray-50")
  button.id = "cerrarDialog"
  dialog.classList.add("fixed", "inset-0", "m-auto", "w-1/2", "h-1/2", "text-center", "*:m-10" );
    dialog.showModal();

    button.addEventListener("click", cerrar)
    
    function cerrar() {
      dialog.close()
      dialog.remove();

      dialog.removeEventListener("click", cerrarfuera)
    }

      function cerrarfuera(e: Event) {
        let valido = e.target===dialog;
      if (valido){
        cerrar()
      }
    }

    //Close borra el dialog aun si lo cierras con la tecla escape.
  dialog.addEventListener('close', () => {
    dialog.remove();
  });

    dialog.addEventListener("click", cerrarfuera)

}