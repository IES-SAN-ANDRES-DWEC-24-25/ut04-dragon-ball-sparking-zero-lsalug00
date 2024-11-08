// src/Saiyan.js
const Luchador = require('./Luchador');    

class Saiyan extends Luchador {
    /**
     * @param {number} salud - La cantidad inicial de salud del Saiyan.
     * @param {number} velocidad - La velocidad base del Saiyan.
     * @param {number} ataque - El nivel base de ataque del Saiyan.
     * @param {number} defensa - El nivel base de defensa del Saiyan.
     * @param {boolean} superSaiyan - Indica si el Saiyan inicia en modo Super Saiyan.
     */
    constructor(nombre, velocidad, ataque, defensa, salud, superSaiyan = false) {
        super(nombre, velocidad, ataque, defensa, salud);
        this.#esSuperSaiyan = superSaiyan;
    }

    // Atributo privado
    #esSuperSaiyan;

    getEsSuperSaiyan() {
        return this.#esSuperSaiyan;
    }

    setEsSuperSaiyan(superSaiyan) {
        this.#esSuperSaiyan = superSaiyan;
    }

    /**
     * Transforma al Saiyan en Super Saiyan, aumentando sus atributos.
     */
    transformar() {
        if (!this.getEsSuperSaiyan()) {
            this.setEsSuperSaiyan(true);
            this.setAtaque(this.getAtaque() * 1.5);
            this.setVelocidad(this.getVelocidad() * 1.3);
            this.setDefensa(this.getDefensa() * 1.2);
        }
    }

    /**
     * Revertir la transformación de Super Saiyan.
     */
    revertirTransformacion() {
        if (this.getEsSuperSaiyan()) {
            this.setEsSuperSaiyan(false);
            this.setAtaque(this.getAtaque() / 1.5);
            this.setVelocidad(this.getVelocidad() / 1.3);
            this.setDefensa(this.getDefensa() / 1.2);
        }
    }
}

module.exports = Saiyan;