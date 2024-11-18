// src/Luchador.js

class Luchador {
    //Cada luchador posee atributos fundamentales como velocidad, ataque y defensa, que determinan el resultado de cada enfrentamiento
    /**
     * @param {string} nombre - Nombre del luchador.
     * @param {number} salud - La cantidad inicial de salud del luchador.
     * @param {number} velocidad - La velocidad del luchador, usada para esquivar ataques.
     * @param {number} ataque - El nivel de ataque del luchador.
     * @param {number} defensa - El nivel de defensa del luchador.
     */
    constructor(nombre, velocidad, ataque, defensa, salud = 100) {
        this.#nombre = nombre;
        this.#salud = salud;
        this.#velocidad = velocidad;
        this.#ataque = ataque;
        this.#defensa = defensa;
    }

    // Atributos privados
    #nombre;
    #salud;
    #velocidad;
    #ataque;
    #defensa;

    getNombre() {
        return this.#nombre;
    }

    getSalud() {
        return this.#salud;
    }

    getVelocidad() {
        return this.#velocidad;
    }

    getDefensa() {
        return this.#defensa;
    }

    getAtaque() {
        return this.#ataque;
    }

    setNombre(nombre) {
        this.#nombre = nombre;
    }

    setSalud(salud) {
        if (salud < 0) {
            this.#salud = 0;
        } else if (salud > 100) {
            this.#salud = 100;
        } else {
            this.#salud = salud;
        }
    }

    setVelocidad(velocidad) {
        this.#velocidad = velocidad;
    }

    setDefensa(defensa) {
        this.#defensa = defensa;
    }

    setAtaque(ataque) {
        this.#ataque = ataque;
    }

    /**
     * Realiza un ataque contra un oponente.
     * @param {Luchador} oponente - El luchador que recibe el ataque.
     * @returns {Object} - Resultado del ataque.
     */
    atacar(oponente) {
        const esquiva = Math.random() < 0.2; // Por ejemplo, 20% de esquivar
        let resultado;

        if (esquiva) {
            resultado = { daño: 0, mensaje: `${oponente.getNombre()} esquivó el ataque de ${this.getNombre()}!` };
        } else {
            let danio = this.getAtaque();
            if (oponente.getDefensa() >= this.getAtaque()) {
                danio *= 0.1; // 10% del daño
            } else {
                danio = this.getAtaque() - oponente.getDefensa();
            }

            if (danio < 0) {
                danio = 0;
            }

            oponente.recibirDanio(danio);
            resultado = { daño: danio, mensaje: `${this.getNombre()} ataca a ${oponente.getNombre()} y causa ${danio.toFixed(2)} de daño.` };
        }

        return resultado;
    }

    /**
     * Aplica daño a la salud del luchador.
     * @param {number} danio - Cantidad de daño recibido.
     */
    recibirDanio(danio) {
        this.setSalud(this.getSalud() - danio);
    }

    /**
     * Verifica si el luchador está vivo.
     * @returns {boolean} - `true` si la salud es mayor a 0, `false` en caso contrario.
     */
    estaVivo() {
        return this.getSalud() > 0;
    }
}

module.exports = Luchador;