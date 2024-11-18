// src/simularBatalla.js

const Luchador = require('./Luchador');
const Saiyan = require('./Saiyan');
const Namekian = require('./Namekian');
const Earthling = require('./Earthling');

/**
 * Determina quién ataca primero basándose en la velocidad de los luchadores.
 * Si las velocidades son iguales, se elige al azar.
 * @param {Luchador} luchador1 - Primer luchador.
 * @param {Luchador} luchador2 - Segundo luchador.
 * @returns {[Luchador, Luchador]} - El atacante y el defensor.
 */
function determinarPrimerAtacante(luchador1, luchador2) {
    let atacante, defensor;

    if (luchador1.getVelocidad() > luchador2.getVelocidad()) {
        atacante = luchador1;
        defensor = luchador2;
    } else if (luchador2.getVelocidad() > luchador1.getVelocidad()) {
        atacante = luchador2;
        defensor = luchador1;
    } else {
        // Si las velocidades son iguales, se elige al azar
        if (Math.random() > 0.5) {
            atacante = luchador1;
            defensor = luchador2;
        } else {
            atacante = luchador2;
            defensor = luchador1;
        }
    }

    return [atacante, defensor];
}

/**
 * Simula un turno de la batalla, realizando un ataque y aplicando habilidades especiales si corresponde.
 * @param {Luchador} atacante - Luchador que ataca.
 * @param {Luchador} defensor - Luchador que recibe el ataque.
 */
function simularTurno(atacante, defensor) {
    let resultado = atacante.atacar(defensor);
    console.log(resultado.mensaje);

    // Si el defensor tiene menos de 50 de salud y aún no ha usado su habilidad especial, que regenere salud (si aplica)
    if (defensor instanceof Namekian && defensor.getSalud() < 50 && !defensor.getRegeneracionUsada()) {
        defensor.regenerarSalud();
        console.log(`${defensor.getNombre()} usa su habilidad de regeneración. Salud ahora: ${defensor.getSalud().toFixed(2)}`);
    }

    // Si el defensor no esta muerto el atacante podra usar su técnica especial (si es Earthling) o
    //transformarse (si es Saiyan) de forma aleatoria
    if(defensor.estaVivo()){
        // 
        if (atacante instanceof Earthling && !atacante.getTecnicaUsada()) {
            if (Math.random() > 0.5) {
                atacante.usarTecnicaEspecial();
                console.log(`${atacante.getNombre()} usa su técnica especial para aumentar su ataque.`);
            }
        }

        if (atacante instanceof Saiyan) {
            if (!atacante.getEsSuperSaiyan() && Math.random() > 0.5) {
                atacante.transformar();
                console.log(`${atacante.getNombre()} se transforma en Super Saiyan.`);
            } else if (atacante.getEsSuperSaiyan() && Math.random() > 0.5) {
                atacante.revertirTransformacion();
                console.log(`${atacante.getNombre()} se destransforma de Super Saiyan.`);
            }
        }
    }
}

/**
 * Resetear el estado de los luchadores al final de la ronda.
 * @param {Luchador} luchador - El luchador cuyo estado se resetea.
 */
function resetearEstado(luchador, saludInicial) {
    if (luchador.getSalud() !== saludInicial) {
        luchador.setSalud(saludInicial);
    }

    if (luchador instanceof Saiyan && luchador.getEsSuperSaiyan()) {
        luchador.revertirTransformacion();
    }

    if (luchador instanceof Namekian && luchador.getRegeneracionUsada()) {
        luchador.setRegeneracionUsada(false);
    }

    if (luchador instanceof Earthling && luchador.getTecnicaUsada()) {
        luchador.setTecnicaUsada(false);
        luchador.setAtaque(luchador.getAtaque()/1.4);
    }
}

/**
 * Simula una batalla entre dos luchadores.
 * @param {Luchador} luchador1 - Primer luchador.
 * @param {Luchador} luchador2 - Segundo luchador.
 * @returns {Luchador} - Ganador de la batalla.
 */
function simularBatalla(luchador1, luchador2) {
    console.log(`\nComienza la batalla entre ${luchador1.getNombre()} y ${luchador2.getNombre()}!`);

    // Determinar quién ataca primero basado en la velocidad
    let [atacante, defensor] = determinarPrimerAtacante(luchador1, luchador2);
    console.log(`${atacante.getNombre()} tiene mayor velocidad y ataca primero.`);

    let saludInicialLuchador1 = luchador1.getSalud();
    let saludInicialLuchador2 = luchador2.getSalud();
    
    // Simular turnos hasta que uno de los luchadores pierda
    while (luchador1.estaVivo() && luchador2.estaVivo()) {
        simularTurno(atacante, defensor);

        // Comprobar si el defensor sigue vivo
        if (!defensor.estaVivo()) {
            console.log(`${defensor.getNombre()} ha caído!`);
            break;
        }

        // Intercambiar los roles de atacante y defensor
        [atacante, defensor] = [defensor, atacante];
    }

    // Determinar al ganador
    const ganador = luchador1.estaVivo() ? luchador1 : luchador2;
    console.log(`El ganador de la batalla es ${ganador.getNombre()}!\n`);
    // Al final de la ronda, restablecemos la vida y destransformamos a los Saiyans
    if (ganador === luchador1){
        resetearEstado(luchador1, saludInicialLuchador1);
    }else{
        resetearEstado(luchador2, saludInicialLuchador2);
    }
    if (ganador instanceof Namekian) {
        console.log(`curacion usada: ${ganador.getRegeneracionUsada()}`);
    }
    return ganador;
}

module.exports = simularBatalla;