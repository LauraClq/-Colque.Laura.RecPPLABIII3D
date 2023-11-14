import { crearCards } from "./cardsDinamicos.js";

const listaMonstruos = JSON.parse(localStorage.getItem("monstruos")) || [] ;
const seccionMonstruos = document.getElementById("cardsMonstruos");

console.log(listaMonstruos);
console.log(seccionMonstruos);

listaMonstruos.forEach(element => {
    seccionMonstruos.appendChild(crearCards(element));
});