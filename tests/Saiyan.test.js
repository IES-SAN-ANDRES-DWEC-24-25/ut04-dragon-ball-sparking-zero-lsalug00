// tests/Saiyan.test.js

const Saiyan = require('../src/Saiyan');

describe('Clase Saiyan', () => {
    let saiyan;

    beforeEach(() => {
        saiyan = new Saiyan('Goku', 90, 95, 80);
    });

    test('Creación de Saiyan con atributos correctos', () => {
        expect(saiyan.getNombre()).toBe('Goku');
        expect(saiyan.getVelocidad()).toBe(90);
        expect(saiyan.getAtaque()).toBe(95);
        expect(saiyan.getDefensa()).toBe(80);
        expect(saiyan.getSalud()).toBe(100);
        expect(saiyan.getEsSuperSaiyan()).toBe(false);
    });

    test('Transformación a Super Saiyan aumenta los atributos', () => {
        saiyan.transformar();

        expect(saiyan.getEsSuperSaiyan()).toBe(true);
        expect(saiyan.getAtaque()).toBeCloseTo(142.5); // 95 * 1.5
        expect(saiyan.getVelocidad()).toBeCloseTo(117); // 90 * 1.3
        expect(saiyan.getDefensa()).toBeCloseTo(96); // 80 * 1.2
    });

    test('No puede transformarse más de una vez', () => {
        saiyan.transformar();
        saiyan.transformar(); // Intentar transformar de nuevo

        expect(saiyan.getAtaque()).toBeCloseTo(142.5); // Solo se incrementa una vez
        expect(saiyan.getVelocidad()).toBeCloseTo(117);
        expect(saiyan.getDefensa()).toBeCloseTo(96);
    });

    test('Revertir transformación reduce los atributos', () => {
        saiyan.transformar();
        saiyan.revertirTransformacion();

        expect(saiyan.getEsSuperSaiyan()).toBe(false);
        expect(saiyan.getAtaque()).toBeCloseTo(95); // 142.5 / 1.5
        expect(saiyan.getVelocidad()).toBeCloseTo(90); // 117 / 1.3
        expect(saiyan.getDefensa()).toBeCloseTo(80); // 96 / 1.2
    });

    test('No puede revertir transformación si no está transformado', () => {
        saiyan.revertirTransformacion(); // Intentar revertir sin transformación

        expect(saiyan.getAtaque()).toBe(95);
        expect(saiyan.getVelocidad()).toBe(90);
        expect(saiyan.getDefensa()).toBe(80);
    });

    test('Verificar revertir transformación varias veces', () => {
        saiyan.transformar();
        saiyan.revertirTransformacion(); // Revertir

        // Intentar revertir cuando ya no está transformado
        saiyan.revertirTransformacion();

        expect(saiyan.getEsSuperSaiyan()).toBe(false); // Debe seguir sin estar transformado
        expect(saiyan.getAtaque()).toBe(95); // Los atributos deben mantenerse como originales
        expect(saiyan.getVelocidad()).toBe(90);
        expect(saiyan.getDefensa()).toBe(80);
    });

    test('La salud del Saiyan no cambia durante la transformación', () => {
        const saludInicial = saiyan.getSalud();

        saiyan.transformar();
        expect(saiyan.getSalud()).toBe(saludInicial); // Salud no debería cambiar

        saiyan.revertirTransformacion();
        expect(saiyan.getSalud()).toBe(saludInicial); // Salud no debería cambiar al revertir
    });
});
