// tests/Earthling.test.js

const Earthling = require('../src/Earthling');

describe('Clase Earthling', () => {
  let earthling;

  beforeEach(() => {
    earthling = new Earthling('Gohan', 88, 88, 78);
  });

  test('Creación de Earthling con atributos correctos', () => {
    expect(earthling.nombre).toBe('Gohan');
    expect(earthling.velocidad).toBe(88);
    expect(earthling.ataque).toBe(88);
    expect(earthling.defensa).toBe(78);
    expect(earthling.salud).toBe(100);
    expect(earthling.tecnicaUsada).toBe(false);
  });

  test('Usar técnica especial aumenta el ataque', () => {
    earthling.usarTecnicaEspecial();

    expect(earthling.tecnicaUsada).toBe(true);
    expect(earthling.ataque).toBeCloseTo(123.2); // 88 * 1.4
  });

  test('No puede usar técnica especial más de una vez', () => {
    earthling.usarTecnicaEspecial();
    earthling.usarTecnicaEspecial(); // Intentar usar de nuevo

    expect(earthling.ataque).toBeCloseTo(123.2); // Solo se incrementa una vez
  });

  test('No puede usar técnica especial si ya ha sido usada', () => {
    earthling.usarTecnicaEspecial();
    earthling.usarTecnicaEspecial(); // Intentar usar de nuevo

    expect(earthling.tecnicaUsada).toBe(true);
    expect(earthling.ataque).toBeCloseTo(123.2);
  });
});
