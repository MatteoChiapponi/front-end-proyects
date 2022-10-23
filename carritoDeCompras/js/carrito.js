// variables que vamos a utilizar

const carrito = document.querySelector("#carrito");
const containerCursos = document.querySelector("#lista-cursos");
const containerCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let carritoDeCompras = [];

// funciones
containerFunctions()
function containerFunctions() {
    // agregar elemetos al carrito
    containerCursos.addEventListener("click", agregarCursos)
    // elimina elementos del carrito
    containerCarrito.addEventListener("click", eliminarCurso)
    // vaciar carrito
    vaciarCarritoBtn.addEventListener("click", () =>{

        carritoDeCompras = [];
        limpiarCarrito();

    } )
}
function agregarCursos(event) {
    event.preventDefault();
    if (event.target.classList.contains("agregar-carrito")) {
        const divDelCurso = event.target.parentElement.parentElement
        leerDatosCurso(divDelCurso);
    }

};
// eliminar curso
function eliminarCurso(event) {
    if (event.target.classList.contains("borrar-curso")) {
        // guarda el id del curso que quiere eliminar
        const cursoId = event.target.getAttribute("data-id");
        carritoDeCompras = carritoDeCompras.filter(curso => curso.idCurso !== cursoId);

        carritoHTML(); // volvemos a imprimir el carrito
    }
}


// extraer toda la informacion de los cursos que damos click

function leerDatosCurso(curso) {
    // crea un objeto con a informacion de los cursos
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        idCurso: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    }

    // revisar si el carrito ya existe en el carrito
    const existe = carritoDeCompras.some(curso => curso.idCurso === infoCurso.idCurso);
    if (existe) {
        // actualizamos cantidad
        const cursos = carritoDeCompras.map(curso => {
            if (curso.idCurso === infoCurso.idCurso) {
                curso.cantidad++;
                return curso;
            }
             return curso;
        });
        carritoDeCompras = [...cursos];
    } else 
        // agregar la informacion que necesitabamos a nuestro carrito
        carritoDeCompras = [...carritoDeCompras, infoCurso];
    carritoHTML()
}

// mostrar nuestro carrito de compras en el html

function carritoHTML() {
    //limpiamos el html
    limpiarCarrito()

    // recorre el carrito y generea el html
    carritoDeCompras.forEach(curso => {
        const { imagen, titulo, precio, cantidad, idCurso } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${imagen.slice(-21, 0)}</td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id=${idCurso}> X </a>
        </td>
        `
        containerCarrito.appendChild(row);

    })

}
function limpiarCarrito() {
    while (containerCarrito.firstChild) {
        containerCarrito.removeChild(containerCarrito.firstChild);
    }
}