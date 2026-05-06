
  //Seleciono e inicializo lo necesario
  let selectorColumnas = document.querySelector("#selectorColumnas");
  let contador = 3;

  //Esta funcion crea una nueva columna
  export function newColumn(editando = true) {
    //Creo el fieldset el primer div, cada div contiene un label y un input.
    let divContenedor = document.createElement("div");
    divContenedor.classList.add(
      "max-w-full",
      "overflow-hidden",
      "contenedorInputLabel",
    );
    let div1 = document.createElement("div");

    //Div del nombre
    let nombreInput = document.createElement("input");
    nombreInput.id = "NombreColumna" + contador;
    nombreInput.classList.add("columna", "max-w-full");
    let nombreLabel = document.createElement("label");
    nombreLabel.textContent = "Nombre columna " + contador;
    nombreLabel.htmlFor = "NombreColumna" + contador;

    div1.append(nombreInput, nombreLabel);
    divContenedor.append(div1);

    let div2 = document.createElement("div");

    //Div del valor
    let valorInput = document.createElement("input");
    valorInput.id = "ValorColumna" + contador;
    valorInput.classList.add("columna", "max-w-full");
    let valorLabel = document.createElement("label");
    valorLabel.textContent = "Valor columna " + contador;
    valorLabel.htmlFor = "ValorColumna" + contador;


    if (editando == false) {
      valorInput.disabled = true;
      nombreInput.disabled = true;
    }

    div2.append(valorInput, valorLabel);
    divContenedor.append(div2);

    selectorColumnas?.append(divContenedor);

    contador++;
  }


    //Funcion para borrar un campo si se deja vacio


export function borrarHeader(e: Event){
  let objetivo = (e.target as HTMLInputElement);
  console.log(objetivo);

  if (!objetivo){
    return
  }
  //Vamos a obtener el numero de columna, para ellos, vamos a mirar el numero que tiene el label
  let label = (objetivo.parentElement?.querySelector('label'));
  console.log(label?.textContent.split(" "));
  //para sacar el label, hacemos un split y pillamos el ultimo, el label siempre tiene 3 palabras, siendo esto columna/valor columna (numero) 
  let columna = Number(label?.textContent.split(" ")[2])
  console.log(label)
  console.log(columna)

  //Seleccionamos el nombre y el valor, no nos preocupamos con que tienes en el e.target ya, eso es irrelevante.
  let input = document.querySelector('#NombreColumna'+columna) as HTMLInputElement
  let valor = document.querySelector('#ValorColumna'+columna) as HTMLInputElement

  console.log(input)
  console.log(valor)

  console.log(input?.value.trim())
  console.log(valor?.value.trim())

  //Miramos si ambos campos esta vacio
  if (input?.value.trim() == "" && valor?.value.trim() == ""){
    console.log("Me ejecuto!!")
    if (valor.parentElement?.parentElement==null){
      return
    }
    //si lo es borramos el padre del padre, que es el contenedor que engloba tanto el valor y el nombre.
	valor.parentElement?.parentElement.remove()
  contador--

      let selectorColumnasElementos = selectorColumnas?.querySelectorAll(
      ".contenedorInputLabel",
    );
        if (selectorColumnasElementos == null) {
      console.error("Error en selectorColumnasElementos");
      return;
    }
    //El contador empezara desde el numero que hemos borrado, pero le sumaremos 1, para seleccionar el siguiente
    //El contador sera el numero total de elementos que haya, le sumamos +1 porque empieza de 0, y le sumamos 1 otra vez ya que hemso borrado 1. 
    for (
      let contador = columna+1;
      contador < selectorColumnasElementos?.length + 2;
      contador++
    ) {
      let contadorReal = contador-1;
      let atributoNombre = document.querySelector("#NombreColumna" + contador);
      let atributoValor = document.querySelector("#ValorColumna" + contador);

      if (atributoNombre == null || atributoValor == null) {
        return;
      }

      //Actualizamos id
      atributoNombre.id="NombreColumna"+contadorReal;
      atributoValor.id="ValorColumna"+contadorReal;

      //Accedemos al label
      let labelAtributoNombre = atributoNombre.parentElement?.querySelector('label');
      if (labelAtributoNombre==null){
        console.error("error en label atributo nombre")
        return
      }
      //Actualizamos el label.
      labelAtributoNombre.textContent = "Nombre columna "+contadorReal;
      labelAtributoNombre.htmlFor="NombreColumna"+contadorReal


      //Repetimos.
      let labelAtributoValor = atributoValor.parentElement?.querySelector('label');
      if (labelAtributoValor==null){
        console.error("error en label atributo valor")
        return
      }
      labelAtributoValor.textContent = "Valor columna "+contadorReal;
      labelAtributoValor.htmlFor="ValorColumna"+contadorReal
    }

  }



}