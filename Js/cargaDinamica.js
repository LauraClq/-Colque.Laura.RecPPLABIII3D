export const tipo = ["Esqueleto", "Zombie", "Vampiro", "Fantasma", "Bruja", "Hombre Lobo"];

function crearEncabezado(listaMonstruos) 
{
    const $thead = document.createElement("thead");
    const $tr = document.createElement("tr");

    for (const clave in  listaMonstruos) 
    {
        if (clave !== "id") 
        {
            const $th = document.createElement("th");
            const $contenido = document.createTextNode(clave);
            $th.appendChild($contenido);
            $tr.appendChild($th);
        }
    }

    $thead.appendChild($tr);
    return $thead;
}

function crearCuerpo(listaMonstruos) 
{
    const $tbody = document.createElement("tbody");

    listaMonstruos.forEach(elemento => {

        const $tr = document.createElement("tr");

        for (const clave in elemento) 
        {
            if (clave === "id") 
            {
                $tr.setAttribute("data-id", elemento[clave]);
            }
            else 
            {
                const $td = document.createElement("td");
                const $valor = document.createTextNode(elemento[clave]);
                $td.appendChild($valor);
                $tr.appendChild($td);
                $tr.classList.add("puntero");
            }
        }
        $tbody.appendChild($tr);
    });
    return $tbody;
}

export function crearTablaDinamica(listaMonstruos)
{
    if (!Array.isArray(listaMonstruos)) 
    {
        return null;
    }
    const $tabla = document.createElement("table");
    $tabla.appendChild(crearEncabezado(listaMonstruos[0])); 
    $tabla.appendChild(crearCuerpo(listaMonstruos));
    return $tabla;
}

/*---------CARGA DINAMICA OPCIONES DEL SELECT------------*/

export function crearOpciones(listaTipo)
{
    const fragmento = document.createDocumentFragment();
    listaTipo.forEach((tipo)=>
    {
        const opcion = document.createElement("option");
        const texto = document.createTextNode(tipo);
        opcion.appendChild(texto);
        opcion.setAttribute("value",tipo);
        fragmento.appendChild(opcion);
    });

    return fragmento;
}