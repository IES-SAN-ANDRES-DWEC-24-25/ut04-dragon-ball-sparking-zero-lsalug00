// tests/simularBatalla.test.js

const Luchador = require('../src/Luchador');
const simularBatalla = require('../src/simularBatalla');

describe('Función simularBatalla', () => {
    let luchador1;
    let luchador2;

    beforeEach(() => {
        luchador1 = new Luchador('Luchador1', 60, 70, 50);
        luchador2 = new Luchador('Luchador2', 55, 65, 45);
    });

    test('Ganador por velocidad: luchador con mayor velocidad ataca primero', () => {
        // Mock Math.random para evitar aleatoriedad en esquiva
        jest.spyOn(Math, 'random').mockReturnValue(0.5);

        const ganador = simularBatalla(luchador1, luchador2);
        expect(ganador).toBe(luchador1);

        // Restaurar Math.random
        Math.random.mockRestore();
    });

    test('Vida al final de la batalla', () => {
        // Mock Math.random para evitar esquiva
        jest.spyOn(Math, 'random').mockReturnValue(0.5);

        simularBatalla(luchador1, luchador2);

        // Primer ataque: 70 - 45 = 25 daño
        expect(luchador2.getSalud()).toBe(0);

        // Segundo ataque: 65 - 50 = 15 daño
        expect(luchador1.getSalud()).toBe(100);

        // Restaurar Math.random
        Math.random.mockRestore();
    });

    test('Determinación del ganador correctamente', () => {
        // Mock Math.random para no esquivar y definir un flujo predecible
        jest.spyOn(Math, 'random').mockReturnValue(0.5);

        // Reducir salud manualmente para forzar un ganador
        luchador2.setSalud(10);

        const ganador = simularBatalla(luchador1, luchador2);
        expect(ganador).toBe(luchador1);

        // Restaurar Math.random
        Math.random.mockRestore();
    });
});