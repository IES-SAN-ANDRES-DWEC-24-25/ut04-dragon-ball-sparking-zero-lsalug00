// tests/Namekian.test.js

const Namekian = require('../src/Namekian');

describe('Clase Namekian', () => {
  let namekian;

  beforeEach(() => {
    namekian = new Namekian('Piccolo', 80, 85, 70);
  });

  test('Creación de Namekian con atributos correctos', () => {
    expect(namekian.nombre).toBe('Piccolo');
    expect(namekian.velocidad).toBe(80);
    expect(namekian.ataque).toBe(85);
    expect(namekian.defensa).toBe(70);
    expect(namekian.salud).toBe(100);
    expect(namekian.regenerado).toBe(false);
  });

  test('Regenerar salud cuando la salud está por debajo de 50', () => {
    namekian.recibirDanio(60); // Salud queda en 40
    namekian.regenerarSalud();

    expect(namekian.salud).toBe(70); // 40 + 30
    expect(namekian.regenerado).toBe(true);
  });

  test('No puede regenerar salud más de una vez', () => {
    namekian.recibirDanio(60); // Salud queda en 40
    namekian.regenerarSalud();
    namekian.recibirDanio(10); // Salud queda en 60
    namekian.regenerarSalud(); // Intentar regenerar de nuevo

    expect(namekian.salud).toBe(60); // No se regenera de nuevo
    expect(namekian.regenerado).toBe(true);
  });

  test('No puede regenerar salud si la salud está por encima de 50', () => {
    namekian.regenerarSalud(); // Intentar regenerar sin necesidad

    expect(namekian.salud).toBe(100); // No se regenera
    expect(namekian.regenerado).toBe(false);
  });
});
