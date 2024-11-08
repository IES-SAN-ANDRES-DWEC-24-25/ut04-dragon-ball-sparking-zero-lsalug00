// tests/Earthling.test.js

const Earthling = require('../src/Earthling');

describe('Clase Earthling', () => {
    let earthling;

    beforeEach(() => {
        earthling = new Earthling('Gohan', 88, 88, 78);
    });

    test('Creación de Earthling con atributos correctos', () => {
        expect(earthling.getNombre()).toBe('Gohan');
        expect(earthling.getVelocidad()).toBe(88);
        expect(earthling.getAtaque()).toBe(88);
        expect(earthling.getDefensa()).toBe(78);
        expect(earthling.getSalud()).toBe(100);
        expect(earthling.getTecnicaUsada()).toBe(false);
    });

    test('Usar técnica especial aumenta el ataque', () => {
        earthling.usarTecnicaEspecial();

        expect(earthling.getTecnicaUsada()).toBe(true);
        expect(earthling.getAtaque()).toBeCloseTo(123.2); // 88 * 1.4
    });

    test('No puede usar técnica especial más de una vez', () => {
        earthling.usarTecnicaEspecial();
        earthling.usarTecnicaEspecial(); // Intentar usar de nuevo

        expect(earthling.getAtaque()).toBeCloseTo(123.2); // Solo se incrementa una vez
    });

    test('No puede usar técnica especial si ya ha sido usada', () => {
        earthling.usarTecnicaEspecial();
        earthling.usarTecnicaEspecial(); // Intentar usar de nuevo

        expect(earthling.getTecnicaUsada()).toBe(true);
        expect(earthling.getAtaque()).toBeCloseTo(123.2);
    });

    test('Usar técnica especial no afecta otros atributos', () => {
        earthling.usarTecnicaEspecial();

        expect(earthling.getVelocidad()).toBe(88); // La velocidad no cambia
        expect(earthling.getDefensa()).toBe(78); // La defensa no cambia
    });

    test('Restablecer tecnicaUsada permite reutilizar la técnica especial', () => {
        earthling.usarTecnicaEspecial();
        expect(earthling.getTecnicaUsada()).toBe(true);
        earthling.setTecnicaUsada(false); // Restablece el uso de la técnica
        expect(earthling.getTecnicaUsada()).toBe(false);

        earthling.usarTecnicaEspecial(); // Debería poder usar la técnica otra vez

        expect(earthling.getTecnicaUsada()).toBe(true);
        expect(earthling.getAtaque()).toBeCloseTo(172.48); // 123.2 * 1.4
    });

    test('No puede usar técnica especial sin inicializar tecnicaUsada', () => {
        // Confirmamos que no hay alteraciones en tecnicaUsada al no hacer uso de la técnica
        expect(earthling.getTecnicaUsada()).toBe(false);
        expect(earthling.getAtaque()).toBe(88);
    });
});
