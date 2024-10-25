// tests/Luchador.test.js

const Luchador = require('../src/Luchador');

describe('Clase Luchador', () => {
  let luchador;
  let oponente;

  beforeEach(() => {
    luchador = new Luchador('Testeador', 50, 60, 40);
    oponente = new Luchador('Oponente', 45, 55, 35);
  });

  test('Creación de Luchador con atributos correctos', () => {
    expect(luchador.nombre).toBe('Testeador');
    expect(luchador.velocidad).toBe(50);
    expect(luchador.ataque).toBe(60);
    expect(luchador.defensa).toBe(40);
    expect(luchador.salud).toBe(100);
  });

  test('Método atacar: daño se calcula correctamente y salud del oponente se actualiza', () => {
    // Mock Math.random para evitar esquiva
    jest.spyOn(Math, 'random').mockReturnValue(0.5); // No esquiva

    const resultado = luchador.atacar(oponente);

    // Daño esperado: 60 - 35 = 25
    expect(resultado.daño).toBe(25);
    expect(oponente.salud).toBe(75);
    expect(resultado.mensaje).toBe('Testeador ataca a Oponente y causa 25.00 de daño.');

    // Restaurar Math.random
    Math.random.mockRestore();
  });

  test('Método atacar: esquiva funciona correctamente', () => {
    // Mock Math.random para esquivar
    jest.spyOn(Math, 'random').mockReturnValue(0.1); // Esquiva

    const resultado = luchador.atacar(oponente);

    expect(resultado.daño).toBe(0);
    expect(oponente.salud).toBe(100);
    expect(resultado.mensaje).toBe('Oponente esquivó el ataque de Testeador!');

    // Restaurar Math.random
    Math.random.mockRestore();
  });

  test('Método atacar: defensa mayor que ataque, daño reducido al 10%', () => {
    oponente.defensa = 70; // Mayor que ataque 60

    // Mock Math.random para evitar esquiva
    jest.spyOn(Math, 'random').mockReturnValue(0.5); // No esquiva

    const resultado = luchador.atacar(oponente);

    // Daño esperado: 60 * 0.1 = 6
    expect(resultado.daño).toBe(6);
    expect(oponente.salud).toBe(94);
    expect(resultado.mensaje).toBe('Testeador ataca a Oponente y causa 6.00 de daño.');

    // Restaurar Math.random
    Math.random.mockRestore();
  });

  test('Método recibirDanio actualiza la salud correctamente', () => {
    luchador.recibirDanio(30);
    expect(luchador.salud).toBe(70);

    luchador.recibirDanio(80);
    expect(luchador.salud).toBe(0); // Salud no puede ser negativa
  });

  test('Método estaVivo retorna true cuando salud > 0', () => {
    expect(luchador.estaVivo()).toBe(true);
  });

  test('Método estaVivo retorna false cuando salud <= 0', () => {
    luchador.salud = 0;
    expect(luchador.estaVivo()).toBe(false);

    luchador.salud = -10;
    expect(luchador.estaVivo()).toBe(false);
  });
});
