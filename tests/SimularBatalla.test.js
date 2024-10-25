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

  test('Cálculo de daño según ataque y defensa', () => {
    // Mock Math.random para evitar esquiva
    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    simularBatalla(luchador1, luchador2);

    // Primer ataque: 70 - 45 = 25 daño
    expect(luchador2.salud).toBe(75);

    // Segundo ataque: 65 - 50 = 15 daño
    expect(luchador1.salud).toBe(85);

    // Continuar hasta que uno pierda
    // Puedes continuar mockeando Math.random y verificar el resultado final

    // Restaurar Math.random
    Math.random.mockRestore();
  });

  test('Esquivar ataque correctamente', () => {
    // Mock Math.random para que el primer ataque sea esquivado
    const mockMath = jest.spyOn(Math, 'random').mockReturnValueOnce(0.1) // Esquiva
                                                .mockReturnValueOnce(0.5); // No esquiva

    const ganador = simularBatalla(luchador1, luchador2);

    // Primer ataque es esquivado, luchador2 salud sigue en 100
    // Segundo ataque no es esquivado: 65 - 50 = 15 daño
    expect(luchador1.salud).toBe(85);
    expect(luchador2.salud).toBe(100);

    // Continua hasta que uno pierda, aquí dependerá de los turnos

    // Restaurar Math.random
    mockMath.mockRestore();
  });

  test('Defensa mayor que ataque reduce daño al 10%', () => {
    // Configurar oponente con alta defensa
    luchador2.defensa = 80; // Mayor que ataque 70

    // Mock Math.random para evitar esquiva
    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    const ganador = simularBatalla(luchador1, luchador2);

    // Primer ataque: 70 * 0.1 = 7 daño
    expect(luchador2.salud).toBe(93);

    // Segundo ataque: 65 * 0.1 = 6.5 daño
    expect(luchador1.salud).toBe(93.5);

    // Continua hasta que uno pierda

    // Restaurar Math.random
    Math.random.mockRestore();
  });

  test('Determinación del ganador correctamente', () => {
    // Mock Math.random para no esquivar y definir un flujo predecible
    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    // Reducir salud manualmente para forzar un ganador
    luchador2.salud = 10;

    const ganador = simularBatalla(luchador1, luchador2);
    expect(ganador).toBe(luchador1);

    // Restaurar Math.random
    Math.random.mockRestore();
  });
});
