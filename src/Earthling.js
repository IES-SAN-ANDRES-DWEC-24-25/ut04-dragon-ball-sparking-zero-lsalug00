// src/Earthling.js

const Luchador = require('./Luchador');

class Earthling extends Luchador {
    /**
     * @param {string} nombre - Nombre del Earthling.
     * @param {number} velocidad - La velocidad base del Earthling.
     * @param {number} ataque - El nivel base de ataque del Earthling.
     * @param {number} defensa - El nivel base de defensa del Earthling.
     */
    constructor(nombre, velocidad, ataque, defensa, salud, tecnicaUsada = false) {
        super(nombre, velocidad, ataque, defensa, salud);
        this.#tecnicaUsada = tecnicaUsada;
    }

    // Atributo privado
    #tecnicaUsada;

    // Getter para tecnicaUsada
    getTecnicaUsada() {
        return this.#tecnicaUsada;
    }

    // Setter para tecnicaUsada
    setTecnicaUsada(value) {
        this.#tecnicaUsada = value;
    }

    /**
     * Usa una técnica especial para aumentar el ataque.
     */
    usarTecnicaEspecial() {
        if (!this.getTecnicaUsada()) {
            this.setTecnicaUsada(true);
            this.setAtaque(this.getAtaque() * 1.4); // Aumenta el ataque en un 40%
        }
    }
}

module.exports = Earthling;