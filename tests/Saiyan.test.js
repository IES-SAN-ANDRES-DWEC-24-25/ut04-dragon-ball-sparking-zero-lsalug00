// tests/Saiyan.test.js

const Saiyan = require('../src/Saiyan');

describe('Clase Saiyan', () => {
  let saiyan;

  beforeEach(() => {
    saiyan = new Saiyan('Goku', 90, 95, 80);
  });

  test('Creación de Saiyan con atributos correctos', () => {
    expect(saiyan.nombre).toBe('Goku');
    expect(saiyan.velocidad).toBe(90);
    expect(saiyan.ataque).toBe(95);
    expect(saiyan.defensa).toBe(80);
    expect(saiyan.salud).toBe(100);
    expect(saiyan.esSuperSaiyan).toBe(false);
  });

  test('Transformación a Super Saiyan aumenta los atributos', () => {
    saiyan.transformar();

    expect(saiyan.esSuperSaiyan).toBe(true);
    expect(saiyan.ataque).toBeCloseTo(142.5); // 95 * 1.5
    expect(saiyan.velocidad).toBeCloseTo(117); // 90 * 1.3
    expect(saiyan.defensa).toBeCloseTo(96); // 80 * 1.2
  });

  test('No puede transformarse más de una vez', () => {
    saiyan.transformar();
    saiyan.transformar(); // Intentar transformar de nuevo

    expect(saiyan.ataque).toBeCloseTo(142.5); // Solo se incrementa una vez
    expect(saiyan.velocidad).toBeCloseTo(117);
    expect(saiyan.defensa).toBeCloseTo(96);
  });

  test('Revertir transformación reduce los atributos', () => {
    saiyan.transformar();
    saiyan.revertirTransformacion();

    expect(saiyan.esSuperSaiyan).toBe(false);
    expect(saiyan.ataque).toBeCloseTo(95); // 142.5 / 1.5
    expect(saiyan.velocidad).toBeCloseTo(90); // 117 / 1.3
    expect(saiyan.defensa).toBeCloseTo(80); // 96 / 1.2
  });

  test('No puede revertir transformación si no está transformado', () => {
    saiyan.revertirTransformacion(); // Intentar revertir sin transformación

    expect(saiyan.ataque).toBe(95);
    expect(saiyan.velocidad).toBe(90);
    expect(saiyan.defensa).toBe(80);
  });
});
