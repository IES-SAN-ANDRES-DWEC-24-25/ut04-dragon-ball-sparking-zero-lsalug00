// src/Namekian.js

const Luchador = require('./Luchador');

class Namekian extends Luchador {
    /**
     * @param {string} nombre - Nombre del Namekian.
     * @param {number} velocidad - La velocidad base del Namekian.
     * @param {number} ataque - El nivel base de ataque del Namekian.
     * @param {number} defensa - El nivel base de defensa del Namekian.
     * @param {number} salud - La salud inicial del Namekian.
     */
    constructor(nombre, velocidad, ataque, defensa, salud, regeneracionUsada = false) {
        super(nombre, velocidad, ataque, defensa, salud);
        this.#regeneracionUsada = regeneracionUsada;
    }

    // Atributo privado
    #regeneracionUsada;

    getRegeneracionUsada() {
        return this.#regeneracionUsada;
    }

    setRegeneracionUsada(regeneracionUsada) {
        this.#regeneracionUsada = regeneracionUsada;
    }

    /**
     * Regenera salud si aún no lo ha hecho en la batalla.
     */
    regenerarSalud() {
        if (!this.getRegeneracionUsada() && this.getSalud() < 50) {
            this.setRegeneracionUsada(true);
            const saludRecuperada = 30;
            this.setSalud(this.getSalud() + saludRecuperada);
        }
    }

    /**
     * Método para recibir daño.
     * @param {number} danio - Daño a recibir.
     */
    recibirDanio(danio) {
        super.recibirDanio(danio);
    }

    /**
     * Método para verificar si ha regenerado.
     */
    get regenerado() {
        return this.getRegeneracionUsada(); // Devuelve si se ha usado la regeneración
    }
}

module.exports = Namekian;
