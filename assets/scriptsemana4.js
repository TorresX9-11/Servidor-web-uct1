// Variables para la calculadora
let display = document.getElementById('display'); // Objeto display de la calculadora
let operando1 = null; // Primer operando
let operando2 = null; // Segundo operando
let operador = null; // Operador seleccionado

// Función para agregar números al display
function agregarNumero(numero) {
    // Agrega un número al display
    if (display.value === '0') {
        display.value = numero; // Si el display es 0, reemplaza con el nuevo número
    } else {
        display.value += numero; // Si no es 0, agrega el número al display
    }
}

// Función para agregar operadores
function operar(op) {
    // Guarda el primer operando y el operador
    operando1 = parseFloat(display.value);
    operador = op;
    display.value = '0'; // Limpia el display
}

// Función para calcular el resultado
function calcular() {
    // Calcula el resultado de la operación
    operando2 = parseFloat(display.value);
    let resultado;

    switch (operador) {
        case '+':
            resultado = operando1 + operando2;
            break;
        case '-':
            resultado = operando1 - operando2;
            break;
        case '*':
            resultado = operando1 * operando2;
            break;
        case '/':
            resultado = operando1 / operando2;
            break;
        default:
            resultado = operando2; // Si no hay operador, el resultado es el segundo operando
    }

    historial.push(`${operando1} ${operador} ${operando2} = ${resultado}`); // Guarda la operación en el historial
    mostrarHistorial(); // Muestra el historial actualizado
    // guardarHistorial(); // Guarda el historial en localStorage
    display.value = resultado; // Muestra el resultado en el display
    operando1 = null; // Restablece las variables
    operando2 = null;
    operador = null;
}

// Función para limpiar el display
function limpiar() {
    // Limpia el display y las variables de la calculadora
    display.value = '0';
    operando1 = null;
    operando2 = null;
    operador = null;
    mostrarHistorial(); //Actualiza el historial en el display
}

// Historial de operaciones (solo para la sesión)
let historial = []; // Array para almacenar el historial

// Función para mostrar el historial
function mostrarHistorial() {
    // Muestra el historial en la sección correspondiente
    let historialElement = document.getElementById('historial');
    historialElement.innerHTML = ''; // Limpia el historial anterior

    historial.forEach(operacion => {
        let p = document.createElement('p');
        p.textContent = operacion;
        historialElement.appendChild(p);
    });
}


// Función para guardar el historial en localStorage
function guardarHistorial() {
    // Guarda el historial en localStorage
    sessionStorage.setItem('calculadoraHistorial', JSON.stringify(historial));
}

// Cargar historial desde localStorage al cargar la página
window.addEventListener('load', () => {
    // Carga el historial desde localStorage al cargar la página
    let historialStorage = localStorage.getItem('calculadoraHistorial');
    if (historialStorage) {
        historial = JSON.parse(historialStorage);
        mostrarHistorial();
    }
});
