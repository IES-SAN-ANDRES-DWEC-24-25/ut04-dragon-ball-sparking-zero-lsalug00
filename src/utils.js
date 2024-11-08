/**
 * Verifica si un número es potencia de 2.
 * @param {number} numero 
 * @returns {boolean}
 */
function esPotenciaDeDos(numero) {
    return (numero > 0) && (numero & (numero - 1)) === 0;
}

/**
 * Mezcla un array de manera aleatoria (Fisher-Yates Shuffle).
 * @param {Array} array 
 */
function mezclarArray(array) {
    // Aseguramos que el array no esté vacío para evitar errores
    if (array.length <= 1) return;

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambio de elementos
    }
}
  
module.exports = { esPotenciaDeDos, mezclarArray };
  