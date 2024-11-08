// src/Torneo.js

const simularBatalla = require('./simularBatalla');
const { esPotenciaDeDos, mezclarArray } = require('./utils');

class Torneo {
    /**
     * Crea una instancia de Torneo.
     * @param {Luchador[]} luchadores - Array de luchadores participantes.
     */
    constructor(luchadores) {
        // Verificamos que el número de luchadores sea potencia de 2
        if (!esPotenciaDeDos(luchadores.length)) {
            throw new Error("El número de luchadores debe ser una potencia de 2.");
        }

        // Copiamos el array de luchadores para mantener la integridad de los datos originales
        this.luchadores = [...luchadores];
    }

    /**
     * Inicia el torneo, simulando las rondas hasta determinar un campeón.
     * @returns {Luchador} - El campeón del torneo.
     */
    iniciar() {
        let participantes = this.luchadores;

        // Mezclamos los participantes para hacer el torneo más impredecible
        mezclarArray(participantes);

        console.log(`\nIniciando el torneo con ${participantes.length} luchadores!\n`);

        // Mientras haya más de un luchador en la competencia, continuar simulando rondas
        let ronda = 1;
        while (participantes.length > 1) {
            console.log(`Ronda con ${participantes.length} luchadores`);
            console.log(`--- Ronda ${ronda} ---`);
            const siguienteRonda = [];
            
            for (let i = 0; i < participantes.length; i += 2) {
                const luchador1 = participantes[i];
                const luchador2 = participantes[i + 1];
                const ganador = simularBatalla(luchador1, luchador2);
                siguienteRonda.push(ganador);
            }
        
            participantes = siguienteRonda;
            ronda++;
        }
        // El único luchador restante es el campeón
        const campeón = participantes[0];
        console.log(`El campeón del torneo es ${campeón.getNombre()}!\n`);
        return campeón;
    }
}

module.exports = Torneo;
