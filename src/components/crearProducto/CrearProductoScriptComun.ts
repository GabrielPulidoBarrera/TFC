
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
    valorInput.classList.add("columna");
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
