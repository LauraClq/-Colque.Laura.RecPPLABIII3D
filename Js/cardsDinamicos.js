export function crearCards(unMonstruo)
{
    const article = document.createElement("article");
    const alias = document.createElement("p");
    const contendAlias =  document.createElement("div");
    const nombre = document.createElement("p");
    nombre.classList.add("nombre");
    const defensa = document.createElement("p");
    const contendDefensa =  document.createElement("div");
    const miedo = document.createElement("p");
    const contendMiedo =  document.createElement("div");
    const tipo = document.createElement("p");
    const contendTipo =  document.createElement("div");

    const iconoAlias = document.createElement("img");
    iconoAlias.setAttribute("src","./Recursos/mask.svg");
    const iconoDefensa = document.createElement("img");
    iconoDefensa.setAttribute("src","./Recursos/blood.svg");
    const iconoMiedo = document.createElement("img");
    iconoMiedo.setAttribute("src","./Recursos/horror.svg");
    const iconoTipo = document.createElement("img");
    iconoTipo.setAttribute("src","./Recursos/magic.svg");
    
    //div.appendChild(document.createElement("img")).setAttribute("src","./Recursos/blood.svg");
    contendAlias.appendChild(iconoAlias);
    contendAlias.appendChild(alias);

    contendDefensa.appendChild(iconoDefensa);
    contendDefensa.appendChild(defensa);

    contendMiedo.appendChild(iconoMiedo);
    contendMiedo.appendChild(miedo);

    contendTipo.appendChild(iconoTipo);
    contendTipo.appendChild(tipo);

    article.appendChild(contendAlias);
    article.appendChild(nombre);
    article.appendChild(contendDefensa);
    article.appendChild(contendMiedo);
    article.appendChild(contendTipo);

    article.classList.add("card");

    alias.textContent = `ALIAS: ${unMonstruo.alias}`;
    nombre.textContent = `NOMBRE: ${unMonstruo.nombre}`;
    defensa.textContent =  `DEFENSA: ${unMonstruo.defensa}`;
    miedo.textContent = `MIEDO: ${unMonstruo.miedo}`
    tipo.textContent = `TIPO: ${unMonstruo.tipo}`;

    return article;
}