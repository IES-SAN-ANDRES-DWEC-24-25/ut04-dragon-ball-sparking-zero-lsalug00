// tests/Torneo.test.js

const Luchador = require('../src/Luchador');
const Torneo = require('../src/Torneo');
const simularBatalla = require('../src/simularBatalla');

// Mock de simularBatalla para controlar los resultados
jest.mock('../src/simularBatalla');

describe('Clase Torneo', () => {
  let luchadores;

  beforeEach(() => {
    luchadores = [
      new Luchador('Luchador1', 60, 70, 50),
      new Luchador('Luchador2', 55, 65, 45),
      new Luchador('Luchador3', 50, 60, 40),
      new Luchador('Luchador4', 65, 75, 55)
    ];
  });

  test('Validación de número de luchadores: potencia de 2', () => {
    expect(() => new Torneo(luchadores)).not.toThrow();

    const luchadoresNoPotencia = [...luchadores, new Luchador('Luchador5', 60, 70, 50)];
    expect(() => new Torneo(luchadoresNoPotencia)).toThrow('El número de luchadores debe ser una potencia de 2.');
  });

  test('Emparejamiento aleatorio y avance de ganadores', () => {
    // Configurar simularBatalla para que siempre gane el primer luchador
    simularBatalla.mockImplementation((luch1, luch2) => luch1);

    const torneo = new Torneo(luchadores);
    const campeón = torneo.iniciar();

    expect(campeón).toBe(luchadores[0]);

    // Verificar que simularBatalla se llamó el número correcto de veces
    // En una potencia de 2 de 4 luchadores, hay 2 batallas en la primera ronda y 1 en la final
    expect(simularBatalla).toHaveBeenCalledTimes(3);
  });

  test('Determinación del ganador del torneo', () => {
    // Simular batallas con resultados específicos
    simularBatalla
      .mockImplementationOnce((luch1, luch2) => luch2) // Primera batalla
      .mockImplementationOnce((luch1, luch2) => luch1) // Segunda batalla
      .mockImplementationOnce((luch1, luch2) => luch1); // Final

    const torneo = new Torneo(luchadores);
    const campeón = torneo.iniciar();

    // Segundo luchador gana la primera batalla, primero luchador gana la segunda y la final
    expect(campeón).toBe(luchadores[0]);
  });

  test('Salida por consola durante el torneo', () => {
    // Mock de simularBatalla
    simularBatalla.mockImplementation((luch1, luch2) => luch1);

    // Mock de console.log
    console.log = jest.fn();

    const torneo = new Torneo(luchadores);
    torneo.iniciar();

    // Verificar que se imprimen los mensajes de inicio y rondas
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Iniciando el torneo con 4 luchadores!'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('--- Ronda 1 ---'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('--- Ronda 2 ---'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('El campeón del torneo es'));

    // Restaurar console.log
    console.log.mockRestore();
  });
});
