// src/utils.js

/**
 * Verifica si un número es potencia de 2.
 * @param {number} numero 
 * @returns {boolean}
 */
function esPotenciaDeDos(numero) {
    return (numero & (numero - 1)) === 0 && numero !== 0;
  }
  
  /**
   * Mezcla un array de manera aleatoria (Fisher-Yates Shuffle).
   * @param {Array} array 
   */
  function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  module.exports = { esPotenciaDeDos, mezclarArray };
  