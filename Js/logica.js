import { tipo, crearTablaDinamica, crearOpciones } from "./cargaDinamica.js";
import { Monstruo } from "./monstruo.js";

const formulario = document.forms[0]; 
const listaMonstruos = JSON.parse(localStorage.getItem("monstruos")) || []; 

localStorage.setItem("tipos",JSON.stringify(tipo)); 
const info = JSON.parse(localStorage.getItem("tipos")); 

const listaTipo = document.getElementById("tipo");
listaTipo.appendChild(crearOpciones(info));

//localStorage.clear();
actualizarTabla();
visualizarBotones();

formulario.addEventListener("submit",(evento) => {
    evento.preventDefault();
    realizarOperacion(); 
});

/*----------------AL HACER CLICK EN UN CAMPO DE MI TABLA-------------------- */

document.addEventListener("click",(e)=>
{
    const evento = e.target;

    if (evento.matches("td")) {
        
        limpiarFormulario();
        let idSeleccionado = parseInt(evento.parentElement.dataset.id);
        const objetoRecuperado = listaMonstruos.find((objeto) => objeto.id === idSeleccionado);

        cargaFormulario(objetoRecuperado);
        visualizarBotones();
    }
    else if(evento.matches("#btnEliminar"))
    {
        mostrarSpinner();
        setTimeout(()=>
        {
            manejadorEliminar(parseInt(formulario.inputId.value));  
            // const modal = document.getElementById("#alertCustom");
            // modal.showModal();
            ocultarSpinner();
        },2000);
        limpiarFormulario();
        visualizarBotones();
    }
    else if(evento.matches("#btnCancelar"))
    {
        limpiarFormulario();
        visualizarBotones();
    }
})


/*------CARGA DE FORMULARIOS CON DATOS--------------- */

function cargaFormulario(monstruo)
{
    formulario.inputId.value = monstruo.id;
    formulario.inputNombre.value = monstruo.nombre;
    formulario.inputAlias.value = monstruo.alias;
    formulario.rdbDefensa.value = monstruo.defensa;
    formulario.inputMiedo.value = monstruo.miedo;
    formulario.selectTipo.value = monstruo.tipo;
    
    monstruo.postre.forEach(postre => {
        const checkboxes = document.querySelectorAll(".check");
        checkboxes.forEach(checkbox => {
            if (checkbox.value === postre) {
                checkbox.checked = true;
            }
        });
    });
}


/*---------------OPERACION-------------------------*/
function realizarOperacion()
{
    const {inputId, inputNombre, selectTipo, inputAlias, rdbDefensa, inputMiedo} = formulario;
    
    const seleccionPostre = document.querySelectorAll(".check");
    const postres = [];
    seleccionPostre.forEach(checkbox => {
        if (checkbox.checked) {
            postres.push(checkbox.value);
        }
    });

    
    const unMonstruo = new Monstruo(parseInt(inputId.value),inputNombre.value,selectTipo.value,inputAlias.value,rdbDefensa.value,inputMiedo.value,postres);//

    if (unMonstruo !== null) 
    {
        if (inputId.value === "") {

            mostrarSpinner();
            setTimeout(()=>
            {
                unMonstruo.id = Date.now();
                manejadorAlta(unMonstruo);
                // const modal = document.getElementById("alertCustom");
                // modal.showModal();
                ocultarSpinner();

            },2000);
        }
        else
        {
            mostrarSpinner();
            setTimeout(()=>
            {
                manejadorActualizar(unMonstruo);
                ocultarSpinner();

            },2000);
        }
       
    }
    limpiarFormulario();
    visualizarBotones();
    console.log("enviando....");
}

/*---------------MANEJADORES ALTA, MODFICAR, ELIMINAR-------------------------*/

const manejadorAlta = (monstruo) => {
    
    listaMonstruos.push(monstruo);
    actualizarLocalStorage(listaMonstruos); 
    actualizarTabla();
}

const manejadorActualizar = (monstruoActualizado) => {

    let indice = listaMonstruos.findIndex((monstruo) => monstruo.id === monstruoActualizado.id);

    if (indice >= 0) 
    {
        listaMonstruos[indice] = monstruoActualizado;
    }
    actualizarLocalStorage(listaMonstruos);
    actualizarTabla();
}

const manejadorEliminar = (id) => {

    let indice = listaMonstruos.findIndex((monstruo)=> monstruo.id === id);
    listaMonstruos.splice(indice,1); 
    actualizarLocalStorage(listaMonstruos);
    actualizarTabla();
}

/*---------------------ACTUALIZAR LOCALSTORAGE Y TABLA -------------------------------- */
const actualizarLocalStorage = (monstruo) => {
    localStorage.setItem("monstruos", JSON.stringify(monstruo)); 
}

function actualizarTabla()
{
    console.log("Actualizando tabla...");
    redenrizarTabla(crearTablaDinamica(listaMonstruos),document.getElementById("divTabla"));
}

function redenrizarTabla(listaMonstruos, contenedor)
{
    while (contenedor.hasChildNodes())
    {
        contenedor.removeChild(contenedor.firstChild); 
    }
    
    if (listaMonstruos) {
        
        contenedor.appendChild(listaMonstruos);
    }
}

/*------------MOSTRAR BOTONES Y CAMBIA EL VALOR SEGUN LA ACCION------------------------ */

function visualizarBotones() 
{
    if (formulario.inputId.value != "") 
    {
        document.getElementById("btnEliminar").classList.remove("oculto");
        document.getElementById("btnCancelar").classList.remove("oculto");
        document.getElementById("btnSubmit").value = "Modificar"; 
    }
    else
    {
        document.getElementById("btnEliminar").classList.add("oculto");
        document.getElementById("btnCancelar").classList.add("oculto");
        document.getElementById("btnSubmit").value = "Guardar"; 
    }

}

function limpiarFormulario()
{
    formulario.reset();
    formulario.inputId.value = ""; 
}
/*----------MUESTRO EL SPINNER Y TABLA o LO OCULTO--------------- */

function mostrarSpinner() 
{
    const spinner = document.querySelector("#spinner");
    spinner.classList.remove("oculto");

    const tabla = document.getElementById("divTabla");
    tabla.classList.add("oculto");
}

function ocultarSpinner() 
{
   const spinner = document.querySelector("#spinner");
    spinner.classList.add("oculto");

    const tabla = document.getElementById("divTabla");
    tabla.classList.remove("oculto");
}


/**********MODAL************************* */

// document.getElementById("btnCerrar").addEventListener("click",()=>
// {
//     document.getElementsByTagName("dialog")[0].close()
// })

// document.getElementById("btnOpen").addEventListener("click",()=>
// {
//     document.getElementsByTagName("dialog")[0].open = true
// })











