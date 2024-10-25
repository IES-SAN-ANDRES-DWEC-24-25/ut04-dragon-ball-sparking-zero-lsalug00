// tests/utils.test.js

const { esPotenciaDeDos, mezclarArray } = require('../src/utils');

describe('Funciones Auxiliares', () => {
  describe('Función esPotenciaDeDos', () => {
    test('Retorna true para potencias de 2', () => {
      const potencias = [1, 2, 4, 8, 16, 32, 64, 128];
      potencias.forEach(numero => {
        expect(esPotenciaDeDos(numero)).toBe(true);
      });
    });

    test('Retorna false para números que no son potencias de 2', () => {
      const noPotencias = [0, 3, 5, 6, 7, 9, 10, 12, 15];
      noPotencias.forEach(numero => {
        expect(esPotenciaDeDos(numero)).toBe(false);
      });
    });
  });

  describe('Función mezclarArray', () => {
    test('Mezcla un array y no repite elementos', () => {
      const original = [1, 2, 3, 4, 5];
      const copia = [...original];
      mezclarArray(copia);

      // Verificar que todos los elementos están presentes
      expect(copia.sort()).toEqual(original.sort());

      // Verificar que el array está mezclado (puede fallar ocasionalmente si el array queda igual)
      // Por lo tanto, verificamos que al menos una posición cambió
      const algunaPosicionCambiada = original.some((item, index) => item !== copia[index]);
      expect(algunaPosicionCambiada).toBe(true);
    });

    test('Mezcla un array vacío sin errores', () => {
      const original = [];
      const copia = [...original];
      mezclarArray(copia);
      expect(copia).toEqual(original);
    });

    test('Mezcla un array con un solo elemento sin errores', () => {
      const original = [42];
      const copia = [...original];
      mezclarArray(copia);
      expect(copia).toEqual(original);
    });
  });
});

