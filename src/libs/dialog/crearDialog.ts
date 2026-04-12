

export function crearDialog(texto: string) {
  let dialog = document.createElement('dialog');
  let p = document.createElement('p');
  let button = document.createElement('button')
  button.textContent="cerrar";
  p.textContent = texto;
  dialog.append(p);
  dialog.append(button);
  document.querySelector('body')?.append(dialog);
  button.classList.add("self-center", "px-8", "py-3", "font-semibold", "rounded", "dark:bg-violet-600", "dark:text-gray-50")
  button.id = "cerrarDialog"
  dialog.classList.add("fixed", "inset-0", "m-auto", "w-1/2", "h-1/2", "text-center", "*:m-10" );
    dialog.showModal();

    button.addEventListener("click", e => {
        dialog.close()
    })
}