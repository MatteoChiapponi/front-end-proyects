// variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const resultados = document.querySelector("#resultado");

// objeto de busqueda
const datosBusqueda = {
    marca: "",
    year: "",
    min: "",
    max: "",
    puertas: "",
    transmision: "",
    color: ""
}

// eventos 
document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(); // muestra los autos al cargar la pagina
    mostrarYears(); // completa las opciones para seleccionar un año
})

// eventos para los select de busquedas
marca.addEventListener("change", event => {
    datosBusqueda.marca = event.target.value;
    filtrarAuto()
})
year.addEventListener("change", event => {
    datosBusqueda.year = event.target.value;
    filtrarAuto()
})
minimo.addEventListener("change", event => {
    datosBusqueda.min = event.target.value;
    filtrarAuto()
})
maximo.addEventListener("change", event => {
    datosBusqueda.max = event.target.value;
    filtrarAuto()
})
puertas.addEventListener("change", event => {
    datosBusqueda.puertas = event.target.value;
    filtrarAuto()
})
transmision.addEventListener("change", event => {
    datosBusqueda.transmision = event.target.value;
    filtrarAuto()
})
color.addEventListener("change", event => {
    datosBusqueda.color = event.target.value;
    filtrarAuto()
})

// funciones
function mostrarAutos() {
    autos.forEach(autos => {
        const { marca, year, modelo, puertas, transmision, precio, color } = autos;
        resultados.innerHTML += `<p>${marca}-${year}-${modelo}-${puertas}-${transmision}-${precio}-${color}</p>`;
    })
}
function mostrarYears() {
    const maxYear = new Date().getFullYear();
    const minYear = 2015;
    for (let i = maxYear; i >= minYear; i--) {
        year.innerHTML += `<option value="${i}">${i}</option>`
    }
}
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarPrecioMin).filter(filtrarMax).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
    mostrarAuto(resultado)
}
// mostrar el resultado de las filtraciones en el dom
function mostrarAuto(resultado) {
    resultados.innerHTML = "";
    if (resultado[0] === undefined) {
        noHuboResultados()
    }
    resultado.forEach((auto) => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        resultados.innerHTML += `<p>${marca}-${modelo}-${year}-${puertas}-${transmision}-${precio}-${color}</p>`;
    })
}

// filtraciones segun las opciones del usuario
function filtrarMarca(auto) {
    if (datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}
function filtrarYear(auto) {
    if (datosBusqueda.year) {
        return auto.year === parseInt(datosBusqueda.year);
    }
    return auto;
}
function filtrarPrecioMin(auto) {
    if (datosBusqueda.min) {
        return auto.precio > parseInt(datosBusqueda.min);
    }
    return auto;
}
function filtrarMax(auto) {
    if (datosBusqueda.max) {
        return auto.precio < parseInt(datosBusqueda.max);
    }
    return auto;
}
function filtrarPuertas(auto) {
    if (datosBusqueda.puertas) {
        return auto.puertas === parseInt(datosBusqueda.puertas);
    }
    return auto;
}
function filtrarTransmision(auto) {
    if (datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}
function filtrarColor(auto) {
    if (datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    }
    return auto;
}
function noHuboResultados() {
    resultados.innerHTML=`<p>no hubo resultados encontrados con esos parametros</p>`;
}

