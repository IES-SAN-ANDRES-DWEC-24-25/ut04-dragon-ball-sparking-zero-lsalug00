// src/Torneo.js

const simularBatalla = require('./simularBatalla');
const { esPotenciaDeDos, mezclarArray } = require('./utils');

class Torneo {
  /**
   * Crea una instancia de Torneo.
   * @param {Luchador[]} luchadores - Array de luchadores participantes.
   */
  constructor(luchadores) {
    
  }

  /**
   * Inicia el torneo, simulando las rondas hasta determinar un campeón.
   * @returns {Luchador} - El campeón del torneo.
   */
  iniciar() {
    let participantes ; // Copiar el array de luchadores
    mezclarArray(participantes);
    console.log(`\nIniciando el torneo con ${participantes.length} luchadores!\n`);

    // Simular rondas hasta que quede un solo luchador
    

    const campeón = participantes[0];
    console.log(`El campeón del torneo es ${campeón.nombre}!\n`);
    return campeón;
  }
}

module.exports = Torneo;
